import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { Check, ChevronRight, File, GraduationCap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

/* ──────────────────────────────────────────────
   AdmissionsExperience — Multi-step Widget
   Features: Glassmorphism, real-time validation,
   neon accents, Framer Motion transitions.
   ────────────────────────────────────────────── */

type StepStatus = 'pending' | 'active' | 'complete';

interface FormData {
  courseLevel: string;
  tenthMarks: string;
  twelfthMarks: string;
  program: string;
  name: string;
  email: string;
  phone: string;
  fileUploaded: boolean;
}

const PROGRAMS = [
  { id: 'cse', name: 'Computer Science & Engineering', icon: '💻' },
  { id: 'ise', name: 'Information Science & Engineering', icon: '🌐' },
  { id: 'ece', name: 'Electronics & Communication', icon: '📡' },
  { id: 'me', name: 'Mechanical Engineering', icon: '⚙️' },
  { id: 'cv', name: 'Civil Engineering', icon: '🏗️' },
  { id: 'aids', name: 'Artificial Intelligence & Data Science', icon: '🧠' },
];

export default function AdmissionsExperience() {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    courseLevel: '',
    tenthMarks: '',
    twelfthMarks: '',
    program: '',
    name: '',
    email: '',
    phone: '',
    fileUploaded: false,
  });

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  
  const updateForm = (key: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // ── Validation logic ──
  const isStep1Valid = formData.courseLevel !== '' && Number(formData.tenthMarks) > 0 && Number(formData.twelfthMarks) > 0;
  const isStep2Valid = formData.program !== '';
  const isStep3Valid = formData.name.trim() !== '' && formData.email.includes('@') && formData.phone.length >= 10;

  const getStepStatus = (step: number): StepStatus => {
    if (step < currentStep) return 'complete';
    if (step === currentStep) return 'active';
    return 'pending';
  };

  // ── Motion Variants ──
  const slideVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      transition: { duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] },
    }),
  };

  return (
    <section className="py-24 relative overflow-hidden bg-base" aria-label="Admissions Form">
      {/* ── Ambient Background Glows ── */}
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-accent-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-accent-secondary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      
      <div className="section-container relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest uppercase text-accent-secondary mb-3">
            Start Your Journey
          </h2>
          <h3 className="text-4xl md:text-5xl font-display font-black text-white">
            JCET Admissions Portal
          </h3>
        </div>

        {/* Main Widget Container */}
        <div className="max-w-4xl mx-auto glass-card rounded-2xl border border-white/10 p-6 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          
          {/* ── Top Progress Bar ── */}
          <div className="mb-10 relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/5 -translate-y-1/2 z-0" />
            <div 
              className="absolute top-1/2 left-0 h-[2px] bg-accent-secondary -translate-y-1/2 z-0 transition-all duration-500 ease-out" 
              style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
            />
            
            <div className="flex justify-between relative z-10 w-full">
              {['Eligibility', 'Program', 'Application', 'Confirm'].map((stepName, i) => {
                const stepNum = i + 1;
                const status = getStepStatus(stepNum);
                return (
                  <div key={stepName} className="flex flex-col items-center gap-3">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300
                        ${status === 'complete' ? 'bg-accent-secondary text-base border-none shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 
                          status === 'active' ? 'bg-accent-primary text-white border-2 border-accent-secondary shadow-[0_0_20px_rgba(124,58,237,0.5)]' : 
                          'bg-base/80 border border-white/20 text-white/40'}`}
                    >
                      {status === 'complete' ? <Check size={18} /> : stepNum}
                    </div>
                    <span className={`text-xs uppercase tracking-wider font-semibold hidden md:block transition-colors duration-300
                      ${status === 'pending' ? 'text-white/30' : 'text-white/90'}`}>
                      {stepName}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Content Area ── */}
          <div className="min-h-[400px] relative overflow-hidden rounded-xl border border-white/5 bg-black/20 p-6 md:p-8">
            <AnimatePresence mode="wait" initial={false}>
              
              {/* STEP 1: ELIGIBILITY CHECK */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  custom={1}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-6 max-w-xl mx-auto"
                >
                  <h4 className="text-2xl font-bold text-white mb-6 text-center">Eligibility Check</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="course" className="block text-sm text-text-muted mb-2 font-medium uppercase tracking-wider">Target Course Level</label>
                      <div className="relative">
                        <select 
                          id="course"
                          value={formData.courseLevel}
                          onChange={(e) => updateForm('courseLevel', e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-colors cursor-pointer"
                        >
                          <option value="" disabled className="bg-base text-white/50">Select course level</option>
                          <option value="be" className="bg-base text-white">Bachelor of Engineering (B.E.)</option>
                          <option value="mtech" className="bg-base text-white">Master of Technology (M.Tech)</option>
                          <option value="mba" className="bg-base text-white">MBA</option>
                        </select>
                        <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 rotate-90 pointer-events-none" size={18} />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="10th" className="block text-sm text-text-muted mb-2 font-medium uppercase tracking-wider">10th Percentage</label>
                        <input 
                          id="10th"
                          type="number" 
                          min="0" max="100"
                          placeholder="e.g. 85"
                          value={formData.tenthMarks}
                          onChange={(e) => updateForm('tenthMarks', e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="12th" className="block text-sm text-text-muted mb-2 font-medium uppercase tracking-wider">12th / Diploma %</label>
                        <input 
                          id="12th"
                          type="number"
                          min="0" max="100" 
                          placeholder="e.g. 78"
                          value={formData.twelfthMarks}
                          onChange={(e) => updateForm('twelfthMarks', e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-8">
                    <button
                      onClick={handleNext}
                      disabled={!isStep1Valid}
                      className={`w-full py-4 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-3 transition-all duration-300 
                        ${isStep1Valid 
                          ? 'bg-accent-primary text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] cursor-pointer' 
                          : 'bg-white/5 text-white/30 border border-white/10 cursor-not-allowed'}`}
                    >
                      Check Eligibility
                      <ArrowRight size={18} className={isStep1Valid ? "animate-pulse" : ""} />
                    </button>
                    {isStep1Valid && (
                      <p className="text-center text-emerald-400 text-sm mt-4 font-medium flex items-center justify-center gap-2">
                        <CheckCircle2 size={16} /> Eligible to apply for JCET programs
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: PROGRAM SELECTION */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  custom={1}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-6"
                >
                  <h4 className="text-2xl font-bold text-white mb-6 text-center">Select Your Program</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {PROGRAMS.map(prog => (
                      <button
                        key={prog.id}
                        onClick={() => updateForm('program', prog.id)}
                        className={`text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col gap-3 relative overflow-hidden group
                          ${formData.program === prog.id 
                            ? 'bg-accent-secondary/10 border-accent-secondary shadow-[0_0_15px_rgba(6,182,212,0.2)]' 
                            : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'}`}
                      >
                        {formData.program === prog.id && (
                          <div className="absolute top-0 left-0 w-1 h-full bg-accent-secondary" />
                        )}
                        <span className="text-2xl">{prog.icon}</span>
                        <span className={`font-medium leading-snug ${formData.program === prog.id ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                          {prog.name}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="pt-8 flex gap-4">
                    <button onClick={handleBack} className="px-6 py-3 rounded-xl border border-white/20 text-white/70 hover:bg-white/5 hover:text-white transition-colors cursor-pointer font-medium">Back</button>
                    <button
                      onClick={handleNext}
                      disabled={!isStep2Valid}
                      className={`flex-1 py-3 rounded-xl font-bold uppercase tracking-wider transition-all duration-300 
                        ${isStep2Valid 
                          ? 'bg-accent-primary text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] cursor-pointer' 
                          : 'bg-white/5 text-white/30 border border-white/10 cursor-not-allowed'}`}
                    >
                      Continue to Application
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: APPLICATION DETAILS */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  custom={1}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-6 max-w-xl mx-auto"
                >
                  <h4 className="text-2xl font-bold text-white mb-6 text-center">Applicant Details</h4>
                  
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm text-text-muted mb-2 font-medium uppercase tracking-wider">Full Legal Name</label>
                      <input 
                        id="name"
                        type="text" 
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => updateForm('name', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-colors"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm text-text-muted mb-2 font-medium uppercase tracking-wider">Email Address</label>
                      <input 
                        id="email"
                        type="email" 
                        placeholder="rahul@example.com"
                        value={formData.email}
                        onChange={(e) => updateForm('email', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm text-text-muted mb-2 font-medium uppercase tracking-wider">Phone Number</label>
                      <input 
                        id="phone"
                        type="tel" 
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => updateForm('phone', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-text-muted mb-2 font-medium uppercase tracking-wider">Supporting Documents (Optional)</label>
                      <button 
                        onClick={() => updateForm('fileUploaded', !formData.fileUploaded)}
                        className={`w-full border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 transition-colors cursor-pointer
                          ${formData.fileUploaded ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-white/10 bg-white/5 hover:border-white/20'}`}
                      >
                        {formData.fileUploaded ? (
                          <>
                            <CheckCircle2 size={24} className="text-emerald-400" />
                            <span className="text-sm font-medium text-emerald-400">Documents attached successfully</span>
                          </>
                        ) : (
                          <>
                            <File size={24} className="text-white/40" />
                            <span className="text-sm font-medium text-white/60">Click to attach common 10th/12th marks cards</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="pt-6 flex gap-4">
                    <button onClick={handleBack} className="px-6 py-3 rounded-xl border border-white/20 text-white/70 hover:bg-white/5 hover:text-white transition-colors cursor-pointer font-medium">Back</button>
                    <button
                      onClick={handleNext}
                      disabled={!isStep3Valid}
                      className={`flex-1 py-3 rounded-xl font-bold uppercase tracking-wider transition-all duration-300 
                        ${isStep3Valid 
                          ? 'bg-accent-secondary text-base shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] cursor-pointer' 
                          : 'bg-white/5 text-white/30 border border-white/10 cursor-not-allowed'}`}
                    >
                      Submit Application
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: SUCCESS CONFIRMATION */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  custom={1}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-8 flex flex-col items-center justify-center py-10"
                >
                  <div className="relative">
                    <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/30">
                      <GraduationCap size={48} className="text-emerald-400" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-black rounded-full flex items-center justify-center">
                      <CheckCircle2 size={24} className="text-accent-secondary" />
                    </div>
                  </div>

                  <div className="text-center space-y-4 max-w-md">
                    <h4 className="text-3xl font-display font-black text-white">Application Received!</h4>
                    <p className="text-white/60 leading-relaxed">
                      Thank you, <strong className="text-white">{formData.name || 'Applicant'}</strong>. Your application for <strong className="text-accent-secondary">{PROGRAMS.find(p => p.id === formData.program)?.name}</strong> has been prioritized.
                    </p>
                  </div>

                  <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                    <h5 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Next Steps</h5>
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white shrink-0">1</div>
                      <p className="text-sm text-white/70">An admissions counselor will contact you within 24 hours at {formData.phone || 'your number'}.</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white shrink-0">2</div>
                      <p className="text-sm text-white/70">Check your email ({formData.email || 'your email'}) for the fee payment portal link.</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      // Reset to start for demo purposes
                      setCurrentStep(1);
                      setFormData({ courseLevel: '', tenthMarks: '', twelfthMarks: '', program: '', name: '', email: '', phone: '', fileUploaded: false });
                    }}
                    className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-accent-primary hover:text-white transition-colors cursor-pointer"
                  >
                    Start New Application <ArrowRight size={16} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
