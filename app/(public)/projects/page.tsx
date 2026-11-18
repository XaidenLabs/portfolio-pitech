import React from 'react';
import { getProjects } from '@/lib/api/projects';
import { ProjectsGallery } from '@/components/public/ProjectsGallery';
import { CtaBanner } from '@/components/public/CtaBanner';

export const metadata = {
  title: 'Engineering Projects & Case Studies | Pitech',
  description:
    'Explore featured case studies across high-scale logistics, telemedicine, architectural real estate, and fintech systems.',
};

export default async function ProjectsPage() {
  const projects = await getProjects('published');

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <section
        style={{
          padding: '48px 20px 40px',
          borderBottom: '1px solid var(--border)',
          backgroundColor: 'var(--bg-subtle)',
        }}
      >
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <p
            style={{
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--text-muted)',
              marginBottom: '6px',
              margin: '0 0 6px 0',
            }}
          >
            Selected Works
          </p>
          <h1
            style={{
              fontSize: 'clamp(28px, 4.5vw, 44px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--text-main)',
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            Case Studies in Resilient Engineering &amp; Interface Design
          </h1>
          <p
            style={{
              marginTop: '12px',
              fontSize: '15px',
              color: 'var(--text-muted)',
              maxWidth: '600px',
              lineHeight: 1.6,
            }}
          >
            A curated showcase of production applications, high-throughput systems, and bespoke digital platforms.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section style={{ padding: '64px 20px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <ProjectsGallery initialProjects={projects} />
        </div>
      </section>

      {/* CTA */}
      <CtaBanner />
    </div>
  );
}
