import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  parent_id: string | null;
  sort_order: number;
}

const AdminCategories = () => {
  const { isAdmin } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState({ name: "", slug: "", description: "" });

  const fetchCategories = async () => {
    const { data } = await supabase.from("categories").select("*").order("sort_order");
    if (data) setCategories(data);
    setLoading(false);
  };

  useEffect(() => { fetchCategories(); }, []);

  const generateSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const openCreate = () => {
    setEditing(null);
    setForm({ name: "", slug: "", description: "" });
    setIsDialogOpen(true);
  };

  const openEdit = (cat: Category) => {
    setEditing(cat);
    setForm({ name: cat.name, slug: cat.slug, description: cat.description || "" });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    const slug = form.slug || generateSlug(form.name);
    const payload = { name: form.name, slug, description: form.description || null };

    if (editing) {
      const { error } = await supabase.from("categories").update(payload).eq("id", editing.id);
      if (error) { toast.error("Failed to update"); return; }
      toast.success("Category updated");
    } else {
      const { error } = await supabase.from("categories").insert({ ...payload, sort_order: categories.length });
      if (error) { toast.error("Failed to create: " + error.message); return; }
      toast.success("Category created");
    }
    setIsDialogOpen(false);
    fetchCategories();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) { toast.error("Failed to delete"); return; }
    toast.success("Category deleted");
    fetchCategories();
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl mb-2">Categories</h1>
          <p className="text-muted-foreground">Manage project categories and domains.</p>
        </div>
        <Button onClick={openCreate} className="bg-accent text-accent-foreground">
          <Plus size={16} className="mr-2" /> Add Category
        </Button>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : (
        <div className="bg-card border border-border rounded-sm divide-y divide-border">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center justify-between px-6 py-4 hover:bg-muted/20 transition-colors">
              <div>
                <p className="font-medium">{cat.name}</p>
                <p className="text-xs text-muted-foreground">{cat.slug} {cat.description && `· ${cat.description}`}</p>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" onClick={() => openEdit(cat)}>
                  <Pencil size={14} />
                </Button>
                {isAdmin && (
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(cat.id)} className="hover:text-destructive">
                    <Trash2 size={14} />
                  </Button>
                )}
              </div>
            </div>
          ))}
          {categories.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No categories yet.</p>
          )}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">{editing ? "Edit Category" : "New Category"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Name *</label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: generateSlug(e.target.value) })} />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Slug</label>
              <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Description</label>
              <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} className="bg-accent text-accent-foreground">Save</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminCategories;
