import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Users, 
  BookOpen, 
  BarChart3, 
  Award, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Eye, 
  Edit, 
  Plus,
  Search,
  Filter,
  Download,
  CheckCircle,
  AlertCircle,
  GraduationCap,
  Target,
  Star
} from "lucide-react";
import { EcoButton } from "@/components/ui/eco-button";
import { EcoCard, EcoCardContent, EcoCardDescription, EcoCardHeader, EcoCardTitle } from "@/components/ui/eco-card";
import { ProgressRing } from "@/components/ui/progress-ring";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/lib/auth";
import { decodeJwtPayload } from "@/lib/api";
import { useNavigate } from "react-router-dom";

// Mock data for demonstration
const mockStats = {
  totalStudents: 156,
  activeStudents: 142,
  completedLessons: 89,
  averageProgress: 78,
  totalEcoPoints: 45678,
  challengesCompleted: 234,
  newStudentsThisWeek: 12,
  averageSessionTime: "32m 15s"
};

const mockStudents = [
  { id: 1, name: "Sarah Chen", email: "sarah.chen@school.edu", progress: 85, ecoPoints: 3450, lastActive: "2 hours ago", status: "active", grade: "A+" },
  { id: 2, name: "Emma Rodriguez", email: "emma.rodriguez@school.edu", progress: 72, ecoPoints: 2485, lastActive: "1 hour ago", status: "active", grade: "A" },
  { id: 3, name: "Alex Rivera", email: "alex.rivera@school.edu", progress: 45, ecoPoints: 1200, lastActive: "1 day ago", status: "needs_help", grade: "C" },
  { id: 4, name: "Maya Patel", email: "maya.patel@school.edu", progress: 92, ecoPoints: 2890, lastActive: "30 minutes ago", status: "active", grade: "A+" },
  { id: 5, name: "Jordan Kim", email: "jordan.kim@school.edu", progress: 38, ecoPoints: 890, lastActive: "3 days ago", status: "inactive", grade: "D" },
  { id: 6, name: "Taylor Swift", email: "taylor.swift@school.edu", progress: 67, ecoPoints: 2100, lastActive: "4 hours ago", status: "active", grade: "B" },
];

const mockLessons = [
  { id: 1, title: "Climate Change Basics", studentsEnrolled: 156, completionRate: 89, avgScore: 87, status: "published" },
  { id: 2, title: "Renewable Energy Sources", studentsEnrolled: 142, completionRate: 76, avgScore: 82, status: "published" },
  { id: 3, title: "Waste Management", studentsEnrolled: 134, completionRate: 65, avgScore: 79, status: "draft" },
  { id: 4, title: "Biodiversity Conservation", studentsEnrolled: 98, completionRate: 45, avgScore: 74, status: "published" },
];

const mockChallenges = [
  { id: 1, title: "Plant 10 Trees Challenge", participants: 89, completion: 78, status: "active", endDate: "2024-02-15" },
  { id: 2, title: "Zero Waste Week", participants: 67, completion: 45, status: "active", endDate: "2024-02-10" },
  { id: 3, title: "Energy Conservation Month", participants: 45, completion: 92, status: "completed", endDate: "2024-01-31" },
];

const mockAssignments = [
  { id: 1, title: "Climate Change Essay", dueDate: "2024-02-20", submissions: 45, totalStudents: 50, status: "active" },
  { id: 2, title: "Eco-Project Presentation", dueDate: "2024-02-25", submissions: 23, totalStudents: 30, status: "active" },
  { id: 3, title: "Sustainability Quiz", dueDate: "2024-02-15", submissions: 48, totalStudents: 50, status: "grading" },
];

export default function TeacherPortal() {
  const { token, user, signout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("overview");
  const [filteredStudents, setFilteredStudents] = useState(mockStudents);
  const [displayName, setDisplayName] = useState<string>("");
  const [initials, setInitials] = useState<string>("T");

  useEffect(() => {
    if (token) {
      const payload = decodeJwtPayload<any>(token);
      const nameFromJwt = payload?.firstName && payload?.lastName ? `${payload.firstName} ${payload.lastName}` : null;
      if (nameFromJwt) {
        setDisplayName(nameFromJwt);
        const fi = payload.firstName?.charAt(0)?.toUpperCase() || "T";
        const li = payload.lastName?.charAt(0)?.toUpperCase() || "E";
        setInitials(`${fi}${li}`);
      }
    }
  }, [token]);

  useEffect(() => {
    const filtered = mockStudents.filter(student => 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchTerm]);

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      needs_help: "secondary", 
      inactive: "destructive"
    } as const;
    
    const colors = {
      active: "bg-green-100 text-green-800",
      needs_help: "bg-yellow-100 text-yellow-800",
      inactive: "bg-red-100 text-red-800"
    };

    return (
      <Badge variant={variants[status as keyof typeof variants]} className={colors[status as keyof typeof colors]}>
        {status.replace('_', ' ').charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
      </Badge>
    );
  };

  const getGradeColor = (grade: string) => {
    if (grade.includes('A')) return "text-green-600";
    if (grade.includes('B')) return "text-blue-600";
    if (grade.includes('C')) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold">Teacher Portal</span>
              <p className="text-xs text-muted-foreground">EcoQuest Education Management</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-blue-500 text-white text-xs">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium">{displayName || "Teacher"}</p>
                <p className="text-xs text-muted-foreground">Educator</p>
              </div>
            </div>
            <EcoButton
              size="sm"
              variant="outline"
              onClick={() => { signout(); navigate('/auth'); }}
            >
              Logout
            </EcoButton>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, {displayName || "Teacher"}!</h1>
          <p className="text-muted-foreground">
            Manage your students, track progress, and create engaging eco-learning experiences.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <EcoCard>
            <EcoCardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold">{mockStats.totalStudents}</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
              <div className="mt-2">
                <span className="text-sm text-green-600">+{mockStats.newStudentsThisWeek} this week</span>
              </div>
            </EcoCardContent>
          </EcoCard>

          <EcoCard>
            <EcoCardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Students</p>
                  <p className="text-2xl font-bold">{mockStats.activeStudents}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
              <div className="mt-2">
                <Progress value={Math.round((mockStats.activeStudents / mockStats.totalStudents) * 100)} className="h-2" />
              </div>
            </EcoCardContent>
          </EcoCard>

          <EcoCard>
            <EcoCardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Progress</p>
                  <p className="text-2xl font-bold">{mockStats.averageProgress}%</p>
                </div>
                <BarChart3 className="w-8 h-8 text-purple-500" />
              </div>
              <div className="mt-2">
                <span className="text-sm text-green-600">+5% from last month</span>
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
        </div>

        {/* Main Content Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="lessons">Lessons</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <EcoCard>
                <EcoCardHeader>
                  <EcoCardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>Recent Student Activity</span>
                  </EcoCardTitle>
                </EcoCardHeader>
                <EcoCardContent>
                  <div className="space-y-4">
                    {mockStudents.slice(0, 5).map((student) => (
                      <div key={student.id} className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{student.name}</p>
                          <p className="text-xs text-muted-foreground">Last active: {student.lastActive}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{student.progress}%</p>
                          <p className="text-xs text-muted-foreground">{student.ecoPoints} pts</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </EcoCardContent>
              </EcoCard>

              {/* Quick Actions */}
              <EcoCard>
                <EcoCardHeader>
                  <EcoCardTitle className="flex items-center space-x-2">
                    <Plus className="w-5 h-5" />
                    <span>Quick Actions</span>
                  </EcoCardTitle>
                </EcoCardHeader>
                <EcoCardContent>
                  <div className="space-y-3">
                    <EcoButton className="w-full justify-start">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Create New Lesson
                    </EcoButton>
                    <EcoButton variant="outline" className="w-full justify-start">
                      <Target className="w-4 h-4 mr-2" />
                      Create Challenge
                    </EcoButton>
                    <EcoButton variant="outline" className="w-full justify-start">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Assignment
                    </EcoButton>
                    <EcoButton variant="outline" className="w-full justify-start">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Analytics
                    </EcoButton>
                  </div>
                </EcoCardContent>
              </EcoCard>
            </div>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <EcoCard>
              <EcoCardHeader>
                <div className="flex items-center justify-between">
                  <EcoCardTitle>Student Management</EcoCardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search students..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <EcoButton size="sm" variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </EcoButton>
                    <EcoButton size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </EcoButton>
                  </div>
                </div>
              </EcoCardHeader>
              <EcoCardContent>
                <div className="space-y-4">
                  {filteredStudents.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback>
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            {getStatusBadge(student.status)}
                            <span className={`text-sm font-medium ${getGradeColor(student.grade)}`}>
                              Grade: {student.grade}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <p className="text-sm font-medium">{student.progress}%</p>
                          <p className="text-xs text-muted-foreground">Progress</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium">{student.ecoPoints.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">Eco Points</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Last active</p>
                          <p className="text-sm font-medium">{student.lastActive}</p>
                        </div>
                        <div className="flex space-x-1">
                          <EcoButton size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </EcoButton>
                          <EcoButton size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </EcoButton>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </EcoCardContent>
            </EcoCard>
          </TabsContent>

          {/* Lessons Tab */}
          <TabsContent value="lessons" className="space-y-6">
            <EcoCard>
              <EcoCardHeader>
                <div className="flex items-center justify-between">
                  <EcoCardTitle>Lesson Management</EcoCardTitle>
                  <EcoButton>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Lesson
                  </EcoButton>
                </div>
              </EcoCardHeader>
              <EcoCardContent>
                <div className="space-y-4">
                  {mockLessons.map((lesson) => (
                    <div key={lesson.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium">{lesson.title}</h3>
                        <Badge variant={lesson.status === 'published' ? 'default' : 'secondary'}>
                          {lesson.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Students Enrolled</p>
                          <p className="font-medium">{lesson.studentsEnrolled}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Completion Rate</p>
                          <p className="font-medium">{lesson.completionRate}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Average Score</p>
                          <p className="font-medium">{lesson.avgScore}%</p>
                        </div>
                      </div>
                      <Progress value={lesson.completionRate} className="h-2 mb-3" />
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
                          Export Results
                        </EcoButton>
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

          {/* Assignments Tab */}
          <TabsContent value="assignments" className="space-y-6">
            <EcoCard>
              <EcoCardHeader>
                <div className="flex items-center justify-between">
                  <EcoCardTitle>Assignment Management</EcoCardTitle>
                  <EcoButton>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Assignment
                  </EcoButton>
                </div>
              </EcoCardHeader>
              <EcoCardContent>
                <div className="space-y-4">
                  {mockAssignments.map((assignment) => (
                    <div key={assignment.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium">{assignment.title}</h3>
                        <Badge variant={assignment.status === 'active' ? 'default' : 'secondary'}>
                          {assignment.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Due Date</p>
                          <p className="font-medium">{assignment.dueDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Submissions</p>
                          <p className="font-medium">{assignment.submissions}/{assignment.totalStudents}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Completion</p>
                          <p className="font-medium">{Math.round((assignment.submissions / assignment.totalStudents) * 100)}%</p>
                        </div>
                      </div>
                      <Progress value={(assignment.submissions / assignment.totalStudents) * 100} className="h-2 mb-3" />
                      <div className="flex space-x-2">
                        <EcoButton size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          View Submissions
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
        </Tabs>
      </div>
    </div>
  );
}
