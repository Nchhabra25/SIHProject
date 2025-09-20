import { motion } from "framer-motion";
import { EcoCard, EcoCardContent, EcoCardHeader, EcoCardTitle, EcoCardDescription } from "@/components/ui/eco-card";

export default function Rewards() {
  const rewards = [
    { title: "Bronze Badge", points: 500 },
    { title: "Silver Badge", points: 1000 },
    { title: "Gold Badge", points: 2000 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          Rewards
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {rewards.map((r, i) => (
            <motion.div key={r.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i + 0.2 }}>
              <EcoCard variant="glass" hover="glow">
                <EcoCardHeader>
                  <EcoCardTitle className="text-xl">{r.title}</EcoCardTitle>
                </EcoCardHeader>
                <EcoCardContent>
                  <EcoCardDescription>Redeemable at {r.points} eco-points.</EcoCardDescription>
                </EcoCardContent>
              </EcoCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

