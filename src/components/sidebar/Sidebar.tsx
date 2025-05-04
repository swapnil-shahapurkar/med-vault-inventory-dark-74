
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { Home, Pill, FileText, Menu, X } from "lucide-react";

export const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  
  // Animate sidebar items on load
  useEffect(() => {
    gsap.fromTo(
      ".nav-item", 
      { x: -50, opacity: 0 }, 
      { 
        x: 0, 
        opacity: 1, 
        duration: 0.5, 
        stagger: 0.1,
        ease: "power2.out"
      }
    );
  }, []);
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  const menuItems = [
    { name: "Dashboard", path: "/", icon: <Home className="h-5 w-5" /> },
    { name: "Inventory", path: "/inventory", icon: <Pill className="h-5 w-5" /> },
    { name: "Billing", path: "/billing", icon: <FileText className="h-5 w-5" /> },
  ];
  
  return (
    <div 
      className={`bg-sidebar transition-all duration-300 ease-in-out ${collapsed ? 'w-16' : 'w-64'} border-r border-white/10 h-screen`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
        {!collapsed && (
          <h1 className="text-xl font-bold text-white">Med Vault</h1>
        )}
        <button onClick={toggleSidebar} className="p-2 rounded-full hover:bg-white/10 text-white">
          {collapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
        </button>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.name} className="nav-item">
                <Link
                  to={item.path}
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    isActive 
                      ? "bg-medPurple text-white" 
                      : "bg-white/5 hover:bg-white/10 text-white"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
