import { useState, useEffect } from "react";
import { CheckCircle, Clock, Trophy, Target, Zap, Leaf, Recycle, Home } from "lucide-react";
import { EcoButton } from "@/components/ui/eco-button";
import { EcoCard, EcoCardContent, EcoCardDescription, EcoCardHeader, EcoCardTitle } from "@/components/ui/eco-card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { getUserProgress, completeChallenge, unlockBadge } from "@/utils/storage";
import { triggerConfetti } from "@/utils/confetti";

const challenges = [
  {
    id: 'waste-segregation',
    title: 'Waste Segregation Master',
    description: 'Separate waste into recyclable, compostable, and non-recyclable categories at home for 7 days',
    icon: Recycle,
    difficulty: 'Easy',
    duration: '7 days',
    points: 50,
    category: 'Waste Management',
    instructions: [
      'Set up three separate bins at home',
      'Label them: Recyclable, Compostable, Non-recyclable',
      'Practice sorting your waste for a full week',
      'Take a photo of your setup and sorted waste'
    ]
  },
  {
    id: 'energy-saving',
    title: 'Energy Saving Champion',
    description: 'Reduce household energy consumption by implementing 5 energy-saving practices',
    icon: Zap,
    difficulty: 'Medium',
    duration: '2 weeks',
    points: 75,
    category: 'Energy Conservation',
    instructions: [
      'Switch to LED bulbs in 3 rooms',
      'Unplug devices when not in use',
      'Use natural light during daytime',
      'Set AC/heater to optimal temperature',
      'Track your electricity usage'
    ]
  },
  {
    id: 'water-conservation',
    title: 'Water Guardian',
    description: 'Implement water-saving techniques and track your daily water usage',
    icon: Target,
    difficulty: 'Easy',
    duration: '5 days',
    points: 40,
    category: 'Water Conservation',
    instructions: [
      'Fix any leaking taps or pipes',
      'Take shorter showers (under 5 minutes)',
      'Collect rainwater for plants',
      'Use a bucket instead of hose for washing',
      'Track and log your daily water usage'
    ]
  },
  {
    id: 'plant-care',
    title: 'Green Thumb Initiative',
    description: 'Plant and nurture 3 plants or trees to help improve air quality',
    icon: Leaf,
    difficulty: 'Medium',
    duration: '1 month',
    points: 100,
    category: 'Environmental Action',
    instructions: [
      'Choose native plants suitable for your area',
      'Plant seeds or saplings in pots or garden',
      'Water and care for them daily',
      'Document their growth with photos',
      'Share your experience with friends'
    ]
  },
  {
    id: 'eco-transport',
    title: 'Eco-Friendly Commuter',
    description: 'Use sustainable transportation methods for all trips in a week',
    icon: Home,
    difficulty: 'Hard',
    duration: '1 week',
    points: 90,
    category: 'Transportation',
    instructions: [
      'Walk or cycle for short distances',
      'Use public transport for longer trips',
      'Carpool when private vehicle is necessary',
      'Avoid unnecessary trips by planning ahead',
      'Log all your trips and transport methods'
    ]
  },
  {
    id: 'plastic-free',
    title: 'Plastic-Free Pioneer',
    description: 'Live without single-use plastics for an entire week',
    icon: Trophy,
    difficulty: 'Hard',
    duration: '1 week',
    points: 85,
    category: 'Waste Reduction',
    instructions: [
      'Use reusable bags for shopping',
      'Carry a reusable water bottle',
      'Avoid packaged foods when possible',
      'Use metal or glass containers',
      'Document your plastic-free alternatives'
    ]
  }
];

export default function Challenges() {
  const [progress, setProgress] = useState(getUserProgress());
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setProgress(getUserProgress());
  }, []);

  const handleChallengeComplete = (challengeId: string, points: number) => {
    const updatedProgress = completeChallenge(challengeId, points);
    setProgress(updatedProgress);
    
    // Trigger success confetti
    triggerConfetti('success');
    
    // Show success toast
    toast({
      title: "Challenge Completed! 🎉",
      description: `You earned ${points} eco-points! Keep up the great work!`,
      duration: 5000,
    });

    // Check for badge unlocks
    const completedCount = updatedProgress.completedChallenges.length;
    let newBadge = '';
    
    if (completedCount >= 3 && !updatedProgress.unlockedBadges.includes('challenge-rookie')) {
      newBadge = 'challenge-rookie';
      unlockBadge('challenge-rookie');
    } else if (completedCount >= 5 && !updatedProgress.unlockedBadges.includes('eco-warrior')) {
      newBadge = 'eco-warrior';
      unlockBadge('eco-warrior');
    }
    
    if (newBadge) {
      setTimeout(() => {
        triggerConfetti('badge');
        toast({
          title: "New Badge Unlocked! 🏆",
          description: `You've unlocked the ${newBadge.replace('-', ' ')} badge!`,
          duration: 5000,
        });
      }, 2000);
    }
  };

  const isCompleted = (challengeId: string) => {
    return progress.completedChallenges.includes(challengeId);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-success';
      case 'Medium': return 'text-accent';
      case 'Hard': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const activeChallenges = challenges.filter(c => !isCompleted(c.id));
  const completedChallenges = challenges.filter(c => isCompleted(c.id));

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 animate-slide-up">
            🏆 Eco Challenges
          </h1>
          <p className="text-muted-foreground text-lg animate-slide-up" style={{animationDelay: '0.1s'}}>
            Take action for the planet! Complete real-world challenges and earn eco-points.
          </p>
        </div>

        {/* Progress Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <EcoCard className="animate-bounce-in" style={{animationDelay: '0.2s'}}>
            <EcoCardContent className="p-4 text-center">
              <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
              <div className="text-2xl font-bold">{completedChallenges.length}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </EcoCardContent>
          </EcoCard>
          
          <EcoCard className="animate-bounce-in" style={{animationDelay: '0.3s'}}>
            <EcoCardContent className="p-4 text-center">
              <Clock className="w-8 h-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold">{activeChallenges.length}</div>
              <div className="text-sm text-muted-foreground">Available</div>
            </EcoCardContent>
          </EcoCard>
          
          <EcoCard className="animate-bounce-in" style={{animationDelay: '0.4s'}}>
            <EcoCardContent className="p-4 text-center">
              <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{progress.ecoPoints}</div>
              <div className="text-sm text-muted-foreground">Eco-points</div>
            </EcoCardContent>
          </EcoCard>
          
          <EcoCard className="animate-bounce-in" style={{animationDelay: '0.5s'}}>
            <EcoCardContent className="p-4 text-center">
              <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{progress.streak}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </EcoCardContent>
          </EcoCard>
        </div>

        {/* Active Challenges */}
        {activeChallenges.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Available Challenges</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeChallenges.map((challenge, index) => (
                <EcoCard 
                  key={challenge.id}
                  hover="glow"
                  className="cursor-pointer animate-slide-up"
                  style={{animationDelay: `${0.6 + index * 0.1}s`}}
                >
                  <EcoCardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <challenge.icon className="w-10 h-10 text-primary" />
                      <Badge variant="outline" className={getDifficultyColor(challenge.difficulty)}>
                        {challenge.difficulty}
                      </Badge>
                    </div>
                    <EcoCardTitle className="text-lg">{challenge.title}</EcoCardTitle>
                    <EcoCardDescription>{challenge.description}</EcoCardDescription>
                  </EcoCardHeader>
                  <EcoCardContent>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Category:</span>
                        <span>{challenge.category}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Duration:</span>
                        <span>{challenge.duration}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Reward:</span>
                        <span className="text-primary font-medium">+{challenge.points} points</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <EcoButton
                        variant="outline"
                        className="w-full"
                        onClick={() => setSelectedChallenge(
                          selectedChallenge === challenge.id ? null : challenge.id
                        )}
                      >
                        {selectedChallenge === challenge.id ? 'Hide Details' : 'View Details'}
                      </EcoButton>
                      
                      {selectedChallenge === challenge.id && (
                        <div className="mt-4 p-4 bg-muted/50 rounded-xl animate-fade-in">
                          <h4 className="font-semibold mb-3">Instructions:</h4>
                          <ul className="space-y-2 text-sm">
                            {challenge.instructions.map((instruction, idx) => (
                              <li key={idx} className="flex items-start space-x-2">
                                <span className="text-primary mt-1">•</span>
                                <span>{instruction}</span>
                              </li>
                            ))}
                          </ul>
                          <EcoButton
                            className="w-full mt-4"
                            onClick={() => handleChallengeComplete(challenge.id, challenge.points)}
                          >
                            Mark as Complete
                          </EcoButton>
                        </div>
                      )}
                    </div>
                  </EcoCardContent>
                </EcoCard>
              ))}
            </div>
          </div>
        )}

        {/* Completed Challenges */}
        {completedChallenges.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Completed Challenges 🎉</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedChallenges.map((challenge, index) => (
                <EcoCard 
                  key={challenge.id}
                  variant="success"
                  className="animate-slide-up opacity-75"
                  style={{animationDelay: `${0.2 + index * 0.1}s`}}
                >
                  <EcoCardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <challenge.icon className="w-10 h-10 text-success-foreground" />
                      <CheckCircle className="w-6 h-6 text-success-foreground" />
                    </div>
                    <EcoCardTitle className="text-lg text-success-foreground">
                      {challenge.title}
                    </EcoCardTitle>
                    <EcoCardDescription className="text-success-foreground/80">
                      {challenge.description}
                    </EcoCardDescription>
                  </EcoCardHeader>
                  <EcoCardContent>
                    <Badge variant="default" className="bg-success-foreground text-success">
                      Completed - {challenge.points} points earned
                    </Badge>
                  </EcoCardContent>
                </EcoCard>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}