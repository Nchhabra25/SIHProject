import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { EcoButton } from "@/components/ui/eco-button";
import { Sprout } from "lucide-react";

export default function ThemeGreenDecember() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-hero/10 border-b">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex items-center justify-between gap-4">
            <div>
              <Link to="/">
                <EcoButton variant="outline" size="sm">← Go Back Home</EcoButton>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Sprout className="w-7 h-7 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold">Green December</h1>
            </div>
            <div className="hidden md:block px-3 py-1 rounded-full text-xs bg-primary/15 text-primary-foreground border">DIY + Plant</div>
          </motion.div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <p className="text-muted-foreground mb-6">DIYs, saplings, best-out-of-waste—waste in action, not hibernation in bins.</p>
        <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8">
          {[
            { k: "DIY crafts", v: "850" },
            { k: "Saplings", v: "5,200" },
          ].map((m) => (
            <div key={m.k} className="rounded-xl border bg-card p-4 text-center">
              <div className="text-2xl font-bold">{m.v}</div>
              <div className="text-xs text-muted-foreground mt-1">{m.k}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


