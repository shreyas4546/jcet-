import { motion, Variants } from 'motion/react';
import { ClipboardCheck, FileText, Calendar, CheckCircle, ArrowRight, HelpCircle } from 'lucide-react';
import { useState } from 'react';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const timelineSteps = [
  { step: 1, title: 'Check Eligibility', desc: 'Verify your academic qualifications and entrance exam scores meet JCET requirements.', icon: HelpCircle, color: '#7C3AED' },
  { step: 2, title: 'Choose Program', desc: 'Select your preferred engineering or management program from our offerings.', icon: FileText, color: '#06B6D4' },
  { step: 3, title: 'Submit Application', desc: 'Complete the online application form with your academic records and documents.', icon: ClipboardCheck, color: '#F472B6' },
  { step: 4, title: 'Confirmation', desc: 'Receive your admission confirmation and pay the initial fee to secure your seat.', icon: CheckCircle, color: '#10B981' },
];

export default function AdmissionsPage() {
  const [percentage, setPercentage] = useState('');
  const [eligible, setEligible] = useState<boolean | null>(null);

  const checkEligibility = () => {
    const pct = parseFloat(percentage);
    setEligible(!isNaN(pct) && pct >= 45);
  };

  return (
    <div className="pt-28">
      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-accent-pink/5 to-transparent">
        <div className="section-container text-center">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={itemVariants} className="section-badge mx-auto" style={{ borderColor: 'rgba(244,114,182,0.2)', background: 'rgba(244,114,182,0.1)', color: '#F472B6' }}>
              <ClipboardCheck size={14} />
              <span className="tracking-widest uppercase text-xs font-bold">Admissions 2026</span>
            </motion.div>
            <motion.h1 variants={itemVariants}>
              Begin Your <span className="text-gradient-warm">Journey</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="mt-6 text-lg max-w-3xl mx-auto">
              Join a community of innovators. Applications are now open for the 2026-27 academic year.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Admissions Timeline */}
      <section className="section-padding">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2>How to <span className="text-gradient-purple">Apply</span></h2>
            <p className="mt-4 max-w-2xl mx-auto">Follow these four simple steps to secure your seat at JCET.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {timelineSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="glass-card p-8 relative"
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ background: `${step.color}15`, border: `1px solid ${step.color}25` }}>
                  <step.icon size={22} style={{ color: step.color }} />
                </div>
                <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Step {step.step}</div>
                <h4 className="text-lg font-bold mb-2">{step.title}</h4>
                <p className="text-sm">{step.desc}</p>
                {i < timelineSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-5 text-text-muted">
                    <ArrowRight size={16} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Eligibility Check */}
      <section className="section-padding bg-surface/30">
        <div className="section-container max-w-2xl">
          <div className="text-center mb-12">
            <h2>Quick <span className="text-gradient-cyan">Eligibility Check</span></h2>
            <p className="mt-4">Enter your 12th grade percentage to check your eligibility instantly.</p>
          </div>
          <div className="glass-card p-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="percentage" className="block text-sm font-medium text-text-muted mb-2">12th Grade Percentage</label>
                <input
                  id="percentage"
                  type="number"
                  value={percentage}
                  onChange={(e) => { setPercentage(e.target.value); setEligible(null); }}
                  placeholder="Enter percentage (e.g. 75)"
                  className="w-full px-4 py-3 bg-base border border-white/[0.08] rounded-xl text-text-primary placeholder:text-text-muted/50 focus:border-accent-primary focus:outline-none transition-colors"
                />
              </div>
              <button
                onClick={checkEligibility}
                className="btn-primary self-end cursor-pointer"
              >
                Check
              </button>
            </div>
            {eligible !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-6 p-4 rounded-xl border ${eligible ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}
              >
                {eligible
                  ? 'You meet the eligibility criteria! Apply now to secure your seat.'
                  : 'Minimum 45% required. Please contact admissions for special categories.'}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Key Dates */}
      <section className="section-padding">
        <div className="section-container max-w-3xl">
          <div className="text-center mb-12">
            <h2>Important <span className="text-gradient-warm">Dates</span></h2>
          </div>
          <div className="space-y-4">
            {[
              { date: 'March 15, 2026', event: 'Applications Open' },
              { date: 'May 30, 2026', event: 'Last Date for Early Bird Applications' },
              { date: 'June 15, 2026', event: 'Entrance Exam / CET Date' },
              { date: 'July 10, 2026', event: 'Merit List Publication' },
              { date: 'August 1, 2026', event: 'Classes Commence' },
            ].map((d) => (
              <div key={d.event} className="glass-card p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Calendar size={18} className="text-accent-warm shrink-0" />
                  <span className="font-medium">{d.event}</span>
                </div>
                <span className="text-sm text-accent-primary font-medium">{d.date}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
