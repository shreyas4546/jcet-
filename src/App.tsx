/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import SmoothScroll from './components/SmoothScroll';
import Reveal from './components/Reveal';
import Hero from './components/Hero';
import FloatingStats from './components/FloatingStats';
import WhyJCET from './components/WhyJCET';
import ScrollStoryCinematic from './components/ScrollStoryCinematic';
import SplitHeroSection from './components/SplitHeroSection';
import Departments from './components/Departments';
import CampusMap from './components/CampusMap';
import CampusLife from './components/CampusLife';
import Placements from './components/Placements';
import StudentSpotlight from './components/StudentSpotlight';
import Testimonials from './components/Testimonials';
import NewsEvents from './components/NewsEvents';
import Gallery from './components/Gallery';
import AdmissionsCTA from './components/AdmissionsCTA';
import AdmissionsWidget from './components/AdmissionsWidget';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';
import AnimatedGradientBackground from './components/background/animated-gradient-bg-v1.0.0';
import { ABTestProvider } from './components/ABTesting';
import ABTestDashboard from './components/ABTestDashboard';
import ScrollToTop from './components/ScrollToTop';
import CustomCursorV1_3 from './components/ui/custom-cursor-v1.3';

export default function App() {
  const [highlightWhy, setHighlightWhy] = useState(false);

  return (
    <ABTestProvider>
      <CustomCursorV1_3 debug={true} />
      <SmoothScroll>
        <AnimatedGradientBackground>
          <div className="min-h-screen text-white font-body selection:bg-cyan-400 selection:text-[#0B0F1A]">
            <ScrollProgress />
            <Navbar />
            <main>
              <Hero setHighlightWhy={setHighlightWhy} />
              <FloatingStats />
              <Reveal>
                <WhyJCET isHighlighted={highlightWhy} />
              </Reveal>
              <ScrollStoryCinematic />
              <Reveal>
                <SplitHeroSection />
              </Reveal>
              <Reveal>
                <Departments />
              </Reveal>
              <Reveal>
                <CampusMap />
              </Reveal>
              <Reveal>
                <CampusLife />
              </Reveal>
              <Reveal>
                <Placements />
              </Reveal>
              <Reveal>
                <StudentSpotlight />
              </Reveal>
              <Reveal>
                <Testimonials />
              </Reveal>
              <Reveal>
                <NewsEvents />
              </Reveal>
              <Reveal>
                <Gallery />
              </Reveal>
              <Reveal>
                <AdmissionsCTA />
              </Reveal>
              <AdmissionsWidget />
            </main>
            <Footer />
            <AIAssistant />
            <ABTestDashboard />
            <ScrollToTop />
          </div>
        </AnimatedGradientBackground>
      </SmoothScroll>
    </ABTestProvider>
  );
}
