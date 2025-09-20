import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "react-router-dom";
import { getRoleBasedDashboard } from "@/utils/roleRedirect";
import { addPendingApproval, isUserApproved } from "@/utils/approvals";
import { ArrowLeft, User, GraduationCap, Eye, EyeOff, Shield, Users } from "lucide-react";
import { EcoButton } from "@/components/ui/eco-button";
import { EcoCard, EcoCardContent, EcoCardDescription, EcoCardHeader, EcoCardTitle } from "@/components/ui/eco-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

export default function Auth() {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"student" | "teacher" | "ambassador">("student");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signin, signout } = useAuth();
  const navigate = useNavigate();

  async function handleSignup() {
    try {
      setLoading(true);
      const roleUpper = selectedRole.toUpperCase();
      const token = await api.signup({ firstName, lastName, email, password, role: roleUpper });
      signin(token);
      
      // Get the role-based dashboard route
      const user = { role: roleUpper, email } as any;
      // If role needs approval, add to pending and block immediate access
      if ((roleUpper === 'TEACHER' || roleUpper === 'AMBASSADOR')) {
        addPendingApproval(email, roleUpper as any);
        alert('Your account is pending approval by the Admin. You will be able to login once approved.');
        signout();
        navigate('/');
        return;
      }
      const dashboardRoute = getRoleBasedDashboard(user);
      navigate(dashboardRoute);
    } catch (e: any) {
      const msg = (e?.message || "").toString();
      if (msg.includes("PENDING_APPROVAL") || msg.toLowerCase().includes("pending") ) {
        alert('Your account is pending approval by the Admin. You will be able to login once approved.');
        navigate('/');
        return;
      }
      console.error(e);
      alert("Signup failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleSignin() {
    try {
      setLoading(true);
      const token = await api.login({ email, password });
      signin(token);
      
      // Get user info from token to determine role-based redirect
      const payload = JSON.parse(atob(token.split('.')[1]));
      const user = { 
        role: payload.role, 
        email: payload.sub,
        firstName: payload.firstName,
        lastName: payload.lastName
      };
      // Block unapproved TEACHER/AMBASSADOR
      if ((user.role === 'TEACHER' || user.role === 'AMBASSADOR') && !isUserApproved(user.email)) {
        alert('Your account is pending approval by the Admin.');
        signout();
        return;
      }
      const dashboardRoute = getRoleBasedDashboard(user);
      navigate(dashboardRoute);
    } catch (e) {
      console.error(e);
      alert("Sign in failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white p-8 flex items-center justify-center flex-col">
            <div className="w-32 h-32 mx-auto mb-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <GraduationCap className="w-16 h-16" />
            </div>
            <h2 className="text-4xl font-bold mb-4">Welcome to PlanetPulsePlay</h2>
            <p className="text-xl opacity-90 max-w-md text-center">
              Join thousands of students and educators in the ultimate environmental learning adventure
            </p>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 right-20 w-8 h-8 bg-white/20 rounded-full animate-float" />
        <div className="absolute bottom-32 left-16 w-6 h-6 bg-white/30 rounded-full animate-float" style={{animationDelay: '2s'}} />
        <div className="absolute top-1/2 left-20 w-4 h-4 bg-white/25 rounded-full animate-float" style={{animationDelay: '4s'}} />
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <EcoCard variant="glass">
            <EcoCardHeader className="text-center">
              <EcoCardTitle className="text-3xl">Get Started</EcoCardTitle>
              <EcoCardDescription>
                Create your account or sign in to continue your eco-journey
              </EcoCardDescription>
            </EcoCardHeader>
            
            <EcoCardContent>
              <Tabs defaultValue="signup" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                </TabsList>
                
                <TabsContent value="signup" className="space-y-4">
                  {/* Role Selection */}
                  <div className="space-y-3">
                    <Label>I am a...</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <EcoButton
                          variant={selectedRole === "student" ? "eco" : "outline"}
                          className="flex flex-col h-auto py-4 w-full"
                          onClick={() => setSelectedRole("student")}
                        >
                          <GraduationCap className="w-6 h-6 mb-2" />
                          Student
                        </EcoButton>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <EcoButton
                          variant={selectedRole === "teacher" ? "eco" : "outline"}
                          className="flex flex-col h-auto py-4 w-full"
                          onClick={() => setSelectedRole("teacher")}
                        >
                          <User className="w-6 h-6 mb-2" />
                          Teacher
                        </EcoButton>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <EcoButton
                          variant={selectedRole === "ambassador" ? "eco" : "outline"}
                          className="flex flex-col h-auto py-4 w-full"
                          onClick={() => setSelectedRole("ambassador")}
                        >
                          <Shield className="w-6 h-6 mb-2" />
                          Ambassador
                        </EcoButton>
                      </motion.div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input 
                        id="password" 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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

                  <EcoButton variant="hero" className="w-full" size="lg" onClick={handleSignup} disabled={loading}>
                    {loading ? "Creating..." : "Create Account"}
                  </EcoButton>
                </TabsContent>

                <TabsContent value="signin" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signinEmail">Email</Label>
                    <Input id="signinEmail" type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signinPassword">Password</Label>
                    <div className="relative">
                      <Input 
                        id="signinPassword" 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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

                  <div className="text-right">
                    <Link to="/reset-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>

                  <EcoButton variant="hero" className="w-full" size="lg" onClick={handleSignin} disabled={loading}>
                    {loading ? "Signing in..." : "Sign In"}
                  </EcoButton>
                  <div className="text-center text-sm text-muted-foreground">
                    Don’t have an account? <Link to="/auth" className="text-primary underline">Create one</Link>
                  </div>
                </TabsContent>
              </Tabs>
            </EcoCardContent>
          </EcoCard>
        </div>
      </div>
    </div>
  );
}