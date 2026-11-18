import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getTestimonials } from '@/lib/api/services';
import { Star, ArrowLeft } from '@/components/ui/icons';
import { CtaBanner } from '@/components/public/CtaBanner';

export const metadata: Metadata = {
  title: 'Client Testimonials & Trust | Pitech',
  description:
    'Read what CTOs, product founders, and engineering teams say about partnering with Pitech for mission-critical software.',
};

export default async function PublicTestimonialsPage() {
  const testimonials = await getTestimonials(true);

  return (
    <div style={{ maxWidth: 1080, margin: '0 auto', padding: '48px 20px 80px' }}>
      {/* Back button */}
      <div style={{ marginBottom: 32 }}>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: '0.8125rem',
            color: 'var(--text-muted)',
            textDecoration: 'none',
            fontWeight: 500,
          }}
        >
          <ArrowLeft size={14} />
          <span>Return Home</span>
        </Link>
      </div>

      {/* Header */}
      <div style={{ maxWidth: 720, marginBottom: 48 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '4px 12px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--bg-subtle)',
            border: '1px solid var(--border)',
            fontSize: '0.6875rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--text-muted)',
            marginBottom: 16,
          }}
        >
          Client Endorsements &amp; Proof
        </div>
        <h1
          style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: 'var(--text-main)',
            lineHeight: 1.15,
            margin: '0 0 16px 0',
          }}
        >
          Trusted by technical founders, product leaders, and high-growth studios.
        </h1>
        <p
          style={{
            fontSize: '1rem',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          Read direct feedback and measurable impact from leaders who partnered with us for enterprise web apps, multi-currency invoicing systems, and robust design architectures.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24,
          marginBottom: 64,
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
              padding: 28,
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--warning)', marginBottom: 16 }}>
                {[...Array(test.rating || 5)].map((_, i) => (
                  <Star key={i} size={15} />
                ))}
              </div>
              <blockquote
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-main)',
                  lineHeight: 1.6,
                  fontStyle: 'italic',
                  margin: '0 0 24px 0',
                }}
              >
                &ldquo;{test.quote}&rdquo;
              </blockquote>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                paddingTop: 16,
                borderTop: '1px solid var(--border)',
              }}
            >
              {test.photo ? (
                <img
                  src={test.photo}
                  alt={test.name}
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '1px solid var(--border)',
                  }}
                />
              ) : (
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: '50%',
                    backgroundColor: 'var(--bg-elevated)',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                  }}
                >
                  {test.name.charAt(0)}
                </div>
              )}
              <div>
                <p style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-main)', margin: 0 }}>
                  {test.name}
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                  {test.role ? `${test.role}, ` : ''}{test.company}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <CtaBanner />
    </div>
  );
}
