import { Link, useLocation, useNavigate } from "react-router-dom";
import { Leaf, ChevronDown, ChevronRight } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { EcoButton } from "@/components/ui/eco-button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useAuth } from "@/lib/auth";

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSeasonalOpen, setIsSeasonalOpen] = useState(false);
  const { user, signout } = useAuth();
  const initials = ((): string => {
    const fn = (user as any)?.firstName || "";
    const ln = (user as any)?.lastName || "";
    const fi = fn.charAt(0).toUpperCase();
    const li = ln.charAt(0).toUpperCase();
    return `${fi}${li}` || "?";
  })();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
      <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-gradient-success rounded-lg flex items-center justify-center">
            <Leaf className="w-5 h-5 text-success-foreground" />
          </div>
          <span className="text-xl font-normal text-foreground">Planet<span className="text-xl font-bold text-foreground">Pulse</span>Play</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className={`relative transition-all duration-300 ${
              isActive('/') 
                ? 'text-primary font-medium' 
                : 'text-foreground/80 hover:text-foreground'
            }`}
          >
            Home
            {isActive('/') && (
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full animate-slide-up" />
            )}
          </Link>
          <Link 
            to="/features" 
            className={`relative transition-all duration-300 ${
              isActive('/features') 
                ? 'text-primary font-medium' 
                : 'text-foreground/80 hover:text-foreground'
            }`}
          >
            Features
            {isActive('/features') && (
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full animate-slide-up" />
            )}
          </Link>
          <Link 
            to="/about" 
            className={`relative transition-all duration-300 ${
              isActive('/about') 
                ? 'text-primary font-medium' 
                : 'text-foreground/80 hover:text-foreground'
            }`}
          >
            About
            {isActive('/about') && (
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full animate-slide-up" />
            )}
          </Link>

          {/* Added sections per request */}
          <div 
            className="relative"
            onMouseEnter={() => setIsSeasonalOpen(true)}
            onMouseLeave={() => setIsSeasonalOpen(false)}
          >
            <Link 
              to="" 
              className={`relative transition-all duration-300 flex items-center space-x-1 ${
                isActive('/seasonal-campaigns') 
                  ? 'text-primary font-medium' 
                  : 'text-foreground/80 hover:text-foreground'
              }`}
            >
              Seasonal Campaigns
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isSeasonalOpen ? 'rotate-180' : ''}`} />
              {isActive('/seasonal-campaigns') && (
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full animate-slide-up" />
              )}
            </Link>
            
            <AnimatePresence>
              {isSeasonalOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-lg z-50"
                >
                  <div className="py-2">
                    
                    <Link 
                      to="/theme-based" 
                      className="block px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      Theme-based
                    </Link>
                    <Link 
                      to="/global-missions" 
                      className="block px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      Global Missions
                    </Link>
                    <Link 
                      to="/game-season-pass" 
                      className="block px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      Game season Pass
                    </Link>
                    <Link 
                      to="/learning-capsules" 
                      className="block px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      Learning Capsules
                    </Link>
                    <Link 
                      to="/badges-certifications" 
                      className="block px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      Badges/certifications
                    </Link>
                    
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link 
            to="/pathways" 
            className={`relative transition-all duration-300 ${
              isActive('/pathways') 
                ? 'text-primary font-medium' 
                : 'text-foreground/80 hover:text-foreground'
            }`}
          >
            Pathways
            {isActive('/pathways') && (
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full animate-slide-up" />
            )}
          </Link>
          <Link 
            to="/discussion-board" 
            className={`relative transition-all duration-300 ${
              isActive('/discussion-board') 
                ? 'text-primary font-medium' 
                : 'text-foreground/80 hover:text-foreground'
            }`}
          >
            Discussion Board
            {isActive('/discussion-board') && (
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full animate-slide-up" />
            )}
          </Link>
          {user?.role === 'ADMIN' && (
            <Link 
              to="/admin/users" 
              className={`relative transition-all duration-300 ${
                isActive('/admin/users') 
                  ? 'text-primary font-medium' 
                  : 'text-foreground/80 hover:text-foreground'
              }`}
            >
              Admin
              {isActive('/admin/users') && (
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full animate-slide-up" />
              )}
            </Link>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <ThemeToggle />
          {user ? (
            <>
              <Link to="/profile" className="flex items-center justify-center w-8 h-8 rounded-full bg-accent text-accent-foreground font-bold">
                {initials || 'U'}
              </Link>
              <EcoButton variant="outline" size="sm" onClick={() => navigate("/dashboard")}>Dashboard</EcoButton>
              <EcoButton
                variant="hero"
                size="sm"
                onClick={() => { signout(); navigate("/auth"); }}
              >
                Logout
              </EcoButton>
            </>
          ) : (
            <>
              <Link to="/auth">
                <EcoButton variant="hero" size="sm">
                  Get Started
                </EcoButton>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}