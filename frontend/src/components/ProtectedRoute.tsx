import { Navigate, useLocation } from "react-router-dom";
import { hasRole, useAuth } from "@/lib/auth";
import { isUserApproved } from "@/utils/approvals";

// Hardcoded admin email - only this email can access admin routes
const ADMIN_EMAIL = "admin@ecoquest.local";

export default function ProtectedRoute({ children, roles, adminOnly }: { 
  children: JSX.Element; 
  roles?: string[]; 
  adminOnly?: boolean;
}) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Block unapproved TEACHER/AMBASSADOR from accessing protected routes
  if ((user.role === 'TEACHER' || user.role === 'AMBASSADOR') && !isUserApproved(user.email)) {
    return <Navigate to="/auth" state={{ error: 'pending_approval', from: location }} replace />;
  }

  // Check for admin-only access with hardcoded email
  if (adminOnly && user.email !== ADMIN_EMAIL) {
    return <Navigate to="/" replace />;
  }

  if (roles && roles.length > 0 && !hasRole(user, roles)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
