import { useEffect, useState, useRef } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Upload, Trash2, Copy, FolderOpen, Image as ImageIcon } from "lucide-react";

interface MediaItem {
  id: string;
  file_name: string;
  file_url: string;
  file_type: string | null;
  file_size: number | null;
  folder: string | null;
  alt_text: string | null;
  created_at: string;
}

const AdminMedia = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [activeFolder, setActiveFolder] = useState("all");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchMedia = async () => {
    let query = supabase.from("media").select("*").order("created_at", { ascending: false });
    if (activeFolder !== "all") query = query.eq("folder", activeFolder);
    const { data } = await query;
    if (data) setMedia(data);
    setLoading(false);
  };

  useEffect(() => { fetchMedia(); }, [activeFolder]);

  const folders = ["all", "general", "projects", "hero", "team", "logos"];

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);

    for (const file of Array.from(files)) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${activeFolder === "all" ? "general" : activeFolder}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(filePath, file);

      if (uploadError) {
        toast.error(`Failed to upload ${file.name}`);
        continue;
      }

      const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(filePath);

      await supabase.from("media").insert({
        file_name: file.name,
        file_url: publicUrl,
        file_type: file.type,
        file_size: file.size,
        folder: activeFolder === "all" ? "general" : activeFolder,
      });
    }

    toast.success("Upload complete");
    setUploading(false);
    fetchMedia();
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDelete = async (item: MediaItem) => {
    if (!confirm(`Delete "${item.file_name}"?`)) return;

    // Extract path from URL for storage deletion
    const urlParts = item.file_url.split("/media/");
    if (urlParts[1]) {
      await supabase.storage.from("media").remove([urlParts[1]]);
    }
    await supabase.from("media").delete().eq("id", item.id);
    toast.success("File deleted");
    fetchMedia();
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL copied to clipboard");
  };

  const formatSize = (bytes: number | null) => {
    if (!bytes) return "—";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl mb-2">Media Library</h1>
          <p className="text-muted-foreground">{media.length} files</p>
        </div>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp"
            onChange={handleUpload}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="bg-accent text-accent-foreground"
          >
            <Upload size={16} className="mr-2" /> {uploading ? "Uploading..." : "Upload Files"}
          </Button>
        </div>
      </div>

      {/* Folder Filter */}
      <div className="flex gap-2 mb-6">
        {folders.map((f) => (
          <Button
            key={f}
            variant={activeFolder === f ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFolder(f)}
            className="capitalize"
          >
            <FolderOpen size={14} className="mr-1" /> {f}
          </Button>
        ))}
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : media.length === 0 ? (
        <div className="text-center py-20 bg-card border border-border rounded-sm">
          <ImageIcon size={48} className="mx-auto text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground">No media files in this folder.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {media.map((item) => (
            <div key={item.id} className="bg-card border border-border rounded-sm overflow-hidden group">
              <div className="aspect-square bg-muted relative">
                {item.file_type?.startsWith("image/") ? (
                  <img src={item.file_url} alt={item.alt_text || item.file_name} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <ImageIcon size={32} className="text-muted-foreground/30" />
                  </div>
                )}
                <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button size="icon" variant="ghost" onClick={() => copyUrl(item.file_url)} className="text-background hover:text-background">
                    <Copy size={16} />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(item)} className="text-background hover:text-red-400">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
              <div className="p-2">
                <p className="text-xs truncate">{item.file_name}</p>
                <p className="text-[0.6rem] text-muted-foreground">{formatSize(item.file_size)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminMedia;
