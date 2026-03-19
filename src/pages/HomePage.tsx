import Hero from '../components/Hero';
import FloatingStats from '../components/FloatingStats';
import WhyJCET from '../components/WhyJCET';
import Departments from '../components/Departments';
import CampusMap from '../components/CampusMap';
import CampusLife from '../components/CampusLife';
import Placements from '../components/Placements';
import Testimonials from '../components/Testimonials';
import NewsEvents from '../components/NewsEvents';
import Gallery from '../components/Gallery';
import AdmissionsCTA from '../components/AdmissionsCTA';
import Reveal from '../components/Reveal';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FloatingStats />
      <Reveal><WhyJCET /></Reveal>
      <Reveal><Departments /></Reveal>
      <Reveal><CampusMap /></Reveal>
      <Reveal><CampusLife /></Reveal>
      <Reveal><Placements /></Reveal>
      <Reveal><Testimonials /></Reveal>
      <Reveal><NewsEvents /></Reveal>
      <Reveal><Gallery /></Reveal>
      <Reveal><AdmissionsCTA /></Reveal>
    </>
  );
}
