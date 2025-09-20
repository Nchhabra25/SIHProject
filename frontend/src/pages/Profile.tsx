import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Camera, Award, Activity, Settings, Calendar, Trophy, Target, CheckCircle } from "lucide-react";
import { EcoButton } from "@/components/ui/eco-button";
import { EcoCard, EcoCardContent, EcoCardDescription, EcoCardHeader, EcoCardTitle } from "@/components/ui/eco-card";
import { ProgressRing } from "@/components/ui/progress-ring";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/lib/auth";

const badges = [
  { name: "First Steps", icon: "🌱", unlocked: true, date: "2024-01-15" },
  { name: "Quiz Master", icon: "🧠", unlocked: true, date: "2024-01-20" },
  { name: "Team Player", icon: "👥", unlocked: true, date: "2024-02-01" },
  { name: "Week Streak", icon: "🔥", unlocked: true, date: "2024-02-10" },
  { name: "Eco Warrior", icon: "⚔️", unlocked: false, progress: 65 },
  { name: "Planet Saver", icon: "🌍", unlocked: false, progress: 30 },
  { name: "Carbon Zero", icon: "♻️", unlocked: false, progress: 20 },
  { name: "Green Thumb", icon: "🌿", unlocked: false, progress: 0 },
];

const activities = [
  {
    type: "lesson",
    title: "Completed Renewable Energy Basics",
    points: 150,
    date: "2024-02-15",
    icon: CheckCircle,
    color: "text-success"
  },
  {
    type: "quiz",
    title: "Aced Climate Change Quiz",
    points: 200,
    date: "2024-02-14",
    icon: Trophy,
    color: "text-yellow-500"
  },
  {
    type: "challenge",
    title: "Joined Ocean Conservation Challenge",
    points: 100,
    date: "2024-02-13",
    icon: Target,
    color: "text-accent"
  },
  {
    type: "badge",
    title: "Earned Team Player Badge",
    points: 300,
    date: "2024-02-01",
    icon: Award,
    color: "text-primary"
  }
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState("overview");
  const { user, signout } = useAuth();
  const initials = useMemo(() => {
    const fn = (user as any)?.firstName || "";
    const ln = (user as any)?.lastName || "";
    const fi = fn.charAt(0).toUpperCase();
    const li = ln.charAt(0).toUpperCase();
    return `${fi || 'J'}${li || 'D'}`;
  }, [user]);
  const fullName = useMemo(() => {
    const fn = (user as any)?.firstName || "John";
    const ln = (user as any)?.lastName || "Doe";
    return `${fn} ${ln}`;
  }, [user]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link to="/dashboard" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Profile Header */}
        <EcoCard variant="gradient" className="mb-8 animate-slide-up">
          <EcoCardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-white/20">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="text-4xl">{initials}</AvatarFallback>
                </Avatar>
                <EcoButton
                  size="icon"
                  variant="glass"
                  className="absolute bottom-0 right-0 rounded-full"
                >
                  <Camera className="w-4 h-4" />
                </EcoButton>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-bold text-white mb-2">{fullName}</h1>
                <p className="text-white/80 text-lg mb-4">Level 7 Eco Explorer</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">1,850</div>
                    <div className="text-white/80 text-sm">Eco Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">12</div>
                    <div className="text-white/80 text-sm">Badges Earned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">28</div>
                    <div className="text-white/80 text-sm">Days Streak</div>
                  </div>
                </div>
              </div>
              
              <ProgressRing progress={75} size={120}>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">75%</div>
                  <div className="text-xs text-white/80">to Level 8</div>
                </div>
              </ProgressRing>
            </div>
          </EcoCardContent>
        </EcoCard>

        {/* Profile Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity Log</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Badges Section */}
              <EcoCard className="animate-slide-up">
                <EcoCardHeader>
                  <EcoCardTitle className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-primary" />
                    <span>Badge Collection</span>
                  </EcoCardTitle>
                  <EcoCardDescription>
                    {badges.filter(b => b.unlocked).length} of {badges.length} badges earned
                  </EcoCardDescription>
                </EcoCardHeader>
                <EcoCardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {badges.map((badge, index) => (
                      <div
                        key={badge.name}
                        className={`relative p-4 rounded-xl border-2 text-center transition-all animate-bounce-in ${
                          badge.unlocked 
                            ? 'border-success bg-success/10 badge-glow' 
                            : 'border-muted bg-muted/50'
                        }`}
                        style={{animationDelay: `${index * 0.1}s`}}
                      >
                        <div className="text-3xl mb-2">{badge.icon}</div>
                        <div className="text-xs font-medium mb-1">{badge.name}</div>
                        {badge.unlocked ? (
                          <div className="text-xs text-success">{badge.date}</div>
                        ) : (
                          <div className="text-xs text-muted-foreground">
                            {badge.progress}% complete
                          </div>
                        )}
                        {!badge.unlocked && (
                          <div className="absolute inset-0 bg-background/60 rounded-xl flex items-center justify-center">
                            <Target className="w-6 h-6 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </EcoCardContent>
              </EcoCard>

              {/* Progress Overview */}
              <EcoCard className="animate-slide-up" style={{animationDelay: '0.2s'}}>
                <EcoCardHeader>
                  <EcoCardTitle>Learning Progress</EcoCardTitle>
                </EcoCardHeader>
                <EcoCardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Climate Change</span>
                      <span className="text-sm text-muted-foreground">85%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-gradient-success h-2 rounded-full" style={{width: '85%'}} />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Renewable Energy</span>
                      <span className="text-sm text-muted-foreground">60%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-gradient-success h-2 rounded-full" style={{width: '60%'}} />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Ocean Conservation</span>
                      <span className="text-sm text-muted-foreground">40%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-gradient-success h-2 rounded-full" style={{width: '40%'}} />
                    </div>
                  </div>
                </EcoCardContent>
              </EcoCard>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <EcoCard className="animate-slide-up">
              <EcoCardHeader>
                <EcoCardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-primary" />
                  <span>Recent Activity</span>
                </EcoCardTitle>
                <EcoCardDescription>
                  Your eco-learning journey timeline
                </EcoCardDescription>
              </EcoCardHeader>
              <EcoCardContent>
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-muted/30">
                      <div className={`w-10 h-10 rounded-full bg-background flex items-center justify-center ${activity.color}`}>
                        <activity.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{activity.title}</h4>
                        <div className="flex items-center space-x-4 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            +{activity.points} points
                          </Badge>
                          <span className="text-xs text-muted-foreground flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {activity.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </EcoCardContent>
            </EcoCard>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <EcoCard className="animate-slide-up">
                <EcoCardHeader>
                  <EcoCardTitle>Profile Settings</EcoCardTitle>
                </EcoCardHeader>
                <EcoCardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue={(user as any)?.firstName || ''} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue={(user as any)?.lastName || ''} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={(user as any)?.email || ''} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="school">School</Label>
                    <Input id="school" defaultValue="Green Valley High School" />
                  </div>
                  <EcoButton variant="hero">Save Changes</EcoButton>
                </EcoCardContent>
              </EcoCard>

              <EcoCard className="animate-slide-up" style={{animationDelay: '0.2s'}}>
                <EcoCardHeader>
                  <EcoCardTitle>Preferences</EcoCardTitle>
                </EcoCardHeader>
                <EcoCardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Email Notifications</Label>
                      <div className="text-sm text-muted-foreground">
                        Receive updates about new lessons and challenges
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Daily Reminders</Label>
                      <div className="text-sm text-muted-foreground">
                        Get reminded to continue your eco-quest
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Leaderboard</Label>
                      <div className="text-sm text-muted-foreground">
                        Show your progress on public leaderboards
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </EcoCardContent>
              </EcoCard>
              <EcoCard className="animate-slide-up" style={{animationDelay: '0.3s'}}>
                <EcoCardHeader>
                  <EcoCardTitle>Session</EcoCardTitle>
                </EcoCardHeader>
                <EcoCardContent>
                  <EcoButton variant="hero" onClick={() => signout()}>Logout</EcoButton>
                </EcoCardContent>
              </EcoCard>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}