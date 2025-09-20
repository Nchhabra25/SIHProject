import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Award } from "lucide-react";
import { EcoCard, EcoCardContent, EcoCardHeader, EcoCardTitle } from "@/components/ui/eco-card";

type Student = {
  id: number;
  name: string;
  action: string;
  points: number;
  photoUrl?: string;
};

const students: Student[] = [
  { id: 1, name: "Aarav Shah", action: "Planted 200 saplings", points: 101 },
  { id: 2, name: "Mia Kapoor", action: "Led beach cleanup", points: 52 },
  { id: 3, name: "Noah Iyer", action: "Organized e-waste drive", points: 45 },
  { id: 4, name: "Zara Rao", action: "Saved water campaign", points: 30 },
  { id: 5, name: "Ishan Patel", action: "Green transport pledge", points: 24 },
  { id: 6, name: "Liya Das", action: "Community recycling", points: 10 },
];

export default function HallOfFame() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Link to="/student-journey" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Student Journey
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl md:text-5xl font-bold text-center mb-8"
        >
          Student Hall Of Fame
        </motion.h1>

        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
          Celebrating students creating real-world impact. These highlights are mock data examples and will update once connected to a backend.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((s, i) => (
            <motion.div key={s.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}>
              <EcoCard hover="glow" className="relative overflow-hidden">
                {/* Badge */}
                <div className="absolute -top-2 -right-2 bg-gradient-success text-success-foreground rounded-xl px-3 py-1 text-xs font-bold shadow-sm">
                  {s.points} pts
                </div>
                <EcoCardHeader>
                  <EcoCardTitle className="flex items-center space-x-2 text-xl">
                    <Award className="w-5 h-5 text-primary" />
                    <span>{s.name}</span>
                  </EcoCardTitle>
                </EcoCardHeader>
                <EcoCardContent>
                  <div className="aspect-[16/9] rounded-xl bg-muted/50 border mb-4 flex items-center justify-center text-muted-foreground">
                    {s.photoUrl ? (
                      <img src={s.photoUrl} alt={s.name} className="w-full h-full object-cover rounded-xl" />
                    ) : (
                      <span>Photo Placeholder</span>
                    )}
                  </div>
                  <div className="text-sm md:text-base">
                    <div className="font-medium">What they did</div>
                    <div className="text-muted-foreground">{s.action}</div>
                  </div>
                </EcoCardContent>
              </EcoCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

