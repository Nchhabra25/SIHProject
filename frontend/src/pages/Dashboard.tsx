import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Zap, Users, Award, Trophy, Target, Leaf, Settings } from "lucide-react";
import { EcoButton } from "@/components/ui/eco-button";
import { EcoCard, EcoCardContent, EcoCardDescription, EcoCardHeader, EcoCardTitle } from "@/components/ui/eco-card";
import { ProgressRing } from "@/components/ui/progress-ring";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getUserProgress } from "@/utils/storage";
import { useAuth } from "@/lib/auth";
import { decodeJwtPayload } from "@/lib/api";
import { useNavigate } from "react-router-dom";

const quickActions = [
  {
    icon: BookOpen,
    title: "Start Lesson",
    description: "Continue Climate Change Basics",
    color: "text-primary",
    href: "/lessons"
  },
  {
    icon: Zap,
    title: "Take Quiz",
    description: "Test your eco-knowledge",
    color: "text-accent",
    href: "/quiz"
  },
  {
    icon: Users,
    title: "Join Challenge",
    description: "Complete real-world eco-actions",
    color: "text-success",
    href: "/challenges"
  }
];

const leaderboard = [
  { name: "Sarah Chen", school: "Green Valley High", points: 3450, avatar: "SC", rank: 1 },
  { name: "Emma Rodriguez", school: "Riverside Academy", points: 2485, avatar: "ER", rank: 2 },
  { name: "Alex Rivera", school: "Eco Academy", points: 2380, avatar: "AR", rank: 3 },
  { name: "Maya Patel", school: "Forest Hills School", points: 2320, avatar: "MP", rank: 4 },
  { name: "Jordan Kim", school: "Tech Valley School", points: 2180, avatar: "JK", rank: 5 },
];

const badges = [
  { name: "First Steps", icon: "🌱", unlocked: true },
  { name: "Quiz Master", icon: "🧠", unlocked: true },
  { name: "Team Player", icon: "👥", unlocked: true },
  { name: "Eco Warrior", icon: "⚔️", unlocked: false },
  { name: "Planet Saver", icon: "🌍", unlocked: false },
  { name: "Carbon Zero", icon: "♻️", unlocked: false },
];

export default function Dashboard() {
  const [progress, setProgress] = useState(getUserProgress());
  const { token, user, signout } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState<string>("");
  const [initials, setInitials] = useState<string>("ER");

  useEffect(() => {
    // Update progress when component mounts
    setProgress(getUserProgress());
  }, []);

  useEffect(() => {
    // Derive name from JWT if available; fall back to stored progress
    if (token) {
      const payload = decodeJwtPayload<any>(token);
      const nameFromJwt = payload?.firstName && payload?.lastName ? `${payload.firstName} ${payload.lastName}` : null;
      if (nameFromJwt) {
        setDisplayName(nameFromJwt);
        const fi = payload.firstName?.charAt(0)?.toUpperCase() || "?";
        const li = payload.lastName?.charAt(0)?.toUpperCase() || "?";
        setInitials(`${fi}${li}`);
        return;
      }
    }
    setDisplayName(progress.name);
    const parts = progress.name.split(' ');
    const fi = parts[0]?.charAt(0)?.toUpperCase() || "E";
    const li = parts[1]?.charAt(0)?.toUpperCase() || "R";
    setInitials(`${fi}${li}`);
  }, [token, progress.name]);

  const progressToNextLevel = ((progress.ecoPoints % 300) / 300) * 100;
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-success rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-success-foreground" />
            </div>
            <span className="text-xl font-bold">EcoQuest</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <div className="flex items-center gap-2">
              {user?.email === 'admin@ecoquest.com' && (
                <Link to="/admin/dashboard">
                  <EcoButton size="sm" variant="outline">Admin Dashboard</EcoButton>
                </Link>
              )}
              {user?.role === 'ADMIN' && user?.email !== 'admin@ecoquest.com' && (
                <Link to="/admin/users">
                  <EcoButton size="sm" variant="outline">Admin</EcoButton>
                </Link>
              )}
              <Link to="/profile">
                <Avatar className="hover:ring-2 hover:ring-primary transition-all cursor-pointer">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </Link>
              <EcoButton
                size="sm"
                variant="outline"
                onClick={() => { signout(); navigate('/auth'); }}
              >
                Logout
              </EcoButton>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 animate-slide-up">
            Welcome back, <span className="text-primary">{(displayName || progress.name).split(' ')[0]}!</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg animate-slide-up" style={{animationDelay: '0.1s'}}>
            You're on track to become a Climate Hero! 🌱 Ready for today's eco-challenge?
          </p>
          
          {/* Streak indicator */}
          <div className="mt-4 flex items-center space-x-2 animate-slide-up" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center space-x-2 bg-gradient-to-r from-accent/10 to-primary/10 px-4 py-2 rounded-full">
              <span className="text-2xl">🔥</span>
              <span className="font-semibold text-primary">
                {progress.streak} day streak!
              </span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Stats */}
            <EcoCard variant="gradient" className="animate-slide-up" style={{animationDelay: '0.2s'}}>
              <EcoCardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <Avatar className="w-20 h-20 border-4 border-white/20">
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback className="text-2xl">ER</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold text-white">{displayName || progress.name}</h2>
                      <p className="text-white/80">Level {progress.level} • Eco Champion</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1">
                          <Trophy className="w-4 h-4 text-yellow-300" />
                          <span className="text-white/90 text-sm">{progress.ecoPoints.toLocaleString()} eco-points</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Award className="w-4 h-4 text-white/80" />
                          <span className="text-white/90 text-sm">{progress.unlockedBadges.length} badges</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <ProgressRing progress={Math.round(progressToNextLevel)} size={100} className="hidden md:block">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{Math.round(progressToNextLevel)}%</div>
                      <div className="text-xs text-white/80">to Level {progress.level + 1}</div>
                    </div>
                  </ProgressRing>
                  
                  {/* Mobile version */}
                  <div className="md:hidden">
                    <div className="text-center mb-2">
                      <div className="text-lg font-bold text-white">{Math.round(progressToNextLevel)}%</div>
                      <div className="text-xs text-white/80">to Level {progress.level + 1}</div>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div 
                        className="h-2 bg-white rounded-full transition-all duration-500"
                        style={{width: `${progressToNextLevel}%`}}
                      />
                    </div>
                  </div>
                </div>
              </EcoCardContent>
            </EcoCard>

            {/* Quick Actions */}
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quickActions.map((action, index) => (
                  <Link key={action.title} to={action.href}>
                    <EcoCard 
                      hover="glow"
                      className="cursor-pointer animate-bounce-in"
                      style={{animationDelay: `${0.3 + index * 0.1}s`}}
                    >
                      <EcoCardHeader className="pb-3">
                        <action.icon className={`w-6 md:w-8 h-6 md:h-8 ${action.color} mb-2`} />
                        <EcoCardTitle className="text-base md:text-lg">{action.title}</EcoCardTitle>
                      </EcoCardHeader>
                      <EcoCardContent className="pt-0">
                        <EcoCardDescription className="text-sm">{action.description}</EcoCardDescription>
                      </EcoCardContent>
                    </EcoCard>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Leaderboard */}
            <EcoCard className="animate-slide-up" style={{animationDelay: '0.4s'}}>
              <EcoCardHeader>
                <div className="flex items-center justify-between">
                  <EcoCardTitle className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span>Leaderboard</span>
                  </EcoCardTitle>
                  <Badge variant="secondary">Top 3</Badge>
                </div>
              </EcoCardHeader>
              <EcoCardContent className="space-y-4">
                {leaderboard.map((user, index) => (
                  <div key={user.name} className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      index === 0 ? 'bg-yellow-500 text-yellow-900' :
                      index === 1 ? 'bg-gray-400 text-gray-900' :
                      'bg-amber-600 text-amber-100'
                    }`}>
                      {index + 1}
                    </div>
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="text-xs">{user.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.school}</p>
                    </div>
                    <div className="text-sm font-medium text-primary">
                      {user.points.toLocaleString()}
                    </div>
                  </div>
                ))}
                <EcoButton variant="outline" className="w-full" size="sm">
                  View Full Leaderboard
                </EcoButton>
              </EcoCardContent>
            </EcoCard>

            {/* Badges */}
            <EcoCard className="animate-slide-up" style={{animationDelay: '0.5s'}}>
              <EcoCardHeader>
                <EcoCardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-primary" />
                  <span>Recent Badges</span>
                </EcoCardTitle>
              </EcoCardHeader>
              <EcoCardContent>
                <div className="grid grid-cols-3 gap-3">
                  {badges.slice(0, 6).map((badge, index) => (
                    <div
                      key={badge.name}
                      className={`relative p-3 rounded-xl border-2 text-center transition-all ${
                        badge.unlocked 
                          ? 'border-success bg-success/10 animate-pulse-glow' 
                          : 'border-muted bg-muted/50 opacity-50'
                      }`}
                    >
                      <div className="text-2xl mb-1">{badge.icon}</div>
                      <div className="text-xs font-medium">{badge.name}</div>
                      {!badge.unlocked && (
                        <div className="absolute inset-0 bg-background/60 rounded-xl flex items-center justify-center">
                          <Target className="w-4 h-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <Link to="/profile">
                  <EcoButton variant="outline" className="w-full mt-4" size="sm">
                    View All Badges
                  </EcoButton>
                </Link>
              </EcoCardContent>
            </EcoCard>
          </div>
        </div>
      </div>
    </div>
  );
}