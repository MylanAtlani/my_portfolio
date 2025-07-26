'use client';

import { ParticleField } from '@/components/ui/particle-field';
import { HeroSection } from '@/components/sections/hero';
import { ExpertiseSection } from '@/components/sections/expertise';
import { TechnologiesSection } from '@/components/sections/technologies';
import { ProjectsSection } from '@/components/sections/projects';
import { TestimonialsSection } from '@/components/sections/testimonials';
import { ServicesSection } from '@/components/sections/services';
import { ContactCTASection } from '@/components/sections/contact-cta';

export default function HomePage() {

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Particle Field Background */}
      <ParticleField />
      
      {/* Floating background elements - Smaller on mobile */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-48 sm:w-96 h-48 sm:h-96 nothing-gradient-blue rounded-full blur-3xl opacity-10 nothing-animate-float"></div>
        <div className="absolute bottom-20 sm:bottom-40 left-10 sm:left-20 w-32 sm:w-80 h-32 sm:h-80 bg-(--nothing-blue) rounded-full blur-3xl opacity-10 nothing-animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 sm:w-60 h-24 sm:h-60 bg-(--nothing-green) rounded-full blur-3xl opacity-15 nothing-animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Hero Section */}
      <HeroSection />

      {/* Expertise Section */}
      <ExpertiseSection />

      {/* Technologies Section */}
      <TechnologiesSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Contact Section Unified */}
      <ContactCTASection />

    </div>
  );
}
