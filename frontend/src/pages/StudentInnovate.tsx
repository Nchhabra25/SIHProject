import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { EcoButton } from "@/components/ui/eco-button";
import { EcoCard, EcoCardContent, EcoCardDescription, EcoCardHeader, EcoCardTitle } from "@/components/ui/eco-card";
import { Lightbulb, Sparkles } from "lucide-react";

export default function StudentInnovate() {
  const items = [
    { title: "Create Memes", href: "/innovate/create-memes", desc: "Edutaining memes to spread eco-awareness." },
    { title: "Campaign Powers", href: "/innovate/campaign-powers", desc: "Run school/community campaigns with toolkits." },
    { title: "Eco-Voices", href: "/innovate/eco-voices", desc: "Podcasts, reels, and blogs from student leaders." },
    { title: "Eco-Innovators Lab", href: "/innovate/eco-innovators-lab", desc: "Prototype eco-solutions with mentors." },
    { title: "Ideate Challenges", href: "/innovate/ideate-challenges", desc: "Solve open-ended problems with creativity." },
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
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Innovate</h1>
              <p className="text-muted-foreground max-w-3xl">Create outcomes that inspire action. Showcase, collaborate, and iterate.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs bg-accent/15 text-accent-foreground border">Creative</span>
                <span className="px-3 py-1 rounded-full text-xs bg-primary/15 text-primary-foreground border">Impactful</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-xl glass">
              <Lightbulb className="w-5 h-5" />
              <span className="text-sm">Idea to impact</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          {[
            { k: "Projects", v: "42" },
            { k: "Contributors", v: "780" },
            { k: "Mentors", v: "35" },
            { k: "Showcases", v: "18" },
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
                    <Sparkles className="w-5 h-5 text-primary" />
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
          {["Ideate", "Prototype", "Showcase"].map((step, i) => (
            <EcoCard key={step}>
              <EcoCardHeader>
                <EcoCardTitle className="text-lg">{i + 1}. {step}</EcoCardTitle>
              </EcoCardHeader>
              <EcoCardContent>
                <EcoCardDescription>Work with peers and mentors; iterate quickly.</EcoCardDescription>
              </EcoCardContent>
            </EcoCard>
          ))}
        </div>
      </div>
    </div>
  );
}


