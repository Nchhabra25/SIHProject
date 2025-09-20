import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { EcoButton } from "@/components/ui/eco-button";
import { EcoCard, EcoCardContent, EcoCardDescription, EcoCardHeader, EcoCardTitle } from "@/components/ui/eco-card";
import { Target, CheckCircle2 } from "lucide-react";

export default function StudentAct() {
  const acts = [
    { title: "Plant Saplings", href: "/act/plant-saplings", desc: "Organize a drive and log planted saplings." },
    { title: "Go on a Run", href: "/act/go-on-a-run", desc: "Run + collect litter; share before/after pictures." },
    { title: "Help Senior Citizens", href: "/act/help-senior-citizens", desc: "Support chores, teach apps, or accompany to parks." },
    { title: "Help Orphans", href: "/act/help-orphans", desc: "Mentor, donate books, and host eco-workshops." },
    { title: "Feed Animals", href: "/act/feed-animals", desc: "Coordinate local feeding with safe practices." },
    { title: "Donate", href: "/act/donate", desc: "Fund saplings, cleanups, or education kits." },
    { title: "Langar", href: "/act/langar", desc: "Zero-waste community meals and reusable serveware." },
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
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Act</h1>
              <p className="text-muted-foreground max-w-3xl">Turn learning into measurable outcomes. Pick an action, log proofs, earn eco-points.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs bg-success/15 text-success-foreground border">On-ground</span>
                <span className="px-3 py-1 rounded-full text-xs bg-primary/15 text-primary-foreground border">Proof-based</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-xl glass">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-sm">Verified actions</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          {[
            { k: "Actions", v: "7" },
            { k: "Teams", v: "320" },
            { k: "Proofs", v: "1.8k" },
            { k: "Eco-Points", v: "95k" },
          ].map((m) => (
            <div key={m.k} className="rounded-xl border bg-card p-4 text-center">
              <div className="text-2xl font-bold">{m.v}</div>
              <div className="text-xs text-muted-foreground mt-1">{m.k}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {acts.map((a, i) => (
            <motion.div key={a.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i + 0.2 }}>
              <Link to={a.href}>
                <EcoCard hover="glow" className="h-full cursor-pointer">
                <EcoCardHeader>
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    <EcoCardTitle className="text-xl">{a.title}</EcoCardTitle>
                  </div>
                  </EcoCardHeader>
                  <EcoCardContent>
                    <EcoCardDescription className="text-base">{a.desc}</EcoCardDescription>
                  </EcoCardContent>
                </EcoCard>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {["Pick an action", "Do & document", "Submit & earn"].map((step, i) => (
            <EcoCard key={step}>
              <EcoCardHeader>
                <EcoCardTitle className="text-lg">{i + 1}. {step}</EcoCardTitle>
              </EcoCardHeader>
              <EcoCardContent>
                <EcoCardDescription>Follow the guidelines and upload simple proofs.</EcoCardDescription>
              </EcoCardContent>
            </EcoCard>
          ))}
        </div>
      </div>
    </div>
  );
}


