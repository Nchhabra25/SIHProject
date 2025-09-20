# Admin Dashboard - EcoQuest

## Overview
The Admin Dashboard is a comprehensive administrative interface for the EcoQuest platform that can only be accessed by a hardcoded email address for security purposes.

## Access Control
- **Hardcoded Admin Email**: `admin@ecoquest.com`
- Only users with this exact email address can access the admin dashboard
- The email validation is implemented at multiple levels for security

## Features

### 1. Dashboard Overview
- Real-time system statistics
- User activity monitoring
- System health indicators
- Recent activities feed
- Pending user approvals

### 2. User Management
- View all registered users
- Search and filter users
- User role management (Student, Teacher, Ambassador, Admin)
- User status management (Active, Pending, Suspended)
- Approve/reject pending users
- View user eco-points and activity

### 3. Challenge Management
- Create and manage environmental challenges
- Monitor challenge participation
- Track completion rates
- Export challenge data
- Set challenge deadlines

### 4. Activity Monitoring
- Real-time system activities
- User action tracking
- System event logging
- Activity filtering and search

## Access Methods

### Method 1: Direct URL Access
Navigate to `/admin/login` and use the hardcoded credentials:
- Email: `admin@ecoquest.com`
- Password: [Any password for demo purposes]

### Method 2: Navigation from Dashboard
If logged in with the admin email, you'll see an "Admin Dashboard" button in the main dashboard.

### Method 3: Navbar Link
Non-authenticated users can access the admin login via the "Admin Login" button in the navbar.

## Security Features

1. **Hardcoded Email Validation**: Only `admin@ecoquest.com` can access the dashboard
2. **Protected Routes**: Admin routes are protected with `adminOnly` flag
3. **Access Denied Page**: Unauthorized users see a proper access denied message
4. **JWT Token Validation**: Standard authentication still required

## File Structure

```
frontend/src/
├── pages/
│   ├── AdminDashboard.tsx    # Main admin dashboard component
│   └── AdminLogin.tsx        # Admin login page
├── components/
│   └── ProtectedRoute.tsx    # Updated with admin-only access
└── App.tsx                   # Updated with admin routes
```

## Routes

- `/admin/login` - Admin login page
- `/admin/dashboard` - Main admin dashboard (protected)
- `/admin/users` - User management (existing, role-based)

## Demo Data

The admin dashboard includes mock data for demonstration:
- Sample users with different roles and statuses
- Mock system statistics
- Sample challenges and activities
- Realistic user interactions

## Customization

To change the admin email:
1. Update `ADMIN_EMAIL` constant in `AdminDashboard.tsx`
2. Update `ADMIN_EMAIL` constant in `ProtectedRoute.tsx`
3. Update `ADMIN_EMAIL` constant in `AdminLogin.tsx`
4. Update the email check in `Dashboard.tsx`

## Testing

1. Start the application
2. Navigate to `/admin/login`
3. Use email: `admin@ecoquest.com`
4. Use any password (for demo purposes)
5. Access the full admin dashboard

## Security Notes

- This implementation uses hardcoded email validation for demonstration
- In production, consider using more robust authentication methods
- The admin email should be stored securely and not exposed in client-side code
- Consider implementing additional security measures like 2FA for admin access
