import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Download } from '@/components/ui/icons';
import { CtaBanner } from '@/components/public/CtaBanner';

export const metadata = {
  title: 'About me | Pitech',
  description:
    'Background, engineering philosophy, and architectural milestones of Pitech.',
};

export default function AboutPage() {
  const milestones = [
    {
      year: '2026',
      title: 'Autonomous Design Systems & Token Pipelines',
      desc: 'Architected Otera AI and launched Pitech Multi-Currency Billing Engine, processing tokenized invoices and automated settlements for global clients.',
    },
    {
      year: '2025',
      title: 'Enterprise Telehealth & Freight Telemetry',
      desc: 'Engineered NHS-compliant telemedicine platforms and West African freight tracking portals serving 100k+ active users with sub-second latencies.',
    },
    {
      year: '2024',
      title: 'Fintech & Cross-Border API Workbenches',
      desc: 'Built custom developer sandboxes, live webhook testing consoles, and multi-currency payment routing systems.',
    },
    {
      year: '2023',
      title: 'Founded Pitech Digital Studio',
      desc: 'Established with the mission to build software with zero technical debt, uncompromising UI/UX standards, and production-tested architectures.',
    },
  ];

  const skillGroups = [
    {
      category: 'Design & Prototyping',
      skills: ['Figma Master Components', 'Design Token Pipelines', 'Framer Prototypes', 'WCAG 2.1 AA Accessibility', 'User Journey Mapping'],
    },
    {
      category: 'Frontend Engineering',
      skills: ['Next.js 16 (App Router)', 'React 19 Server Actions', 'Strict TypeScript', 'Pure Inline CSS Architecture', 'Framer Motion & Three.js'],
    },
    {
      category: 'Backend & Infrastructure',
      skills: ['Node.js & Bun', 'PostgreSQL & Prisma', 'Paystack & Stripe Gateways', 'Docker & GitHub Actions', 'Vercel Edge Global CDN'],
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Header section */}
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
            About Me
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
            Bridging product design, systems architecture, and engineering execution.
          </h1>
        </div>
      </section>

      {/* Main Story & Profile */}
      <section style={{ padding: '64px 20px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '40px',
              alignItems: 'start',
            }}
          >
            {/* Photo & Quick Stats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div
                style={{
                  overflow: 'hidden',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--bg-elevated)',
                  aspectRatio: '4/5',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                  alt="Pitech Principal Designer & Architect"
                  style={{ height: '100%', width: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>

              <div
                style={{
                  padding: '20px',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--bg-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Location:</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Lagos &bull; London &bull; Remote</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Focus:</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Product Design &amp; Systems</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Experience:</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>8+ Years Production</span>
                </div>
                <div style={{ paddingTop: '8px' }}>
                  <Link
                    href="/contact?subject=Request+Executive+CV"
                    style={{
                      display: 'flex',
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--primary)',
                      color: 'var(--primary-text)',
                      padding: '10px 16px',
                      fontSize: '12px',
                      fontWeight: 600,
                      textDecoration: 'none',
                      boxSizing: 'border-box',
                    }}
                  >
                    <Download size={14} />
                    <span>Download CV / Resume</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Narrative */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '14px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
                Who I am &amp; How I work
              </h2>
              <p style={{ margin: 0 }}>
                I am a technical product designer and systems architect with over 8 years of experience designing and shipping high-impact web products, design systems, and resilient full-stack platforms.
              </p>
              <p style={{ margin: 0 }}>
                My work exists at the intersection where code meets visual craft. Rather than delivering static mockups that get compromised during engineering, I design directly with the reality of production components, responsive layout systems, and network latencies in mind.
              </p>
              <p style={{ margin: 0 }}>
                Over the past several years, I have architected telemetry systems processing 50,000+ daily deliveries, designed telehealth portals supporting 120,000+ clinical sessions, and engineered tokenized multi-currency billing engines handling cross-border settlements with zero leakage.
              </p>

              {/* Guiding Principles */}
              <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '16px', margin: '0 0 16px 0' }}>
                  Guiding Principles
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                  <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', backgroundColor: 'var(--bg-card)' }}>
                    <p style={{ fontWeight: 700, fontSize: '12px', color: 'var(--text-main)', margin: 0 }}>1. Speed as a Feature</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>Interfaces should feel instantaneous. Sub-100ms response is our baseline.</p>
                  </div>
                  <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', backgroundColor: 'var(--bg-card)' }}>
                    <p style={{ fontWeight: 700, fontSize: '12px', color: 'var(--text-main)', margin: 0 }}>2. Code-Informed Design</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>Design tokens, variables, and component states match code schemas 1:1.</p>
                  </div>
                  <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', backgroundColor: 'var(--bg-card)' }}>
                    <p style={{ fontWeight: 700, fontSize: '12px', color: 'var(--text-main)', margin: 0 }}>3. Relentless Simplicity</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>Eliminating cognitive clutter creates products that convert and retain.</p>
                  </div>
                  <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', backgroundColor: 'var(--bg-card)' }}>
                    <p style={{ fontWeight: 700, fontSize: '12px', color: 'var(--text-main)', margin: 0 }}>4. Direct Collaboration</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>Direct contact between client and builder. No bureaucratic agency layers.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section style={{ padding: '64px 20px', borderTop: '1px solid var(--border)', backgroundColor: 'var(--bg-subtle)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '32px', gap: '16px' }}>
            <div>
              <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', margin: '0 0 4px 0' }}>
                Competencies
              </p>
              <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 32px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-main)', margin: 0 }}>
                Deep Technical Skillsets
              </h2>
            </div>
            <Link
              href="/stack"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-muted)', textDecoration: 'none' }}
            >
              <span>Explore full stack page</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {skillGroups.map((group) => (
              <div
                key={group.category}
                style={{
                  padding: '24px',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--bg-card)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <h3 style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-main)', margin: '0 0 16px 0' }}>
                  {group.category}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {group.skills.map((skill) => (
                    <li key={skill} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
                      <CheckCircle size={13} style={{ color: 'var(--success)', flexShrink: 0 }} />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section style={{ padding: '64px 20px', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ maxWidth: '640px', marginBottom: '32px' }}>
            <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', margin: '0 0 4px 0' }}>
              Timeline
            </p>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 32px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-main)', margin: 0 }}>
              Selected Milestones &amp; Evolution
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {milestones.map((m) => (
              <div
                key={m.year}
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '16px',
                  padding: '20px',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--bg-card)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', fontWeight: 800, color: 'var(--text-dim)', minWidth: '70px' }}>
                  {m.year}
                </span>
                <div style={{ flex: 1, minWidth: '220px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)', margin: '0 0 4px 0' }}>
                    {m.title}
                  </h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaBanner />
    </div>
  );
}
