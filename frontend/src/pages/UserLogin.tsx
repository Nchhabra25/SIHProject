import { motion } from "framer-motion";
import { EcoCard, EcoCardContent, EcoCardHeader, EcoCardTitle } from "@/components/ui/eco-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EcoButton } from "@/components/ui/eco-button";
import { useState } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "react-router-dom";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signin } = useAuth();
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      setLoading(true);
      const token = await api.login({ email, password });
      signin(token);
      navigate("/dashboard");
    } catch (e) {
      console.error(e);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full max-w-md">
        <EcoCard hover="lift">
          <EcoCardHeader>
            <EcoCardTitle className="text-2xl">User Login</EcoCardTitle>
          </EcoCardHeader>
          <EcoCardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <EcoButton className="w-full" onClick={handleLogin} disabled={loading}>{loading ? "Logging in..." : "Login"}</EcoButton>
          </EcoCardContent>
        </EcoCard>
      </motion.div>
    </div>
  );
}

