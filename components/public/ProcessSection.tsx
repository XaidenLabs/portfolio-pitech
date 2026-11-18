import React from 'react';

export function ProcessSection() {
  const steps = [
    {
      num: '01',
      title: 'Discovery & Scope',
      desc: 'We examine your business model, PRD, user journeys, technical constraints, and define the exact milestones.',
    },
    {
      num: '02',
      title: 'Design Architecture',
      desc: 'Creating atomic design tokens, interactive prototypes, and modular database/API contracts.',
    },
    {
      num: '03',
      title: 'Sprint Development',
      desc: 'Writing clean, typed TypeScript and Next.js React components with weekly staging builds and test coverage.',
    },
    {
      num: '04',
      title: 'Launch & QA',
      desc: 'Rigorous accessibility verification, sub-100ms performance tuning, SEO indexing, and production deployment.',
    },
    {
      num: '05',
      title: 'Support & Scale',
      desc: 'Continuous monitoring, telemetry dashboards, automated backups, and sprint retainers as your userbase scales.',
    },
  ];

  return (
    <section
      style={{
        padding: '72px 20px',
        borderTop: '1px solid var(--border)',
        backgroundColor: 'var(--bg)',
      }}
    >
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
          <p
            style={{
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--text-muted)',
              marginBottom: '4px',
              margin: '0 0 4px 0',
            }}
          >
            How We Partner
          </p>
          <h2
            style={{
              fontSize: 'clamp(24px, 3.5vw, 32px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'var(--text-main)',
              margin: 0,
            }}
          >
            From initial brief to resilient production systems.
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
            gap: '16px',
          }}
        >
          {steps.map((step) => (
            <div
              key={step.num}
              style={{
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-card)',
                padding: '20px',
                boxShadow: 'var(--shadow-sm)',
                boxSizing: 'border-box',
              }}
            >
              <span
                style={{
                  display: 'block',
                  fontSize: '20px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 800,
                  color: 'var(--text-dim)',
                  marginBottom: '10px',
                }}
              >
                {step.num}
              </span>
              <h4
                style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: 'var(--text-main)',
                  marginBottom: '6px',
                  margin: '0 0 6px 0',
                }}
              >
                {step.title}
              </h4>
              <p
                style={{
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
