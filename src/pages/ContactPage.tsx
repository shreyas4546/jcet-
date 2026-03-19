import { useState } from 'react';
import { motion, Variants } from 'motion/react';
import { MapPin, Phone, Mail, Send, Clock, Building, CheckCircle } from 'lucide-react';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formState.name.trim()) e.name = 'Name is required';
    if (!formState.email.includes('@')) e.email = 'Valid email is required';
    if (!formState.subject.trim()) e.subject = 'Subject is required';
    if (!formState.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="pt-28">
      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-accent-secondary/5 to-transparent">
        <div className="section-container text-center">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={itemVariants} className="section-badge mx-auto">
              <Mail size={14} />
              <span className="tracking-widest uppercase text-xs font-bold">Contact</span>
            </motion.div>
            <motion.h1 variants={itemVariants}>
              Get in <span className="text-gradient-cyan">Touch</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="mt-6 text-lg max-w-3xl mx-auto">
              Have questions about admissions, programs, or campus life? We are here to help.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="section-padding">
        <div className="section-container grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-10"
          >
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle size={48} className="mx-auto text-emerald-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">Message Sent</h3>
                <p className="text-text-muted">Thank you for reaching out. We will get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-bold mb-2">Send a Message</h3>
                {[
                  { id: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
                  { id: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
                  { id: 'subject', label: 'Subject', type: 'text', placeholder: 'Admission Inquiry' },
                ].map((field) => (
                  <div key={field.id}>
                    <label htmlFor={field.id} className="block text-sm font-medium text-text-muted mb-2">{field.label}</label>
                    <input
                      id={field.id}
                      type={field.type}
                      value={formState[field.id as keyof typeof formState]}
                      onChange={(e) => { setFormState({...formState, [field.id]: e.target.value}); if (errors[field.id]) setErrors({...errors, [field.id]: ''}); }}
                      placeholder={field.placeholder}
                      className={`w-full px-4 py-3 bg-base border rounded-xl text-text-primary placeholder:text-text-muted/50 focus:border-accent-primary focus:outline-none transition-colors ${errors[field.id] ? 'border-red-500/50' : 'border-white/[0.08]'}`}
                      aria-invalid={!!errors[field.id]}
                    />
                    {errors[field.id] && <p className="text-red-400 text-xs mt-1">{errors[field.id]}</p>}
                  </div>
                ))}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-muted mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formState.message}
                    onChange={(e) => { setFormState({...formState, message: e.target.value}); if (errors.message) setErrors({...errors, message: ''}); }}
                    placeholder="Your message..."
                    className={`w-full px-4 py-3 bg-base border rounded-xl text-text-primary placeholder:text-text-muted/50 focus:border-accent-primary focus:outline-none transition-colors resize-none ${errors.message ? 'border-red-500/50' : 'border-white/[0.08]'}`}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                </div>
                <button type="submit" className="btn-primary flex items-center gap-2 cursor-pointer">
                  Send Message <Send size={16} />
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="glass-card p-8 space-y-6">
              <h3 className="text-xl font-bold">Contact Information</h3>
              {[
                { icon: MapPin, label: 'Address', value: 'JCET Campus, PB Road, Hubballi, Karnataka 580031', color: 'text-accent-primary' },
                { icon: Phone, label: 'Phone', value: '+91 836 1234 567', color: 'text-accent-secondary' },
                { icon: Mail, label: 'Email', value: 'admissions@jcet.edu.in', color: 'text-accent-pink' },
                { icon: Clock, label: 'Office Hours', value: 'Mon-Sat: 9:00 AM - 5:00 PM', color: 'text-accent-warm' },
              ].map((info) => (
                <div key={info.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center shrink-0">
                    <info.icon size={18} className={info.color} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-text-heading">{info.label}</div>
                    <div className="text-sm text-text-muted">{info.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Department Directory */}
            <div className="glass-card p-8">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Building size={18} className="text-accent-primary" />
                Department Directory
              </h3>
              <div className="space-y-3">
                {[
                  { dept: 'Admissions', email: 'admissions@jcet.edu.in' },
                  { dept: 'Placements', email: 'placements@jcet.edu.in' },
                  { dept: 'Academics', email: 'academics@jcet.edu.in' },
                  { dept: 'Student Affairs', email: 'students@jcet.edu.in' },
                ].map((d) => (
                  <div key={d.dept} className="flex justify-between items-center py-2 border-b border-white/[0.04] last:border-0">
                    <span className="text-sm font-medium">{d.dept}</span>
                    <a href={`mailto:${d.email}`} className="text-sm text-accent-secondary hover:text-accent-secondary-hover transition-colors cursor-pointer">{d.email}</a>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="glass-card overflow-hidden h-48">
              <img src="https://picsum.photos/seed/jcet-map/800/300?blur=3" alt="JCET campus location map" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
