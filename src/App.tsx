/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyJCET from './components/WhyJCET';
import Departments from './components/Departments';
import Placements from './components/Placements';
import StudentSpotlight from './components/StudentSpotlight';
import NewsEvents from './components/NewsEvents';
import Gallery from './components/Gallery';
import AdmissionsWidget from './components/AdmissionsWidget';
import Footer from './components/Footer';

export default function App() {
  const [highlightWhy, setHighlightWhy] = useState(false);

  return (
    <div className="min-h-screen bg-navy-dark text-white font-body selection:bg-neon selection:text-navy-dark">
      <Navbar />
      <main>
        <Hero setHighlightWhy={setHighlightWhy} />
        <WhyJCET isHighlighted={highlightWhy} />
        <Departments />
        <Placements />
        <StudentSpotlight />
        <NewsEvents />
        <Gallery />
        <AdmissionsWidget />
      </main>
      <Footer />
    </div>
  );
}
