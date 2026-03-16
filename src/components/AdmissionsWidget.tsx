import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Download, ArrowRight, CalendarClock, AlertCircle } from 'lucide-react';

export default function AdmissionsWidget() {
  const [activeStep, setActiveStep] = useState(1);

  // Step 1 State
  const [percentage, setPercentage] = useState('');
  const [hasPhysics, setHasPhysics] = useState(false);
  const [hasMath, setHasMath] = useState(false);
  const [step1Valid, setStep1Valid] = useState(false);

  // Step 2 State
  const [program, setProgram] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [step2Valid, setStep2Valid] = useState(false);

  useEffect(() => {
    const pct = parseFloat(percentage);
    const isValidPct = !isNaN(pct) && pct >= 60 && pct <= 100;
    setStep1Valid(isValidPct && hasPhysics && hasMath);
  }, [percentage, hasPhysics, hasMath]);

  useEffect(() => {
    setStep2Valid(program !== '' && specialization !== '');
  }, [program, specialization]);

  const handleNextStep = (e: React.MouseEvent, stepId: number) => {
    e.stopPropagation();
    if (stepId === 1 && !step1Valid) return;
    if (stepId === 2 && !step2Valid) return;
    if (activeStep < steps.length) setActiveStep(activeStep + 1);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveStep(1);
    setPercentage('');
    setHasPhysics(false);
    setHasMath(false);
    setProgram('');
    setSpecialization('');
  };

  const programs = {
    'B.Tech': ['Computer Science', 'Mechanical', 'Civil', 'Electronics', 'Artificial Intelligence'],
    'M.Tech': ['Cybersecurity', 'Data Science', 'Structural Engineering'],
    'MBA': ['Finance', 'Marketing', 'Human Resources']
  };

  const steps = [
    { id: 1, title: 'Check eligibility', desc: 'Review academic requirements.' },
    { id: 2, title: 'Choose program', desc: 'Select your engineering discipline.' },
    { id: 3, title: 'Submit application', desc: 'Fill out the online admission form.' },
    { id: 4, title: 'Admission confirmation', desc: 'Receive your offer letter.' },
  ];

  return (
    <section id="admissions" className="py-24 bg-navy-dark relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Copy & CTAs */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Admissions <span className="text-neon">2026</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                Join Jain College of Engineering and Technology. Follow our simple 4-step process to secure your seat in our cutting-edge programs.
              </p>
              
              <div className="space-y-4">
                <div className="glass-panel p-5 flex items-center gap-4 border-l-4 border-l-warm">
                  <div className="p-3 bg-warm/10 rounded-full text-warm">
                    <CalendarClock size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Admission Deadline</h4>
                    <p className="text-xl font-bold text-white">August 15, 2026</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button className="btn-primary flex items-center justify-center gap-2 group w-full sm:w-auto">
                    Apply Now
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="btn-secondary flex items-center justify-center gap-2 w-full sm:w-auto">
                    <Download size={18} />
                    Download Brochure
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Stepper Widget */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="glass-panel p-8 md:p-12 border border-white/10 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white">Application Status</h3>
                <span className="text-xs font-bold text-neon bg-neon/10 px-3 py-1 rounded-full border border-neon/20">
                  Step {activeStep} of 4
                </span>
              </div>
              
              <div className="relative">
                {/* Connecting Line */}
                <div className="absolute left-[19px] top-2 bottom-8 w-[2px] bg-white/10" />
                
                <div className="space-y-6">
                  {steps.map((step) => {
                    const isActive = step.id === activeStep;
                    const isCompleted = step.id < activeStep;
                    
                    return (
                      <div 
                        key={step.id}
                        className={`relative flex gap-6 cursor-pointer group ${isActive ? 'opacity-100' : 'opacity-60 hover:opacity-100 transition-opacity'}`}
                        onClick={() => setActiveStep(step.id)}
                      >
                        {/* Step Indicator */}
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors duration-300 ${
                          isActive ? 'bg-neon text-navy-dark shadow-[0_0_15px_rgba(0,229,255,0.4)]' : 
                          isCompleted ? 'bg-warm text-navy-dark' : 'bg-navy-dark border-2 border-white/20 text-gray-400'
                        }`}>
                          {isCompleted ? <CheckCircle2 size={20} /> : <span className="font-bold">{step.id}</span>}
                        </div>
                        
                        {/* Step Content */}
                        <div className={`pt-2 w-full ${isActive ? 'scale-[1.02] origin-left transition-transform duration-300' : ''}`}>
                          <h4 className={`text-lg font-bold mb-1 ${isActive ? 'text-neon' : 'text-white'}`}>
                            {step.title}
                          </h4>
                          <p className="text-sm text-gray-400">{step.desc}</p>
                          
                          {/* Active Step Details (Expandable) */}
                          <AnimatePresence>
                            {isActive && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 p-5 bg-white/5 rounded-xl border border-white/10 overflow-hidden"
                              >
                                <div className="flex flex-col gap-4">
                                  {step.id === 1 && (
                                    <div className="space-y-4">
                                      <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">12th Grade Percentage</label>
                                        <input 
                                          type="number" 
                                          value={percentage}
                                          onChange={(e) => setPercentage(e.target.value)}
                                          placeholder="e.g. 75"
                                          className="w-full bg-navy-dark/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-neon transition-colors"
                                        />
                                        {percentage && parseFloat(percentage) < 60 && (
                                          <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12}/> Minimum 60% required.</p>
                                        )}
                                      </div>
                                      <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Required Subjects Passed</label>
                                        <div className="flex gap-4">
                                          <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                                            <input type="checkbox" checked={hasPhysics} onChange={(e) => setHasPhysics(e.target.checked)} className="rounded border-white/20 bg-navy-dark/50 text-neon focus:ring-neon focus:ring-offset-navy-dark" />
                                            Physics
                                          </label>
                                          <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                                            <input type="checkbox" checked={hasMath} onChange={(e) => setHasMath(e.target.checked)} className="rounded border-white/20 bg-navy-dark/50 text-neon focus:ring-neon focus:ring-offset-navy-dark" />
                                            Mathematics
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {step.id === 2 && (
                                    <div className="space-y-4">
                                      <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Select Program</label>
                                        <select 
                                          value={program}
                                          onChange={(e) => { setProgram(e.target.value); setSpecialization(''); }}
                                          className="w-full bg-navy-dark/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-neon transition-colors appearance-none"
                                        >
                                          <option value="">-- Choose Program --</option>
                                          {Object.keys(programs).map(p => <option key={p} value={p}>{p}</option>)}
                                        </select>
                                      </div>
                                      {program && (
                                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                                          <label className="block text-sm font-medium text-gray-300 mb-1">Select Specialization</label>
                                          <select 
                                            value={specialization}
                                            onChange={(e) => setSpecialization(e.target.value)}
                                            className="w-full bg-navy-dark/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-neon transition-colors appearance-none"
                                          >
                                            <option value="">-- Choose Specialization --</option>
                                            {programs[program as keyof typeof programs].map(s => <option key={s} value={s}>{s}</option>)}
                                          </select>
                                        </motion.div>
                                      )}
                                    </div>
                                  )}

                                  {step.id === 3 && (
                                    <p className="text-sm text-gray-300">Keep your documents ready for upload. You will be redirected to the application portal.</p>
                                  )}

                                  {step.id === 4 && (
                                    <p className="text-sm text-gray-300">Track your application status here.</p>
                                  )}

                                  <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/10">
                                    <p className="text-xs text-gray-400">
                                      {step.id === 1 && (step1Valid ? <span className="text-neon flex items-center gap-1"><CheckCircle2 size={14}/> Eligible to apply</span> : "Complete fields to check eligibility")}
                                      {step.id === 2 && (step2Valid ? <span className="text-neon flex items-center gap-1"><CheckCircle2 size={14}/> Program selected</span> : "Select program and specialization")}
                                    </p>
                                    <div className="flex items-center gap-3 ml-4">
                                      {step.id >= 2 && (
                                        <button
                                          className="text-sm text-gray-400 hover:text-white transition-colors py-2 px-3"
                                          onClick={handleReset}
                                        >
                                          Reset Form
                                        </button>
                                      )}
                                      <button 
                                        className={`btn-primary py-2 px-4 text-sm whitespace-nowrap ${
                                          (step.id === 1 && !step1Valid) || (step.id === 2 && !step2Valid) 
                                            ? 'opacity-50 cursor-not-allowed' 
                                            : ''
                                        }`}
                                        onClick={(e) => handleNextStep(e, step.id)}
                                        disabled={(step.id === 1 && !step1Valid) || (step.id === 2 && !step2Valid)}
                                      >
                                        {activeStep === steps.length ? 'Finish' : 'Next Step'}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
