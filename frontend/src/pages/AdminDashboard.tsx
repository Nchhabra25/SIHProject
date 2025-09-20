import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Users, 
  Settings, 
  BarChart3, 
  Shield, 
  Activity, 
  UserCheck, 
  UserX, 
  TrendingUp,
  Award,
  Calendar,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  RefreshCw
} from "lucide-react";
import { EcoCard, EcoCardContent, EcoCardHeader, EcoCardTitle } from "@/components/ui/eco-card";
import { EcoButton } from "@/components/ui/eco-button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth";
import { api } from "@/lib/api";

// Hardcoded admin email - only this email can access the admin dashboard
const ADMIN_EMAIL = "admin@ecoquest.local";

// Mock data for demonstration
const mockStats = {
  totalUsers: 1247,
  activeUsers: 892,
  newUsersToday: 23,
  totalEcoPoints: 45678,
  completedChallenges: 234,
  pendingApprovals: 12,
  systemHealth: 98,
  avgSessionTime: "24m 32s"
};

const mockUsers = [
  { id: 1, name: "Sarah Chen", email: "sarah.chen@school.edu", role: "STUDENT", status: "active", joinDate: "2024-01-15", ecoPoints: 3450, lastActive: "2 hours ago" },
  { id: 2, name: "Dr. Michael Rodriguez", email: "m.rodriguez@university.edu", role: "TEACHER", status: "active", joinDate: "2024-01-10", ecoPoints: 1200, lastActive: "1 hour ago" },
  { id: 3, name: "Emma Wilson", email: "emma.wilson@school.edu", role: "STUDENT", status: "pending", joinDate: "2024-01-20", ecoPoints: 0, lastActive: "Never" },
  { id: 4, name: "Alex Kumar", email: "alex.kumar@school.edu", role: "AMBASSADOR", status: "active", joinDate: "2024-01-12", ecoPoints: 2890, lastActive: "30 minutes ago" },
  { id: 5, name: "Lisa Park", email: "lisa.park@school.edu", role: "STUDENT", status: "suspended", joinDate: "2024-01-08", ecoPoints: 1560, lastActive: "1 day ago" },
];

const mockActivities = [
  { id: 1, user: "Sarah Chen", action: "Completed Climate Basics Quiz", timestamp: "2 minutes ago", type: "quiz" },
  { id: 2, user: "Dr. Michael Rodriguez", action: "Created new lesson module", timestamp: "15 minutes ago", type: "content" },
  { id: 3, user: "Alex Kumar", action: "Approved 5 student submissions", timestamp: "1 hour ago", type: "moderation" },
  { id: 4, user: "Emma Wilson", action: "Registered for new account", timestamp: "2 hours ago", type: "registration" },
  { id: 5, user: "System", action: "Daily backup completed successfully", timestamp: "3 hours ago", type: "system" },
];

const mockChallenges = [
  { id: 1, title: "Plant 10 Trees Challenge", participants: 234, completion: 78, status: "active", endDate: "2024-02-15" },
  { id: 2, title: "Zero Waste Week", participants: 189, completion: 45, status: "active", endDate: "2024-02-10" },
  { id: 3, title: "Energy Conservation Month", participants: 156, completion: 92, status: "completed", endDate: "2024-01-31" },
];

export default function AdminDashboard() {
  const { user, signout } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("overview");
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const [pending, setPending] = useState<any[]>([]);
  const [loadingPending, setLoadingPending] = useState(false);

  // Check if user is authorized admin
  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <EcoCard className="max-w-md">
          <EcoCardContent className="p-8 text-center">
            <Shield className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
            <p className="text-muted-foreground mb-4">
              You don't have permission to access the admin dashboard.
            </p>
            <Link to="/dashboard">
              <EcoButton>Return to Dashboard</EcoButton>
            </Link>
          </EcoCardContent>
        </EcoCard>
      </div>
    );
  }

  useEffect(() => {
    const filtered = mockUsers.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm]);

  const refreshPending = async () => {
    try {
      setLoadingPending(true);
      // @ts-ignore useAuth provides token via context
      const token = (localStorage.getItem("ecoquest_auth_token") as string) || "";
      const list = await api.listPending(token);
      setPending(list);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingPending(false);
    }
  };

  useEffect(() => {
    if (selectedTab === 'pending') {
      refreshPending();
    }
  }, [selectedTab]);

  const handleApprove = async (id: number) => {
    try {
      const token = (localStorage.getItem("ecoquest_auth_token") as string) || "";
      await api.approveUser(token, id);
      await refreshPending();
    } catch (e) {
      console.error(e);
    }
  };

  const handleReject = async (id: number) => {
    try {
      const token = (localStorage.getItem("ecoquest_auth_token") as string) || "";
      await api.rejectUser(token, id);
      await refreshPending();
    } catch (e) {
      console.error(e);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      pending: "secondary", 
      suspended: "destructive"
    } as const;
    
    const colors = {
      active: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      suspended: "bg-red-100 text-red-800"
    };

    return (
      <Badge variant={variants[status as keyof typeof variants]} className={colors[status as keyof typeof colors]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getActivityIcon = (type: string) => {
    const icons = {
      quiz: <Award className="w-4 h-4 text-blue-500" />,
      content: <FileText className="w-4 h-4 text-green-500" />,
      moderation: <UserCheck className="w-4 h-4 text-purple-500" />,
      registration: <UserX className="w-4 h-4 text-orange-500" />,
      system: <Settings className="w-4 h-4 text-gray-500" />
    };
    return icons[type as keyof typeof icons] || <Activity className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold">EcoQuest Admin</span>
              <p className="text-xs text-muted-foreground">System Administration</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-red-500 text-white text-xs">
                  {user.email.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium">{user.email}</p>
                <p className="text-xs text-muted-foreground">Super Admin</p>
              </div>
            </div>
            <EcoButton
              size="sm"
              variant="outline"
              onClick={() => { signout(); }}
            >
              Logout
            </EcoButton>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage users, monitor system health, and oversee platform activities.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <EcoCard>
            <EcoCardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{mockStats.totalUsers.toLocaleString()}</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
              <div className="mt-2">
                <span className="text-sm text-green-600">+{mockStats.newUsersToday} today</span>
              </div>
            </EcoCardContent>
          </EcoCard>

          <EcoCard>
            <EcoCardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-bold">{mockStats.activeUsers.toLocaleString()}</p>
                </div>
                <Activity className="w-8 h-8 text-green-500" />
              </div>
              <div className="mt-2">
                <Progress value={Math.round((mockStats.activeUsers / mockStats.totalUsers) * 100)} className="h-2" />
              </div>
            </EcoCardContent>
          </EcoCard>

          <EcoCard>
            <EcoCardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Eco Points</p>
                  <p className="text-2xl font-bold">{mockStats.totalEcoPoints.toLocaleString()}</p>
                </div>
                <Award className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="mt-2">
                <span className="text-sm text-green-600">+12% this month</span>
              </div>
            </EcoCardContent>
          </EcoCard>

          <EcoCard>
            <EcoCardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">System Health</p>
                  <p className="text-2xl font-bold">{mockStats.systemHealth}%</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <div className="mt-2">
                <Progress value={mockStats.systemHealth} className="h-2" />
              </div>
            </EcoCardContent>
          </EcoCard>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="pending">Pending Requests</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Activities */}
              <EcoCard>
                <EcoCardHeader>
                  <EcoCardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5" />
                    <span>Recent Activities</span>
                  </EcoCardTitle>
                </EcoCardHeader>
                <EcoCardContent>
                  <div className="space-y-4">
                    {mockActivities.slice(0, 5).map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-3">
                        {getActivityIcon(activity.type)}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.user}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </EcoCardContent>
              </EcoCard>

              {/* Pending Approvals */}
              <EcoCard>
                <EcoCardHeader>
                  <EcoCardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>Pending Approvals</span>
                  </EcoCardTitle>
                </EcoCardHeader>
                <EcoCardContent>
                  <div className="space-y-3">
                    {mockUsers.filter(u => u.status === 'pending').map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="text-xs">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <EcoButton size="sm" variant="outline">
                            <UserCheck className="w-4 h-4" />
                          </EcoButton>
                          <EcoButton size="sm" variant="destructive">
                            <UserX className="w-4 h-4" />
                          </EcoButton>
                        </div>
                      </div>
                    ))}
                  </div>
                </EcoCardContent>
              </EcoCard>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <EcoCard>
              <EcoCardHeader>
                <div className="flex items-center justify-between">
                  <EcoCardTitle>User Management</EcoCardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <EcoButton size="sm" variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </EcoButton>
                    <EcoButton size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add User
                    </EcoButton>
                  </div>
                </div>
              </EcoCardHeader>
              <EcoCardContent>
                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback>
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline">{user.role}</Badge>
                            {getStatusBadge(user.status)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{user.ecoPoints.toLocaleString()} pts</p>
                          <p className="text-xs text-muted-foreground">Last active: {user.lastActive}</p>
                        </div>
                        <div className="flex space-x-1">
                          <EcoButton size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </EcoButton>
                          <EcoButton size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </EcoButton>
                          <EcoButton size="sm" variant="destructive">
                            <Trash2 className="w-4 h-4" />
                          </EcoButton>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </EcoCardContent>
            </EcoCard>
          </TabsContent>

          {/* Challenges Tab */}
          <TabsContent value="challenges" className="space-y-6">
            <EcoCard>
              <EcoCardHeader>
                <div className="flex items-center justify-between">
                  <EcoCardTitle>Challenge Management</EcoCardTitle>
                  <EcoButton>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Challenge
                  </EcoButton>
                </div>
              </EcoCardHeader>
              <EcoCardContent>
                <div className="space-y-4">
                  {mockChallenges.map((challenge) => (
                    <div key={challenge.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium">{challenge.title}</h3>
                        <Badge variant={challenge.status === 'active' ? 'default' : 'secondary'}>
                          {challenge.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Participants</p>
                          <p className="font-medium">{challenge.participants}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Completion Rate</p>
                          <p className="font-medium">{challenge.completion}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">End Date</p>
                          <p className="font-medium">{challenge.endDate}</p>
                        </div>
                      </div>
                      <Progress value={challenge.completion} className="h-2 mb-3" />
                      <div className="flex space-x-2">
                        <EcoButton size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </EcoButton>
                        <EcoButton size="sm" variant="outline">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </EcoButton>
                        <EcoButton size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </EcoButton>
                      </div>
                    </div>
                  ))}
                </div>
              </EcoCardContent>
            </EcoCard>
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities" className="space-y-6">
            <EcoCard>
              <EcoCardHeader>
                <div className="flex items-center justify-between">
                  <EcoCardTitle>System Activities</EcoCardTitle>
                  <EcoButton size="sm" variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </EcoButton>
                </div>
              </EcoCardHeader>
              <EcoCardContent>
                <div className="space-y-4">
                  {mockActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                      {getActivityIcon(activity.type)}
                      <div className="flex-1">
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">by {activity.user}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">{activity.timestamp}</span>
                    </div>
                  ))}
                </div>
              </EcoCardContent>
            </EcoCard>
          </TabsContent>

          {/* Pending Requests Tab */}
          <TabsContent value="pending" className="space-y-6">
            <EcoCard>
              <EcoCardHeader>
                <div className="flex items-center justify-between">
                  <EcoCardTitle>Pending Approvals</EcoCardTitle>
                  <Badge variant="secondary">{pending.length} pending</Badge>
                </div>
              </EcoCardHeader>
              <EcoCardContent>
                {loadingPending ? (
                  <div className="text-center text-muted-foreground py-8">Loading...</div>
                ) : pending.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">No pending approval requests.</div>
                ) : (
                  <div className="space-y-3">
                    {pending.map((p) => (
                      <div key={p.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback>{(p.firstName?.[0] || p.email?.[0] || 'U').toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{p.firstName} {p.lastName} <span className="text-muted-foreground">({p.email})</span></p>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Badge variant="outline">{p.role}</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <EcoButton size="sm" variant="outline" onClick={() => handleApprove(p.id)}>
                            <UserCheck className="w-4 h-4 mr-1" /> Approve
                          </EcoButton>
                          <EcoButton size="sm" variant="destructive" onClick={() => handleReject(p.id)}>
                            <UserX className="w-4 h-4 mr-1" /> Reject
                          </EcoButton>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </EcoCardContent>
            </EcoCard>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
