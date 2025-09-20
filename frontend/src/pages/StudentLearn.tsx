import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { EcoButton } from "@/components/ui/eco-button";
import { EcoCard, EcoCardContent, EcoCardDescription, EcoCardHeader, EcoCardTitle } from "@/components/ui/eco-card";
import { BookOpenCheck, GraduationCap, Sparkles } from "lucide-react";

export default function StudentLearn() {
  const modules = [
    { title: "Climate Basics", desc: "Understand greenhouse effect, carbon cycle, and tipping points." },
    { title: "Energy & Mobility", desc: "Renewables, EVs, and smarter consumption." },
    { title: "Waste & Water", desc: "Reduce, reuse, recycle—plus water stewardship." },
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
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Learn</h1>
              <p className="text-muted-foreground max-w-3xl">Curated learning paths with quizzes and micro-projects to transform knowledge into action.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs bg-accent/15 text-accent-foreground border">Curriculum</span>
                <span className="px-3 py-1 rounded-full text-xs bg-success/15 text-success-foreground border">Quizzes</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-xl glass">
              <GraduationCap className="w-5 h-5" />
              <span className="text-sm">Skill growth</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Milestones */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          {[
            { k: "Modules", v: "18" },
            { k: "Quizzes", v: "36" },
            { k: "Avg. Score", v: "84%" },
            { k: "Projects", v: "12" },
          ].map((m) => (
            <div key={m.k} className="rounded-xl border bg-card p-4 text-center">
              <div className="text-2xl font-bold">{m.v}</div>
              <div className="text-xs text-muted-foreground mt-1">{m.k}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {modules.map((m, i) => (
            <motion.div key={m.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i + 0.2 }}>
              <EcoCard hover="glow" className="h-full">
                <EcoCardHeader>
                  <div className="flex items-center gap-2">
                    <BookOpenCheck className="w-5 h-5 text-primary" />
                    <EcoCardTitle className="text-xl">{m.title}</EcoCardTitle>
                  </div>
                </EcoCardHeader>
                <EcoCardContent>
                  <EcoCardDescription className="text-base">{m.desc}</EcoCardDescription>
                </EcoCardContent>
              </EcoCard>
            </motion.div>
          ))}
        </div>

        {/* Pathway */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {["Watch & read", "Practice & quiz", "Reflect & apply"].map((step, i) => (
            <EcoCard key={step}>
              <EcoCardHeader>
                <EcoCardTitle className="text-lg">{i + 1}. {step}</EcoCardTitle>
              </EcoCardHeader>
              <EcoCardContent>
                <EcoCardDescription>Build mastery with structured, bite-sized activities.</EcoCardDescription>
              </EcoCardContent>
            </EcoCard>
          ))}
        </div>
      </div>
    </div>
  );
}


