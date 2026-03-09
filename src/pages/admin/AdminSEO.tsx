import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Save } from "lucide-react";

interface SEOItem {
  id?: string;
  page_path: string;
  title: string;
  description: string;
  keywords: string;
  og_image: string;
}

const defaultPages = [
  { path: "/", label: "Homepage" },
  { path: "/about", label: "About" },
  { path: "/services", label: "Services" },
  { path: "/projects", label: "Projects" },
  { path: "/contact", label: "Contact" },
  { path: "/request-quote", label: "Request Quote" },
];

const AdminSEO = () => {
  const [seoItems, setSeoItems] = useState<SEOItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("seo_settings").select("*");
      const items: SEOItem[] = defaultPages.map((page) => {
        const existing = data?.find((d) => d.page_path === page.path);
        return {
          id: existing?.id,
          page_path: page.path,
          title: existing?.title || "",
          description: existing?.description || "",
          keywords: existing?.keywords || "",
          og_image: existing?.og_image || "",
        };
      });
      setSeoItems(items);
      setLoading(false);
    };
    fetch();
  }, []);

  const updateField = (path: string, field: keyof SEOItem, value: string) => {
    setSeoItems((prev) =>
      prev.map((item) => (item.page_path === path ? { ...item, [field]: value } : item))
    );
  };

  const handleSave = async () => {
    setSaving(true);
    for (const item of seoItems) {
      if (item.id) {
        await supabase.from("seo_settings").update({
          title: item.title || null,
          description: item.description || null,
          keywords: item.keywords || null,
          og_image: item.og_image || null,
        }).eq("id", item.id);
      } else if (item.title || item.description || item.keywords || item.og_image) {
        await supabase.from("seo_settings").insert({
          page_path: item.page_path,
          title: item.title || null,
          description: item.description || null,
          keywords: item.keywords || null,
          og_image: item.og_image || null,
        });
      }
    }
    toast.success("SEO settings saved");
    setSaving(false);
  };

  if (loading) return <AdminLayout><p className="text-muted-foreground">Loading...</p></AdminLayout>;

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl mb-2">SEO Settings</h1>
          <p className="text-muted-foreground">Manage meta titles, descriptions, and keywords for each page.</p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="bg-accent text-accent-foreground">
          <Save size={16} className="mr-2" /> {saving ? "Saving..." : "Save All"}
        </Button>
      </div>

      <div className="space-y-6">
        {seoItems.map((item) => {
          const pageLabel = defaultPages.find((p) => p.path === item.page_path)?.label || item.page_path;
          return (
            <div key={item.page_path} className="bg-card border border-border rounded-sm p-6">
              <h3 className="font-serif text-lg mb-4">{pageLabel} <span className="text-xs text-muted-foreground ml-2">{item.page_path}</span></h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Meta Title</label>
                  <Input value={item.title} onChange={(e) => updateField(item.page_path, "title", e.target.value)} placeholder="Page title (max 60 chars)" />
                  <p className="text-xs text-muted-foreground mt-1">{item.title.length}/60</p>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Keywords</label>
                  <Input value={item.keywords} onChange={(e) => updateField(item.page_path, "keywords", e.target.value)} placeholder="keyword1, keyword2, ..." />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Meta Description</label>
                  <Textarea value={item.description} onChange={(e) => updateField(item.page_path, "description", e.target.value)} rows={2} placeholder="Page description (max 160 chars)" />
                  <p className="text-xs text-muted-foreground mt-1">{item.description.length}/160</p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">OG Image URL</label>
                  <Input value={item.og_image} onChange={(e) => updateField(item.page_path, "og_image", e.target.value)} placeholder="https://..." />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AdminLayout>
  );
};

export default AdminSEO;
