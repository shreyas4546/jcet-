import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Academics', path: '/academics' },
  { name: 'Departments', path: '/departments' },
  { name: 'Admissions', path: '/admissions' },
  { name: 'Placements', path: '/placements' },
  { name: 'Campus Life', path: '/campus-life' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-base/95 backdrop-blur-lg border-b border-white/[0.06] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="section-container flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group cursor-pointer" aria-label="JCET Home">
          <div className="w-10 h-10 rounded-xl bg-accent-primary flex items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform duration-300">
            JC
          </div>
          <div>
            <div className="text-lg font-bold text-text-heading leading-tight tracking-tight">JCET</div>
            <div className="text-[10px] text-text-muted uppercase tracking-widest">Hubballi</div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-accent-primary bg-accent-primary/10'
                      : 'text-text-muted hover:text-text-heading hover:bg-white/[0.04]'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Apply Now CTA — Desktop */}
        <Link
          to="/admissions"
          className="hidden lg:inline-flex px-5 py-2.5 bg-accent-primary text-white text-sm font-semibold rounded-xl hover:bg-accent-primary-hover transition-all duration-300 cursor-pointer"
          style={{ boxShadow: '0 0 16px rgba(124, 58, 237, 0.2)' }}
        >
          Apply Now
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-text-heading p-2 rounded-lg hover:bg-white/[0.05] transition-colors cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="lg:hidden bg-base/98 backdrop-blur-xl border-t border-white/[0.06] mt-2 overflow-hidden absolute w-full"
          >
            <ul className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 cursor-pointer ${
                        isActive
                          ? 'text-accent-primary bg-accent-primary/10'
                          : 'text-text-muted hover:text-text-heading hover:bg-white/[0.04]'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
              <li className="mt-4">
                <Link
                  to="/admissions"
                  className="block text-center px-5 py-3 bg-accent-primary text-white text-sm font-semibold rounded-xl cursor-pointer"
                >
                  Apply Now
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
