import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  LayoutDashboard,
  FileText,
  FolderKanban,
  Tags,
  Image,
  Search,
  BarChart3,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Content Manager", path: "/admin/content", icon: FileText },
  { name: "Projects", path: "/admin/projects", icon: FolderKanban },
  { name: "Categories", path: "/admin/categories", icon: Tags },
  { name: "Media Library", path: "/admin/media", icon: Image },
  { name: "SEO Settings", path: "/admin/seo", icon: Search },
  { name: "Analytics", path: "/admin/analytics", icon: BarChart3 },
  { name: "Users", path: "/admin/users", icon: Users },
  { name: "Settings", path: "/admin/settings", icon: Settings },
];

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex bg-sidebar">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col fixed inset-y-0 left-0 z-40">
        <div className="p-6 border-b border-sidebar-border">
          <Link to="/admin" className="flex items-center gap-3">
            <span className="font-serif text-2xl text-sidebar-foreground">AIW</span>
            <span className="text-[0.55rem] uppercase tracking-[0.2em] text-sidebar-foreground/50">CMS</span>
          </Link>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-6 py-3 text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-primary border-r-2 border-sidebar-primary"
                    : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                <item.icon size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border space-y-2">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 text-sm text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors"
          >
            <ChevronLeft size={16} />
            <span>Back to Website</span>
          </Link>
          <div className="flex items-center justify-between px-4 py-2">
            <div className="min-w-0">
              <p className="text-xs text-sidebar-foreground/80 truncate">{user?.email}</p>
              <p className="text-[0.6rem] text-sidebar-primary uppercase tracking-wider">
                {isAdmin ? "Admin" : "Editor"}
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="text-sidebar-foreground/40 hover:text-red-400 transition-colors p-1"
              title="Sign out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 bg-background min-h-screen">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
