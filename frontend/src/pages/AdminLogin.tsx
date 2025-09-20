import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, Eye, EyeOff, AlertCircle } from "lucide-react";
import { EcoButton } from "@/components/ui/eco-button";
import { EcoCard, EcoCardContent, EcoCardDescription, EcoCardHeader, EcoCardTitle } from "@/components/ui/eco-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Hardcoded admin email - only this email can access admin dashboard
const ADMIN_EMAIL = "admin@ecoquest.local";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signin } = useAuth();
  const navigate = useNavigate();

  async function handleAdminLogin() {
    try {
      setLoading(true);
      setError("");
      
      // Validate credentials for demo admin
      if (email !== ADMIN_EMAIL || password !== "admin123") {
        setError("Invalid admin credentials. Please try again.");
        return;
      }

      // Create a minimal JWT-like token payload string for demo
      // Header and signature are irrelevant for the demo since we don't verify
      const header = btoa(JSON.stringify({ alg: "none", typ: "JWT" }));
      const payload = btoa(
        JSON.stringify({
          sub: ADMIN_EMAIL,
          role: "ADMIN",
          firstName: "Admin",
          lastName: "User",
          iat: Math.floor(Date.now() / 1000)
        })
      );
      const fakeToken = `${header}.${payload}.`;
      signin(fakeToken);
      navigate("/admin-dashboard");
    } catch (e: any) {
      console.error(e);
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <EcoCard variant="glass" className="border-red-200 dark:border-red-800">
          <EcoCardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <EcoCardTitle className="text-2xl text-red-600 dark:text-red-400">Admin Access</EcoCardTitle>
            <EcoCardDescription>
              Restricted area for authorized administrators only
            </EcoCardDescription>
          </EcoCardHeader>
          
          <EcoCardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="adminEmail">Admin Email</Label>
              <Input 
                id="adminEmail" 
                type="email" 
                placeholder="admin@ecoquest.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="border-red-200 dark:border-red-800"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="adminPassword">Password</Label>
              <div className="relative">
                <Input 
                  id="adminPassword" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-red-200 dark:border-red-800"
                />
                <EcoButton
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </EcoButton>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Demo Credentials:</strong><br />
                Email: admin@ecoquest.local<br />
                Password: admin123
              </p>
            </div>

            <EcoButton 
              variant="destructive" 
              className="w-full" 
              size="lg" 
              onClick={handleAdminLogin} 
              disabled={loading}
            >
              {loading ? "Authenticating..." : "Access Admin Dashboard"}
            </EcoButton>

            <div className="text-center text-sm text-muted-foreground">
              <p>Not an admin? <Link to="/auth" className="text-primary underline">Regular Login</Link></p>
            </div>
          </EcoCardContent>
        </EcoCard>
      </div>
    </div>
  );
}
