/**
 * README:
 * This is the Hero component (v8) for the JCET website.
 * It features a split layout with an Admissions Widget on the left and an interactive 3D Globe on the right.
 * 
 * Props: None required.
 * 
 * How to import:
 * import HeroV8 from '@/components/hero/hero-v8';
 * 
 * Usage:
 * <HeroV8 />
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Download, Users, Briefcase, Award } from 'lucide-react';
import AdmissionsWidget from '../admissions/widget-v8';
import GlobeCanvas from '../globe/globe-v8';

export default function HeroV8() {
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  // Simple check for low performance/mobile to fallback the globe
  useEffect(() => {
    if (window.innerWidth < 768 || window.devicePixelRatio < 1) {
      setIsLowPerformance(true);
    }
  }, []);

  return (
    <section className="relative min-h-screen bg-[#002752] pt-24 pb-16 overflow-hidden flex items-center">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00E5FF]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#FFC857]/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copy & Admissions Widget */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4">
                Engineering the <br />
                <span className="text-[#00E5FF]">Future at JCET</span>
              </h1>
              <p className="text-lg text-gray-300 mb-8">
                Innovative learning, advanced labs, and strong placements.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-10">
                <button 
                  onClick={() => document.getElementById('admissions-widget')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-[#00E5FF] text-[#002752] font-bold px-6 py-3 rounded-lg hover:bg-cyan-400 transition-colors shadow-[0_0_15px_rgba(0,229,255,0.4)] focus:outline-none focus:ring-2 focus:ring-[#00E5FF] focus:ring-offset-2 focus:ring-offset-[#002752]"
                >
                  Apply Now
                </button>
                <button 
                  onClick={() => setShowBrochureModal(true)}
                  className="border border-white/30 text-white font-bold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#002752]"
                >
                  <Download size={18} /> Download Brochure
                </button>
              </div>
            </motion.div>

            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 grid grid-cols-3 gap-4 shadow-xl"
            >
              <div className="text-center relative group cursor-help focus:outline-none focus:ring-2 focus:ring-[#00E5FF] rounded-lg p-2 -m-2" tabIndex={0} aria-label="3.5k+ Students: Enrolled across all programs">
                <Users className="mx-auto text-[#FFC857] mb-2" size={24} aria-hidden="true" />
                <div className="text-2xl font-bold text-white">3.5k+</div>
                <div className="text-xs text-gray-400 uppercase">Students</div>
                {/* Tooltip */}
                <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-[#002752] border border-white/20 text-gray-200 text-xs py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-20 shadow-xl">
                  Enrolled across all programs
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#002752] border-b border-r border-white/20 rotate-45" />
                </div>
              </div>
              <div className="text-center border-l border-r border-white/10 relative group cursor-help focus:outline-none focus:ring-2 focus:ring-[#00E5FF] rounded-lg p-2 -m-2" tabIndex={0} aria-label="98% Placed: Consistent placement record">
                <Briefcase className="mx-auto text-[#00E5FF] mb-2" size={24} aria-hidden="true" />
                <div className="text-2xl font-bold text-white">98%</div>
                <div className="text-xs text-gray-400 uppercase">Placed</div>
                {/* Tooltip */}
                <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-[#002752] border border-white/20 text-gray-200 text-xs py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-20 shadow-xl">
                  Consistent placement record
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#002752] border-b border-r border-white/20 rotate-45" />
                </div>
              </div>
              <div className="text-center relative group cursor-help focus:outline-none focus:ring-2 focus:ring-[#00E5FF] rounded-lg p-2 -m-2" tabIndex={0} aria-label="45LPA Highest: Highest package offered this year">
                <Award className="mx-auto text-[#FFC857] mb-2" size={24} aria-hidden="true" />
                <div className="text-2xl font-bold text-white">45LPA</div>
                <div className="text-xs text-gray-400 uppercase">Highest</div>
                {/* Tooltip */}
                <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-[#002752] border border-white/20 text-gray-200 text-xs py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-20 shadow-xl">
                  Highest package offered this year
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#002752] border-b border-r border-white/20 rotate-45" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Globe / Widget */}
          <div className="lg:col-span-7 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              
              {/* Admissions Widget */}
              <div id="admissions-widget" className="relative z-20">
                <AdmissionsWidget />
              </div>

              {/* 3D Globe or Fallback */}
              <div className="relative z-10 hidden md:block">
                {isLowPerformance ? (
                  <div className="relative rounded-full overflow-hidden border border-white/10 shadow-2xl">
                    <img 
                      src="/images/globe-fallback-v8.webp" 
                      alt="JCET campus globe fallback showing departments" 
                      className="w-full h-auto object-cover opacity-80"
                      onError={(e) => {
                        // Fallback if image doesn't exist yet
                        (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/globe/500/500';
                      }}
                    />
                  </div>
                ) : (
                  <GlobeCanvas />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brochure Modal */}
      {showBrochureModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#002752]/90 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-sm w-full text-center relative"
          >
            <button 
              onClick={() => setShowBrochureModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#002752] rounded-full w-8 h-8 flex items-center justify-center"
              aria-label="Close modal"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold text-[#002752] mb-4">Download Brochure</h3>
            <div className="w-48 h-48 bg-gray-200 mx-auto mb-6 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-400">
              <span className="text-gray-500 font-mono text-sm">[ QR CODE ]</span>
            </div>
            <p className="text-gray-600 mb-6">Scan to download or click below</p>
            <button className="w-full bg-[#00E5FF] text-[#002752] font-bold py-3 rounded-lg hover:bg-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-[#002752] focus:ring-offset-2">
              Download PDF
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
}
