import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { fallbackSiteContent } from "@/data/adminFallbacks";

interface ContentItem {
  id?: string;
  page: string;
  section: string;
  content_key: string;
  content_value: string | null;
  content_type: string;
  sort_order: number;
}

const pages = [
  { key: "homepage", label: "Homepage" },
  { key: "about", label: "About" },
  { key: "services", label: "Services" },
  { key: "contact", label: "Contact" },
  { key: "footer", label: "Footer" },
];

const AdminContent = () => {
  const queryClient = useQueryClient();
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("homepage");

  const fetchContent = async () => {
    const { data } = await supabase.from("site_content").select("*").order("sort_order");
    const merged = new Map<string, ContentItem>();

    fallbackSiteContent.forEach((item) => {
      merged.set(`${item.page}:${item.section}:${item.content_key}`, item);
    });

    data?.forEach((item) => {
      merged.set(`${item.page}:${item.section}:${item.content_key}`, item);
    });

    setContent(Array.from(merged.values()).sort((a, b) => a.sort_order - b.sort_order));
    setLoading(false);
  };

  useEffect(() => { fetchContent(); }, []);

  const getPageContent = (page: string) => content.filter((c) => c.page === page);

  const updateContent = (item: ContentItem, value: string) => {
    setContent((prev) =>
      prev.map((c) => {
        if (c.id && c.id === item.id) return { ...c, content_value: value };
        if (!c.id && c.page === item.page && c.section === item.section && c.content_key === item.content_key)
          return { ...c, content_value: value };
        return c;
      })
    );
  };

  const addContentItem = () => {
    setContent((prev) => [
      ...prev,
      {
        page: activeTab,
        section: "general",
        content_key: `new_field_${Date.now()}`,
        content_value: "",
        content_type: "text",
        sort_order: prev.length,
      },
    ]);
  };

  const saveContent = async () => {
    setSaving(true);
    const pageContent = getPageContent(activeTab);

    for (const item of pageContent) {
      if (item.id) {
        await supabase.from("site_content").update({
          page: item.page,
          section: item.section,
          content_key: item.content_key,
          content_value: item.content_value,
          content_type: item.content_type,
          sort_order: item.sort_order,
        }).eq("id", item.id);
      } else {
        await supabase.from("site_content").upsert({
          page: item.page,
          section: item.section,
          content_key: item.content_key,
          content_value: item.content_value,
          content_type: item.content_type,
          sort_order: item.sort_order,
        }, { onConflict: "page,section,content_key" });
      }
    }
    toast.success("Content saved successfully");
    setSaving(false);
    fetchContent();
  };

  const deleteItem = async (item: ContentItem) => {
    if (item.id) {
      await supabase.from("site_content").delete().eq("id", item.id);
    }
    setContent((prev) =>
      prev.filter((c) => {
        if (c.id && c.id === item.id) return false;
        if (!c.id && c.page === item.page && c.section === item.section && c.content_key === item.content_key) return false;
        return true;
      })
    );
    toast.success("Content item removed");
  };

  if (loading) return <AdminLayout><p className="text-muted-foreground">Loading...</p></AdminLayout>;

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl mb-2">Content Manager</h1>
          <p className="text-muted-foreground">Edit website content directly. Changes appear instantly.</p>
        </div>
        <Button onClick={saveContent} disabled={saving} className="bg-accent text-accent-foreground">
          <Save size={16} className="mr-2" /> {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          {pages.map((p) => (
            <TabsTrigger key={p.key} value={p.key}>{p.label}</TabsTrigger>
          ))}
        </TabsList>

        {pages.map((page) => (
          <TabsContent key={page.key} value={page.key}>
            <div className="bg-card border border-border rounded-sm p-6 space-y-6">
              {getPageContent(page.key).length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No content items for this page yet. Add one below.
                </p>
              ) : (
                getPageContent(page.key).map((item) => (
                  <div key={item.id || item.content_key} className="border-b border-border pb-4 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                         <Input
                          value={item.content_key}
                          onChange={(e) => {
                            setContent((prev) =>
                              prev.map((c) =>
                                 (c.id === item.id || (!c.id && c.page === item.page && c.section === item.section && c.content_key === item.content_key))
                                   ? { ...c, content_key: e.target.value }
                                   : c
                              )
                            );
                          }}
                          className="w-48 text-xs h-8"
                          placeholder="Content key"
                        />
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                          {item.section}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteItem(item)}
                        className="text-destructive hover:text-destructive"
                      >
                        Remove
                      </Button>
                    </div>
                    {item.content_type === "text" && item.content_value && item.content_value.length > 100 ? (
                      <Textarea
                        value={item.content_value || ""}
                        onChange={(e) => updateContent(item, e.target.value)}
                        rows={4}
                      />
                    ) : (
                      <Input
                        value={item.content_value || ""}
                        onChange={(e) => updateContent(item, e.target.value)}
                      />
                    )}
                  </div>
                ))
              )}

              <Button variant="outline" onClick={addContentItem} className="w-full border-dashed">
                + Add Content Field
              </Button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </AdminLayout>
  );
};

export default AdminContent;
