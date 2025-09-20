import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { EcoButton } from "@/components/ui/eco-button";
import { EcoCard, EcoCardContent, EcoCardDescription, EcoCardHeader, EcoCardTitle } from "@/components/ui/eco-card";
import { Medal, Crown } from "lucide-react";

export default function BadgesCertifications() {
  const points = [
    "Seasonal badges/certifications create positive FOMO to maximize participation each year",
    "Healthy competitive environment",
    "Win–win for students, schools, and partners",
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
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Seasonal Badges & Certifications</h1>
              <p className="text-muted-foreground">Positive FOMO, healthy competition, and recognition for all stakeholders.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs bg-primary/15 text-primary-foreground border">Recognition</span>
                <span className="px-3 py-1 rounded-full text-xs bg-success/15 text-success-foreground border">Participation</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-xl glass">
              <Crown className="w-5 h-5" />
              <span className="text-sm">Seasonal spotlight</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Showcase */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
          {["Plastic Warrior 2025", "Climate Crusader", "Waste Warrior", "Water Steward"].map((b) => (
            <div key={b} className="rounded-xl border bg-card p-4 text-center badge-glow">
              <div className="text-sm font-medium">{b}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {points.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.2 }}
            >
              <EcoCard hover="glow">
                <EcoCardHeader>
                  <div className="flex items-center gap-2">
                    <Medal className="w-5 h-5 text-primary" />
                    <EcoCardTitle className="text-xl">Key Benefit {i + 1}</EcoCardTitle>
                  </div>
                </EcoCardHeader>
                <EcoCardContent>
                  <EcoCardDescription className="text-base">{p}</EcoCardDescription>
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


