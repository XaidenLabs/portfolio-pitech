'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils/format';
import { Currency } from '@/types';

function SuccessContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get('ref') || 'PAY-CONFIRMED-LIVE';
  const inv = searchParams.get('inv');
  const amount = parseFloat(searchParams.get('amount') || '0');
  const currency = (searchParams.get('cur') as Currency) || 'USD';
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
            backgroundColor: 'var(--success-bg)',
            color: 'var(--success)',
            marginBottom: '16px',
          }}
        >
          <CheckCircle size={32} />
        </div>

        <h1 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 6px 0' }}>
          Payment Confirmed
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '0 0 24px 0' }}>
          Your payment has been successfully processed and verified.
        </p>

        {/* Transaction details card */}
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
            <span style={{ color: 'var(--text-dim)' }}>Transaction Ref:</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-main)' }}>{ref}</span>
          </div>
          {inv && (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-dim)' }}>Invoice Settled:</span>
              <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{inv}</span>
            </div>
          )}
          {amount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-dim)' }}>Amount Paid:</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--text-main)' }}>
                {formatCurrency(amount, currency)}
              </span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-dim)' }}>Status:</span>
            <span style={{ fontWeight: 700, color: 'var(--success)' }}>Confirmed &bull; 100% Settled</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {token && (
            <Link href={`/receipt/${token}`} style={{ textDecoration: 'none' }}>
              <Button style={{ width: '100%', borderRadius: 'var(--radius-full)' }}>
                View Official Payment Receipt
              </Button>
            </Link>
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

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div style={{ display: 'flex', height: '240px', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Loading confirmation...</p>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
