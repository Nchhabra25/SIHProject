import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { EcoButton } from "@/components/ui/eco-button";
import { Medal } from "lucide-react";

export default function EarnBadges() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-hero/10 border-b">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <Link to="/">
                <EcoButton variant="outline" size="sm">← Go Back Home</EcoButton>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Medal className="w-6 h-6 text-primary" />
              <h1 className="text-2xl md:text-3xl font-bold">Badges</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <p className="text-muted-foreground mb-6">Earn seasonal, skill, and leadership badges to showcase your journey.
        </p>
        <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8">
          {["Plastic Warrior", "Climate Crusader", "Waste Warrior", "Water Steward"].map(b=> (
            <div key={b} className="rounded-xl border bg-card p-4 text-center badge-glow">
              <div className="text-sm font-medium">{b}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


