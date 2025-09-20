import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { EcoButton } from "@/components/ui/eco-button";
import { EcoCard, EcoCardContent, EcoCardDescription, EcoCardHeader, EcoCardTitle } from "@/components/ui/eco-card";
import { Trophy, Wallet } from "lucide-react";

export default function StudentEarn() {
  const items = [
    { title: "Eco-Coins", href: "/earn/eco-coins", desc: "Earn coins via quests; redeem in partner stores." },
    { title: "Credits", href: "/earn/credits", desc: "Academic or house credits for eco leadership." },
    { title: "Badges", href: "/earn/badges", desc: "Collect seasonal and skill badges." },
    { title: "Certificates", href: "/earn/certificates", desc: "Verified participation and excellence certificates." },
    { title: "Coupons", href: "/earn/coupons", desc: "Exclusive partner coupons for eco-products." },
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
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Earn</h1>
              <p className="text-muted-foreground max-w-3xl">Spend from your Good Karma. Track and redeem your achievements.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs bg-primary/15 text-primary-foreground border">Redeemable</span>
                <span className="px-3 py-1 rounded-full text-xs bg-success/15 text-success-foreground border">Recognized</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-xl glass">
              <Wallet className="w-5 h-5" />
              <span className="text-sm">Good Karma</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          {[
            { k: "Eco-Coins", v: "3,450" },
            { k: "Badges", v: "14" },
            { k: "Certificates", v: "6" },
            { k: "Coupons", v: "9" },
          ].map((m) => (
            <div key={m.k} className="rounded-xl border bg-card p-4 text-center">
              <div className="text-2xl font-bold">{m.v}</div>
              <div className="text-xs text-muted-foreground mt-1">{m.k}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {items.map((a, i) => (
            <motion.div key={a.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i + 0.2 }}>
              <Link to={a.href}>
                <EcoCard hover="glow" className="h-full cursor-pointer">
                <EcoCardHeader>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-primary" />
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
          {["Complete challenges", "Accrue points", "Redeem rewards"].map((step, i) => (
            <EcoCard key={step}>
              <EcoCardHeader>
                <EcoCardTitle className="text-lg">{i + 1}. {step}</EcoCardTitle>
              </EcoCardHeader>
              <EcoCardContent>
                <EcoCardDescription>Keep a healthy streak to multiply earnings.</EcoCardDescription>
              </EcoCardContent>
            </EcoCard>
          ))}
        </div>
      </div>
    </div>
  );
}


