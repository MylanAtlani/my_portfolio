'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, Code2, Zap, Palette, Mail, Download, Github, ExternalLink, Linkedin, Server, Database, Cloud } from 'lucide-react';
import { ProgressDots } from '@/components/ui/progress-dots';

export default function HomePage() {
  const t = useTranslations('home');

  const features = [
    {
      icon: Server,
      title: 'Architecture Backend',
      description: 'Refonte et mise en place d\'architectures robustes avec Go, NestJS et Next.js pour des backends scalables',
      color: 'var(--nothing-blue)'
    },
    {
      icon: Cloud,
      title: 'Infrastructure & CI/CD',
      description: 'Structuration CI/CD complète avec Docker, Traefik, PostgreSQL et AWS pour une infrastructure scalable',
      color: 'var(--nothing-green)'
    },
    {
      icon: Zap,
      title: 'Conseil Stratégique',
      description: 'Audit technique, conseil sur la dette technique et accompagnement du delivery pour optimiser la productivité',
      color: 'var(--nothing-yellow)'
    }
  ];

  const projects = [
    {
      title: 'Ciffréo Bona - Lead Developer',
      description: 'Architecture backend moderne avec Go & NestJS, intégration OpenSearch, pipelines CI/CD et connexion ERP. Latence divisée par 2.',
      technologies: ['Go', 'NestJS', 'OpenSearch', 'Docker', 'PayXpert'],
      status: 'active',
      gradient: 'from-blue-400 to-purple-500',
      period: '2024-2025'
    },
    {
      title: 'Petpalz.io - CTO',
      description: 'Plateforme mobile-first de santé animale from scratch. API NestJS/Go, app Flutter, interface Next.js et infrastructure PostgreSQL.',
      technologies: ['NestJS', 'Go', 'Flutter', 'Next.js', 'PostgreSQL'],
      status: 'active',
      gradient: 'from-green-400 to-blue-500',
      period: '2024-2025'
    },
    {
      title: 'Woman & Luxury - Fullstack',
      description: 'Application mobile de mode complète : API NestJS, back-office React, interface créateurs Next.js, microservices Python/Go sur Azure.',
      technologies: ['NestJS', 'React', 'Next.js', 'Python', 'Go', 'Azure'],
      status: 'active',
      gradient: 'from-orange-400 to-red-500',
      period: '2019-2025'
    }
  ];

  const technologies = [
    { name: 'Go', level: 95 },
    { name: 'NestJS', level: 95 },
    { name: 'Next.js', level: 90 },
    { name: 'PostgreSQL', level: 90 },
    { name: 'Docker', level: 88 },
    { name: 'AWS', level: 85 },
    { name: 'React', level: 85 },
    { name: 'TypeScript', level: 85 }
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Floating background elements - Smaller on mobile */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-48 sm:w-96 h-48 sm:h-96 nothing-gradient-orange rounded-full blur-3xl opacity-20 nothing-animate-float"></div>
        <div className="absolute bottom-20 sm:bottom-40 left-10 sm:left-20 w-32 sm:w-80 h-32 sm:h-80 bg-(--nothing-blue) rounded-full blur-3xl opacity-10 nothing-animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 sm:w-60 h-24 sm:h-60 bg-(--nothing-green) rounded-full blur-3xl opacity-15 nothing-animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 sm:pt-0">
        <div className="max-w-7xl mx-auto text-center nothing-animate-slide-up">
          {/* Status Badge - Responsive */}
          <div className="inline-flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 nothing-glass rounded-full mb-6 sm:mb-8">
            <div className="nothing-status scale-75 sm:scale-100"></div>
            <span className="nothing-text text-xs sm:text-sm font-medium">
              <span className="hidden sm:inline">Disponible pour missions freelance</span>
              <span className="sm:hidden">Disponible</span>
            </span>
          </div>

          {/* Main Title - Very responsive avec line-height corrigé */}
          <div className="space-y-6 sm:space-y-8 mb-8 sm:mb-12">
            <h1 className="nothing-title text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-light nothing-gradient-text pb-4 sm:pb-6" style={{ lineHeight: '1.3' }}>
              ATLANI Mylan
            </h1>
            <h2 className="nothing-text text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light opacity-80">
              Lead Dev Freelance & CTO
            </h2>
            <div className="w-16 sm:w-20 lg:w-24 h-0.5 sm:h-1 nothing-gradient-orange mx-auto rounded-full"></div>
            <p className="nothing-text text-sm sm:text-base md:text-lg opacity-60 max-w-2xl mx-auto px-4 sm:px-0">
              <span className="hidden sm:inline">Refacto, structuration & mise en production de backends robustes</span>
              <span className="sm:hidden">Backend robuste & architecture scalable</span>
            </p>
          </div>

          {/* Description - Better mobile text */}
          <p className="nothing-text text-sm sm:text-lg md:text-xl lg:text-2xl max-w-xs sm:max-w-2xl lg:max-w-4xl mx-auto mb-8 sm:mb-12 opacity-70 leading-relaxed px-4 sm:px-0">
            <span className="hidden sm:inline">
              J'aide les startups et scale-ups à structurer, industrialiser et livrer des backends robustes et évolutifs. 
              Ingénieur EPITECH avec 8 ans d'expérience dont 7 en freelance.
            </span>
            <span className="sm:hidden">
              Lead Dev spécialisé en Go, NestJS et Next.js. 
              8 ans d'expérience en architecture backend robuste.
            </span>
          </p>

          {/* CTA Buttons - Much better mobile layout */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center items-center mb-12 sm:mb-16 px-4 sm:px-0">
            <button className="w-full sm:w-auto nothing-btn-primary flex items-center justify-center space-x-2 sm:space-x-3 group text-sm sm:text-base py-3 sm:py-4 px-6 sm:px-8">
              <span className="hidden sm:inline">Découvrir mes projets</span>
              <span className="sm:hidden">Mes projets</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button className="w-full sm:w-auto nothing-btn-secondary flex items-center justify-center space-x-2 sm:space-x-3 text-sm sm:text-base py-3 sm:py-4 px-6 sm:px-8">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Discutons de vos enjeux</span>
              <span className="sm:hidden">Contact</span>
            </button>
          </div>

          {/* Stats - Compact mobile version */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-sm sm:max-w-2xl mx-auto px-4 sm:px-0">
            <div className="text-center">
              <div className="nothing-title text-xl sm:text-3xl md:text-4xl nothing-gradient-text">8+</div>
              <div className="nothing-text text-xs sm:text-sm opacity-60">
                <span className="hidden sm:inline">Années d'expérience</span>
                <span className="sm:hidden">Années</span>
              </div>
            </div>
            <div className="text-center">
              <div className="nothing-title text-xl sm:text-3xl md:text-4xl nothing-gradient-text">50+</div>
              <div className="nothing-text text-xs sm:text-sm opacity-60">
                <span className="hidden sm:inline">Projets réalisés</span>
                <span className="sm:hidden">Projets</span>
              </div>
            </div>
            <div className="text-center">
              <div className="nothing-title text-xl sm:text-3xl md:text-4xl nothing-gradient-text">100%</div>
              <div className="nothing-text text-xs sm:text-sm opacity-60">
                <span className="hidden sm:inline">Clients satisfaits</span>
                <span className="sm:hidden">Clients</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator - Hidden on small mobile */}
        <div className="hidden sm:block absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/40 rounded-full mt-2 nothing-animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20 nothing-animate-slide-up">
            <h2 className="nothing-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-4 sm:mb-6">
              Expertise
            </h2>
            <div className="w-16 sm:w-20 lg:w-24 h-0.5 sm:h-1 nothing-gradient-orange mx-auto rounded-full mb-6 sm:mb-8"></div>
            <p className="nothing-text text-sm sm:text-lg md:text-xl max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto opacity-70 px-4 sm:px-0">
              <span className="hidden sm:inline">
                Mes interventions types : refonte d'architecture, structuration CI/CD et conseil stratégique technique
              </span>
              <span className="sm:hidden">
                Architecture, CI/CD et conseil stratégique technique
              </span>
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={feature.title} 
                  className="nothing-card text-center group"
                  style={{ 
                    animationDelay: `${index * 200}ms`,
                    animation: 'nothing-slide-up 0.8s ease-out'
                  }}
                >
                  <div 
                    className="w-16 sm:w-20 h-16 sm:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 transition-all duration-300 group-hover:scale-110"
                    style={{ 
                      background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}40)`,
                      border: `1px solid ${feature.color}30`
                    }}
                  >
                    <IconComponent 
                      className="w-8 sm:w-10 h-8 sm:h-10 transition-all duration-300" 
                      style={{ color: feature.color }}
                    />
                  </div>
                  <h3 className="nothing-title text-lg sm:text-xl lg:text-2xl font-light mb-3 sm:mb-4">{feature.title}</h3>
                  <p className="nothing-text opacity-70 leading-relaxed text-sm sm:text-base">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20 nothing-animate-slide-up">
            <h2 className="nothing-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-4 sm:mb-6">
              Technologies
            </h2>
            <div className="w-16 sm:w-20 lg:w-24 h-0.5 sm:h-1 nothing-gradient-orange mx-auto rounded-full mb-6 sm:mb-8"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {technologies.map((tech, index) => (
              <div key={tech.name} className="nothing-card">
                <div className="flex items-center justify-between mb-4">
                  <span className="nothing-text font-medium text-sm sm:text-base">{tech.name}</span>
                  <span className="nothing-text text-xs sm:text-sm opacity-60">{tech.level}%</span>
                </div>
                
                {/* Barre de progression en dots Nothing OS */}
                <ProgressDots percentage={tech.level} delay={index * 100} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20 nothing-animate-slide-up">
            <h2 className="nothing-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-4 sm:mb-6">
              Projets Récents
            </h2>
            <div className="w-16 sm:w-20 lg:w-24 h-0.5 sm:h-1 nothing-gradient-orange mx-auto rounded-full mb-6 sm:mb-8"></div>
            <p className="nothing-text text-sm sm:text-lg md:text-xl max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto opacity-70 px-4 sm:px-0">
              <span className="hidden sm:inline">
                Missions récentes en tant que Lead Dev et CTO : architecture backend, refonte et infrastructures scalables
              </span>
              <span className="sm:hidden">
                Missions Lead Dev et CTO récentes
              </span>
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <div 
                key={project.title} 
                className="nothing-card group overflow-hidden p-0"
                style={{ 
                  animationDelay: `${index * 200}ms`,
                  animation: 'nothing-slide-up 0.8s ease-out'
                }}
              >
                {/* Project Image/Preview */}
                <div className={`h-48 sm:h-56 lg:h-64 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex items-center space-x-1.5 sm:space-x-2">
                    <div className={`nothing-status scale-75 sm:scale-100 ${project.status === 'active' ? 'bg-(--nothing-green)' : 'bg-(--nothing-yellow)'}`}></div>
                    <span className="text-white text-xs font-medium">
                      {project.status === 'active' ? 'Actif' : 'Dev'}
                    </span>
                  </div>
                  
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                    <span className="text-white/80 text-xs font-medium px-2 py-1 nothing-glass rounded-full">
                      {project.period}
                    </span>
                  </div>
                  
                  {/* Hover Actions */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex space-x-3 sm:space-x-4">
                      <button className="p-2 sm:p-3 nothing-glass rounded-lg sm:rounded-xl text-white hover:scale-110 transition-transform">
                        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      <button className="p-2 sm:p-3 nothing-glass rounded-lg sm:rounded-xl text-white hover:scale-110 transition-transform">
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-4 sm:p-6 lg:p-8">
                  <h3 className="nothing-title text-lg sm:text-xl font-light mb-2 sm:mb-3">{project.title}</h3>
                  <p className="nothing-text text-xs sm:text-sm opacity-70 mb-4 sm:mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="px-2 sm:px-3 py-0.5 sm:py-1 nothing-glass rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Header */}
          <div className="mb-12 sm:mb-16 nothing-animate-slide-up">
            <h2 className="nothing-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-4 sm:mb-6">
              Contact
            </h2>
            <div className="w-16 sm:w-20 lg:w-24 h-0.5 sm:h-1 nothing-gradient-orange mx-auto rounded-full mb-6 sm:mb-8"></div>
            <p className="nothing-text text-sm sm:text-lg md:text-xl opacity-70 mb-8 sm:mb-12 px-4 sm:px-0">
              <span className="hidden sm:inline">
                Discutons de vos enjeux tech → Mission freelance de 2 jours/semaine à temps plein
              </span>
              <span className="sm:hidden">
                Discutons de vos enjeux tech et projets
              </span>
            </p>
          </div>

          {/* Contact Card */}
          <div className="nothing-card max-w-2xl mx-auto">
            <div className="space-y-6 sm:space-y-8">
              <div className="flex justify-center">
                <div className="nothing-status"></div>
              </div>
              
              <div className="space-y-4 sm:space-y-6">
                <h3 className="nothing-title text-lg sm:text-xl lg:text-2xl font-light">
                  <span className="hidden sm:inline">Disponible pour missions CTO & Lead Dev</span>
                  <span className="sm:hidden">Disponible pour missions</span>
                </h3>
                <p className="nothing-text opacity-70 text-sm sm:text-base px-4 sm:px-0">
                  <span className="hidden sm:inline">
                    Refonte d'architecture, audit technique, conseil stratégique ou intervention d'urgence - 
                    transformons ensemble vos défis techniques en succès.
                  </span>
                  <span className="sm:hidden">
                    Architecture, audit technique et conseil stratégique - 
                    transformons vos défis en succès.
                  </span>
                </p>
              </div>

              {/* Contact Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <a 
                  href="mailto:atlani.mylan@gmail.com"
                  className="flex items-center justify-center space-x-2 nothing-btn-primary text-sm sm:text-base py-3 sm:py-4 px-6 sm:px-8"
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>atlani.mylan@gmail.com</span>
                </a>
                <a 
                  href="https://www.linkedin.com/in/mylan-atlani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 nothing-btn-secondary text-sm sm:text-base py-3 sm:py-4 px-6 sm:px-8"
                >
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>LinkedIn</span>
                </a>
              </div>

              {/* Location */}
              <div className="pt-4 border-t border-white/10">
                <p className="nothing-text text-xs sm:text-sm opacity-60">
                  📍 Marseille, France • 🌍 Remote friendly
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
