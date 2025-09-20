import { motion } from "framer-motion";
import { EcoCard, EcoCardContent, EcoCardHeader, EcoCardTitle } from "@/components/ui/eco-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EcoButton } from "@/components/ui/eco-button";

export default function AmbassadorLogin() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full max-w-md">
        <EcoCard hover="lift">
          <EcoCardHeader>
            <EcoCardTitle className="text-2xl">Ambassador Login</EcoCardTitle>
          </EcoCardHeader>
          <EcoCardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="name@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
            <EcoButton className="w-full">Login</EcoButton>
          </EcoCardContent>
        </EcoCard>
      </motion.div>
    </div>
  );
}

