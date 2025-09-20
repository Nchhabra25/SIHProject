# Role-Based Dashboard System - EcoQuest

## Overview
The EcoQuest platform now features role-specific dashboards that provide tailored experiences for different user types. After login/signup, users are automatically redirected to their appropriate dashboard based on their role.

## User Roles and Dashboards

### 1. Student Dashboard (`/student-dashboard`)
**Access**: Users with `STUDENT` role
**Features**:
- Personalized learning progress tracking
- Quick access to lessons, quizzes, and challenges
- Class leaderboard and achievements
- Eco-points and badge system
- Learning statistics and progress analytics
- Tabbed interface: Overview, Lessons, Challenges, Progress

### 2. Teacher Portal (`/teacher-portal`)
**Access**: Users with `TEACHER` role
**Features**:
- Student management and progress monitoring
- Lesson creation and management
- Challenge oversight and analytics
- Assignment tracking and grading
- Class statistics and performance metrics
- Student information access (but not ambassador pages)
- Tabbed interface: Overview, Students, Lessons, Challenges, Assignments

### 3. Ambassador Dashboard (`/ambassador-dashboard`)
**Access**: Users with `AMBASSADOR` role
**Features**:
- Campaign management and creation
- Community leadership tools
- Mission tracking and completion
- Event organization and management
- Impact measurement and analytics
- Ambassador leaderboard
- Tabbed interface: Overview, Campaigns, Communities, Missions, Events

### 4. Admin Dashboard (`/admin/dashboard`)
**Access**: Hardcoded email `admin@ecoquest.com`
**Features**:
- System-wide user management
- Platform analytics and monitoring
- Challenge and content oversight
- System health monitoring
- Advanced administrative controls

### 5. Regular Admin (`/admin/users`)
**Access**: Users with `ADMIN` role (excluding hardcoded admin email)
**Features**:
- Basic user management
- User creation and approval
- Limited administrative functions

## Authentication Flow

### Signup Process
1. User selects role (Student, Teacher, Ambassador)
2. Fills out registration form
3. Upon successful signup, user is automatically redirected to their role-specific dashboard

### Login Process
1. User enters credentials
2. System validates credentials and extracts user role from JWT token
3. User is automatically redirected to their appropriate dashboard based on role

## Technical Implementation

### Files Created/Modified

#### New Components
- `frontend/src/pages/StudentDashboard.tsx` - Student-specific dashboard
- `frontend/src/pages/TeacherPortal.tsx` - Teacher management portal
- `frontend/src/pages/AmbassadorDashboard.tsx` - Ambassador leadership hub
- `frontend/src/utils/roleRedirect.ts` - Role-based routing utilities

#### Modified Files
- `frontend/src/pages/Auth.tsx` - Updated to use role-based redirects
- `frontend/src/App.tsx` - Added new routes for role-specific dashboards
- `frontend/src/components/ProtectedRoute.tsx` - Enhanced with admin-only access

### Key Functions

#### `getRoleBasedDashboard(user)`
Returns the appropriate dashboard route based on user role:
- `STUDENT` → `/student-dashboard`
- `TEACHER` → `/teacher-portal`
- `AMBASSADOR` → `/ambassador-dashboard`
- `ADMIN` (hardcoded email) → `/admin/dashboard`
- `ADMIN` (regular) → `/admin/users`

#### `hasDashboardAccess(user, requiredRole)`
Checks if a user has access to a specific role-based dashboard.

#### `getRoleBasedNavigation(user)`
Returns navigation items appropriate for the user's role.

## Route Protection

All role-specific dashboards are protected using the `ProtectedRoute` component with appropriate role restrictions:

```tsx
<Route path="/student-dashboard" element={<ProtectedRoute roles={["STUDENT"]}><StudentDashboard /></ProtectedRoute>} />
<Route path="/teacher-portal" element={<ProtectedRoute roles={["TEACHER"]}><TeacherPortal /></ProtectedRoute>} />
<Route path="/ambassador-dashboard" element={<ProtectedRoute roles={["AMBASSADOR"]}><AmbassadorDashboard /></ProtectedRoute>} />
```

## Features by Role

### Student Features
- ✅ Learning progress tracking
- ✅ Interactive lessons and quizzes
- ✅ Challenge participation
- ✅ Achievement and badge system
- ✅ Class leaderboard
- ✅ Personal statistics

### Teacher Features
- ✅ Student management and monitoring
- ✅ Lesson creation and management
- ✅ Challenge oversight
- ✅ Assignment tracking
- ✅ Class analytics
- ✅ Student information access
- ❌ Ambassador page access (restricted)

### Ambassador Features
- ✅ Campaign management
- ✅ Community leadership
- ✅ Mission tracking
- ✅ Event organization
- ✅ Impact measurement
- ✅ Ambassador leaderboard

### Admin Features
- ✅ System-wide user management
- ✅ Platform analytics
- ✅ Content oversight
- ✅ System monitoring
- ✅ Advanced controls

## Security Considerations

1. **Role-based Access Control**: Each dashboard is protected by role-specific routes
2. **JWT Token Validation**: User roles are extracted from JWT tokens
3. **Hardcoded Admin Access**: Special admin dashboard requires specific email
4. **Protected Routes**: All dashboards use the ProtectedRoute component

## Testing the System

### Test User Creation
1. Navigate to `/auth`
2. Select appropriate role (Student, Teacher, Ambassador)
3. Fill out registration form
4. Verify redirect to correct dashboard

### Test Login Flow
1. Navigate to `/auth`
2. Use existing credentials
3. Verify redirect to role-appropriate dashboard

### Test Admin Access
1. Navigate to `/admin/login`
2. Use email: `admin@ecoquest.com`
3. Use any password (for demo)
4. Verify redirect to admin dashboard

## Customization

### Adding New Roles
1. Create new dashboard component
2. Add role to `getRoleBasedDashboard()` function
3. Add route to `App.tsx` with appropriate protection
4. Update navigation in `getRoleBasedNavigation()`

### Modifying Dashboard Features
Each dashboard component can be customized independently:
- Add new tabs or sections
- Modify data sources
- Update UI components
- Add new functionality

## Future Enhancements

- Real-time data integration
- Advanced analytics and reporting
- Mobile-responsive optimizations
- Role-based feature toggles
- Customizable dashboard layouts
- Integration with external systems

## Troubleshooting

### Common Issues
1. **Wrong Dashboard Redirect**: Check JWT token payload and role extraction
2. **Access Denied**: Verify user role and route protection
3. **Missing Features**: Ensure proper role assignment and component rendering

### Debug Steps
1. Check browser console for errors
2. Verify JWT token content
3. Check user role in authentication context
4. Validate route protection logic
