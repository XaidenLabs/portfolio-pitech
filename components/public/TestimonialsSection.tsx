import React from 'react';
import { Testimonial } from '@/types';
import { Star } from '../ui/icons';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section
      style={{
        padding: '72px 20px',
        borderTop: '1px solid var(--border)',
        backgroundColor: 'var(--bg-subtle)',
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
            Client Endorsements
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
            Trusted by CTOs, founders, and product directors.
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {testimonials.map((test) => (
            <div
              key={test.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-card)',
                padding: '24px',
                boxShadow: 'var(--shadow-sm)',
                boxSizing: 'border-box',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: 'var(--warning)', marginBottom: '14px' }}>
                  {[...Array(test.rating || 5)].map((_, i) => (
                    <Star key={i} size={14} />
                  ))}
                </div>
                <blockquote
                  style={{
                    fontSize: '13px',
                    color: 'var(--text-main)',
                    lineHeight: 1.6,
                    fontStyle: 'italic',
                    marginBottom: '20px',
                    margin: '0 0 20px 0',
                  }}
                >
                  &ldquo;{test.quote}&rdquo;
                </blockquote>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border)',
                }}
              >
                {test.photo && (
                  <img
                    src={test.photo}
                    alt={test.name}
                    style={{
                      height: '38px',
                      width: '38px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '1px solid var(--border)',
                    }}
                  />
                )}
                <div style={{ fontSize: '12px' }}>
                  <p style={{ fontWeight: 600, color: 'var(--text-main)', margin: 0 }}>
                    {test.name}
                  </p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '11px', margin: '2px 0 0 0' }}>
                    {test.role} &bull; {test.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
