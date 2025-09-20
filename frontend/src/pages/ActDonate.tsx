import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { EcoButton } from "@/components/ui/eco-button";
import { HandCoins } from "lucide-react";

export default function ActDonate() {
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
              <HandCoins className="w-6 h-6 text-primary" />
              <h1 className="text-2xl md:text-3xl font-bold">Donate</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <p className="text-muted-foreground mb-6">Direct funds toward saplings, cleanup supplies, or eco-education kits.
        </p>
        <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8">
          {[{k:"Raised",v:"₹2.8L"},{k:"Initiatives",v:"32"}].map(m=> (
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


