import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from '@/components/ui/icons';

export default function BillingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--bg-subtle)',
        color: 'var(--text-main)',
      }}
    >
      {/* Minimal Billing Header */}
      <header
        style={{
          borderBottom: '1px solid var(--border)',
          backgroundColor: 'var(--bg-card)',
          padding: '14px 20px',
        }}
      >
        <div
          style={{
            maxWidth: '960px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <div
              style={{
                display: 'flex',
                height: '32px',
                width: '32px',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-text)',
                fontWeight: 800,
                fontSize: '13px',
              }}
            >
              P
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-main)' }}>
                Pitech Digital
              </span>
              <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--text-dim)', letterSpacing: '0.05em' }}>
                Secure Client Billing
              </span>
            </div>
          </Link>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              color: 'var(--success)',
              backgroundColor: 'var(--success-bg)',
              padding: '5px 12px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
            }}
          >
            <ShieldCheck size={13} />
            <span>256-bit Encrypted Checkout</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '36px 20px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>{children}</div>
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--border)',
          backgroundColor: 'var(--bg-card)',
          padding: '24px 20px',
          fontSize: '12px',
          color: 'var(--text-dim)',
        }}
      >
        <div
          style={{
            maxWidth: '960px',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <p style={{ margin: 0 }}>&copy; 2026 Pitech Digital Solutions Ltd. All rights reserved.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span>Powered by Pitech Billing Engine</span>
            <span>&bull;</span>
            <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
              Return to Portfolio
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
