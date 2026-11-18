import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getProjects } from '@/lib/api/projects';
import { ArrowLeft, ExternalLink } from '@/components/ui/icons';
import { CtaBanner } from '@/components/public/CtaBanner';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects('published');
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found | Pitech' };

  return {
    title: `${project.title} | Case Study | Pitech`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = await getProjects('published');
  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <article style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Top back navigation */}
      <div
        style={{
          borderBottom: '1px solid var(--border)',
          backgroundColor: 'var(--bg-subtle)',
          padding: '12px 20px',
        }}
      >
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <Link
            href="/projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              color: 'var(--text-muted)',
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={13} />
            <span>Back to All Projects</span>
          </Link>
        </div>
      </div>

      {/* Hero Header */}
      <section style={{ padding: '48px 20px 32px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <span
              style={{
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                padding: '3px 10px',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                textTransform: 'uppercase',
                color: 'var(--text-main)',
              }}
            >
              {project.category}
            </span>
            {project.industry && (
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                &bull; {project.industry}
              </span>
            )}
          </div>

          <h1
            style={{
              fontSize: 'clamp(28px, 4.5vw, 44px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--text-main)',
              lineHeight: 1.15,
              margin: '0 0 16px 0',
            }}
          >
            {project.title}
          </h1>

          <p
            style={{
              fontSize: '16px',
              color: 'var(--text-muted)',
              maxWidth: '720px',
              lineHeight: 1.6,
              margin: '0 0 32px 0',
            }}
          >
            {project.summary}
          </p>

          {/* Project Metadata Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '16px',
              padding: '20px',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-subtle)',
              marginBottom: '36px',
            }}
          >
            <div>
              <p style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 600, margin: '0 0 4px 0' }}>
                Client
              </p>
              <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', margin: 0 }}>
                {project.clientName || 'Confidential'}
              </p>
            </div>
            <div>
              <p style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 600, margin: '0 0 4px 0' }}>
                Year
              </p>
              <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', margin: 0 }}>
                {project.year || 2026}
              </p>
            </div>
            <div>
              <p style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 600, margin: '0 0 4px 0' }}>
                Role
              </p>
              <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', margin: 0 }}>
                {project.role || 'Lead Architecture'}
              </p>
            </div>
            <div>
              <p style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 600, margin: '0 0 4px 0' }}>
                Live Site
              </p>
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    textDecoration: 'none',
                  }}
                >
                  <span>Visit Product</span>
                  <ExternalLink size={12} />
                </a>
              ) : (
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>Private Enterprise</p>
              )}
            </div>
          </div>

          {/* Cover Hero Image */}
          <div
            style={{
              overflow: 'hidden',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-elevated)',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <img
              src={project.coverImage}
              alt={project.title}
              style={{ width: '100%', height: 'auto', maxHeight: '560px', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>
      </section>

      {/* Case Study Breakdown */}
      <section style={{ padding: '48px 20px 64px' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {/* Tech Stack Tags */}
          <div>
            <h3 style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-dim)', margin: '0 0 12px 0' }}>
              Technologies &amp; Architecture:
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--bg-card)',
                    padding: '4px 12px',
                    fontSize: '12px',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-muted)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Problem */}
          {project.problem && (
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-main)', margin: '0 0 12px 0' }}>
                The Architectural Challenge
              </h2>
              <div
                style={{
                  borderRadius: 'var(--radius-md)',
                  borderLeft: '4px solid var(--danger)',
                  backgroundColor: 'var(--bg-subtle)',
                  padding: '20px',
                }}
              >
                <p style={{ fontSize: '14px', color: 'var(--text-main)', lineHeight: 1.6, margin: 0 }}>
                  {project.problem}
                </p>
              </div>
            </div>
          )}

          {/* Solution */}
          {project.solution && (
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-main)', margin: '0 0 12px 0' }}>
                Engineered Solution
              </h2>
              <div
                style={{
                  borderRadius: 'var(--radius-md)',
                  borderLeft: '4px solid var(--success)',
                  backgroundColor: 'var(--bg-subtle)',
                  padding: '20px',
                }}
              >
                <p style={{ fontSize: '14px', color: 'var(--text-main)', lineHeight: 1.6, margin: 0 }}>
                  {project.solution}
                </p>
              </div>
            </div>
          )}

          {/* Results */}
          {project.results && (
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-main)', margin: '0 0 12px 0' }}>
                Business &amp; Technical Impact
              </h2>
              <div
                style={{
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--bg-card)',
                  padding: '20px',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <p style={{ fontSize: '14px', color: 'var(--text-main)', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
                  {project.results}
                </p>
              </div>
            </div>
          )}

          {/* Gallery Images if available */}
          {project.gallery && project.gallery.length > 1 && (
            <div>
              <h3 style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-dim)', margin: '0 0 16px 0' }}>
                Interface Gallery
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                {project.gallery.slice(1).map((img, idx) => (
                  <div
                    key={idx}
                    style={{
                      overflow: 'hidden',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--border)',
                      aspectRatio: '16/10',
                      backgroundColor: 'var(--bg-elevated)',
                    }}
                  >
                    <img
                      src={img}
                      alt={`${project.title} screenshot ${idx + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next / Previous Project Navigation */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              paddingTop: '32px',
              borderTop: '1px solid var(--border)',
            }}
          >
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', display: 'block' }}>
                  &larr; Previous Case Study
                </span>
                <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)' }}>
                  {prevProject.title}
                </span>
              </Link>
            ) : <div />}

            {nextProject ? (
              <Link
                href={`/projects/${nextProject.slug}`}
                style={{ textDecoration: 'none', color: 'inherit', textAlign: 'right' }}
              >
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', display: 'block' }}>
                  Next Case Study &rarr;
                </span>
                <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)' }}>
                  {nextProject.title}
                </span>
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaBanner />
    </article>
  );
}
