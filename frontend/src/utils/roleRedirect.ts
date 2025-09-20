import { AuthUser } from "@/lib/auth";

/**
 * Get the appropriate dashboard route based on user role
 * @param user - The authenticated user object
 * @returns The dashboard route path for the user's role
 */
export function getRoleBasedDashboard(user: AuthUser | null): string {
  if (!user) {
    return "/auth";
  }

  switch (user.role.toUpperCase()) {
    case "STUDENT":
      return "/student-dashboard";
    case "TEACHER":
      return "/teacher-portal";
    case "AMBASSADOR":
      return "/ambassador-dashboard";
    case "ADMIN":
      // Special case: if admin email is the hardcoded admin email, redirect to admin dashboard
      if (user.email === "admin@ecoquest.com") {
        return "/admin/dashboard";
      }
      // Regular admin users go to the existing admin users page
      return "/admin/users";
    default:
      // Fallback to the general dashboard for unknown roles
      return "/dashboard";
  }
}

/**
 * Check if a user has access to a specific role-based dashboard
 * @param user - The authenticated user object
 * @param requiredRole - The role required to access the dashboard
 * @returns True if user has access, false otherwise
 */
export function hasDashboardAccess(user: AuthUser | null, requiredRole: string): boolean {
  if (!user) {
    return false;
  }

  // Special case for admin dashboard access
  if (requiredRole === "ADMIN_DASHBOARD") {
    return user.email === "admin@ecoquest.com";
  }

  return user.role.toUpperCase() === requiredRole.toUpperCase();
}

/**
 * Get the display name for a role
 * @param role - The role string
 * @returns A human-readable role name
 */
export function getRoleDisplayName(role: string): string {
  switch (role.toUpperCase()) {
    case "STUDENT":
      return "Student";
    case "TEACHER":
      return "Teacher";
    case "AMBASSADOR":
      return "Ambassador";
    case "ADMIN":
      return "Administrator";
    default:
      return "User";
  }
}

/**
 * Get the appropriate navigation items based on user role
 * @param user - The authenticated user object
 * @returns Array of navigation items for the user's role
 */
export function getRoleBasedNavigation(user: AuthUser | null) {
  if (!user) {
    return [];
  }

  const baseNavigation = [
    { label: "Dashboard", path: getRoleBasedDashboard(user) },
    { label: "Profile", path: "/profile" },
  ];

  switch (user.role.toUpperCase()) {
    case "STUDENT":
      return [
        ...baseNavigation,
        { label: "Lessons", path: "/lessons" },
        { label: "Challenges", path: "/challenges" },
        { label: "Leaderboard", path: "/student-journey/compete" },
      ];
    case "TEACHER":
      return [
        ...baseNavigation,
        { label: "Students", path: "/teacher-portal?tab=students" },
        { label: "Lessons", path: "/teacher-portal?tab=lessons" },
        { label: "Analytics", path: "/teacher-portal?tab=overview" },
      ];
    case "AMBASSADOR":
      return [
        ...baseNavigation,
        { label: "Campaigns", path: "/ambassador-dashboard?tab=campaigns" },
        { label: "Communities", path: "/ambassador-dashboard?tab=communities" },
        { label: "Events", path: "/ambassador-dashboard?tab=events" },
      ];
    case "ADMIN":
      const adminNav = [
        ...baseNavigation,
        { label: "User Management", path: "/admin/users" },
      ];
      
      // Add admin dashboard link for hardcoded admin email
      if (user.email === "admin@ecoquest.com") {
        adminNav.push({ label: "Admin Dashboard", path: "/admin/dashboard" });
      }
      
      return adminNav;
    default:
      return baseNavigation;
  }
}
