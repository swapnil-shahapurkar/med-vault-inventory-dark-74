
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { Button } from "../components/ui/button";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Animate welcome screen elements
    const timeline = gsap.timeline();
    
    timeline.fromTo(
      ".welcome-title",
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    ).fromTo(
      ".welcome-subtitle",
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.5"
    ).fromTo(
      ".welcome-button",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.5"
    );
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero section */}
      <div 
        className="flex-1 flex flex-col items-center justify-center p-8 text-center"
        style={{
          background: "linear-gradient(to bottom right, rgba(26, 31, 44, 0.95), rgba(0, 0, 0, 0.9))",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="welcome-title text-4xl md:text-6xl font-bold mb-6 text-gradient">
            Med Vault
          </h1>
          
          <p className="welcome-subtitle text-xl md:text-2xl mb-12 text-white/80">
            Streamlined medication inventory system for your pharmacy
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/dashboard')}
              className="welcome-button px-8 py-6 text-lg bg-medPurple hover:bg-medPurple-dark"
            >
              Dashboard
            </Button>
            
            <Button 
              onClick={() => navigate('/inventory')}
              className="welcome-button px-8 py-6 text-lg bg-background hover:bg-white/10 border border-white/20"
            >
              Manage Inventory
            </Button>
            
            <Button 
              onClick={() => navigate('/billing')}
              className="welcome-button px-8 py-6 text-lg bg-background hover:bg-white/10 border border-white/20"
            >
              Billing System
            </Button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-6 text-center text-muted-foreground text-sm">
        Med Vault Inventory System &copy; 2025
      </footer>
    </div>
  );
};

export default Index;
