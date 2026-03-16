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
import ScrollStory from './components/story/scroll-story-v1.0.0';
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

export default function App() {
  const [highlightWhy, setHighlightWhy] = useState(false);

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-navy-dark text-white font-body selection:bg-neon selection:text-navy-dark">
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero setHighlightWhy={setHighlightWhy} />
          <FloatingStats />
          <Reveal>
            <WhyJCET isHighlighted={highlightWhy} />
          </Reveal>
          <ScrollStory />
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
      </div>
    </SmoothScroll>
  );
}
