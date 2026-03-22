import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Star, Eye, EyeOff, Search, Copy } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import ImageUpload from "@/components/admin/ImageUpload";
import ProjectGalleryUpload from "@/components/admin/ProjectGalleryUpload";
import { fallbackProjects } from "@/data/adminFallbacks";

interface Project {
  id: string;
  title: string;
  slug: string;
  domain: string;
  description: string | null;
  client: string | null;
  location: string | null;
  year: string | null;
  area: string | null;
  duration: string | null;
  style: string | null;
  cover_image: string | null;
  status: string;
  is_featured: boolean;
  featured_order: number | null;
  sort_order: number;
  tags: string[] | null;
  highlights: string[] | null;
  category_id: string | null;
  isFallback?: boolean;
}

const domains = ["Residential", "Commercial", "Hospitality", "Interior", "Landscape", "Urban Design", "Institutional", "Others"];

const AdminProjects = () => {
  const { isAdmin } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [galleryImages, setGalleryImages] = useState<{ id?: string; image_url: string; alt_text?: string | null; sort_order: number }[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    domain: "Commercial",
    description: "",
    client: "",
    location: "",
    year: "",
    area: "",
    duration: "",
    style: "",
    cover_image: "",
    status: "draft",
    is_featured: false,
    highlights: "",
    tags: "",
  });

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true });
    if (!error && data) {
      const bySlug = new Map<string, Project>();

      fallbackProjects.forEach((project) => {
        bySlug.set(project.slug, { ...project, isFallback: true });
      });

      data.forEach((project) => {
        bySlug.set(project.slug, project);
      });

      setProjects(Array.from(bySlug.values()).sort((a, b) => a.sort_order - b.sort_order));
    }
    setLoading(false);
  };

  useEffect(() => { fetchProjects(); }, []);

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const openCreate = () => {
    setEditingProject(null);
    setGalleryImages([]);
    setFormData({
      title: "", slug: "", domain: "Commercial", description: "", client: "",
      location: "", year: "", area: "", duration: "", style: "", cover_image: "",
      status: "draft", is_featured: false, highlights: "", tags: "",
    });
    setIsDialogOpen(true);
  };

  const openEdit = async (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      slug: project.slug,
      domain: project.domain,
      description: project.description || "",
      client: project.client || "",
      location: project.location || "",
      year: project.year || "",
      area: project.area || "",
      duration: project.duration || "",
      style: project.style || "",
      cover_image: project.cover_image || "",
      status: project.status,
      is_featured: project.is_featured,
      highlights: (project.highlights || []).join("\n"),
      tags: (project.tags || []).join(", "),
    });

    // Load existing gallery images
    if (!project.isFallback) {
      const { data } = await supabase
        .from("project_images")
        .select("*")
        .eq("project_id", project.id)
        .order("sort_order", { ascending: true });
      setGalleryImages(data || []);
    } else {
      setGalleryImages([]);
    }

    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    const slug = formData.slug || generateSlug(formData.title);
    const nextSortOrder = editingProject?.sort_order ?? (projects.reduce((max, project) => Math.max(max, project.sort_order), -1) + 1);
    const nextFeaturedOrder = formData.is_featured
      ? editingProject?.featured_order ?? (projects.reduce((max, project) => Math.max(max, project.featured_order ?? -1), -1) + 1)
      : null;
    const payload = {
      title: formData.title,
      slug,
      domain: formData.domain,
      description: formData.description || null,
      client: formData.client || null,
      location: formData.location || null,
      year: formData.year || null,
      area: formData.area || null,
      duration: formData.duration || null,
      style: formData.style || null,
      cover_image: formData.cover_image || null,
      status: formData.status,
      is_featured: formData.is_featured,
      featured_order: nextFeaturedOrder,
      sort_order: nextSortOrder,
      highlights: formData.highlights ? formData.highlights.split("\n").filter(Boolean) : null,
      tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()).filter(Boolean) : null,
    };

    let savedProjectId: string | null = null;

    if (editingProject && !editingProject.isFallback) {
      const { error } = await supabase.from("projects").update(payload).eq("id", editingProject.id);
      if (error) { toast.error("Failed to update project"); return; }
      savedProjectId = editingProject.id;
      toast.success("Project updated");
    } else {
      const { data, error } = await supabase.from("projects").insert(payload).select("id").single();
      if (error) { toast.error("Failed to create project: " + error.message); return; }
      savedProjectId = data.id;
      toast.success("Project created");
    }

    // Save gallery images
    if (savedProjectId && galleryImages.length > 0) {
      // Remove old gallery images for this project
      await supabase.from("project_images").delete().eq("project_id", savedProjectId);
      // Insert current gallery images
      const imagesToInsert = galleryImages.map((img, i) => ({
        project_id: savedProjectId!,
        image_url: img.image_url,
        alt_text: img.alt_text || null,
        sort_order: i,
      }));
      await supabase.from("project_images").insert(imagesToInsert);
    } else if (savedProjectId && galleryImages.length === 0) {
      await supabase.from("project_images").delete().eq("project_id", savedProjectId);
    }

    setIsDialogOpen(false);
    fetchProjects();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) { toast.error("Failed to delete"); return; }
    toast.success("Project deleted");
    fetchProjects();
  };

  const toggleFeatured = async (id: string, current: boolean) => {
    const project = projects.find((item) => item.id === id);
    if (!project) return;

    if (project.isFallback) {
      const { error } = await supabase.from("projects").insert({
        ...project,
        id: undefined,
        isFallback: undefined,
        is_featured: !current,
        featured_order: !current ? projects.reduce((max, item) => Math.max(max, item.featured_order ?? -1), -1) + 1 : null,
      });
      if (error) { toast.error("Failed to update featured state"); return; }
    } else {
      const { error } = await supabase.from("projects").update({ is_featured: !current, featured_order: !current ? projects.reduce((max, item) => Math.max(max, item.featured_order ?? -1), -1) + 1 : null }).eq("id", id);
      if (error) { toast.error("Failed to update featured state"); return; }
    }
    fetchProjects();
  };

  const toggleStatus = async (id: string, current: string) => {
    const newStatus = current === "published" ? "draft" : "published";
    const project = projects.find((item) => item.id === id);
    if (!project) return;

    if (project.isFallback) {
      const { error } = await supabase.from("projects").insert({
        ...project,
        id: undefined,
        isFallback: undefined,
        status: newStatus,
      });
      if (error) { toast.error(`Failed to set project ${newStatus}`); return; }
    } else {
      const { error } = await supabase.from("projects").update({ status: newStatus }).eq("id", id);
      if (error) { toast.error(`Failed to set project ${newStatus}`); return; }
    }
    toast.success(`Project ${newStatus}`);
    fetchProjects();
  };

  const duplicateProject = async (project: Project) => {
    const { id, isFallback, ...rest } = project;
    const newSlug = `${project.slug}-copy-${Date.now()}`;
    const { error } = await supabase.from("projects").insert({
      ...rest,
      title: `${project.title} (Copy)`,
      slug: newSlug,
      status: "draft",
      is_featured: false,
    });
    if (!error) { toast.success("Project duplicated"); fetchProjects(); }
  };

  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.domain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl mb-2">Projects</h1>
          <p className="text-muted-foreground">{projects.length} total projects</p>
        </div>
        <Button onClick={openCreate} className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Plus size={16} className="mr-2" /> Add Project
        </Button>
      </div>

      <div className="mb-6 relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : (
        <div className="bg-card border border-border rounded-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">Title</th>
                <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">Domain</th>
                <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">Featured</th>
                <th className="text-right px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((project) => (
                <tr key={project.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium">{project.title}</p>
                      <p className="text-xs text-muted-foreground">{project.location}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-1 bg-secondary rounded">{project.domain}</span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleStatus(project.id, project.status)}>
                      <span className={`text-xs px-2 py-1 rounded ${
                        project.status === "published"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                      }`}>
                        {project.status}
                      </span>
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleFeatured(project.id, project.is_featured)}>
                      <Star size={16} className={project.is_featured ? "text-amber-500 fill-amber-500" : "text-muted-foreground"} />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(project)} title="Edit">
                        <Pencil size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => duplicateProject(project)} title="Duplicate">
                        <Copy size={14} />
                      </Button>
                      {isAdmin && !project.isFallback && (
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id)} className="hover:text-destructive" title="Delete">
                          <Trash2 size={14} />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No projects found.</p>
          )}
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">
              {editingProject ? "Edit Project" : "New Project"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Title *</label>
                <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: generateSlug(e.target.value) })} />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Slug</label>
                <Input value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Domain *</label>
                <Select value={formData.domain} onValueChange={(v) => setFormData({ ...formData, domain: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {domains.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Status</label>
                <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Description</label>
              <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={4} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Client</label>
                <Input value={formData.client} onChange={(e) => setFormData({ ...formData, client: e.target.value })} />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Location</label>
                <Input value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Year</label>
                <Input value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Area</label>
                <Input value={formData.area} onChange={(e) => setFormData({ ...formData, area: e.target.value })} />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Duration</label>
                <Input value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Style</label>
                <Input value={formData.style} onChange={(e) => setFormData({ ...formData, style: e.target.value })} />
              </div>
            </div>
            <ImageUpload
              value={formData.cover_image}
              onChange={(url) => setFormData({ ...formData, cover_image: url })}
            />
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Highlights (one per line)</label>
              <Textarea value={formData.highlights} onChange={(e) => setFormData({ ...formData, highlights: e.target.value })} rows={3} />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Tags (comma-separated)</label>
              <Input value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                className="rounded"
              />
              <label className="text-sm">Featured project (show on homepage)</label>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} className="bg-accent text-accent-foreground">
                {editingProject ? "Update Project" : "Create Project"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminProjects;
