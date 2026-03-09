import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Lock, Mail, UserPlus, LogIn } from "lucide-react";

const AdminLogin = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isRegister) {
      const { error } = await signUp(email, password, inviteCode);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Account created! Please check your email to confirm.");
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        toast.error(error.message);
      } else {
        navigate("/admin");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-sidebar flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl text-sidebar-foreground mb-2">AIW</h1>
          <p className="text-sm text-sidebar-foreground/60 uppercase tracking-[0.2em]">
            Admin Dashboard
          </p>
        </div>

        <div className="bg-sidebar-accent/50 border border-sidebar-border p-8 rounded-sm">
          <h2 className="font-serif text-2xl text-sidebar-foreground mb-6">
            {isRegister ? "Create Account" : "Sign In"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs uppercase tracking-[0.15em] text-sidebar-foreground/60 mb-2 block">
                Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-sidebar-foreground/40" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@aiwindia.com"
                  className="pl-10 bg-sidebar border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/30 h-12"
                />
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-[0.15em] text-sidebar-foreground/60 mb-2 block">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-sidebar-foreground/40" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  placeholder="••••••••"
                  className="pl-10 bg-sidebar border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/30 h-12"
                />
              </div>
            </div>

            {isRegister && (
              <div>
                <label className="text-xs uppercase tracking-[0.15em] text-sidebar-foreground/60 mb-2 block">
                  Invite Code
                </label>
                <Input
                  type="text"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  required
                  placeholder="Enter your invite code"
                  className="bg-sidebar border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/30 h-12"
                />
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
            >
              {loading ? (
                "Processing..."
              ) : isRegister ? (
                <><UserPlus size={16} className="mr-2" /> Create Account</>
              ) : (
                <><LogIn size={16} className="mr-2" /> Sign In</>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-sm text-sidebar-primary hover:underline"
            >
              {isRegister ? "Already have an account? Sign in" : "Have an invite code? Create account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
