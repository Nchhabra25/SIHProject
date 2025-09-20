import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Zap, 
  Award, 
  Trophy, 
  Lightbulb,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  Play,
  CheckCircle,
  Clock,
  Activity,
  Star,
  Target,
  Users,
  Globe,
  Heart,
  Leaf,
  TreePine,
  HandHeart,
  Baby,
  Dog,
  Gift,
  Utensils,
  Coins,
  CreditCard,
  Medal,
  FileText,
  Ticket,
  Image,
  Megaphone,
  Mic,
  FlaskConical,
  Puzzle
} from "lucide-react";
import { EcoButton } from "@/components/ui/eco-button";
import { EcoCard, EcoCardContent, EcoCardDescription, EcoCardHeader, EcoCardTitle } from "@/components/ui/eco-card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

// Phase data structure
const phases = [
  {
    id: "learn",
    title: "Learn",
    subtitle: "Build Your Foundation",
    description: "Master environmental concepts through interactive lessons and engaging content",
    icon: BookOpen,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    borderColor: "border-blue-200 dark:border-blue-800",
    textColor: "text-blue-600 dark:text-blue-400",
    items: [
      {
        title: "Climate Change Basics",
        description: "Understand the science behind climate change",
        href: "",
        icon: Globe,
        status: "available"
      },
      {
        title: "Renewable Energy",
        description: "Learn about sustainable energy sources",
        href: "",
        icon: Zap,
        status: "available"
      },
      {
        title: "Waste Management",
        description: "Master the art of reducing, reusing, and recycling",
        href: "",
        icon: Leaf,
        status: "available"
      },
      {
        title: "Biodiversity Conservation",
        description: "Explore the importance of protecting ecosystems",
        href: "",
        icon: TreePine,
        status: "available"
      }
    ]
  },
  {
    id: "act",
    title: "Act",
    subtitle: "Flaunt Your Learnings!",
    description: "Put your knowledge into practice with real-world environmental actions",
    icon: Zap,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50 dark:bg-green-950/20",
    borderColor: "border-green-200 dark:border-green-800",
    textColor: "text-green-600 dark:text-green-400",
    items: [
      {
        title: "Plant Saplings",
        description: "Contribute to reforestation efforts",
        href: "",
        icon: TreePine,
        status: "available"
      },
      {
        title: "Go on a Run",
        description: "Stay fit while reducing your carbon footprint",
        href: "",
        icon: Activity,
        status: "available"
      },
      {
        title: "Help Senior Citizens",
        description: "Support elderly community members",
        href: "",
        icon: HandHeart,
        status: "available"
      },
      {
        title: "Help Orphans",
        description: "Make a difference in children's lives",
        href: "",
        icon: Baby,
        status: "available"
      },
      {
        title: "Feed Animals",
        description: "Care for local wildlife and pets",
        href: "",
        icon: Dog,
        status: "available"
      },
      {
        title: "Donate",
        description: "Support environmental causes",
        href: "",
        icon: Gift,
        status: "available"
      },
      {
        title: "Langar",
        description: "Serve community meals",
        href: "",
        icon: Utensils,
        status: "available"
      }
    ]
  },
  {
    id: "earn",
    title: "Earn",
    subtitle: "Spend from your Good Karma!",
    description: "Reward yourself with eco-points, badges, and certificates for your actions",
    icon: Award,
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
    borderColor: "border-yellow-200 dark:border-yellow-800",
    textColor: "text-yellow-600 dark:text-yellow-400",
    items: [
      {
        title: "Eco-Coins",
        description: "Digital currency for sustainable actions",
        href: "",
        icon: Coins,
        status: "available"
      },
      {
        title: "Credits",
        description: "Academic credits for environmental learning",
        href: "",
        icon: CreditCard,
        status: "available"
      },
      {
        title: "Badges",
        description: "Achievement badges for milestones",
        href: "",
        icon: Medal,
        status: "available"
      },
      {
        title: "Certificates",
        description: "Official certificates of completion",
        href: "",
        icon: FileText,
        status: "available"
      },
      {
        title: "Coupons",
        description: "Discounts and rewards from partners",
        href: "",
        icon: Ticket,
        status: "available"
      }
    ]
  },
  {
    id: "compete",
    title: "Compete",
    subtitle: "Show Your Skills",
    description: "Challenge yourself and others in environmental competitions",
    icon: Trophy,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
    borderColor: "border-purple-200 dark:border-purple-800",
    textColor: "text-purple-600 dark:text-purple-400",
    items: [
      {
        title: "Hall of Fame",
        description: "Leaderboard of top environmental champions",
        href: "",
        icon: Trophy,
        status: "available"
      },
      {
        title: "Weekly Challenges",
        description: "Compete in time-limited environmental tasks",
        href: "",
        icon: Target,
        status: "available"
      },
      {
        title: "Team Competitions",
        description: "Join forces with others for group challenges",
        href: "",
        icon: Users,
        status: "available"
      }
    ]
  },
  {
    id: "innovate",
    title: "Innovate",
    subtitle: "Create Outcomes",
    description: "Use your creativity to develop new solutions for environmental challenges",
    icon: Lightbulb,
    color: "from-indigo-500 to-purple-500",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/20",
    borderColor: "border-indigo-200 dark:border-indigo-800",
    textColor: "text-indigo-600 dark:text-indigo-400",
    items: [
      {
        title: "Create Memes",
        description: "Spread environmental awareness through humor",
        href: "",
        icon: Image,
        status: "available"
      },
      {
        title: "Campaign Powers",
        description: "Launch your own environmental campaigns",
        href: "",
        icon: Megaphone,
        status: "available"
      },
      {
        title: "Eco-Voices",
        description: "Share your environmental stories and ideas",
        href: "",
        icon: Mic,
        status: "available"
      },
      {
        title: "Eco-Innovators Lab",
        description: "Develop innovative environmental solutions",
        href: "",
        icon: FlaskConical,
        status: "available"
      },
      {
        title: "Ideate Challenges",
        description: "Propose new environmental challenges",
        href: "",
        icon: Puzzle,
        status: "available"
      }
    ]
  }
];

export default function Pathways() {
  const [activePhase, setActivePhase] = useState<string | null>(null);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const phaseRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Auto-scroll to current phase
  useEffect(() => {
    if (phaseRefs.current[currentPhaseIndex]) {
      phaseRefs.current[currentPhaseIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [currentPhaseIndex]);

  const handlePhaseClick = (phaseId: string, index: number) => {
    setActivePhase(activePhase === phaseId ? null : phaseId);
    setCurrentPhaseIndex(index);
  };

  const navigateToPhase = (direction: 'prev' | 'next') => {
    if (isScrolling) return;
    
    setIsScrolling(true);
    const newIndex = direction === 'next' 
      ? Math.min(currentPhaseIndex + 1, phases.length - 1)
      : Math.max(currentPhaseIndex - 1, 0);
    
    setCurrentPhaseIndex(newIndex);
    setActivePhase(phases[newIndex].id);
    
    setTimeout(() => setIsScrolling(false), 1000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in_progress':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'locked':
        return <Star className="w-4 h-4 text-gray-400" />;
      default:
        return <Play className="w-4 h-4 text-primary" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      
      <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-success/10 py-5 px-5">
      <div className="">
                <Link to="/">
                  <EcoButton variant="outline" size="lg">← Go Back Home</EcoButton>
                </Link>
              </div>
        <div className="container mx-auto px-4 text-center">
        
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Your Eco Journey
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Follow the pathway from learning to innovation. Each phase builds upon the last, 
            creating a comprehensive environmental education experience.
          </motion.p>
        </div>
      </div>

    
      {/* Timeline */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.id}
              ref={el => phaseRefs.current[index] = el}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="mb-16"
            >
              <EcoCard 
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  activePhase === phase.id 
                    ? 'ring-2 ring-primary shadow-lg' 
                    : 'hover:shadow-md'
                } ${phase.bgColor} ${phase.borderColor}`}
                onClick={() => handlePhaseClick(phase.id, index)}
              >
                <EcoCardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${phase.color} flex items-center justify-center text-white shadow-lg`}>
                        <phase.icon className="w-8 h-8" />
                      </div>
                      <div>
                        <EcoCardTitle className={`text-2xl ${phase.textColor}`}>
                          {phase.title}
                        </EcoCardTitle>
                        <EcoCardDescription className="text-lg font-medium">
                          {phase.subtitle}
                        </EcoCardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={phase.textColor}>
                        Phase {index + 1}
                      </Badge>
                      {activePhase === phase.id ? (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-2">
                    {phase.description}
                  </p>
                </EcoCardHeader>

                <AnimatePresence>
                  {activePhase === phase.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <EcoCardContent className="pt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {phase.items.map((item, itemIndex) => (
                            <motion.div
                              key={item.title}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: itemIndex * 0.1 }}
                            >
                              <Link to={item.href}>
                                <EcoCard 
                                  className="h-full hover:shadow-md transition-all duration-200 group cursor-pointer"
                                  hover="glow"
                                >
                                  <EcoCardContent className="p-4">
                                    <div className="flex items-start space-x-3">
                                      <div className={`p-2 rounded-lg bg-gradient-to-r ${phase.color} text-white group-hover:scale-110 transition-transform`}>
                                        <item.icon className="w-5 h-5" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <h4 className="font-medium group-hover:text-primary transition-colors">
                                          {item.title}
                                        </h4>
                                        <p className="text-sm text-muted-foreground mt-1">
                                          {item.description}
                                        </p>
                                        <div className="flex items-center justify-between mt-3">
                                          <div className="flex items-center space-x-1">
                                            {getStatusIcon(item.status)}
                                            <span className="text-xs text-muted-foreground">
                                              {item.status === 'available' ? 'Available' : 
                                               item.status === 'completed' ? 'Completed' :
                                               item.status === 'in_progress' ? 'In Progress' : 'Locked'}
                                            </span>
                                          </div>
                                          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                        </div>
                                      </div>
                                    </div>
                                  </EcoCardContent>
                                </EcoCard>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </EcoCardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </EcoCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-success/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-4"
          >
            Ready to Start Your Journey?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Begin with the Learn phase and progress through each step of your environmental education journey.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <EcoButton size="lg" onClick={() => handlePhaseClick('learn', 0)}>
              <BookOpen className="w-5 h-5 mr-2" />
              Start Learning
            </EcoButton>
            <EcoButton variant="outline" size="lg" onClick={() => setCurrentPhaseIndex(0)}>
              <Play className="w-5 h-5 mr-2" />
              Explore All Phases
            </EcoButton>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
