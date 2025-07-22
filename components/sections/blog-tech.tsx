'use client';

import { useInView } from '@/hooks/use-in-view';
import { useState } from 'react';
import { 
  BookOpen, 
  TrendingUp, 
  Code2, 
  Clock, 
  ArrowRight,
  ExternalLink,
  Mail,
  Rss,
  Calendar,
  Tag,
  Users
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured?: boolean;
  image: string;
  gradient: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 'go-vs-nodejs-2025',
    title: 'Go vs Node.js en 2025 : Mon Retour d\'Expérience sur 10 Projets',
    excerpt: 'Après avoir livré des projets avec Go et Node.js chez Ciffréo Bona et Petpalz, voici mon analyse comparative détaillée des deux technologies.',
    author: 'Mylan Atlani',
    date: '2025-01-15',
    readTime: '8 min',
    category: 'Architecture',
    tags: ['Go', 'Node.js', 'Performance', 'Backend'],
    featured: true,
    image: '🚀',
    gradient: 'from-blue-400 to-purple-500'
  },
  {
    id: 'ci-cd-scalable-2025',
    title: 'CI/CD Scalable : 5 Patterns Éprouvés pour Startups en Croissance',
    excerpt: 'Les stratégies CI/CD que j\'ai mises en place chez mes clients pour accompagner leur scale-up sans friction.',
    author: 'Mylan Atlani',
    date: '2025-01-10',
    readTime: '12 min',
    category: 'DevOps',
    tags: ['CI/CD', 'Docker', 'GitHub Actions', 'Scalabilité'],
    image: '⚙️',
    gradient: 'from-green-400 to-blue-500'
  },
  {
    id: 'dette-technique-cto',
    title: 'Gérer la Dette Technique en CTO Fractionné : 3 Méthodes Efficaces',
    excerpt: 'Comment j\'ai aidé 5 startups à réduire leur dette technique sans stopper le développement produit.',
    author: 'Mylan Atlani',
    date: '2025-01-05',
    readTime: '10 min',
    category: 'Management',
    tags: ['CTO', 'Dette Technique', 'Management', 'Stratégie'],
    image: '🎯',
    gradient: 'from-orange-400 to-red-500'
  },
  {
    id: 'nestjs-architecture-2025',
    title: 'Architecture NestJS Évolutive : Patterns et Anti-Patterns',
    excerpt: 'Les bonnes pratiques NestJS que j\'applique pour des APIs robustes et maintenables.',
    author: 'Mylan Atlani',
    date: '2024-12-28',
    readTime: '15 min',
    category: 'Développement',
    tags: ['NestJS', 'TypeScript', 'API', 'Architecture'],
    image: '🏗️',
    gradient: 'from-purple-400 to-pink-500'
  }
];

const categories = [
  { name: 'Tous', count: blogPosts.length },
  { name: 'Architecture', count: blogPosts.filter(p => p.category === 'Architecture').length },
  { name: 'DevOps', count: blogPosts.filter(p => p.category === 'DevOps').length },
  { name: 'Management', count: blogPosts.filter(p => p.category === 'Management').length },
  { name: 'Développement', count: blogPosts.filter(p => p.category === 'Développement').length }
];

export function BlogTechSection() {
  const [ref, inView] = useInView({ threshold: 0.2 });
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const filteredPosts = selectedCategory === 'Tous' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setEmail('');
    
    setTimeout(() => {
      setIsSubscribed(false);
    }, 3000);
  };

  return (
    <section id="blog" ref={ref} className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 nothing-gradient-purple rounded-full blur-3xl opacity-5"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 nothing-gradient-green rounded-full blur-3xl opacity-5"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 nothing-animate-slide-up">
          <h2 className="nothing-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-4 sm:mb-6">
            Veille Tech & Insights
          </h2>
          <div className="w-16 sm:w-20 lg:w-24 h-0.5 sm:h-1 nothing-gradient-orange mx-auto rounded-full mb-6 sm:mb-8"></div>
          <p className="nothing-text text-sm sm:text-lg md:text-xl max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto opacity-70 px-4 sm:px-0">
            <span className="hidden sm:inline">
              Retours d'expérience, bonnes pratiques et tendances tech depuis le terrain
            </span>
            <span className="sm:hidden">
              REX et bonnes pratiques
            </span>
          </p>
        </div>

        {/* Newsletter Signup */}
        <div className={`max-w-2xl mx-auto mb-12 sm:mb-16 transform transition-all duration-700 ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="nothing-card p-6 sm:p-8 text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Mail className="w-6 h-6 text-[var(--nothing-orange)]" />
              <h3 className="nothing-title text-lg sm:text-xl font-light">
                Newsletter Technique
              </h3>
            </div>
            <p className="nothing-text text-sm opacity-70 mb-6">
              Recevez mes derniers REX et analyses tech directement dans votre inbox
            </p>
            
            {!isSubscribed ? (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.pro"
                  required
                  className="flex-1 px-4 py-3 nothing-glass rounded-xl focus:ring-2 focus:ring-[var(--nothing-orange)] outline-none transition-all duration-300"
                />
                <button
                  type="submit"
                  className="nothing-btn-primary flex items-center justify-center space-x-2 px-6 py-3"
                >
                  <Rss className="w-4 h-4" />
                  <span>S'abonner</span>
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-center space-x-2 text-[var(--nothing-green)]">
                <Mail className="w-5 h-5" />
                <span className="nothing-text font-medium">Merci pour votre abonnement !</span>
              </div>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div className={`flex flex-wrap justify-center gap-3 mb-12 sm:mb-16 transform transition-all duration-700 ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`} style={{ transitionDelay: '200ms' }}>
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.name
                  ? 'bg-[var(--nothing-orange)] text-black'
                  : 'nothing-glass hover:bg-white/10'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && filteredPosts[0].featured && (
          <div className={`mb-12 sm:mb-16 transform transition-all duration-700 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`} style={{ transitionDelay: '400ms' }}>
            <div className="nothing-card group overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${filteredPosts[0].gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="relative p-8 sm:p-12">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="px-3 py-1 bg-[var(--nothing-orange)] text-black text-xs font-bold rounded-full">
                    FEATURED
                  </div>
                  <div className="flex items-center space-x-2 nothing-text text-sm opacity-60">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(filteredPosts[0].date).toLocaleDateString('fr-FR')}</span>
                    <Clock className="w-4 h-4 ml-2" />
                    <span>{filteredPosts[0].readTime}</span>
                  </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 items-center">
                  <div className="lg:col-span-2">
                    <h3 className="nothing-title text-2xl sm:text-3xl font-light mb-4 group-hover:text-[var(--nothing-orange)] transition-colors duration-300">
                      {filteredPosts[0].title}
                    </h3>
                    <p className="nothing-text opacity-70 mb-6 leading-relaxed">
                      {filteredPosts[0].excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {filteredPosts[0].tags.map((tag) => (
                        <span 
                          key={tag}
                          className="px-3 py-1 nothing-glass rounded-full text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <button className="nothing-btn-secondary flex items-center space-x-2 group/btn">
                      <BookOpen className="w-4 h-4" />
                      <span>Lire l'article</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </button>
                  </div>

                  <div className="flex justify-center lg:justify-end">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 nothing-glass rounded-3xl flex items-center justify-center text-6xl sm:text-7xl group-hover:scale-110 transition-transform duration-300">
                      {filteredPosts[0].image}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPosts.slice(filteredPosts[0]?.featured ? 1 : 0).map((post, index) => (
            <article
              key={post.id}
              className={`nothing-card group overflow-hidden transform transition-all duration-700 hover:scale-105 ${
                inView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
              style={{ 
                transitionDelay: `${(index + 2) * 150}ms`
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="relative p-6 sm:p-8">
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 nothing-glass rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                  <div className="text-2xl sm:text-3xl">
                    {post.image}
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center space-x-3 mb-4 nothing-text text-xs opacity-60">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(post.date).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="nothing-title text-lg font-light mb-3 group-hover:text-[var(--nothing-orange)] transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="nothing-text text-sm opacity-70 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-6">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span 
                      key={tag}
                      className="px-2 py-0.5 nothing-glass rounded text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Read More */}
                <button className="flex items-center space-x-2 nothing-text text-sm font-medium group-hover:text-[var(--nothing-orange)] transition-colors duration-300">
                  <span>Lire plus</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Section */}
        <div className={`text-center mt-16 sm:mt-20 transform transition-all duration-700 ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`} style={{ transitionDelay: '800ms' }}>
          <div className="nothing-card p-8 sm:p-12">
            <h3 className="nothing-title text-2xl sm:text-3xl font-light mb-4">
              Vous avez un projet technique à discuter ?
            </h3>
            <p className="nothing-text opacity-70 mb-8 max-w-2xl mx-auto">
              Ces articles reflètent mon approche terrain. Si vous avez des défis similaires, 
              discutons-en autour d'un café virtuel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="nothing-btn-primary flex items-center justify-center space-x-2 group">
                <Mail className="w-4 h-4" />
                <span>Planifier un appel</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button className="nothing-btn-secondary flex items-center justify-center space-x-2">
                <ExternalLink className="w-4 h-4" />
                <span>Voir tous les articles</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 