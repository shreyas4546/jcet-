/**
 * ABTesting v1.0.0
 * 
 * Description: A lightweight A/B testing utility for React.
 * Allows defining variants and randomly assigning them to users.
 * Persists the assigned variant in localStorage.
 */

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface ABTestContextType {
  getVariant: (experimentId: string, variants: string[]) => string;
  trackEvent: (experimentId: string, eventName: string) => void;
}

const ABTestContext = createContext<ABTestContextType | undefined>(undefined);

export const ABTestProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [assignments, setAssignments] = useState<Record<string, string>>({});

  useEffect(() => {
    const savedAssignments = localStorage.getItem('jcet_ab_assignments');
    if (savedAssignments) {
      setAssignments(JSON.parse(savedAssignments));
    }
  }, []);

  const getVariant = (experimentId: string, variants: string[]) => {
    if (assignments[experimentId]) {
      return assignments[experimentId];
    }

    const randomIndex = Math.floor(Math.random() * variants.length);
    const assignedVariant = variants[randomIndex];
    
    const newAssignments = { ...assignments, [experimentId]: assignedVariant };
    setAssignments(newAssignments);
    localStorage.setItem('jcet_ab_assignments', JSON.stringify(newAssignments));
    
    console.log(`[AB Test] Experiment "${experimentId}" assigned variant: ${assignedVariant}`);
    return assignedVariant;
  };

  const trackEvent = (experimentId: string, eventName: string) => {
    const variant = assignments[experimentId];
    if (!variant) return;

    // In a real app, you'd send this to an analytics service like Mixpanel or GA
    console.log(`[AB Test] Event "${eventName}" tracked for experiment "${experimentId}" (Variant: ${variant})`);
    
    // For demo purposes, we'll store conversions in localStorage
    const conversions = JSON.parse(localStorage.getItem('jcet_ab_conversions') || '[]');
    conversions.push({
      experimentId,
      variant,
      eventName,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('jcet_ab_conversions', JSON.stringify(conversions));
  };

  return (
    <ABTestContext.Provider value={{ getVariant, trackEvent }}>
      {children}
    </ABTestContext.Provider>
  );
};

export const useABTest = () => {
  const context = useContext(ABTestContext);
  if (!context) {
    throw new Error('useABTest must be used within an ABTestProvider');
  }
  return context;
};

interface ABVariantProps {
  name: string;
  children: ReactNode;
}

export const ABVariant: React.FC<ABVariantProps> = ({ children }) => {
  return <>{children}</>;
};

interface ABExperimentProps {
  id: string;
  children: React.ReactElement<ABVariantProps>[];
}

export const ABExperiment: React.FC<ABExperimentProps> = ({ id, children }) => {
  const { getVariant } = useABTest();
  const variants = React.Children.map(children, child => child.props.name) || [];
  const [assignedVariant, setAssignedVariant] = useState<string>(() => getVariant(id, variants));

  useEffect(() => {
    setAssignedVariant(getVariant(id, variants));
  }, [id, variants, getVariant]);

  if (!assignedVariant) return null;

  const activeChild = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && (child.props as ABVariantProps).name === assignedVariant
  );

  return <>{activeChild}</>;
};
