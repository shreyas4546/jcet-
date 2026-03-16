import { useState, useEffect } from 'react';
import { Menu, X, Search, Accessibility } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Departments', href: '#departments' },
    { name: 'Admissions', href: '#admissions' },
    { name: 'Placements', href: '#placements' },
    { name: 'Campus Life', href: '#campus-life' },
    { name: 'News', href: '#news' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-navy-dark/80 backdrop-blur-lg border-b border-white/10 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-neon rounded-lg">
          <div className="w-10 h-10 bg-neon rounded-lg flex items-center justify-center text-navy-dark font-bold text-xl group-hover:scale-105 transition-transform">
            JC
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white">JCET</h1>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">Engineering & Tech</p>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-5">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-300 hover:text-neon transition-colors focus:outline-none focus:ring-2 focus:ring-neon rounded-md px-2 py-1 whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden xl:flex items-center gap-4">
          <button aria-label="Search" className="text-gray-300 hover:text-neon transition-colors p-2 focus:outline-none focus:ring-2 focus:ring-neon rounded-full">
            <Search size={20} />
          </button>
          <button aria-label="Accessibility Options" className="text-gray-300 hover:text-neon transition-colors p-2 focus:outline-none focus:ring-2 focus:ring-neon rounded-full">
            <Accessibility size={20} />
          </button>
          <a href="#apply" className="btn-primary text-sm py-2 px-5">
            Apply Now
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="xl:hidden flex items-center gap-4">
          <a href="#apply" className="btn-primary text-xs py-2 px-4">
            Apply
          </a>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
            className="text-white p-2 focus:outline-none focus:ring-2 focus:ring-neon rounded-md"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-navy-dark border-b border-white/10 xl:hidden"
          >
            <nav className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-gray-300 hover:text-neon transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <button aria-label="Search" className="text-gray-300 hover:text-neon transition-colors">
                  <Search size={24} />
                </button>
                <button aria-label="Accessibility Options" className="text-gray-300 hover:text-neon transition-colors">
                  <Accessibility size={24} />
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
