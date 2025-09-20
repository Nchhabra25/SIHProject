import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { EcoButton } from "@/components/ui/eco-button";
import { EcoCard, EcoCardContent, EcoCardDescription, EcoCardHeader, EcoCardTitle } from "@/components/ui/eco-card";
import { BookOpenCheck, Sparkles } from "lucide-react";

export default function LearningCapsules() {
  const capsules = [
    { title: "Coconut Shell Uses", desc: "Craft eco-friendly items and reduce plastic." },
    { title: "Reduce Paper", desc: "Digital-first habits during festive seasons." },
    { title: "Eco-friendly Worships", desc: "Diwali, Holi, and more—celebrate sustainably." },
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
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Learning Capsules</h1>
              <p className="text-muted-foreground">Bite-sized, festive-aligned quests to apply knowledge quickly.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs bg-accent/15 text-accent-foreground border">Quicksprint</span>
                <span className="px-3 py-1 rounded-full text-xs bg-success/15 text-success-foreground border">Practical</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-xl glass">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm">New drops monthly</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Capsule timeline */}
        <div className="mb-8 grid md:grid-cols-3 gap-4">
          {["Discover", "Try", "Share"].map((t, i) => (
            <div key={t} className="rounded-xl border bg-card p-4">
              <div className="text-sm text-muted-foreground">Step {i + 1}</div>
              <div className="mt-1 font-semibold">{t}</div>
              <div className="mt-2 h-1 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-1 bg-success rounded-full" style={{ width: `${70 + i*10}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {capsules.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.2 }}
            >
              <EcoCard hover="glow" className="h-full">
                <EcoCardHeader>
                  <div className="flex items-center gap-2">
                    <BookOpenCheck className="w-5 h-5 text-primary" />
                    <EcoCardTitle className="text-xl">{cap.title}</EcoCardTitle>
                  </div>
                </EcoCardHeader>
                <EcoCardContent>
                  <EcoCardDescription className="text-base">{cap.desc}</EcoCardDescription>
                </EcoCardContent>
              </EcoCard>
            </motion.div>
          ))}
        </div>

        <div className="mt-8">
          <Link to="/">
            <EcoButton variant="outline">Go Back Home</EcoButton>
          </Link>
        </div>
      </div>
    </div>
  );
}


