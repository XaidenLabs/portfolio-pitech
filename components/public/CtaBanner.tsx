import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from '../ui/icons';
import { Button } from '../ui/button';

export function CtaBanner() {
  return (
    <section style={{ padding: '72px 20px' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 'var(--radius-xl)',
            backgroundColor: '#09090b',
            padding: '56px 24px',
            textAlign: 'center',
            color: '#f8fafc',
            border: '1px solid #1e293b',
            boxShadow: 'var(--shadow-xl)',
          }}
        >
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <h2
              style={{
                fontSize: 'clamp(28px, 4.5vw, 44px)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                margin: '0 0 16px 0',
              }}
            >
              Ready to build something extraordinary?
            </h2>
            <p
              style={{
                fontSize: '15px',
                color: '#94a3b8',
                lineHeight: 1.6,
                margin: '0 0 28px 0',
              }}
            >
              Whether you need a full enterprise product architecture, an MVP sprint, or custom multi-currency billing integration, let&apos;s build it right.
            </p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
              }}
            >
              <Link href="/contact" style={{ textDecoration: 'none' }}>
                <Button
                  size="lg"
                  style={{
                    backgroundColor: '#ffffff',
                    color: '#09090b',
                    borderRadius: 'var(--radius-full)',
                  }}
                >
                  <span>Start a Conversation</span>
                  <ArrowRight size={15} />
                </Button>
              </Link>
              <Link href="/request-quote" style={{ textDecoration: 'none' }}>
                <Button
                  variant="outline"
                  size="lg"
                  style={{
                    color: '#ffffff',
                    borderColor: '#334155',
                    borderRadius: 'var(--radius-full)',
                  }}
                >
                  <span>Request Structured Brief</span>
                  <ArrowUpRight size={15} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
