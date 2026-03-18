'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '@/components/ui/section-header';
import { ListItem } from '@/components/ui/list-item';
import {
  AnimatedSection,
  AnimatedGrid,
  AnimatedCard,
} from '@/components/projects/animated-project-sections';
import { SerializedProject } from '@/lib/project-serializer';

interface ProjectContentProps {
  project: SerializedProject;
  t: Record<string, string>;
}

const SECTIONS = [
  { key: 'mission', color: 'var(--nothing-blue)', variant: 'fadeUp' as const },
  { key: 'challenges', color: 'var(--nothing-orange)', variant: 'slideLeft' as const },
  { key: 'achievements', color: 'var(--nothing-green)', variant: 'slideRight' as const },
  { key: 'learnings', color: 'var(--nothing-red)', variant: 'fadeUp' as const },
] as const;

export function ProjectContent({ project, t }: ProjectContentProps) {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Determine which sections exist
  const activeSections = SECTIONS.filter(
    (s) => project[s.key as keyof SerializedProject] && (project[s.key as keyof SerializedProject] as string[])?.length > 0
  );

  const setRef = useCallback((el: HTMLDivElement | null, idx: number) => {
    sectionRefs.current[idx] = el;
  }, []);

  // IntersectionObserver to track which section is in view
  useEffect(() => {
    const refs = sectionRefs.current.filter(Boolean) as HTMLDivElement[];
    if (refs.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most visible section
        let bestIdx = -1;
        let bestRatio = 0;
        entries.forEach((entry) => {
          const idx = refs.indexOf(entry.target as HTMLDivElement);
          if (idx !== -1 && entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            bestIdx = idx;
          }
        });
        if (bestIdx !== -1) {
          setActiveIndex(bestIdx);
        }
      },
      {
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
        rootMargin: '-10% 0px -30% 0px',
      }
    );

    refs.forEach((ref) => observer.observe(ref));
    return () => observer.disconnect();
  }, [activeSections.length]);

  // Map section keys to ref indices (challenges+achievements share a visual block)
  // Visual blocks: mission(0), challenges+achievements(1), learnings(2)
  const hasMission = project.mission && project.mission.length > 0;
  const hasChallenges = project.challenges && project.challenges.length > 0;
  const hasAchievements = project.achievements && project.achievements.length > 0;
  const hasChallengesOrAchievements = hasChallenges || hasAchievements;
  const hasLearnings = project.learnings && project.learnings.length > 0;

  // Build visual blocks for the indicator dots
  const visualBlocks: { color: string; colors?: string[] }[] = [];
  if (hasMission) visualBlocks.push({ color: 'var(--nothing-blue)' });
  if (hasChallengesOrAchievements) visualBlocks.push({ color: 'var(--nothing-orange)', colors: ['var(--nothing-orange)', 'var(--nothing-green)'] });
  if (hasLearnings) visualBlocks.push({ color: 'var(--nothing-red)' });

  const dotPositions = visualBlocks.map((_, idx) =>
    (idx / Math.max(visualBlocks.length - 1, 1)) * 100
  );

  const currentColor = visualBlocks[activeIndex]?.color || 'var(--nothing-blue)';

  return (
    <div className="lg:col-span-2 space-y-12 relative">
      {/* Progress Indicator — desktop only */}
      <div className="hidden lg:block absolute -left-8 top-0 bottom-0 w-px bg-white/10">
        {visualBlocks.map((block, idx) => (
          <div key={idx} className="absolute -left-[3.5px] flex flex-col gap-1" style={{ top: `${dotPositions[idx]}%` }}>
            {block.colors ? (
              block.colors.map((c, ci) => (
                <div
                  key={ci}
                  className="w-2 h-2 rounded-full transition-opacity duration-300"
                  style={{ backgroundColor: c, opacity: activeIndex === idx ? 0.9 : 0.4 }}
                />
              ))
            ) : (
              <div
                className="w-2 h-2 rounded-full transition-opacity duration-300"
                style={{ backgroundColor: block.color, opacity: activeIndex === idx ? 0.9 : 0.4 }}
              />
            )}
          </div>
        ))}
        <motion.div
          className="absolute w-3 h-3 -left-[5px] rounded-full shadow-lg"
          animate={{
            top: `${dotPositions[activeIndex] ?? 0}%`,
            background: currentColor,
            boxShadow: `0 0 8px ${currentColor}`,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      </div>

      {/* Mission */}
      {hasMission && (
        <div ref={(el) => setRef(el, 0)}>
          <AnimatedSection variant="fadeUp">
            <SectionHeader title={t['projects.mission']} icon={null} iconColor="var(--nothing-blue)" size="lg" className="mb-8" />
            <AnimatedGrid className="space-y-4">
              {project.mission!.map((item, index) => (
                <AnimatedCard key={index}>
                  <ListItem dotColor="var(--nothing-blue)" dotSize="md" cardStyle={true} hoverEffect="scale">
                    <p className="nothing-text leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity text-sm">{item}</p>
                  </ListItem>
                </AnimatedCard>
              ))}
            </AnimatedGrid>
          </AnimatedSection>
        </div>
      )}

      {/* Challenges & Achievements — side by side on md+ */}
      {hasChallengesOrAchievements && (
        <div ref={(el) => setRef(el, 1)} className="grid md:grid-cols-2 gap-8">
          {hasChallenges && (
            <AnimatedSection variant="slideLeft">
              <SectionHeader title={t['projects.challenges']} icon={null} iconColor="var(--nothing-orange)" size="md" className="mb-6" />
              <div className="space-y-3">
                {project.challenges!.map((item, index) => (
                  <ListItem key={index} dotColor="var(--nothing-orange)" dotSize="md" hoverEffect="translate">
                    <p className="text-sm nothing-text opacity-80 group-hover:opacity-100 transition-opacity">{item}</p>
                  </ListItem>
                ))}
              </div>
            </AnimatedSection>
          )}

          {hasAchievements && (
            <AnimatedSection variant="slideRight">
              <SectionHeader title={t['projects.achievements']} icon={null} iconColor="var(--nothing-green)" size="md" className="mb-6" />
              <div className="space-y-3">
                {project.achievements!.map((item, index) => (
                  <ListItem key={index} dotColor="var(--nothing-green)" dotSize="md" hoverEffect="translate">
                    <p className="text-sm nothing-text opacity-80 group-hover:opacity-100 transition-opacity">{item}</p>
                  </ListItem>
                ))}
              </div>
            </AnimatedSection>
          )}
        </div>
      )}

      {/* Learnings — 2×2 grid with scaleIn */}
      {hasLearnings && (
        <div ref={(el) => setRef(el, 2)}>
          <AnimatedSection variant="fadeUp">
            <SectionHeader title={t['projects.learnings']} icon={null} iconColor="var(--nothing-red)" size="lg" className="mb-8" />
            <AnimatedGrid className="grid sm:grid-cols-2 gap-4">
              {project.learnings!.map((item, index) => (
                <AnimatedCard key={index}>
                  <ListItem dotColor="var(--nothing-red)" dotSize="md" hoverEffect="scale">
                    <p className="nothing-text opacity-80 group-hover:opacity-100 transition-opacity">{item}</p>
                  </ListItem>
                </AnimatedCard>
              ))}
            </AnimatedGrid>
          </AnimatedSection>
        </div>
      )}
    </div>
  );
}
