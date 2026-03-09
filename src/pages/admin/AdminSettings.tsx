import AdminLayout from "@/components/admin/AdminLayout";
import { useAuth } from "@/hooks/useAuth";
import { Settings, Shield, Database, Globe } from "lucide-react";

const AdminSettings = () => {
  const { user, isAdmin, isEditor } = useAuth();

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-serif text-3xl mb-2">Settings</h1>
        <p className="text-muted-foreground">System configuration and account settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield size={20} className="text-accent" />
            <h3 className="font-serif text-lg">Account</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Email</span>
              <span>{user?.email}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Role</span>
              <span className="capitalize">{isAdmin ? "Admin" : isEditor ? "Editor" : "None"}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">ID</span>
              <span className="text-xs font-mono truncate max-w-[200px]">{user?.id}</span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Database size={20} className="text-accent" />
            <h3 className="font-serif text-lg">Database</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Provider</span>
              <span>Supabase (Cloud)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Storage</span>
              <span>Cloud Media Bucket</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Auth</span>
              <span>Email + Password</span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-sm p-6 md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <Globe size={20} className="text-accent" />
            <h3 className="font-serif text-lg">Website</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Frontend</span>
              <span>React + Vite + Tailwind CSS</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">CMS</span>
              <span>Custom Admin Dashboard</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Deployment</span>
              <span>Lovable Cloud</span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
