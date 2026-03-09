import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAdmin, isEditor, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin && !isEditor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="font-serif text-3xl mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-4">You don't have permission to access the admin dashboard.</p>
          <a href="/" className="text-accent hover:underline">Back to website</a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute;
