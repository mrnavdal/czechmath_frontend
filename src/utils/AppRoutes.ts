export const AppRoutes = {
  // Auth related routes
  LOGIN: '/api/auth/login',
  LOGIN_ERROR: '/api/auth/error',
  LOGIN_WITH_LOGOUT: '/api/auth/login?logout=true',
  LOGIN_NO_DASHBOARD: '/api/auth/login?error=no_dashboard',
  DASHBOARD: '/dashboard',
  ADMIN_DASHBOARD: '/admin/dashboard',
  REDIRECT: '/redirect',
};
