'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AlertCircle, RefreshCw } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';

function FailedContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get('ref') || 'ERR-DECLINED';
  const token = searchParams.get('token');

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', textAlign: 'center' }}>
      <div
        style={{
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border)',
          backgroundColor: 'var(--bg-card)',
          padding: '40px 24px',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            height: '56px',
            width: '56px',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--danger-bg)',
            color: 'var(--danger)',
            marginBottom: '16px',
          }}
        >
          <AlertCircle size={32} />
        </div>

        <h1 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 6px 0' }}>
          Payment Was Not Completed
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '0 0 24px 0' }}>
          The transaction was interrupted or cancelled by the gateway. No funds were debited.
        </p>

        <div
          style={{
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)',
            backgroundColor: 'var(--bg-subtle)',
            padding: '16px',
            textAlign: 'left',
            fontSize: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            marginBottom: '28px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-dim)' }}>Session Ref:</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-main)' }}>{ref}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-dim)' }}>Resolution:</span>
            <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Retry checkout or switch payment channel</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {token ? (
            <Link href={`/invoice/${token}/pay`} style={{ textDecoration: 'none' }}>
              <Button style={{ width: '100%', borderRadius: 'var(--radius-full)' }}>
                <RefreshCw size={14} />
                <span>Retry Payment</span>
              </Button>
            </Link>
          ) : (
            <Button
              onClick={() => window.history.back()}
              style={{ width: '100%', borderRadius: 'var(--radius-full)' }}
            >
              <RefreshCw size={14} />
              <span>Try Again</span>
            </Button>
          )}

          <Link href="/" style={{ textDecoration: 'none' }}>
            <Button variant="outline" style={{ width: '100%', borderRadius: 'var(--radius-full)' }}>
              Return to Portfolio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentFailedPage() {
  return (
    <Suspense
      fallback={
        <div style={{ display: 'flex', height: '240px', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Loading status...</p>
        </div>
      }
    >
      <FailedContent />
    </Suspense>
  );
}
