import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Leaf } from "lucide-react";
import { EcoButton } from "@/components/ui/eco-button";
import { EcoCard, EcoCardContent, EcoCardHeader, EcoCardTitle } from "@/components/ui/eco-card";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <EcoCard variant="glass" className="max-w-md w-full text-center">
        <EcoCardHeader className="pb-4">
          <div className="w-20 h-20 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Leaf className="w-10 h-10 text-white" />
          </div>
          <EcoCardTitle className="text-4xl font-bold text-white mb-2">
            404
          </EcoCardTitle>
          <p className="text-xl text-white/90">
            Oops! This eco-path doesn't exist
          </p>
        </EcoCardHeader>
        <EcoCardContent>
          <p className="text-white/80 mb-6">
            Looks like you've wandered off the sustainable path. Let's get you back to exploring our eco-friendly features!
          </p>
          <Link to="/">
            <EcoButton variant="glass" size="lg" className="text-white border-white/30 hover:bg-white/20">
              <Home className="w-4 h-4 mr-2" />
              Return to Home
            </EcoButton>
          </Link>
        </EcoCardContent>
      </EcoCard>
      
      {/* Floating eco elements */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-white/30 rounded-full animate-float opacity-60" />
      <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-white/20 rounded-full animate-float opacity-40" style={{animationDelay: '2s'}} />
      <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-white/40 rounded-full animate-float opacity-80" style={{animationDelay: '4s'}} />
    </div>
  );
};

export default NotFound;
