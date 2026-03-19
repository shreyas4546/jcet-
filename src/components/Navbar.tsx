import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const navLinks = [
  { key: 'nav.home', path: '/' },
  { key: 'nav.about', path: '/about' },
  { key: 'nav.academics', path: '/academics' },
  { key: 'nav.departments', path: '/departments' },
  { key: 'nav.admissions', path: '/admissions' },
  { key: 'nav.placements', path: '/placements' },
  { key: 'nav.campusLife', path: '/campus-life' },
  { key: 'nav.contact', path: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          <div className="w-11 h-11 rounded-full overflow-hidden flex items-center justify-center bg-transparent border border-white/5 shadow-2xl transition-transform duration-300 group-hover:scale-105">
            <img 
              src="/jgi-logo.png" 
              alt="JGI Logo" 
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div>
            <div className="text-lg font-bold text-text-heading leading-tight tracking-tight">JCET</div>
            <div className="text-[10px] text-text-muted uppercase tracking-widest">Hubballi</div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <li key={link.key}>
                <Link
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-accent-primary bg-accent-primary/10'
                      : 'text-text-muted hover:text-text-heading hover:bg-white/[0.04]'
                  }`}
                >
                  {t(link.key)}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Controls & CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-text-muted hover:text-text-heading hover:bg-white/[0.05] transition-colors cursor-pointer"
            aria-label="Toggle Language"
          >
            <Languages size={18} />
            <span className="uppercase">{language}</span>
          </button>
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-text-muted hover:text-text-heading hover:bg-white/[0.05] transition-colors cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Link
            to="/admissions"
            className="px-5 py-2.5 bg-accent-primary text-white text-sm font-semibold rounded-xl hover:bg-accent-primary-hover transition-all duration-300 cursor-pointer"
            style={{ boxShadow: '0 0 16px rgba(124, 58, 237, 0.2)' }}
          >
            {t('nav.applyNow')}
          </Link>
        </div>

        {/* Mobile Menu Toggle & Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-text-muted hover:text-text-heading hover:bg-white/[0.05] transition-colors cursor-pointer"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 p-2 rounded-lg text-text-muted hover:text-text-heading hover:bg-white/[0.05] transition-colors cursor-pointer font-semibold uppercase text-sm"
          >
            {language}
          </button>
          <button
            className="text-text-heading p-2 rounded-lg hover:bg-white/[0.05] transition-colors cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
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
                  <li key={link.key}>
                    <Link
                      to={link.path}
                      className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 cursor-pointer ${
                        isActive
                          ? 'text-accent-primary bg-accent-primary/10'
                          : 'text-text-muted hover:text-text-heading hover:bg-white/[0.04]'
                      }`}
                    >
                      {t(link.key)}
                    </Link>
                  </li>
                );
              })}
              <li className="mt-4">
                <Link
                  to="/admissions"
                  className="block text-center px-5 py-3 bg-accent-primary text-white text-sm font-semibold rounded-xl cursor-pointer"
                >
                  {t('nav.applyNow')}
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
