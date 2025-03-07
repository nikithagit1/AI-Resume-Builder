
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { FileText, Home } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-primary transition-all duration-300 hover:opacity-90"
        >
          <FileText size={24} className="animate-pulse-subtle" />
          <span className="font-semibold text-xl tracking-tight">ResumeBuildr</span>
        </Link>
        
        <nav className="flex items-center space-x-6">
          <Link 
            to="/" 
            className={cn(
              "flex items-center space-x-1 text-sm font-medium transition-all duration-300",
              isActive('/') ? "text-primary" : "text-muted-foreground hover:text-primary"
            )}
          >
            <Home size={16} />
            <span>Home</span>
          </Link>
          
          {/* Show Build Resume button only on home page */}
          {isActive('/') && (
            <Link 
              to="/build" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 button-shine"
            >
              Start Building
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
