
import { useEffect } from "react";
import { Sidebar } from "../sidebar/Sidebar";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const AppLayout = ({ children, title = "Med Vault" }: AppLayoutProps) => {
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate the main content area
    gsap.fromTo(
      ".main-content", 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    // Clean up on unmount
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);
  
  return (
    <div className="flex h-screen w-full bg-background">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="main-content p-6 md:p-8">
          <header className="mb-8">
            <h1 className="animate-fade-in text-3xl font-bold text-gradient">{title}</h1>
          </header>
          
          {children}
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
