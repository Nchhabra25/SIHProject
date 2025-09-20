import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Trophy, Users, Award, Zap, Globe, Target, Brain, Heart, Gamepad2, Star } from "lucide-react";
import { EcoButton } from "@/components/ui/eco-button";
import { EcoCard, EcoCardContent, EcoCardDescription, EcoCardHeader, EcoCardTitle } from "@/components/ui/eco-card";
import { Navbar } from "@/components/layout/navbar";
import { Badge } from "@/components/ui/badge";

const mainFeatures = [
  {
    icon: BookOpen,
    title: "Interactive Lessons",
    description: "Engaging multimedia content covering climate change, renewable energy, biodiversity, and sustainable living practices.",
    highlights: ["Video tutorials", "Interactive simulations", "Real-world case studies"],
    color: "text-primary"
  },
  {
    icon: Gamepad2,
    title: "Gamified Quizzes",
    description: "Test your knowledge with fun, challenging quizzes that adapt to your learning pace and provide instant feedback.",
    highlights: ["Adaptive difficulty", "Instant feedback", "Progress tracking"],
    color: "text-accent"
  },
  {
    icon: Users,
    title: "Team Challenges",
    description: "Collaborate with classmates on real environmental projects and initiatives that make a tangible impact.",
    highlights: ["Group projects", "Real impact", "Peer collaboration"],
    color: "text-success"
  },
  {
    icon: Trophy,
    title: "Leaderboards",
    description: "Compete with students worldwide, track your progress, and celebrate achievements with friends.",
    highlights: ["Global rankings", "Class competitions", "Achievement tracking"],
    color: "text-yellow-500"
  },
  {
    icon: Award,
    title: "Digital Badges",
    description: "Earn and showcase your environmental expertise with our comprehensive badge system.",
    highlights: ["50+ unique badges", "Skill verification", "Social sharing"],
    color: "text-purple-500"
  },
  {
    icon: Target,
    title: "Goal Setting",
    description: "Set personal and team environmental goals, track progress, and celebrate milestones.",
    highlights: ["Personal targets", "Team goals", "Progress analytics"],
    color: "text-orange-500"
  }
];

const learningPaths = [
  {
    icon: Globe,
    title: "Climate Science",
    description: "Understanding the science behind climate change",
    lessons: 24,
    duration: "6 weeks",
    level: "Beginner"
  },
  {
    icon: Zap,
    title: "Renewable Energy",
    description: "Exploring sustainable energy solutions",
    lessons: 18,
    duration: "4 weeks",
    level: "Intermediate"
  },
  {
    icon: Heart,
    title: "Biodiversity & Conservation",
    description: "Protecting our planet's ecosystems",
    lessons: 30,
    duration: "8 weeks",
    level: "Advanced"
  },
  {
    icon: Brain,
    title: "Sustainable Living",
    description: "Practical steps for eco-friendly lifestyle",
    lessons: 15,
    duration: "3 weeks",
    level: "Beginner"
  }
];

export default function Features() {
  return (
    <div className="min-h-screen bg-background animate-slide-up">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-gradient-hero text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-slide-up">
            Powerful Features for
            <span className="block text-4xl md:text-5xl bg-gradient-to-r from-yellow-300 to-green-300 bg-clip-text text-transparent">
              Environmental Learning
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto animate-slide-up" style={{animationDelay: '0.2s'}}>
            Discover all the tools and features that make PlanetPulsePlay the ultimate platform for environmental education
          </p>
          
          <Link to="/auth">
            <EcoButton variant="glass" size="xl" className="animate-slide-up" style={{animationDelay: '0.4s'}}>
              Try All Features Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </EcoButton>
          </Link>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need to Learn
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools designed to make environmental education engaging, effective, and fun
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainFeatures.map((feature, index) => (
              <EcoCard 
                key={feature.title}
                hover="glow"
                className="animate-bounce-in"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <EcoCardHeader>
                  <feature.icon className={`w-12 h-12 ${feature.color} mb-4`} />
                  <EcoCardTitle className="text-xl">{feature.title}</EcoCardTitle>
                </EcoCardHeader>
                <EcoCardContent>
                  <EcoCardDescription className="mb-4">
                    {feature.description}
                  </EcoCardDescription>
                  <div className="space-y-2">
                    {feature.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center text-sm text-muted-foreground">
                        <Star className="w-3 h-3 mr-2 text-success" />
                        {highlight}
                      </div>
                    ))}
                  </div>
                </EcoCardContent>
              </EcoCard>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Structured Learning Paths
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Follow curated learning journeys designed by environmental experts and educators
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningPaths.map((path, index) => (
              <EcoCard 
                key={path.title}
                className="text-center animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <EcoCardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-card rounded-2xl flex items-center justify-center">
                    <path.icon className="w-8 h-8 text-primary" />
                  </div>
                  <EcoCardTitle className="text-lg">{path.title}</EcoCardTitle>
                </EcoCardHeader>
                <EcoCardContent>
                  <EcoCardDescription className="mb-4">
                    {path.description}
                  </EcoCardDescription>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lessons:</span>
                      <span className="font-medium">{path.lessons}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">{path.duration}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Level:</span>
                      <Badge variant={path.level === 'Beginner' ? 'secondary' : path.level === 'Intermediate' ? 'default' : 'destructive'}>
                        {path.level}
                      </Badge>
                    </div>
                  </div>
                </EcoCardContent>
              </EcoCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-success text-success-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Explore All Features?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students already using PlanetPulsePlay to make a difference for our planet
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <EcoButton variant="glass" size="xl" className="text-success-foreground border-success-foreground/30 hover:bg-success-foreground/20">
                Start Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </EcoButton>
            </Link>
            <EcoButton variant="outline" size="xl" className="border-success-foreground text-success hover:bg-success-foreground hover:text-success">
              Watch Demo
            </EcoButton>
          </div>
        </div>
      </section>
    </div>
  );
}