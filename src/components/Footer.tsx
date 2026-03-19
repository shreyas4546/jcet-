import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base border-t border-white/[0.06] pt-24 pb-8 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="section-container relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group cursor-pointer w-fit">
              <div className="w-10 h-10 bg-accent-primary rounded-xl flex items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform">
                JC
              </div>
              <div>
                <h2 className="text-xl font-bold leading-tight tracking-tight text-text-heading">JCET</h2>
                <p className="text-[10px] text-text-muted uppercase tracking-widest">Engineering & Tech</p>
              </div>
            </Link>
            <p className="text-sm text-text-muted leading-relaxed">
              Empowering the next generation of engineers, technologists, and innovators to build a sustainable and advanced future.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Instagram, label: 'Instagram' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-text-muted hover:text-accent-primary transition-colors duration-300 p-2.5 bg-surface/60 rounded-xl border border-white/[0.06] hover:border-accent-primary/30 cursor-pointer"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-text-heading font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Academics', path: '/academics' },
                { name: 'Admissions', path: '/admissions' },
                { name: 'Placements', path: '/placements' },
                { name: 'Campus Life', path: '/campus-life' },
                { name: 'Gallery', path: '/gallery' },
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-text-muted hover:text-accent-primary transition-colors cursor-pointer">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-text-heading font-bold mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-text-muted">
                <MapPin size={18} className="text-accent-primary shrink-0 mt-0.5" />
                <span>JCET Campus, PB Road,<br />Hubballi, Karnataka 580031</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-text-muted">
                <Phone size={18} className="text-accent-secondary shrink-0" />
                <a href="tel:+918361234567" className="hover:text-text-heading transition-colors cursor-pointer">+91 836 1234 567</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-text-muted">
                <Mail size={18} className="text-accent-pink shrink-0" />
                <a href="mailto:admissions@jcet.edu.in" className="hover:text-text-heading transition-colors cursor-pointer">admissions@jcet.edu.in</a>
              </li>
            </ul>
          </div>

          {/* Map */}
          <div className="h-48 rounded-xl overflow-hidden border border-white/[0.06] relative group">
            <div className="absolute inset-0 bg-base/50 group-hover:bg-transparent transition-colors z-10 flex items-center justify-center cursor-pointer">
              <span className="bg-base/80 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold text-text-heading border border-white/[0.06] group-hover:opacity-0 transition-opacity">
                View on Map
              </span>
            </div>
            <img src="https://picsum.photos/seed/map/400/300?blur=4" alt="Campus Map Location" referrerPolicy="no-referrer" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            © {currentYear} Jain College of Engineering and Technology. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-text-muted">
            <a href="#" className="hover:text-text-heading transition-colors cursor-pointer">Privacy Policy</a>
            <a href="#" className="hover:text-text-heading transition-colors cursor-pointer">Terms of Service</a>
            <a href="#" className="hover:text-text-heading transition-colors cursor-pointer">Accessibility</a>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-text-muted font-mono tracking-wide">
            Website Designed by Shreyas M U
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
