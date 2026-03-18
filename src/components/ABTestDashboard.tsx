/**
 * ABTestDashboard v1.0.0
 * 
 * Description: A simple dashboard to visualize A/B test results.
 * Shows assignments and conversions stored in localStorage.
 */

import React, { useState, useEffect } from 'react';
import { BarChart, Activity, RefreshCw, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ABTestDashboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [stats, setStats] = useState<any>(null);

  const loadStats = () => {
    const assignments = JSON.parse(localStorage.getItem('jcet_ab_assignments') || '{}');
    const conversions = JSON.parse(localStorage.getItem('jcet_ab_conversions') || '[]');
    
    const experimentStats: Record<string, any> = {};

    Object.keys(assignments).forEach(expId => {
      experimentStats[expId] = {
        assignedVariant: assignments[expId],
        conversions: conversions.filter((c: any) => c.experimentId === expId).length,
        events: conversions.filter((c: any) => c.experimentId === expId)
      };
    });

    setStats(experimentStats);
  };

  useEffect(() => {
    if (isOpen) {
      loadStats();
    }
  }, [isOpen]);

  const resetTests = () => {
    localStorage.removeItem('jcet_ab_assignments');
    localStorage.removeItem('jcet_ab_conversions');
    window.location.reload();
  };

  return (
    <>
      {/* Toggle Button (Hidden in production usually, but visible for demo) */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 left-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md border border-white/10 z-50 transition-all"
        title="A/B Test Dashboard"
      >
        <BarChart size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="fixed inset-y-0 left-0 w-80 bg-[#0B0F1A]/95 backdrop-blur-xl border-r border-white/10 z-[60] shadow-2xl p-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <Activity className="text-cyan-400" size={24} />
                <h2 className="text-xl font-bold text-white">A/B Insights</h2>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              {stats && Object.keys(stats).length > 0 ? (
                Object.keys(stats).map(expId => (
                  <div key={expId} className="glass-panel p-4 border-white/5">
                    <h3 className="text-sm font-bold text-cyan-400 mb-2 uppercase tracking-wider">{expId}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Your Variant:</span>
                        <span className="text-white font-mono">{stats[expId].assignedVariant}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Local Conversions:</span>
                        <span className="text-white font-mono">{stats[expId].conversions}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 italic">No experiments active or tracked yet.</p>
              )}
            </div>

            <div className="mt-12 pt-6 border-t border-white/10">
              <button 
                onClick={resetTests}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs font-bold rounded-lg transition-all"
              >
                <RefreshCw size={14} />
                Reset Experiments
              </button>
              <p className="text-[10px] text-gray-500 mt-4 text-center">
                Resetting will clear your assigned variants and local conversion data.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ABTestDashboard;
