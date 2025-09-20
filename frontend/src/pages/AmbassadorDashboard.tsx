import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Users, 
  Globe, 
  Award, 
  TrendingUp, 
  Calendar, 
  Clock, 
  Target, 
  Star,
  Eye, 
  Edit, 
  Plus,
  Search,
  Filter,
  Download,
  CheckCircle,
  AlertCircle,
  Shield,
  Megaphone,
  BarChart3,
  Activity
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
  totalReach: 2456,
  activeCampaigns: 8,
  completedMissions: 23,
  totalImpact: 12500,
  newFollowers: 156,
  engagementRate: 87,
  ecoPointsEarned: 8900,
  communitiesManaged: 12
};

const mockCampaigns = [
  { id: 1, title: "Plastic-Free July Challenge", participants: 456, reach: 2340, status: "active", endDate: "2024-07-31", impact: "High" },
  { id: 2, title: "Tree Planting Drive", participants: 234, reach: 1200, status: "active", endDate: "2024-03-15", impact: "Medium" },
  { id: 3, title: "Energy Conservation Week", participants: 189, reach: 890, status: "completed", endDate: "2024-01-31", impact: "High" },
  { id: 4, title: "Zero Waste Initiative", participants: 123, reach: 567, status: "planning", endDate: "2024-04-01", impact: "Medium" },
];

const mockCommunities = [
  { id: 1, name: "Green Valley High School", members: 234, activity: "High", location: "California, USA", type: "School" },
  { id: 2, name: "Eco Warriors Club", members: 156, activity: "Medium", location: "New York, USA", type: "Community" },
  { id: 3, name: "University Environmental Society", members: 89, activity: "High", location: "Texas, USA", type: "University" },
  { id: 4, name: "Local Green Initiative", members: 67, activity: "Low", location: "Florida, USA", type: "Community" },
];

const mockMissions = [
  { id: 1, title: "Organize Community Cleanup", points: 500, deadline: "2024-02-20", status: "in_progress", priority: "High" },
  { id: 2, title: "Conduct Environmental Workshop", points: 300, deadline: "2024-02-25", status: "pending", priority: "Medium" },
  { id: 3, title: "Create Educational Content", points: 200, deadline: "2024-02-28", status: "completed", priority: "Low" },
  { id: 4, title: "Mentor New Ambassadors", points: 400, deadline: "2024-03-05", status: "pending", priority: "High" },
];

const mockEvents = [
  { id: 1, title: "Climate Action Summit", date: "2024-02-15", attendees: 234, type: "Conference", status: "upcoming" },
  { id: 2, title: "Eco Workshop Series", date: "2024-02-20", attendees: 89, type: "Workshop", status: "upcoming" },
  { id: 3, title: "Community Tree Planting", date: "2024-02-10", attendees: 156, type: "Volunteer", status: "completed" },
];

const mockLeaderboard = [
  { name: "Sarah Chen", points: 12500, rank: 1, campaigns: 12, impact: "High" },
  { name: "Alex Rodriguez", points: 11200, rank: 2, campaigns: 10, impact: "High" },
  { name: "Emma Wilson", points: 9800, rank: 3, campaigns: 8, impact: "Medium" },
  { name: "Maya Patel", points: 8900, rank: 4, campaigns: 7, impact: "Medium" },
  { name: "Jordan Kim", points: 7600, rank: 5, campaigns: 6, impact: "Low" },
];

export default function AmbassadorDashboard() {
  const { token, user, signout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("overview");
  const [filteredCommunities, setFilteredCommunities] = useState(mockCommunities);
  const [displayName, setDisplayName] = useState<string>("");
  const [initials, setInitials] = useState<string>("A");

  useEffect(() => {
    if (token) {
      const payload = decodeJwtPayload<any>(token);
      const nameFromJwt = payload?.firstName && payload?.lastName ? `${payload.firstName} ${payload.lastName}` : null;
      if (nameFromJwt) {
        setDisplayName(nameFromJwt);
        const fi = payload.firstName?.charAt(0)?.toUpperCase() || "A";
        const li = payload.lastName?.charAt(0)?.toUpperCase() || "M";
        setInitials(`${fi}${li}`);
      }
    }
  }, [token]);

  useEffect(() => {
    const filtered = mockCommunities.filter(community => 
      community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      community.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCommunities(filtered);
  }, [searchTerm]);

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      completed: "secondary", 
      planning: "outline",
      in_progress: "default",
      pending: "secondary"
    } as const;
    
    const colors = {
      active: "bg-green-100 text-green-800",
      completed: "bg-blue-100 text-blue-800",
      planning: "bg-yellow-100 text-yellow-800",
      in_progress: "bg-purple-100 text-purple-800",
      pending: "bg-gray-100 text-gray-800"
    };

    return (
      <Badge variant={variants[status as keyof typeof variants]} className={colors[status as keyof typeof colors]}>
        {status.replace('_', ' ').charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
      </Badge>
    );
  };

  const getPriorityColor = (priority: string) => {
    if (priority === 'High') return "text-red-600";
    if (priority === 'Medium') return "text-yellow-600";
    return "text-green-600";
  };

  const getImpactColor = (impact: string) => {
    if (impact === 'High') return "text-green-600";
    if (impact === 'Medium') return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold">Ambassador Hub</span>
              <p className="text-xs text-muted-foreground">EcoQuest Community Leadership</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-green-500 text-white text-xs">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium">{displayName || "Ambassador"}</p>
                <p className="text-xs text-muted-foreground">Community Leader</p>
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
          <h1 className="text-3xl font-bold mb-2">Welcome, {displayName || "Ambassador"}!</h1>
          <p className="text-muted-foreground">
            Lead environmental change in your community and inspire others to take action.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <EcoCard>
            <EcoCardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Reach</p>
                  <p className="text-2xl font-bold">{mockStats.totalReach.toLocaleString()}</p>
                </div>
                <Globe className="w-8 h-8 text-green-500" />
              </div>
              <div className="mt-2">
                <span className="text-sm text-green-600">+{mockStats.newFollowers} new followers</span>
              </div>
            </EcoCardContent>
          </EcoCard>

          <EcoCard>
            <EcoCardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Campaigns</p>
                  <p className="text-2xl font-bold">{mockStats.activeCampaigns}</p>
                </div>
                <Megaphone className="w-8 h-8 text-blue-500" />
              </div>
              <div className="mt-2">
                <span className="text-sm text-green-600">+2 this month</span>
              </div>
            </EcoCardContent>
          </EcoCard>

          <EcoCard>
            <EcoCardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Engagement Rate</p>
                  <p className="text-2xl font-bold">{mockStats.engagementRate}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-500" />
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
                  <p className="text-sm font-medium text-muted-foreground">Eco Points</p>
                  <p className="text-2xl font-bold">{mockStats.ecoPointsEarned.toLocaleString()}</p>
                </div>
                <Award className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="mt-2">
                <span className="text-sm text-green-600">+1,200 this month</span>
              </div>
            </EcoCardContent>
          </EcoCard>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="communities">Communities</TabsTrigger>
            <TabsTrigger value="missions">Missions</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <EcoCard>
                <EcoCardHeader>
                  <EcoCardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5" />
                    <span>Recent Activity</span>
                  </EcoCardTitle>
                </EcoCardHeader>
                <EcoCardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Completed "Tree Planting Drive" campaign</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New community member joined</p>
                        <p className="text-xs text-muted-foreground">4 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Award className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Earned "Eco Leader" badge</p>
                        <p className="text-xs text-muted-foreground">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Target className="w-4 h-4 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Started new mission</p>
                        <p className="text-xs text-muted-foreground">2 days ago</p>
                      </div>
                    </div>
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
                      <Megaphone className="w-4 h-4 mr-2" />
                      Launch New Campaign
                    </EcoButton>
                    <EcoButton variant="outline" className="w-full justify-start">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Event
                    </EcoButton>
                    <EcoButton variant="outline" className="w-full justify-start">
                      <Users className="w-4 h-4 mr-2" />
                      Manage Communities
                    </EcoButton>
                    <EcoButton variant="outline" className="w-full justify-start">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Analytics
                    </EcoButton>
                  </div>
                </EcoCardContent>
              </EcoCard>
            </div>

            {/* Leaderboard */}
            <EcoCard>
              <EcoCardHeader>
                <EcoCardTitle className="flex items-center space-x-2">
                  <Star className="w-5 h-5" />
                  <span>Ambassador Leaderboard</span>
                </EcoCardTitle>
              </EcoCardHeader>
              <EcoCardContent>
                <div className="space-y-4">
                  {mockLeaderboard.map((ambassador, index) => (
                    <div key={ambassador.name} className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? 'bg-yellow-500 text-yellow-900' :
                        index === 1 ? 'bg-gray-400 text-gray-900' :
                        index === 2 ? 'bg-amber-600 text-amber-100' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {index + 1}
                      </div>
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="text-xs">
                          {ambassador.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{ambassador.name}</p>
                        <p className="text-sm text-muted-foreground">{ambassador.campaigns} campaigns • {ambassador.impact} impact</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{ambassador.points.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">points</p>
                      </div>
                    </div>
                  ))}
                </div>
              </EcoCardContent>
            </EcoCard>
          </TabsContent>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-6">
            <EcoCard>
              <EcoCardHeader>
                <div className="flex items-center justify-between">
                  <EcoCardTitle>Campaign Management</EcoCardTitle>
                  <EcoButton>
                    <Plus className="w-4 h-4 mr-2" />
                    Launch Campaign
                  </EcoButton>
                </div>
              </EcoCardHeader>
              <EcoCardContent>
                <div className="space-y-4">
                  {mockCampaigns.map((campaign) => (
                    <div key={campaign.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium">{campaign.title}</h3>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(campaign.status)}
                          <Badge variant="outline" className={getImpactColor(campaign.impact)}>
                            {campaign.impact} Impact
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Participants</p>
                          <p className="font-medium">{campaign.participants}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Reach</p>
                          <p className="font-medium">{campaign.reach.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">End Date</p>
                          <p className="font-medium">{campaign.endDate}</p>
                        </div>
                      </div>
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
                          Export Data
                        </EcoButton>
                      </div>
                    </div>
                  ))}
                </div>
              </EcoCardContent>
            </EcoCard>
          </TabsContent>

          {/* Communities Tab */}
          <TabsContent value="communities" className="space-y-6">
            <EcoCard>
              <EcoCardHeader>
                <div className="flex items-center justify-between">
                  <EcoCardTitle>Community Management</EcoCardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search communities..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <EcoButton size="sm" variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </EcoButton>
                  </div>
                </div>
              </EcoCardHeader>
              <EcoCardContent>
                <div className="space-y-4">
                  {filteredCommunities.map((community) => (
                    <div key={community.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback>
                            {community.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{community.name}</p>
                          <p className="text-sm text-muted-foreground">{community.location} • {community.type}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant={community.activity === 'High' ? 'default' : community.activity === 'Medium' ? 'secondary' : 'outline'}>
                              {community.activity} Activity
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <p className="text-sm font-medium">{community.members}</p>
                          <p className="text-xs text-muted-foreground">Members</p>
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

          {/* Missions Tab */}
          <TabsContent value="missions" className="space-y-6">
            <EcoCard>
              <EcoCardHeader>
                <div className="flex items-center justify-between">
                  <EcoCardTitle>Mission Management</EcoCardTitle>
                  <EcoButton>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Mission
                  </EcoButton>
                </div>
              </EcoCardHeader>
              <EcoCardContent>
                <div className="space-y-4">
                  {mockMissions.map((mission) => (
                    <div key={mission.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium">{mission.title}</h3>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(mission.status)}
                          <Badge variant="outline" className={getPriorityColor(mission.priority)}>
                            {mission.priority} Priority
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Points</p>
                          <p className="font-medium">{mission.points}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Deadline</p>
                          <p className="font-medium">{mission.deadline}</p>
                        </div>
                      </div>
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
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Mark Complete
                        </EcoButton>
                      </div>
                    </div>
                  ))}
                </div>
              </EcoCardContent>
            </EcoCard>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <EcoCard>
              <EcoCardHeader>
                <div className="flex items-center justify-between">
                  <EcoCardTitle>Event Management</EcoCardTitle>
                  <EcoButton>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Event
                  </EcoButton>
                </div>
              </EcoCardHeader>
              <EcoCardContent>
                <div className="space-y-4">
                  {mockEvents.map((event) => (
                    <div key={event.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium">{event.title}</h3>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(event.status)}
                          <Badge variant="outline">{event.type}</Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Date</p>
                          <p className="font-medium">{event.date}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Attendees</p>
                          <p className="font-medium">{event.attendees}</p>
                        </div>
                      </div>
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
                          Export List
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
