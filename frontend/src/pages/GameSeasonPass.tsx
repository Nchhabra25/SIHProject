import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { EcoButton } from "@/components/ui/eco-button";
import { EcoCard, EcoCardContent, EcoCardDescription, EcoCardHeader, EcoCardTitle } from "@/components/ui/eco-card";
import { BadgeCheck, Sparkles } from "lucide-react";

export default function GameSeasonPass() {
  const tiers = [
    {
      title: "Learning Quests",
      desc: "Complete learning paths to earn eco-points and unlock the pass.",
    },
    {
      title: "Action Quests",
      desc: "Perform real-world eco-actions and log proofs for extra rewards.",
    },
    {
      title: "Creativity Quests",
      desc: "Create memes, campaigns, and projects to inspire others.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-hero/10 border-b">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <div>
                <Link to="/">
                  <EcoButton variant="outline" size="sm">← Go Back Home</EcoButton>
                </Link>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Game Season Pass</h1>
              <p className="text-muted-foreground">Complete mini-quests to unlock exclusive titles and badges.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs bg-primary/15 text-primary-foreground border">Quests</span>
                <span className="px-3 py-1 rounded-full text-xs bg-success/15 text-success-foreground border">Eco-points</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-xl glass">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm">Exclusive rewards</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Progress preview */}
        <div className="mb-8 grid md:grid-cols-3 gap-4">
          {["Tier XP", "Weekly Quests", "Exclusive Titles"].map((h) => (
            <div key={h} className="rounded-xl border bg-card p-4 text-center">
              <div className="text-sm text-muted-foreground">{h}</div>
              <div className="mt-2 h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-2 bg-primary rounded-full" style={{ width: `${60 + Math.random()*30}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.2 }}
            >
              <EcoCard variant="gradient" hover="glow" className="h-full">
                <EcoCardHeader>
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="w-5 h-5 text-primary" />
                    <EcoCardTitle className="text-xl">{tier.title}</EcoCardTitle>
                  </div>
                </EcoCardHeader>
                <EcoCardContent>
                  <EcoCardDescription className="text-base">{tier.desc}</EcoCardDescription>
                </EcoCardContent>
              </EcoCard>
            </motion.div>
          ))}
        </div>

        {/* <div className="mt-8">
          <Link to="/">
            <EcoButton variant="outline">Go Back Home</EcoButton>
          </Link>
        </div> */}

        {/* How to unlock */}
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {["Finish quests", "Reach tier threshold", "Claim rewards"].map((step, i) => (
            <EcoCard key={step}>
              <EcoCardHeader>
                <EcoCardTitle className="text-lg">{i + 1}. {step}</EcoCardTitle>
              </EcoCardHeader>
              <EcoCardContent>
                <EcoCardDescription>Keep your streak, earn eco-points, and unlock seasonal titles.</EcoCardDescription>
              </EcoCardContent>
            </EcoCard>
          ))}
        </div>
      </div>
    </div>
  );
}


