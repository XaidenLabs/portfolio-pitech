import React from 'react';
import Link from 'next/link';
import { ArrowRight } from '../ui/icons';

export function TechStack() {
  const stackCategories = [
    {
      domain: 'Design & Systems',
      tools: [
        { name: 'Figma', role: 'Design Systems & Tokens', badge: 'Primary' },
        { name: 'Framer', role: 'Interactive Prototyping', badge: 'Production' },
        { name: 'FigJam', role: 'Information Architecture', badge: 'Workflow' },
      ],
    },
    {
      domain: 'Frontend Engineering',
      tools: [
        { name: 'Next.js 16', role: 'App Router & PPR', badge: 'Primary' },
        { name: 'React 19', role: 'Server Components', badge: 'Core' },
        { name: 'TypeScript', role: 'Strict Type Systems', badge: 'Standard' },
        { name: 'Clean Inline CSS', role: 'Component-Level Styles', badge: 'Styling' },
      ],
    },
    {
      domain: 'Fintech & Multi-Currency',
      tools: [
        { name: 'Paystack API', role: 'African Gateways (NGN)', badge: 'Billing' },
        { name: 'Stripe', role: 'Global Invoicing (USD/EUR)', badge: 'Billing' },
        { name: 'Tokenized Billing', role: 'Zero-login Payments', badge: 'Proprietary' },
      ],
    },
    {
      domain: 'Backend & Infrastructure',
      tools: [
        { name: 'Node.js & Bun', role: 'High-speed Runtimes', badge: 'Backend' },
        { name: 'PostgreSQL / Prisma', role: 'Transactional Storage', badge: 'Database' },
        { name: 'Vercel Edge', role: 'Global CDN Delivery', badge: 'DevOps' },
      ],
    },
  ];

  return (
    <section
      style={{
        padding: '72px 20px',
        borderTop: '1px solid var(--border)',
        backgroundColor: 'var(--bg-subtle)',
      }}
    >
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '32px',
            gap: '16px',
          }}
        >
          <div>
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
              Engineered With
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
              Production Stack &amp; Tools
            </h2>
          </div>
          <Link
            href="/stack"
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
            <span>Full Tooling Breakdown</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px',
          }}
        >
          {stackCategories.map((group) => (
            <div
              key={group.domain}
              style={{
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-card)',
                padding: '24px',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <h3
                style={{
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--text-dim)',
                  marginBottom: '16px',
                  margin: '0 0 16px 0',
                }}
              >
                {group.domain}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {group.tools.map((tool) => (
                  <div
                    key={tool.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingBottom: '10px',
                      borderBottom: '1px solid var(--border)',
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontWeight: 600,
                          fontSize: '13px',
                          color: 'var(--text-main)',
                          display: 'block',
                        }}
                      >
                        {tool.name}
                      </span>
                      <p
                        style={{
                          fontSize: '11px',
                          color: 'var(--text-muted)',
                          margin: '2px 0 0 0',
                        }}
                      >
                        {tool.role}
                      </p>
                    </div>
                    <span
                      style={{
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: 'var(--bg-elevated)',
                        padding: '3px 9px',
                        fontSize: '10px',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 600,
                        color: 'var(--text-muted)',
                      }}
                    >
                      {tool.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
