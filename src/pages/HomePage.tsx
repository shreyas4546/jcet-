import Hero from '../components/Hero';
import FloatingStats from '../components/FloatingStats';
import ExperienceJCET from '../components/ExperienceJCET';
import WhyJCET from '../components/WhyJCET';
import Departments from '../components/Departments';
import PremiumCampusMap from '../components/PremiumCampusMap';
import CampusLife from '../components/CampusLife';
import Placements from '../components/Placements';
import Testimonials from '../components/Testimonials';
import NewsEvents from '../components/NewsEvents';
import Gallery from '../components/Gallery';
import AdmissionsCTA from '../components/AdmissionsCTA';
import VtuAffiliation from '../components/VtuAffiliation';
import Reveal from '../components/Reveal';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FloatingStats />
      <ExperienceJCET />
      <Reveal><WhyJCET /></Reveal>
      <Reveal><Departments /></Reveal>
      <Reveal><CampusLife /></Reveal>
      <PremiumCampusMap />
      <Reveal><Placements /></Reveal>
      <Reveal><Testimonials /></Reveal>
      <Reveal><NewsEvents /></Reveal>
      <Reveal><Gallery /></Reveal>
      <Reveal><AdmissionsCTA /></Reveal>
      <Reveal><VtuAffiliation /></Reveal>
    </>
  );
}
