import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { EcoButton } from "@/components/ui/eco-button";
import { EcoCard, EcoCardContent, EcoCardDescription, EcoCardHeader, EcoCardTitle } from "@/components/ui/eco-card";
import { Leaf, CalendarRange, Globe2 } from "lucide-react";

export default function ThemeBased() {
  const items = [
    {
      title: "Plastic-Free July",
      description:
        "Say no to single-use plastics. Daily micro-actions, campus drives, and community challenges.",
      href: "/theme-based/plastic-free-july",
    },
    {
      title: "Earth Hour",
      description:
        "Turn off electricity for one hour, run candlelight knowledge circles, and measure saved kWh.",
      href: "/theme-based/earth-hour",
    },
    {
      title: "Green December",
      description:
        "DIYs, sapling plantations, best-out-of-waste, putting waste in action—not hibernation in bins.",
      href: "/theme-based/green-december",
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
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Theme-based Global Missions</h1>
              <p className="text-muted-foreground max-w-3xl">
                Crown jewel of the platform—turn learning into action across seasons and measure real eco-benefits.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs bg-accent/15 text-accent-foreground border">Seasonal</span>
                <span className="px-3 py-1 rounded-full text-xs bg-success/15 text-success-foreground border">Actionable</span>
                <span className="px-3 py-1 rounded-full text-xs bg-primary/15 text-primary-foreground border">Measurable</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-xl glass">
              <CalendarRange className="w-5 h-5" />
              <span className="text-sm">Quarterly drops</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8">
          {[
            { title: "Cross-Audience Appeal", desc: "Engage students, parents, schools, and communities." },
            { title: "Learning → Action", desc: "Convert theory into measurable on-ground outcomes." },
            { title: "Seasonal Momentum", desc: "Ride global moments to maximize participation." },
          ].map((h, i) => (
            <motion.div key={h.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}>
              <EcoCard hover="glow" className="h-full">
                <EcoCardHeader>
                  <EcoCardTitle className="text-lg">{h.title}</EcoCardTitle>
                </EcoCardHeader>
                <EcoCardContent>
                  <EcoCardDescription>{h.desc}</EcoCardDescription>
                </EcoCardContent>
              </EcoCard>
            </motion.div>
          ))}
        </div>

        {/* Impact metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
          {[
            { k: "Participants", v: "25k+" },
            { k: "Missions", v: "120+" },
            { k: "Eco-Points", v: "1.2M" },
            { k: "Saplings", v: "45k" },
          ].map((m) => (
            <div key={m.k} className="rounded-xl border bg-card p-4 text-center">
              <div className="text-2xl font-bold">{m.v}</div>
              <div className="text-xs text-muted-foreground mt-1">{m.k}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.2 }}
            >
              <Link to={item.href}>
                <EcoCard hover="glow" className="h-full cursor-pointer">
                  <EcoCardHeader>
                    <div className="flex items-center gap-2">
                      <Leaf className="w-5 h-5 text-primary" />
                      <EcoCardTitle className="text-xl">{item.title}</EcoCardTitle>
                    </div>
                  </EcoCardHeader>
                  <EcoCardContent>
                    <EcoCardDescription>{item.description}</EcoCardDescription>
                    <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                      <Globe2 className="w-4 h-4" />
                      Global Reach
                    </div>
                  </EcoCardContent>
                </EcoCard>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8">
          <div className="grid md:grid-cols-3 gap-6">
            <EcoCard>
              <EcoCardHeader>
                <EcoCardTitle className="text-lg">1) Choose a mission</EcoCardTitle>
              </EcoCardHeader>
              <EcoCardContent>
                <EcoCardDescription>Select a seasonal theme aligned to your context and timeline.</EcoCardDescription>
              </EcoCardContent>
            </EcoCard>
            <EcoCard>
              <EcoCardHeader>
                <EcoCardTitle className="text-lg">2) Take action</EcoCardTitle>
              </EcoCardHeader>
              <EcoCardContent>
                <EcoCardDescription>Run activities, log proofs, and invite peers to collaborate.</EcoCardDescription>
              </EcoCardContent>
            </EcoCard>
            <EcoCard>
              <EcoCardHeader>
                <EcoCardTitle className="text-lg">3) Track impact</EcoCardTitle>
              </EcoCardHeader>
              <EcoCardContent>
                <EcoCardDescription>Earn eco-points, badges, and share your measurable outcomes.</EcoCardDescription>
              </EcoCardContent>
            </EcoCard>
          </div>
        </div>
      </div>
    </div>
  );
}


