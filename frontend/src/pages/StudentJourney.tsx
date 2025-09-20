import { motion } from "framer-motion";
import { EcoCard, EcoCardContent, EcoCardHeader, EcoCardTitle, EcoCardDescription } from "@/components/ui/eco-card";

export default function StudentJourney() {
  const steps = [
    { title: "Enroll", desc: "Create your profile and set eco-goals." },
    { title: "Learn", desc: "Complete interactive lessons and quizzes." },
    { title: "Act", desc: "Join challenges and real-world campaigns." },
    { title: "Share", desc: "Post progress and help peers in discussions." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          Student Journey
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {steps.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i + 0.2 }}>
              <EcoCard hover="lift">
                <EcoCardHeader>
                  <EcoCardTitle className="text-xl">{s.title}</EcoCardTitle>
                </EcoCardHeader>
                <EcoCardContent>
                  <EcoCardDescription>{s.desc}</EcoCardDescription>
                </EcoCardContent>
              </EcoCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

