import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Trash2, Copy, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface UserRole {
  id: string;
  user_id: string;
  role: "admin" | "editor";
  created_at: string;
}

interface InviteCode {
  id: string;
  code: string;
  role: "admin" | "editor";
  used_by: string | null;
  used_at: string | null;
  expires_at: string | null;
}

const AdminUsers = () => {
  const { isAdmin } = useAuth();
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [invites, setInvites] = useState<InviteCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [newInviteRole, setNewInviteRole] = useState<"admin" | "editor">("editor");

  const fetchData = async () => {
    const [rolesRes, invitesRes] = await Promise.all([
      supabase.from("user_roles").select("*"),
      supabase.from("invite_codes").select("*").order("created_at", { ascending: false }),
    ]);
    if (rolesRes.data) setRoles(rolesRes.data);
    if (invitesRes.data) setInvites(invitesRes.data);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const generateCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "AIW-";
    for (let i = 0; i < 8; i++) code += chars[Math.floor(Math.random() * chars.length)];
    return code;
  };

  const createInvite = async () => {
    const code = generateCode();
    const { error } = await supabase.from("invite_codes").insert({
      code,
      role: newInviteRole,
    });
    if (error) { toast.error("Failed to create invite"); return; }
    toast.success("Invite code created");
    setShowInviteDialog(false);
    fetchData();
  };

  const deleteInvite = async (id: string) => {
    await supabase.from("invite_codes").delete().eq("id", id);
    toast.success("Invite deleted");
    fetchData();
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied");
  };

  if (!isAdmin) {
    return (
      <AdminLayout>
        <div className="text-center py-20">
          <Shield size={48} className="mx-auto text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground">Only admins can manage users.</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl mb-2">Users & Access</h1>
          <p className="text-muted-foreground">Manage admin users and invite codes.</p>
        </div>
        <Button onClick={() => setShowInviteDialog(true)} className="bg-accent text-accent-foreground">
          <Plus size={16} className="mr-2" /> Create Invite Code
        </Button>
      </div>

      {/* Current Users */}
      <div className="bg-card border border-border rounded-sm p-6 mb-6">
        <h3 className="font-serif text-xl mb-4">Active Users</h3>
        {roles.length === 0 ? (
          <p className="text-muted-foreground text-sm">No users found.</p>
        ) : (
          <div className="space-y-3">
            {roles.map((role) => (
              <div key={role.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <div>
                  <p className="text-sm">{role.user_id}</p>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    role.role === "admin" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
                  }`}>
                    {role.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Invite Codes */}
      <div className="bg-card border border-border rounded-sm p-6">
        <h3 className="font-serif text-xl mb-4">Invite Codes</h3>
        {invites.length === 0 ? (
          <p className="text-muted-foreground text-sm">No invite codes.</p>
        ) : (
          <div className="space-y-3">
            {invites.map((invite) => (
              <div key={invite.id} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                <div className="flex items-center gap-4">
                  <code className="text-sm bg-muted px-3 py-1 rounded font-mono">{invite.code}</code>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    invite.role === "admin" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
                  }`}>
                    {invite.role}
                  </span>
                  {invite.used_by && (
                    <span className="text-xs text-green-600">✓ Used</span>
                  )}
                </div>
                <div className="flex gap-1">
                  {!invite.used_by && (
                    <Button variant="ghost" size="icon" onClick={() => copyCode(invite.code)}>
                      <Copy size={14} />
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" onClick={() => deleteInvite(invite.id)} className="hover:text-destructive">
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">Create Invite Code</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Role</label>
              <Select value={newInviteRole} onValueChange={(v: "admin" | "editor") => setNewInviteRole(v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowInviteDialog(false)}>Cancel</Button>
              <Button onClick={createInvite} className="bg-accent text-accent-foreground">Generate Code</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminUsers;
