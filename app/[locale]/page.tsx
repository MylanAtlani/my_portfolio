'use client';

import dynamic from 'next/dynamic';
import { ParticleField } from '@/components/ui/particle-field';
import { HeroSection } from '@/components/sections/hero';
import { ExpertiseSection } from '@/components/sections/expertise';
import { TechnologiesSection } from '@/components/sections/technologies';
import { ProjectsSection } from '@/components/sections/projects';
import { TestimonialsSection } from '@/components/sections/testimonials';
import { NothingDotsDivider } from '@/components/ui/nothing-dots-divider';
import { StickyCTA } from '@/components/ui/sticky-cta';
// Below-fold sections — dynamic imports for code splitting
const ServicesSection = dynamic(() =>
  import('@/components/sections/services').then(m => ({ default: m.ServicesSection }))
);
const CalculatorSection = dynamic(() =>
  import('@/components/sections/calculator').then(m => ({ default: m.CalculatorSection }))
);
const ContactCTASection = dynamic(() =>
  import('@/components/sections/contact-cta').then(m => ({ default: m.ContactCTASection }))
);

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Particle Field Background */}
      <ParticleField />

      {/* Mesh gradient background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse 80% 60% at 15% 20%, rgba(55, 66, 250, 0.07) 0%, transparent 70%)',
            'radial-gradient(ellipse 70% 50% at 85% 75%, rgba(55, 66, 250, 0.05) 0%, transparent 70%)',
            'radial-gradient(ellipse 60% 50% at 75% 15%, rgba(46, 213, 115, 0.06) 0%, transparent 65%)',
            'radial-gradient(ellipse 70% 60% at 20% 80%, rgba(255, 107, 53, 0.06) 0%, transparent 65%)',
            'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(255, 71, 87, 0.04) 0%, transparent 60%)',
          ].join(', '),
        }}
      />

      {/* Sticky CTA */}
      <StickyCTA />

      {/* === Sections (conversion-optimized order) === */}

      {/* 1. Hero — First impression */}
      <HeroSection />

      <NothingDotsDivider />

      {/* 2. Projects — Proof of work immediately */}
      <ProjectsSection />

      <NothingDotsDivider />

      {/* 3. Testimonials — Social proof compounds */}
      <TestimonialsSection />

      <NothingDotsDivider />

      {/* 4. Expertise — Technical credibility */}
      <ExpertiseSection />

      <NothingDotsDivider />

      {/* 5. Technologies — Stack details */}
      <TechnologiesSection />

      <NothingDotsDivider />

      {/* 6. Services — Visitor is now warm */}
      <ServicesSection />

      <NothingDotsDivider />

      {/* 7. Calculator — Budget estimation wizard */}
      <CalculatorSection />

      <NothingDotsDivider />

      {/* 8. Contact — CTA at the end */}
      <ContactCTASection />
    </div>
  );
}
