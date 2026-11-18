import React from 'react';
import { Hero } from '@/components/public/Hero';
import { ServicesDribbble } from '@/components/public/ServicesDribbble';
import { TrustStrip } from '@/components/public/TrustStrip';
import { StatementShowcase } from '@/components/public/StatementShowcase';
import { WorksSection } from '@/components/public/WorksSection';
import { AiExperiments } from '@/components/public/AiExperiments';
import { AskMeAnything } from '@/components/public/AskMeAnything';
import { HomeAbout } from '@/components/public/HomeAbout';
import { JourneySection } from '@/components/public/JourneySection';
import { MyStackSection } from '@/components/public/MyStackSection';
import { HandsIllustration } from '@/components/public/HandsIllustration';
import { getProjects } from '@/lib/api/projects';

export const metadata = {
  title: 'Jenny Scott | Product Designer & Systems Architect',
  description:
    'Award-winning Product Designer with systems-level creativity, crafting intuitive UI/UX, full-stack applications, and resilient billing platforms.',
};

export default async function HomePage() {
  const allProjects = await getProjects('published');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        background: 'var(--bg)',
      }}
    >
      {/* 1. Hero Section (Dribbble Layout with Rotating Stamp, Portrait, Socials & Marquee) */}
      <Hero />

      {/* 2. My Services ("How I Bring Ideas to Life" Interactive Accordion) */}
      <ServicesDribbble />

      {/* 3. Trust Strip (companies I've contributed to) */}
      <TrustStrip />

      {/* 3. Statement Headline & Floating UI Mockup Showcase */}
      <StatementShowcase />

      {/* 4. Works Section (Signature Poulo Project Card Layout) */}
      <WorksSection projects={allProjects} />

      {/* 5. AI Experiments (3-column Interactive Explorations) */}
      <AiExperiments />

      {/* 6. Ask Me Anything (Interactive Iridescent Prompt Input) */}
      <AskMeAnything />

      {/* 7. About Me (Personal Intro & Photo Collage) */}
      <HomeAbout />

      {/* 8. Journey (Career Timeline Table) */}
      <JourneySection />

      {/* 9. My Stack (Tool Grid + Neural Mind Map + Quote) */}
      <MyStackSection />

      {/* 10. Creation of Adam Hands Illustration */}
      <HandsIllustration />
    </div>
  );
}
