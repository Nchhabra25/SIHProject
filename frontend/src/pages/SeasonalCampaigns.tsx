import { motion } from "framer-motion";
import { EcoCard, EcoCardContent, EcoCardHeader, EcoCardTitle, EcoCardDescription } from "@/components/ui/eco-card";

export default function SeasonalCampaigns() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          Seasonal Campaigns
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-muted-foreground mb-8 max-w-2xl"
        >
          Join time-bound eco initiatives aligned with festivals and global days. Earn bonus eco-points for participation.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {["Earth Hour", "World Environment Day", "Plastic-Free July"].map((title, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.2 }}
            >
              <EcoCard hover="glow">
                <EcoCardHeader>
                  <EcoCardTitle className="text-xl">{title}</EcoCardTitle>
                </EcoCardHeader>
                <EcoCardContent>
                  <EcoCardDescription>
                    Take part in activities and challenges to contribute and win rewards.
                  </EcoCardDescription>
                </EcoCardContent>
              </EcoCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

