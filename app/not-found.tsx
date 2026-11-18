import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '64px 16px',
      }}
    >
      <span
        style={{
          fontSize: '0.75rem',
          fontFamily: 'var(--font-mono)',
          fontWeight: 700,
          letterSpacing: '0.1em',
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
        }}
      >
        404 &bull; Page Not Found
      </span>
      <h1
        style={{
          marginTop: 12,
          fontSize: '2.5rem',
          fontWeight: 700,
          letterSpacing: '-0.025em',
          color: 'var(--text-main)',
          lineHeight: 1.2,
        }}
      >
        This link does not exist.
      </h1>
      <p
        style={{
          marginTop: 16,
          maxWidth: 420,
          fontSize: '0.875rem',
          color: 'var(--text-muted)',
          lineHeight: 1.5,
        }}
      >
        The page you are looking for may have been moved, expired, or the URL might be mistyped.
      </p>
      <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Button style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <ArrowLeft size={16} />
            <span>Return to Portfolio</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
