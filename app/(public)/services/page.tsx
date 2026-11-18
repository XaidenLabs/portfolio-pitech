import React from 'react';
import Link from 'next/link';
import { getServices } from '@/lib/api/services';
import { CtaBanner } from '@/components/public/CtaBanner';
import { Check } from '@/components/ui/icons';

export const metadata = {
  title: 'Services & Capabilities | Pitech',
  description:
    'Comprehensive engineering, design systems, and fintech billing architecture services for forward-thinking organizations.',
};

export default async function ServicesPage() {
  const services = await getServices(true);

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
            Engineering &amp; Design Services
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
            High-impact software engineering packages tailored for high growth.
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
            Every engagement includes senior-level architectural leadership, zero legacy shortcuts, and full source code ownership.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section style={{ padding: '64px 20px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '24px',
            }}
          >
            {services.map((service) => (
              <div
                key={service.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--bg-card)',
                  padding: '28px',
                  boxShadow: 'var(--shadow-sm)',
                  boxSizing: 'border-box',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '16px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '11px',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        color: 'var(--text-dim)',
                      }}
                    >
                      Service Package 0{service.order}
                    </span>
                    {service.startingPrice && (
                      <span
                        style={{
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: 'var(--bg-elevated)',
                          padding: '3px 10px',
                          fontSize: '11px',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 600,
                          color: 'var(--text-main)',
                        }}
                      >
                        From ${service.startingPrice.toLocaleString()} USD
                      </span>
                    )}
                  </div>

                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: 700,
                      color: 'var(--text-main)',
                      marginBottom: '8px',
                      margin: '0 0 8px 0',
                    }}
                  >
                    {service.name}
                  </h3>

                  <p
                    style={{
                      fontSize: '13px',
                      color: 'var(--text-muted)',
                      lineHeight: 1.6,
                      marginBottom: '20px',
                      margin: '0 0 20px 0',
                    }}
                  >
                    {service.description}
                  </p>

                  <div style={{ marginBottom: '24px' }}>
                    <p
                      style={{
                        fontSize: '11px',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        color: 'var(--text-dim)',
                        marginBottom: '10px',
                        margin: '0 0 10px 0',
                      }}
                    >
                      Deliverables:
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {service.deliverables.map((del, i) => (
                        <li
                          key={i}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '8px',
                            fontSize: '12px',
                            color: 'var(--text-main)',
                          }}
                        >
                          <Check size={13} style={{ color: 'var(--success)', flexShrink: 0, marginTop: '2px' }} />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div
                  style={{
                    paddingTop: '20px',
                    borderTop: '1px solid var(--border)',
                  }}
                >
                  <Link
                    href={`/request-quote?service=${service.slug}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--primary)',
                      color: 'var(--primary-text)',
                      padding: '10px 18px',
                      fontSize: '12px',
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    Select &amp; Request Quote
                  </Link>
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
