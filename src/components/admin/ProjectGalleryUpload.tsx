import { useState, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Upload, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectGalleryUploadProps {
  projectId: string | null;
  images: { id?: string; image_url: string; alt_text?: string | null; sort_order: number }[];
  onChange: (images: { id?: string; image_url: string; alt_text?: string | null; sort_order: number }[]) => void;
  maxImages?: number;
}

const ProjectGalleryUpload = ({ projectId, images, onChange, maxImages = 5 }: ProjectGalleryUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(async (file: File) => {
    if (!file.type.match(/^image\/(jpeg|jpg|png|webp)$/)) {
      toast.error("Only JPEG, PNG, and WebP images are supported");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be under 10MB");
      return;
    }
    if (images.length >= maxImages) {
      toast.error(`Maximum ${maxImages} gallery images allowed`);
      return;
    }

    setUploading(true);
    const ext = file.name.split(".").pop();
    const fileName = `projects/gallery/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("media")
      .upload(fileName, file, { cacheControl: "3600", upsert: false });

    if (uploadError) {
      toast.error("Upload failed: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("media").getPublicUrl(fileName);

    onChange([...images, {
      image_url: urlData.publicUrl,
      alt_text: null,
      sort_order: images.length,
    }]);

    toast.success("Image added to gallery!");
    setUploading(false);
  }, [images, maxImages, onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  }, [uploadFile]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index).map((img, i) => ({ ...img, sort_order: i })));
  };

  return (
    <div>
      <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">
        Gallery Images ({images.length}/{maxImages})
      </label>
      <p className="text-xs text-muted-foreground mb-3">
        Add up to {maxImages} additional images for the project detail page gallery.
      </p>

      {/* Image grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-3">
          {images.map((img, index) => (
            <div key={img.id || `new-${index}`} className="relative rounded border border-border overflow-hidden group">
              <img src={img.image_url} alt={img.alt_text || `Gallery ${index + 1}`} className="w-full h-28 object-cover" />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
                type="button"
              >
                <X size={12} />
              </Button>
              <span className="absolute bottom-1 left-1 text-[10px] bg-background/80 text-foreground px-1.5 py-0.5 rounded">
                {index + 1}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Upload zone */}
      {images.length < maxImages && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded cursor-pointer flex flex-col items-center justify-center h-24 transition-colors ${
            dragOver
              ? "border-accent bg-accent/10"
              : "border-border hover:border-accent/50"
          }`}
        >
          {uploading ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              <span className="text-sm">Uploading...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Plus size={18} />
              <span className="text-sm">Add gallery image</span>
            </div>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default ProjectGalleryUpload;