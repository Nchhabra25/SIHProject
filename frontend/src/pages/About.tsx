import { Link } from "react-router-dom";
import { ArrowRight, Users, Globe, Award, Heart, Lightbulb, Target } from "lucide-react";
import { EcoButton } from "@/components/ui/eco-button";
import { EcoCard, EcoCardContent, EcoCardDescription, EcoCardHeader, EcoCardTitle } from "@/components/ui/eco-card";
import { Navbar } from "@/components/layout/navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const stats = [
  { number: "50K+", label: "Active Students", icon: Users },
  { number: "2.5M+", label: "Lessons Completed", icon: Globe },
  { number: "500K+", label: "Badges Earned", icon: Award },
  { number: "150+", label: "Partner Schools", icon: Heart }
];

const team = [
  {
    name: "Dr. Sarah Chen",
    role: "Founder & CEO",
    bio: "Environmental scientist with 15+ years in climate education",
    avatar: "SC"
  },
  {
    name: "Alex Rivera",
    role: "Head of Education",
    bio: "Former teacher passionate about gamified learning",
    avatar: "AR"
  },
  {
    name: "Maya Patel",
    role: "CTO",
    bio: "Tech leader building sustainable digital solutions",
    avatar: "MP"
  },
  {
    name: "Dr. James Wilson",
    role: "Chief Science Officer",
    bio: "Climate researcher and curriculum designer",
    avatar: "JW"
  }
];

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We constantly innovate to make environmental education more engaging and effective."
  },
  {
    icon: Heart,
    title: "Impact",
    description: "Every feature we build is designed to create real, measurable environmental impact."
  },
  {
    icon: Users,
    title: "Community",
    description: "We believe in the power of collective action and community-driven change."
  },
  {
    icon: Target,
    title: "Accessibility",
    description: "Quality environmental education should be accessible to every student, everywhere."
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-background animate-slide-up">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-gradient-hero text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-slide-up">
            About PlanetPulsePlay
            <span className="block text-4xl md:text-5xl bg-gradient-to-r from-green-300 to-blue-300 bg-clip-text text-transparent">
              Our Mission
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto animate-slide-up" style={{animationDelay: '0.2s'}}>
            We're on a mission to empower the next generation with the knowledge and tools they need to protect our planet
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 animate-slide-up">
            Empowering Tomorrow's Environmental Leaders
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-12 animate-slide-up" style={{animationDelay: '0.1s'}}>
            Founded in 2023, PlanetPulsePlay emerged from a simple belief: environmental education should be as engaging 
            as it is important. We've transformed traditional learning into an interactive, gamified experience that 
            inspires students to become active participants in creating a sustainable future.
          </p>
          
          <EcoCard variant="gradient" className="text-left animate-slide-up" style={{animationDelay: '0.2s'}}>
            <EcoCardContent className="p-8">
              <blockquote className="text-2xl font-medium text-white/95 italic leading-relaxed">
                "Education is the most powerful weapon which you can use to change the world. 
                We're putting that weapon in the hands of every student who cares about our planet's future."
              </blockquote>
              <footer className="mt-6 text-white/80">
                — Dr. Sarah Chen, Founder & CEO
              </footer>
            </EcoCardContent>
          </EcoCard>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our Impact in Numbers
            </h2>
            <p className="text-xl text-muted-foreground">
              Together, we're building a generation of environmental champions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <EcoCard 
                key={stat.label}
                variant="glass"
                className="text-center animate-bounce-in"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <EcoCardContent className="p-8">
                  <stat.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </EcoCardContent>
              </EcoCard>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Passionate educators, scientists, and technologists working together to change the world
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <EcoCard 
                key={member.name}
                hover="lift"
                className="text-center animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <EcoCardHeader>
                  <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/20">
                    <AvatarImage src={`/team-${member.avatar.toLowerCase()}.jpg`} />
                    <AvatarFallback className="text-2xl bg-gradient-success text-success-foreground">{member.avatar}</AvatarFallback>
                  </Avatar>
                  <EcoCardTitle className="text-xl">{member.name}</EcoCardTitle>
                  <EcoCardDescription className="text-primary font-medium">
                    {member.role}
                  </EcoCardDescription>
                </EcoCardHeader>
                <EcoCardContent>
                  <p className="text-sm text-muted-foreground">
                    {member.bio}
                  </p>
                </EcoCardContent>
              </EcoCard>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <EcoCard 
                key={value.title}
                className="animate-bounce-in"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <EcoCardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-success rounded-xl flex items-center justify-center">
                      <value.icon className="w-6 h-6 text-success-foreground" />
                    </div>
                    <EcoCardTitle className="text-xl">{value.title}</EcoCardTitle>
                  </div>
                </EcoCardHeader>
                <EcoCardContent>
                  <EcoCardDescription>
                    {value.description}
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
            Join Our Mission
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Ready to be part of the solution? Start your environmental education journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <EcoButton variant="glass" size="xl" className="text-white border-white/30 hover:bg-white/20">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </EcoButton>
            </Link>
            <Link to="/features">
              <EcoButton variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-primary">
                Learn More
              </EcoButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}