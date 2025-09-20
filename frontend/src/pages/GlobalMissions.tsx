import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { EcoButton } from "@/components/ui/eco-button";
import { EcoCard, EcoCardContent, EcoCardDescription, EcoCardHeader, EcoCardTitle } from "@/components/ui/eco-card";
import { Globe2, Trophy } from "lucide-react";

export default function GlobalMissions() {
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
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Global Missions</h1>
              <p className="text-muted-foreground max-w-3xl">Tie up with worldwide events. Participate, log outcomes, and compare impact.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs bg-accent/15 text-accent-foreground border">Worldwide</span>
                <span className="px-3 py-1 rounded-full text-xs bg-primary/15 text-primary-foreground border">Verified</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-xl glass">
              <Trophy className="w-5 h-5" />
              <span className="text-sm">Bonus eco-points</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
          {[
            { k: "Countries", v: "35+" },
            { k: "Volunteers", v: "12k" },
            { k: "Cleanups", v: "500+" },
            { k: "Waste Diverted", v: "80t" },
          ].map((m) => (
            <div key={m.k} className="rounded-xl border bg-card p-4 text-center">
              <div className="text-2xl font-bold">{m.v}</div>
              <div className="text-xs text-muted-foreground mt-1">{m.k}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {["World Environment Day", "International Coastal Cleanup"].map((title, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.2 }}
            >
              <EcoCard hover="glow">
                <EcoCardHeader>
                  <div className="flex items-center gap-2">
                    <Globe2 className="w-5 h-5 text-primary" />
                    <EcoCardTitle className="text-xl">{title}</EcoCardTitle>
                  </div>
                </EcoCardHeader>
                <EcoCardContent>
                  <EcoCardDescription>
                    Collaborate globally and log measurable outcomes.
                  </EcoCardDescription>
                </EcoCardContent>
              </EcoCard>
            </motion.div>
          ))}
        </div>


        {/* How it works */}
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {["Register", "Participate", "Report"].map((step, i) => (
            <EcoCard key={step}>
              <EcoCardHeader>
                <EcoCardTitle className="text-lg">{i + 1}. {step}</EcoCardTitle>
              </EcoCardHeader>
              <EcoCardContent>
                <EcoCardDescription>Follow the global event guidelines and record outcomes.</EcoCardDescription>
              </EcoCardContent>
            </EcoCard>
          ))}
        </div>
      </div>
    </div>
  );
}


