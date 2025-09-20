import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Trophy, Users, Award, Zap, Globe } from "lucide-react";
import { EcoButton } from "@/components/ui/eco-button";
import { EcoCard, EcoCardContent, EcoCardDescription, EcoCardHeader, EcoCardTitle } from "@/components/ui/eco-card";
import { Navbar } from "@/components/layout/navbar";
import heroImage from "@/assets/hero-bg.jpg";

const features = [
  {
    icon: BookOpen,
    title: "Learn",
    description: "Interactive lessons on sustainability, climate change, and environmental protection",
    color: "text-primary"
  },
  {
    icon: Zap,
    title: "Play",
    description: "Gamified challenges and quizzes that make learning about our planet fun and engaging",
    color: "text-accent"
  },
  {
    icon: Globe,
    title: "Act",
    description: "Real-world projects and initiatives to make a positive environmental impact",
    color: "text-success"
  }
];

const gameFeatures = [
  {
    icon: Trophy,
    title: "Leaderboards",
    description: "Compete with classmates and schools worldwide",
  },
  {
    icon: Award,
    title: "Eco Badges",
    description: "Unlock achievements for environmental milestones",
  },
  {
    icon: Users,
    title: "Team Challenges",
    description: "Collaborate on real environmental projects",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/80" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 animate-slide-up">
            Turn Eco Guilt,
            <span className="block text-4xl md:text-5xl bg-gradient-to-r from-green-300 via-lime-300 to-yellow-300
 bg-clip-text text-transparent">
              Into Eco Points.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto animate-slide-up" style={{animationDelay: '0.2s'}}>
            Join millions of students in the ultimate environmental education adventure. 
            Learn, play, and make a real difference for our planet.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{animationDelay: '0.4s'}}>
            <Link to="/auth">
              <EcoButton variant="hero" size="xl" className="group">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </EcoButton>
            </Link>
            {/* <EcoButton variant="glass" size="xl">
              Watch Demo
            </EcoButton> */}
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-success rounded-full animate-float opacity-60" />
        <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-accent rounded-full animate-float opacity-40" style={{animationDelay: '2s'}} />
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-primary-glow rounded-full animate-float opacity-80" style={{animationDelay: '4s'}} />
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How PlanetPulsePlay Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to start your environmental education journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <EcoCard 
                key={feature.title}
                variant="glass" 
                className="text-center animate-bounce-in"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <EcoCardHeader>
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-card flex items-center justify-center ${feature.color}`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <EcoCardTitle>{feature.title}</EcoCardTitle>
                </EcoCardHeader>
                <EcoCardContent>
                  <EcoCardDescription className="text-base">
                    {feature.description}
                  </EcoCardDescription>
                </EcoCardContent>
              </EcoCard>
            ))}
          </div>
        </div>
      </section>

      {/* Game Features */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Gamified Learning Experience
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Level up your environmental knowledge with our interactive features
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {gameFeatures.map((feature, index) => (
              <EcoCard 
                key={feature.title}
                hover="glow"
                className="animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <EcoCardHeader>
                  <feature.icon className="w-10 h-10 text-primary mb-4" />
                  <EcoCardTitle className="text-xl">{feature.title}</EcoCardTitle>
                </EcoCardHeader>
                <EcoCardContent>
                  <EcoCardDescription>
                    {feature.description}
                  </EcoCardDescription>
                </EcoCardContent>
              </EcoCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-hero text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Change the World?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students already making a difference. Start your eco-quest today!
          </p>
          <Link to="/auth">
            <EcoButton variant="glass" size="xl" className="text-white border-white/30 hover:bg-white/20">
              Join the Movement
              <ArrowRight className="ml-2 h-5 w-5" />
            </EcoButton>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-success rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-success-foreground" />
            </div>
            <span className="text-xl font-bold">PlanetPulsePlay</span>
          </div>
          <p className="text-muted-foreground">
            Empowering the next generation of environmental champions
          </p>
        </div>
      </footer>
    </div>
  );
}