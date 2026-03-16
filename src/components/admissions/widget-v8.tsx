/**
 * Admissions Widget Component
 * 
 * Example usage:
 * ```tsx
 * import AdmissionsWidget from './widget-v8';
 * 
 * export default function MyPage() {
 *   return (
 *     <AdmissionsWidget 
 *       initialProgram="Computer Science" 
 *       onSuccess={() => console.log('Form submitted!')} 
 *     />
 *   );
 * }
 * ```
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';

export interface AdmissionsWidgetProps {
  onSuccess?: () => void;
  initialProgram?: string;
}

export default function AdmissionsWidget({ onSuccess, initialProgram = '' }: AdmissionsWidgetProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    percentage: '',
    hasPhysics: false,
    hasMath: false,
    program: initialProgram,
    name: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [direction, setDirection] = useState(1);
  const [shake, setShake] = useState(false);

  const programs = ['Computer Science', 'Mechanical', 'Civil', 'Electronics', 'Artificial Intelligence', 'MBA'];

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    const pct = parseFloat(formData.percentage);
    if (isNaN(pct) || pct < 60 || pct > 100) errs.percentage = 'Minimum 60% required.';
    if (!formData.hasPhysics) errs.hasPhysics = 'Physics is required.';
    if (!formData.hasMath) errs.hasMath = 'Mathematics is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!formData.program) errs.program = 'Please select a program.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Name is required.';
    if (!formData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) errs.email = 'Valid email is required.';
    if (!formData.phone.match(/^\d{10}$/)) errs.phone = 'Valid 10-digit phone number required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    let isValid = false;
    if (step === 1) isValid = validateStep1();
    else if (step === 2) isValid = validateStep2();
    else if (step === 3) isValid = validateStep3();

    if (isValid) {
      setDirection(1);
      if (step === 3) submitForm();
      else setStep(step + 1);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 400);
    }
  };

  const handleBack = () => {
    setDirection(-1);
    setStep(step - 1);
  };

  const submitForm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setDirection(1);
      setStep(4);
      if (onSuccess) onSuccess();
    }, 700);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 30 : -30,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 30 : -30,
      opacity: 0
    })
  };

  const getInputClass = (hasError: boolean) => 
    `w-full bg-[#002752]/50 border rounded-lg px-4 py-2 outline-none transition-colors ${
      hasError 
        ? 'border-red-400 focus:border-red-400 bg-red-400/10' 
        : 'border-white/20 focus:border-[#00E5FF]'
    }`;

  return (
    <motion.div 
      animate={shake ? { x: [-5, 5, -5, 5, 0] } : {}} 
      transition={{ duration: 0.3 }}
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl text-white w-full max-w-md" 
      role="dialog" 
      aria-labelledby="admissions-title"
    >
      <h3 id="admissions-title" className="text-2xl font-bold mb-6 text-[#00E5FF]">Admissions Application</h3>
      
      {/* Stepper */}
      <div className="flex justify-between mb-8 relative" aria-label="Progress">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/20 -z-10 -translate-y-1/2" />
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= s ? 'bg-[#00E5FF] text-[#002752]' : 'bg-[#002752] border-2 border-white/20 text-gray-400'}`} aria-current={step === s ? 'step' : undefined}>
            {step > s ? <CheckCircle2 size={16} /> : s}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Step 1: Eligibility</h4>
              <div>
                <label className="block text-sm mb-1">12th Grade Percentage</label>
                <input type="number" value={formData.percentage} onChange={e => { setFormData({...formData, percentage: e.target.value}); if (errors.percentage) setErrors({...errors, percentage: ''}); }} className={getInputClass(!!errors.percentage)} placeholder="e.g. 75" aria-invalid={!!errors.percentage} />
                <AnimatePresence>
                  {errors.percentage && (
                    <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-red-400 text-xs mt-1 flex items-center gap-1 overflow-hidden"><AlertCircle size={12}/>{errors.percentage}</motion.p>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={formData.hasPhysics} onChange={e => { setFormData({...formData, hasPhysics: e.target.checked}); if (errors.hasPhysics) setErrors({...errors, hasPhysics: ''}); }} className="rounded" /> Physics
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={formData.hasMath} onChange={e => { setFormData({...formData, hasMath: e.target.checked}); if (errors.hasMath) setErrors({...errors, hasMath: ''}); }} className="rounded" /> Mathematics
                </label>
              </div>
              <AnimatePresence>
                {(errors.hasPhysics || errors.hasMath) && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-red-400 text-xs mt-1 flex items-center gap-1 overflow-hidden"><AlertCircle size={12}/>Both subjects required.</motion.p>
                )}
              </AnimatePresence>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Step 2: Choose Program</h4>
              <div>
                <label className="block text-sm mb-1">Select Program</label>
                <select value={formData.program} onChange={e => { setFormData({...formData, program: e.target.value}); if (errors.program) setErrors({...errors, program: ''}); }} className={`${getInputClass(!!errors.program)} appearance-none`} aria-invalid={!!errors.program}>
                  <option value="">-- Choose Program --</option>
                  {programs.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <AnimatePresence>
                  {errors.program && (
                    <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-red-400 text-xs mt-1 flex items-center gap-1 overflow-hidden"><AlertCircle size={12}/>{errors.program}</motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Step 3: Contact Details</h4>
              <div>
                <label className="block text-sm mb-1">Full Name</label>
                <input type="text" value={formData.name} onChange={e => { setFormData({...formData, name: e.target.value}); if (errors.name) setErrors({...errors, name: ''}); }} className={getInputClass(!!errors.name)} aria-invalid={!!errors.name} />
                <AnimatePresence>
                  {errors.name && (
                    <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-red-400 text-xs mt-1 flex items-center gap-1 overflow-hidden"><AlertCircle size={12}/>{errors.name}</motion.p>
                  )}
                </AnimatePresence>
              </div>
              <div>
                <label className="block text-sm mb-1">Email Address</label>
                <input type="email" value={formData.email} onChange={e => { setFormData({...formData, email: e.target.value}); if (errors.email) setErrors({...errors, email: ''}); }} className={getInputClass(!!errors.email)} aria-invalid={!!errors.email} />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-red-400 text-xs mt-1 flex items-center gap-1 overflow-hidden"><AlertCircle size={12}/>{errors.email}</motion.p>
                  )}
                </AnimatePresence>
              </div>
              <div>
                <label className="block text-sm mb-1">Phone Number</label>
                <input type="tel" value={formData.phone} onChange={e => { setFormData({...formData, phone: e.target.value}); if (errors.phone) setErrors({...errors, phone: ''}); }} className={getInputClass(!!errors.phone)} aria-invalid={!!errors.phone} />
                <AnimatePresence>
                  {errors.phone && (
                    <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-red-400 text-xs mt-1 flex items-center gap-1 overflow-hidden"><AlertCircle size={12}/>{errors.phone}</motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-[#00E5FF]/20 text-[#00E5FF] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="text-xl font-bold">Application Submitted!</h4>
              <p className="text-sm text-gray-300">Thank you, {formData.name}. We have received your application for {formData.program}. Our admissions team will contact you shortly.</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {step < 4 && (
        <div className="mt-8 flex justify-between items-center">
          {step > 1 ? (
            <button 
              onClick={handleBack}
              disabled={isSubmitting}
              className="text-gray-300 hover:text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <ArrowLeft size={16} /> Back
            </button>
          ) : (
            <div></div>
          )}
          <button 
            onClick={handleNext} 
            disabled={isSubmitting}
            className="bg-[#00E5FF] text-[#002752] font-bold py-2 px-6 rounded-lg hover:bg-cyan-400 transition-colors disabled:opacity-50 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#00E5FF] focus:ring-offset-2 focus:ring-offset-[#002752]"
          >
            {isSubmitting ? 'Processing...' : step === 3 ? 'Submit' : 'Next'}
          </button>
        </div>
      )}
    </motion.div>
  );
}
