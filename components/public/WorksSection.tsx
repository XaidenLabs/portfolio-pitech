'use client';

import React, { useState, useMemo } from 'react';
import { Project } from '@/types';
import { ProjectCard } from './ProjectCard';

interface WorksSectionProps {
  projects: Project[];
}

export function WorksSection({ projects }: WorksSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'AI & Systems',
    'Web Apps',
    'Mobile',
    'Fintech & Invoicing',
  ];

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') {
      return projects;
    }
    return projects.filter(
      (p) =>
        p.category.toLowerCase() === activeCategory.toLowerCase() ||
        (p.industry && p.industry.toLowerCase().includes(activeCategory.toLowerCase()))
    );
  }, [projects, activeCategory]);

  return (
    <section
      id="works"
      style={{
        padding: '32px 20px 64px',
        maxWidth: 1040,
        margin: '0 auto',
        width: '100%',
      }}
    >
      {/* Header and Filter Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          marginBottom: 48,
          borderBottom: '1px solid var(--border)',
          paddingBottom: 20,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <h2
            style={{
              fontSize: '24px',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--text-main)',
              margin: 0,
            }}
          >
            Works
          </h2>

          {/* Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    borderRadius: 'var(--radius-full)',
                    padding: '5px 14px',
                    fontSize: '12px',
                    fontWeight: isActive ? 600 : 500,
                    cursor: 'pointer',
                    border: isActive ? '1px solid var(--primary)' : '1px solid var(--border)',
                    backgroundColor: isActive ? 'var(--primary)' : 'var(--bg-subtle)',
                    color: isActive ? 'var(--primary-text)' : 'var(--text-muted)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {cat !== 'All' ? `✦ ${cat}` : 'All'}
                </button>
              );
            })}
          </div>
        </div>

        <span
          style={{
            fontSize: '12px',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-dim)',
          }}
        >
          Featured: {filteredProjects.length}
        </span>
      </div>

      {/* Projects List in Signature Poulo Layout */}
      <div>
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
