import { useState, useEffect, useRef } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Settings, Shield, Database, Globe, ImageIcon, Upload, Trash2 } from "lucide-react";
import defaultLogo from "@/assets/logo.png";

const AdminSettings = () => {
  const { user, isAdmin, isEditor } = useAuth();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loadingLogo, setLoadingLogo] = useState(true);

  useEffect(() => {
    fetchLogo();
  }, []);

  const fetchLogo = async () => {
    const { data } = await supabase
      .from("site_content")
      .select("content_value")
      .eq("page", "global")
      .eq("section", "branding")
      .eq("content_key", "logo_url")
      .maybeSingle();
    if (data?.content_value) setLogoUrl(data.content_value);
    setLoadingLogo(false);
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match(/^image\/(jpeg|jpg|png|svg|webp)/)) {
      toast.error("Please upload a valid image file (JPEG, PNG, SVG, or WebP)");
      return;
    }

    setUploading(true);
    const ext = file.name.split(".").pop();
    const filePath = `branding/logo_${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("media")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      toast.error("Upload failed: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("media").getPublicUrl(filePath);
    const publicUrl = urlData.publicUrl;

    const { error: upsertError } = await supabase.from("site_content").upsert(
      {
        page: "global",
        section: "branding",
        content_key: "logo_url",
        content_value: publicUrl,
        content_type: "image",
        sort_order: 0,
      },
      { onConflict: "page,section,content_key" }
    );

    if (upsertError) {
      toast.error("Failed to save logo setting");
    } else {
      setLogoUrl(publicUrl);
      queryClient.invalidateQueries({ queryKey: ["site-content"] });
      queryClient.invalidateQueries({ queryKey: ["site-logo"] });
      toast.success("Logo updated successfully!");
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveLogo = async () => {
    await supabase
      .from("site_content")
      .delete()
      .eq("page", "global")
      .eq("section", "branding")
      .eq("content_key", "logo_url");

    setLogoUrl(null);
    queryClient.invalidateQueries({ queryKey: ["site-content"] });
    queryClient.invalidateQueries({ queryKey: ["site-logo"] });
    toast.success("Logo reset to default");
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-serif text-3xl mb-2">Settings</h1>
        <p className="text-muted-foreground">System configuration and account settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Logo Upload Card */}
        <div className="bg-card border border-border rounded-sm p-6 md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <ImageIcon size={20} className="text-accent" />
            <h3 className="font-serif text-lg">Website Logo</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Upload a custom logo for the website header. Recommended formats: PNG, SVG, or WebP with transparent background.
          </p>

          <div className="flex items-center gap-6">
            {/* Logo preview */}
            <div className="w-48 h-20 border border-dashed border-border rounded-sm flex items-center justify-center bg-muted/30 overflow-hidden">
              {loadingLogo ? (
                <span className="text-xs text-muted-foreground">Loading...</span>
              ) : (
                <img
                  src={logoUrl || defaultLogo}
                  alt="Current logo"
                  className="max-h-16 max-w-full object-contain"
                />
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/svg+xml,image/webp"
                onChange={handleLogoUpload}
                className="hidden"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="bg-accent text-accent-foreground"
                size="sm"
              >
                <Upload size={14} className="mr-2" />
                {uploading ? "Uploading..." : "Upload New Logo"}
              </Button>
              {logoUrl && (
                <Button
                  onClick={handleRemoveLogo}
                  variant="outline"
                  size="sm"
                  className="text-destructive border-destructive/30 hover:bg-destructive/10"
                >
                  <Trash2 size={14} className="mr-2" />
                  Reset to Default
                </Button>
              )}
            </div>
          </div>
          {logoUrl && (
            <p className="text-xs text-muted-foreground mt-3">
              Custom logo is active. The change will appear on the website immediately.
            </p>
          )}
        </div>

        {/* Account Card */}
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

        {/* Database Card */}
        <div className="bg-card border border-border rounded-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Database size={20} className="text-accent" />
            <h3 className="font-serif text-lg">Database</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Provider</span>
              <span>Lovable Cloud</span>
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

        {/* Website Card */}
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