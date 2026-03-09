import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isEditor: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, inviteCode: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isAdmin: false,
  isEditor: false,
  isLoading: true,
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null }),
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditor, setIsEditor] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkRole = async (userId: string) => {
    const { data: adminCheck } = await supabase.rpc("has_role", {
      _user_id: userId,
      _role: "admin",
    });
    const { data: editorCheck } = await supabase.rpc("has_role", {
      _user_id: userId,
      _role: "editor",
    });
    setIsAdmin(!!adminCheck);
    setIsEditor(!!editorCheck);
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          setTimeout(() => checkRole(session.user.id), 0);
        } else {
          setIsAdmin(false);
          setIsEditor(false);
        }
        setIsLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        checkRole(session.user.id);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signUp = async (email: string, password: string, inviteCode: string) => {
    // Validate invite code
    const { data: invite, error: inviteError } = await supabase
      .from("invite_codes")
      .select("*")
      .eq("code", inviteCode)
      .is("used_by", null)
      .single();

    if (inviteError || !invite) {
      return { error: { message: "Invalid or expired invite code" } };
    }

    // Sign up user
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin },
    });

    if (signUpError) return { error: signUpError };

    // If user was created, assign role and mark invite as used
    if (signUpData.user) {
      // Use a service role approach - the edge function will handle this
      // For now, we'll use the assign-role edge function
      const { error: roleError } = await supabase.functions.invoke("assign-role", {
        body: { userId: signUpData.user.id, inviteCode: inviteCode },
      });

      if (roleError) {
        return { error: { message: "Account created but role assignment failed. Contact admin." } };
      }
    }

    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setIsAdmin(false);
    setIsEditor(false);
  };

  return (
    <AuthContext.Provider value={{ user, session, isAdmin, isEditor, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
