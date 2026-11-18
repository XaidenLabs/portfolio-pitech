'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export function ServicesDribbble() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const services = [
    {
      number: '01',
      title: 'UI/UX Design',
      description:
        'Transforming complex workflows into intuitive, high-conversion digital interfaces. Rooted in continuous user discovery, rapid wireframing, interactive prototyping, and cross-platform design token systems.',
      tags: ['Wireframing', 'Prototyping', 'User Research', 'Figma Systems', 'Conversion Optimization'],
    },
    {
      number: '02',
      title: 'Multi-Currency Billing & FinTech Engines',
      description:
        'Architecting resilient client checkout flows supporting USD, NGN, GBP, and EUR with zero-login tokenized payment portals, multi-tier tax computation, automated receipt issuance, and instant webhook event reconciliation.',
      tags: ['Tokenized Invoicing', 'Stripe & Paystack', 'Multi-Currency Settlement', 'Receipt Automation'],
    },
    {
      number: '03',
      title: 'Full-Stack Web Applications',
      description:
        'Building ultra-responsive, edge-rendered applications with Next.js 16, React 19, and TypeScript. Pure inline CSS architecture ensuring zero layout shift and sub-100ms cold start latency.',
      tags: ['Next.js 16 App Router', 'React 19 Server Components', 'PostgreSQL', 'TypeScript Type-Safety'],
    },
    {
      number: '04',
      title: 'Design Systems & Token Pipelines',
      description:
        'Creating multi-brand tokenized component libraries that bridge design and engineering seamlessly. Automated sync from Figma variables to React props with agentic introspection.',
      tags: ['Design Tokens', 'Component Architecture', 'Figma-to-Code', 'Accessibility WCAG AAA'],
    },
  ];

  return (
    <section
      style={{
        width: '100%',
        maxWidth: '1140px',
        margin: '0 auto',
        padding: '72px 20px 48px',
        boxSizing: 'border-box',
      }}
    >
      {/* Section Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '24px',
          marginBottom: '40px',
        }}
      >
        <div>
          {/* Overlapping Circles Badge: [ ●● My Services ] */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '6px 16px',
              borderRadius: '9999px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-sm)',
              marginBottom: '14px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', position: 'relative', width: '22px', height: '14px' }}>
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#141416',
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  left: '8px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#FF9E00',
                }}
              />
            </div>
            <span
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--text-main)',
                letterSpacing: '-0.01em',
              }}
            >
              My Services
            </span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(32px, 4.4vw, 52px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              color: 'var(--text-main)',
              margin: 0,
            }}
          >
            How I Bring <span style={{ color: '#FF9E00' }}>Ideas to Life</span>
            <span
              style={{
                display: 'inline-block',
                marginLeft: '8px',
                color: 'var(--text-main)',
                fontSize: '0.7em',
                verticalAlign: 'middle',
              }}
            >
              ✨
            </span>
          </h2>
        </div>

        {/* Action Button: Explore All Services → */}
        <Link
          href="/services"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            borderRadius: '9999px',
            backgroundColor: '#FF9E00',
            color: '#141416',
            padding: '12px 24px',
            fontSize: '14px',
            fontWeight: 700,
            textDecoration: 'none',
            boxShadow: '0 8px 20px -4px rgba(255, 158, 0, 0.4)',
            transition: 'transform 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <span>Explore All Services</span>
          <div
            style={{
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              backgroundColor: '#141416',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
            }}
          >
            &rarr;
          </div>
        </Link>
      </div>

      {/* Accordion / Interactive Service Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {services.map((service, idx) => {
          const isExpanded = expandedIndex === idx;
          return (
            <div
              key={service.number}
              style={{
                borderRadius: '24px',
                backgroundColor: 'var(--bg-card)',
                border: isExpanded ? '1.5px solid #FF9E00' : '1px solid var(--border)',
                padding: '24px 28px',
                boxShadow: isExpanded
                  ? '0 16px 36px -6px rgba(255, 158, 0, 0.12), 0 4px 12px -2px rgba(20, 20, 22, 0.05)'
                  : 'var(--shadow-sm)',
                transition: 'all 0.2s ease',
              }}
            >
              {/* Accordion Header */}
              <div
                onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  userSelect: 'none',
                  gap: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '14px',
                      fontWeight: 800,
                      color: isExpanded ? '#FF9E00' : 'var(--text-dim)',
                    }}
                  >
                    {service.number}.
                  </span>
                  <h3
                    style={{
                      fontSize: 'clamp(18px, 2.2vw, 24px)',
                      fontWeight: 700,
                      color: isExpanded ? '#FF9E00' : 'var(--text-main)',
                      margin: 0,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {service.title}
                  </h3>
                </div>

                {/* Orange Circle Toggle Button [ ✕ or + ] */}
                <button
                  type="button"
                  aria-label={isExpanded ? 'Collapse service' : 'Expand service'}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: isExpanded ? '#FF9E00' : 'var(--bg-subtle)',
                    color: isExpanded ? '#141416' : 'var(--text-main)',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: isExpanded ? '0 0 12px rgba(255, 158, 0, 0.5)' : 'none',
                  }}
                >
                  {isExpanded ? '✕' : '+'}
                </button>
              </div>

              {/* Accordion Expanded Content */}
              {isExpanded && (
                <div
                  style={{
                    marginTop: '20px',
                    paddingTop: '20px',
                    borderTop: '1px dashed var(--border)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                  }}
                >
                  <p
                    style={{
                      fontSize: '15px',
                      color: 'var(--text-muted)',
                      lineHeight: 1.6,
                      margin: 0,
                      maxWidth: '820px',
                    }}
                  >
                    {service.description}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          display: 'inline-block',
                          backgroundColor: 'var(--bg-subtle)',
                          color: 'var(--text-main)',
                          padding: '6px 14px',
                          borderRadius: '9999px',
                          fontSize: '12px',
                          fontWeight: 600,
                          border: '1px solid var(--border)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
