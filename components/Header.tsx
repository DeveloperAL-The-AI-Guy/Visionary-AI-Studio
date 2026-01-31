import React from 'react';
import { Aperture, Menu } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-40 px-6 py-6 flex justify-between items-center pointer-events-auto">
      <div className="flex items-center gap-2">
        <Aperture className="text-blue-500 w-6 h-6 animate-pulse" />
        <span className="font-display font-bold tracking-tighter text-lg">VISIONARY</span>
      </div>
      
      <div className="hidden md:flex gap-8 text-sm font-medium text-white/60">
        <a href="#" className="hover:text-white transition-colors">Research</a>
        <a href="#" className="hover:text-white transition-colors">Models</a>
        <a href="#" className="hover:text-white transition-colors">Studio</a>
        <a href="#" className="hover:text-white transition-colors">Pricing</a>
      </div>

      <button className="md:hidden text-white/80">
        <Menu size={24} />
      </button>
    </nav>
  );
};

export default Header;