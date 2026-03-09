import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { BarChart3, Eye, TrendingUp, Calendar } from "lucide-react";

interface ViewStat {
  page_path: string;
  count: number;
}

const AdminAnalytics = () => {
  const [totalViews, setTotalViews] = useState(0);
  const [todayViews, setTodayViews] = useState(0);
  const [topPages, setTopPages] = useState<ViewStat[]>([]);
  const [recentViews, setRecentViews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      // Total views
      const { count: total } = await supabase
        .from("page_views")
        .select("id", { count: "exact", head: true });
      setTotalViews(total || 0);

      // Today's views
      const today = new Date().toISOString().split("T")[0];
      const { count: todayCount } = await supabase
        .from("page_views")
        .select("id", { count: "exact", head: true })
        .gte("created_at", today);
      setTodayViews(todayCount || 0);

      // All views for top pages calculation
      const { data: allViews } = await supabase
        .from("page_views")
        .select("page_path");

      if (allViews) {
        const counts: Record<string, number> = {};
        allViews.forEach((v) => {
          counts[v.page_path] = (counts[v.page_path] || 0) + 1;
        });
        const sorted = Object.entries(counts)
          .map(([page_path, count]) => ({ page_path, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10);
        setTopPages(sorted);
      }

      // Recent views
      const { data: recent } = await supabase
        .from("page_views")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);
      setRecentViews(recent || []);

      setLoading(false);
    };
    fetch();
  }, []);

  if (loading) return <AdminLayout><p className="text-muted-foreground">Loading analytics...</p></AdminLayout>;

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-serif text-3xl mb-2">Analytics</h1>
        <p className="text-muted-foreground">Website traffic and page view statistics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card border border-border rounded-sm p-6">
          <Eye size={24} className="text-blue-500 mb-3" />
          <p className="text-3xl font-serif">{totalViews}</p>
          <p className="text-sm text-muted-foreground">Total Page Views</p>
        </div>
        <div className="bg-card border border-border rounded-sm p-6">
          <Calendar size={24} className="text-green-500 mb-3" />
          <p className="text-3xl font-serif">{todayViews}</p>
          <p className="text-sm text-muted-foreground">Today's Views</p>
        </div>
        <div className="bg-card border border-border rounded-sm p-6">
          <TrendingUp size={24} className="text-purple-500 mb-3" />
          <p className="text-3xl font-serif">{topPages.length}</p>
          <p className="text-sm text-muted-foreground">Active Pages</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-sm p-6">
          <h3 className="font-serif text-xl mb-4">Top Pages</h3>
          {topPages.length === 0 ? (
            <p className="text-muted-foreground text-sm">No data yet. Page views will appear once visitors start browsing.</p>
          ) : (
            <div className="space-y-3">
              {topPages.map((page, i) => (
                <div key={page.page_path} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-6">{i + 1}.</span>
                    <span className="text-sm">{page.page_path}</span>
                  </div>
                  <span className="text-sm font-medium">{page.count} views</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-card border border-border rounded-sm p-6">
          <h3 className="font-serif text-xl mb-4">Recent Activity</h3>
          {recentViews.length === 0 ? (
            <p className="text-muted-foreground text-sm">No activity recorded yet.</p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {recentViews.map((view) => (
                <div key={view.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <span className="text-sm truncate max-w-[200px]">{view.page_path}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(view.created_at).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalytics;
