import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-navy-dark border-t border-white/10 pt-24 pb-8 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-neon/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-6 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & About */}
          <div className="space-y-6">
            <a href="#" className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-neon rounded-lg w-fit">
              <div className="w-10 h-10 bg-neon rounded-lg flex items-center justify-center text-navy-dark font-bold text-xl group-hover:scale-105 transition-transform">
                JC
              </div>
              <div>
                <h1 className="text-xl font-bold leading-tight tracking-tight text-white">JCET</h1>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Engineering & Tech</p>
              </div>
            </a>
            <p className="text-sm text-gray-400 leading-relaxed">
              Empowering the next generation of engineers, technologists, and innovators to build a sustainable and advanced future.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Instagram, label: 'Instagram' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href="#"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-neon transition-colors duration-300 p-2 bg-white/5 rounded-lg border border-white/5 hover:border-neon/30"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-3">
              {['About Us', 'Academics', 'Admissions', 'Placements', 'Research', 'Campus Life'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-gray-400 hover:text-neon transition-colors focus:outline-none focus:ring-2 focus:ring-neon rounded-sm px-1 -ml-1">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin size={18} className="text-neon shrink-0 mt-0.5" />
                <span>JCET Campus, PB Road,<br />Hubballi, Karnataka 580031</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone size={18} className="text-neon shrink-0" />
                <a href="tel:+918361234567" className="hover:text-white transition-colors">+91 836 1234 567</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Mail size={18} className="text-neon shrink-0" />
                <a href="mailto:admissions@jcet.edu.in" className="hover:text-white transition-colors">admissions@jcet.edu.in</a>
              </li>
            </ul>
          </div>

          {/* Map Placeholder */}
          <div className="h-48 rounded-xl overflow-hidden border border-white/10 relative group">
            <div className="absolute inset-0 bg-navy-dark/50 group-hover:bg-transparent transition-colors z-10 flex items-center justify-center">
              <span className="bg-navy-dark/80 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold text-white border border-white/10 group-hover:opacity-0 transition-opacity">
                View on Map
              </span>
            </div>
            {/* Placeholder for actual Google Map iframe */}
            <img src="https://picsum.photos/seed/map/400/300?blur=4" alt="Campus Map Location" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {currentYear} Jain College of Engineering and Technology. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>

        {/* Credit Text */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500 font-mono tracking-wide">
            Website Designed by Shreyas M U
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
