import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { FolderKanban, Image, Eye, Users } from "lucide-react";
import { fallbackProjects } from "@/data/adminFallbacks";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    media: 0,
    pageViews: 0,
    published: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [projectsRes, mediaRes, viewsRes] = await Promise.all([
        supabase.from("projects").select("slug,status"),
        supabase.from("media").select("id", { count: "exact", head: true }),
        supabase.from("page_views").select("id", { count: "exact", head: true }),
      ]);

      const mergedProjects = new Map(fallbackProjects.map((project) => [project.slug, project]));
      (projectsRes.data || []).forEach((project) => {
        mergedProjects.set(project.slug, { ...mergedProjects.get(project.slug), ...project });
      });

      const mergedList = Array.from(mergedProjects.values());
      setStats({
        projects: mergedList.length,
        media: mediaRes.count || 0,
        pageViews: viewsRes.count || 0,
        published: mergedList.filter((project) => project.status === "published").length,
      });
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Total Projects", value: stats.projects, icon: FolderKanban, color: "text-blue-500" },
    { label: "Published", value: stats.published, icon: Eye, color: "text-green-500" },
    { label: "Media Files", value: stats.media, icon: Image, color: "text-purple-500" },
    { label: "Page Views", value: stats.pageViews, icon: Users, color: "text-amber-500" },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-serif text-3xl mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the AIW Content Management System.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card) => (
          <div key={card.label} className="bg-card border border-border rounded-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <card.icon size={24} className={card.color} />
            </div>
            <p className="text-3xl font-serif mb-1">{card.value}</p>
            <p className="text-sm text-muted-foreground">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-sm p-6">
          <h3 className="font-serif text-xl mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <a href="/admin/projects" className="block px-4 py-3 bg-secondary hover:bg-muted transition-colors rounded-sm text-sm">
              + Add New Project
            </a>
            <a href="/admin/content" className="block px-4 py-3 bg-secondary hover:bg-muted transition-colors rounded-sm text-sm">
              Edit Website Content
            </a>
            <a href="/admin/media" className="block px-4 py-3 bg-secondary hover:bg-muted transition-colors rounded-sm text-sm">
              Upload Media
            </a>
            <a href="/admin/seo" className="block px-4 py-3 bg-secondary hover:bg-muted transition-colors rounded-sm text-sm">
              Manage SEO Settings
            </a>
          </div>
        </div>

        <div className="bg-card border border-border rounded-sm p-6">
          <h3 className="font-serif text-xl mb-4">System Info</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Platform</span>
              <span>React + Supabase</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Storage</span>
              <span>Cloud Media Bucket</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Auth</span>
              <span>Role-based (Admin/Editor)</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Status</span>
              <span className="text-green-500">● Online</span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
