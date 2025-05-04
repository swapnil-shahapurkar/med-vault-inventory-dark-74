
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { Button } from "../components/ui/button";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Create animated background effect
    const createMedicalIcons = () => {
      const icons = ['💊', '💉', '🩺', '🧪', '🔬', '🧫', '🧬', '❤️'];
      const container = document.querySelector('.animated-background');
      if (!container) return;
      
      // Clear previous icons
      const existingIcons = container.querySelectorAll('.medical-icon');
      existingIcons.forEach(icon => icon.remove());
      
      // Create new random icons
      for (let i = 0; i < 25; i++) {
        const icon = document.createElement('div');
        icon.className = 'medical-icon absolute text-2xl opacity-20 pointer-events-none';
        icon.textContent = icons[Math.floor(Math.random() * icons.length)];
        
        // Random position
        icon.style.left = `${Math.random() * 100}%`;
        icon.style.top = `${Math.random() * 100}%`;
        
        container.appendChild(icon);
        
        // Animate icon
        gsap.to(icon, {
          y: -100 - Math.random() * 200,
          x: 50 - Math.random() * 100,
          opacity: 0,
          rotation: -30 + Math.random() * 60,
          duration: 10 + Math.random() * 20,
          ease: 'none',
          onComplete: () => {
            icon.remove();
          }
        });
      }
    };
    
    // Initial creation
    createMedicalIcons();
    
    // Create new icons periodically
    const interval = setInterval(createMedicalIcons, 5000);
    
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
    
    return () => {
      clearInterval(interval);
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated background */}
      <div className="animated-background absolute inset-0 z-0" />
      
      {/* Hero section */}
      <div 
        className="flex-1 flex flex-col items-center justify-center p-8 text-center relative z-10"
        style={{
          background: "linear-gradient(to bottom right, rgba(26, 31, 44, 0.98), rgba(0, 0, 0, 0.95))",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="welcome-title text-4xl md:text-6xl font-bold mb-6 text-gradient">
            Med Vault
          </h1>
          
          <p className="welcome-subtitle text-xl md:text-2xl mb-12 text-white">
            Streamlined medication inventory system for your pharmacy
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/dashboard')}
              className="welcome-button px-8 py-6 text-lg bg-medPurple hover:bg-medPurple-dark text-white"
            >
              Dashboard
            </Button>
            
            <Button 
              onClick={() => navigate('/inventory')}
              className="welcome-button px-8 py-6 text-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white"
            >
              Manage Inventory
            </Button>
            
            <Button 
              onClick={() => navigate('/billing')}
              className="welcome-button px-8 py-6 text-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white"
            >
              Billing System
            </Button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-6 text-center text-white text-sm relative z-10">
        Med Vault Inventory System &copy; 2025
      </footer>
      
      {/* Add CSS for animated background */}
      <style>
        {`
        .animated-background {
          background: radial-gradient(circle at 50% 50%, rgba(155, 135, 245, 0.1), rgba(0, 0, 0, 0));
          overflow: hidden;
        }
        `}
      </style>
    </div>
  );
};

export default Index;
