'use client';

import React from 'react';
import Link from 'next/link';
import { Project } from '@/types';
import { Award, Compass, Layers, Sparkles } from '../ui/icons';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  // Catchy title format: Title + punchline if not already formatted
  const displayTitle = project.title.includes('.')
    ? project.title
    : `${project.title}. ${project.summary.split('.')[0]}`;

  return (
    <article
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        marginBottom: 64,
      }}
    >
      {/* Project Title Header & Category Tag */}
      <div>
        <h3
          style={{
            fontSize: 'clamp(20px, 2.5vw, 26px)',
            fontWeight: 800,
            letterSpacing: '-0.025em',
            color: 'var(--text-main)',
            lineHeight: 1.25,
            margin: '0 0 6px 0',
          }}
        >
          {displayTitle}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            {project.category} &bull; {project.year || 2026}
          </span>
        </div>
      </div>

      {/* Main Card Container */}
      <div
        style={{
          borderRadius: 24,
          border: '1px solid var(--border)',
          backgroundColor: 'var(--bg-card)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Top Split Section: Preview (Left) & Thought Bubble (Right) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            padding: 24,
            gap: 24,
            alignItems: 'center',
          }}
        >
          {/* Left: Viewport Preview */}
          <div
            style={{
              borderRadius: 16,
              overflow: 'hidden',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-subtle)',
              position: 'relative',
              aspectRatio: '16/10',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {/* Window Chrome Header */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 26,
                padding: '0 12px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                backgroundColor: 'rgba(15, 23, 42, 0.45)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                zIndex: 2,
              }}
            >
              <div style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#ff5f56' }} />
              <div style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
              <div style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#27c93f' }} />
            </div>

            <img
              src={project.coverImage}
              alt={project.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />

            {/* Dark glassy bottom bar */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '12px 16px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 70%, transparent 100%)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                zIndex: 2,
              }}
            >
              <span>{project.clientName || 'Pitech Studio'}</span>
              <span>{project.industry || 'Systems Architecture'}</span>
            </div>
          </div>

          {/* Right: Thought Bubble Card & Action Button */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%', justifyContent: 'space-between' }}>
            {/* Thought Bubble */}
            <div
              style={{
                borderRadius: 18,
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border)',
                padding: '24px 20px',
                position: 'relative',
              }}
            >
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: 'var(--text-main)',
                  margin: 0,
                }}
              >
                &ldquo;{project.solution || project.summary}&rdquo;
              </p>
            </div>

            {/* Role & Button */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 12,
                paddingTop: 8,
              }}
            >
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                Role: {project.role || 'Principal Systems Architect'}
              </span>

              <Link
                href={`/projects/${project.slug}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '9px 18px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--text-main)',
                  color: 'var(--bg)',
                  fontSize: '12px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'opacity 150ms ease',
                }}
              >
                <span>Case study</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Quad Grid: 4 Feature Pillars */}
        <div
          style={{
            borderTop: '1px solid var(--border)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
            backgroundColor: 'var(--bg-subtle)',
          }}
        >
          {/* Pillar 1: The Problem */}
          <div
            style={{
              padding: '20px 24px',
              borderRight: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-dim)' }}>
              <Compass size={15} />
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
                The problem
              </span>
            </div>
            <p style={{ fontSize: '12px', lineHeight: 1.5, color: 'var(--text-muted)', margin: 0 }}>
              {project.problem || 'Legacy workflows lacked structured semantic schemas, creating engineering friction and manual overhead.'}
            </p>
          </div>

          {/* Pillar 2: What We Built */}
          <div
            style={{
              padding: '20px 24px',
              borderRight: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-dim)' }}>
              <Sparkles size={15} />
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
                What we built
              </span>
            </div>
            <p style={{ fontSize: '12px', lineHeight: 1.5, color: 'var(--text-muted)', margin: 0 }}>
              {project.solution ? project.solution.slice(0, 140) + '...' : 'Engineered a resilient full-stack architecture with real-time sync and tokenized security.'}
            </p>
          </div>

          {/* Pillar 3: Key Metric */}
          <div
            style={{
              padding: '20px 24px',
              borderRight: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-dim)' }}>
              <Layers size={15} />
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
                Key metric
              </span>
            </div>
            <p style={{ fontSize: '12px', lineHeight: 1.5, color: 'var(--text-muted)', margin: 0 }}>
              {project.results ? project.results.split(',')[0] : '84% faster execution cycle with zero downtime.'}
            </p>
          </div>

          {/* Pillar 4: Customer Impact */}
          <div
            style={{
              padding: '20px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-dim)' }}>
              <Award size={15} />
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
                Customer impact
              </span>
            </div>
            <p style={{ fontSize: '12px', lineHeight: 1.5, color: 'var(--text-muted)', margin: 0 }}>
              Adopted by high-growth product teams across Europe and West Africa.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
