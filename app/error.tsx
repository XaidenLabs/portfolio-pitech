'use client';

import React from 'react';
import Link from 'next/link';
import { AlertCircle, RefreshCw } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          color: 'var(--danger)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
        }}
      >
        <AlertCircle size={32} />
      </div>
      <h1
        style={{
          fontSize: '1.875rem',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: 'var(--text-main)',
          margin: 0,
        }}
      >
        Something went wrong
      </h1>
      <p
        style={{
          marginTop: 8,
          maxWidth: 420,
          fontSize: '0.875rem',
          color: 'var(--text-muted)',
        }}
      >
        An unexpected error occurred during execution.
      </p>
      {error?.message && (
        <p
          style={{
            marginTop: 8,
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--danger)',
            backgroundColor: 'rgba(239, 68, 68, 0.08)',
            padding: '8px 12px',
            borderRadius: 8,
            maxWidth: 420,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {error.message}
        </p>
      )}
      <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
        <Button onClick={() => reset()} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <RefreshCw size={15} />
          <span>Try again</span>
        </Button>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Button variant="outline">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
