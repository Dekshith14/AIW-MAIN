import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { usePageTracking } from "@/hooks/usePageTracking";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Contact from "./pages/Contact";
import RequestQuote from "./pages/RequestQuote";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminContent from "./pages/admin/AdminContent";
import AdminMedia from "./pages/admin/AdminMedia";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminSEO from "./pages/admin/AdminSEO";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSettings from "./pages/admin/AdminSettings";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";

const queryClient = new QueryClient();

const AppRoutes = () => {
  usePageTracking();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:slug" element={<ProjectDetail />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/request-quote" element={<RequestQuote />} />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
      <Route path="/admin/projects" element={<ProtectedAdminRoute><AdminProjects /></ProtectedAdminRoute>} />
      <Route path="/admin/content" element={<ProtectedAdminRoute><AdminContent /></ProtectedAdminRoute>} />
      <Route path="/admin/media" element={<ProtectedAdminRoute><AdminMedia /></ProtectedAdminRoute>} />
      <Route path="/admin/categories" element={<ProtectedAdminRoute><AdminCategories /></ProtectedAdminRoute>} />
      <Route path="/admin/seo" element={<ProtectedAdminRoute><AdminSEO /></ProtectedAdminRoute>} />
      <Route path="/admin/analytics" element={<ProtectedAdminRoute><AdminAnalytics /></ProtectedAdminRoute>} />
      <Route path="/admin/users" element={<ProtectedAdminRoute><AdminUsers /></ProtectedAdminRoute>} />
      <Route path="/admin/settings" element={<ProtectedAdminRoute><AdminSettings /></ProtectedAdminRoute>} />

      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
