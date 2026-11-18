'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getPaymentLinkByToken, recordPaymentLinkPayment } from '@/lib/api/paymentLinks';
import { PaymentLink } from '@/types';
import { formatCurrency } from '@/lib/utils/format';
import { AlertCircle, ShieldCheck } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function StandalonePaymentLinkPage() {
  const params = useParams();
  const router = useRouter();
  const token = params?.token as string;

  const [link, setLink] = useState<PaymentLink | null>(null);
  const [loading, setLoading] = useState(true);

  const [enteredAmount, setEnteredAmount] = useState<number>(0);
  const [payerName, setPayerName] = useState('');
  const [payerEmail, setPayerEmail] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    async function loadLink() {
      if (!token) return;
      try {
        const pl = await getPaymentLinkByToken(token);
        if (pl) {
          setLink(pl);
          if (pl.amountType === 'fixed' && pl.amount) {
            setEnteredAmount(pl.amount);
          } else if (pl.minAmount) {
            setEnteredAmount(pl.minAmount);
          }
        }
      } finally {
        setLoading(false);
      }
    }
    loadLink();
  }, [token]);

  if (loading) {
    return (
      <div style={{ display: 'flex', height: '240px', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Loading payment gateway...</p>
      </div>
    );
  }

  if (!link) {
    return (
      <div style={{ textAlign: 'center', padding: '64px 20px', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>Payment Link Not Found</h2>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>This payment link does not exist or has been removed.</p>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Button variant="outline">Return Home</Button>
        </Link>
      </div>
    );
  }

  const isExpired = link.expiresAt && new Date(link.expiresAt) < new Date();

  if (!link.active || isExpired) {
    return (
      <div style={{ maxWidth: '480px', margin: '40px auto', textAlign: 'center', padding: '36px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border)', backgroundColor: 'var(--bg-card)' }}>
        <div style={{ display: 'inline-flex', height: '48px', width: '48px', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', backgroundColor: 'var(--danger-bg)', color: 'var(--danger)', marginBottom: '16px' }}>
          <AlertCircle size={24} />
        </div>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)', margin: '0 0 8px 0' }}>Payment Link Inactive</h2>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '0 0 20px 0' }}>This link has either expired or been disabled by the issuer.</p>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Button variant="outline">Return to Portfolio</Button>
        </Link>
      </div>
    );
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const reference = `PAYLINK-${Date.now().toString(36).toUpperCase()}`;
      await recordPaymentLinkPayment({
        paymentLinkId: link.id,
        amount: enteredAmount,
        reference,
        payerName: payerName || undefined,
        payerEmail: payerEmail || undefined,
      });

      router.push(`/payment/success?ref=${reference}&amount=${enteredAmount}&cur=${link.currency}&desc=${encodeURIComponent(link.title)}`);
    } catch {
      router.push(`/payment/failed?ref=ERR-${Date.now()}&token=${token}`);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div style={{ maxWidth: '540px', margin: '0 auto' }}>
      <div
        style={{
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border)',
          backgroundColor: 'var(--bg-card)',
          padding: '36px',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '20px', marginBottom: '24px' }}>
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--text-dim)', letterSpacing: '0.08em', fontWeight: 600 }}>
            Pitech Secure Payment Checkout
          </span>
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-main)', margin: '6px 0 8px 0' }}>
            {link.title}
          </h1>
          {link.description && (
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
              {link.description}
            </p>
          )}
        </div>

        <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '6px' }}>
              Amount ({link.currency})
            </label>
            {link.amountType === 'fixed' ? (
              <div
                style={{
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-elevated)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '20px',
                  fontWeight: 800,
                  color: 'var(--text-main)',
                }}
              >
                {formatCurrency(link.amount || 0, link.currency)}
              </div>
            ) : (
              <input
                type="number"
                step="0.01"
                min={link.minAmount || 1}
                max={link.maxAmount || 50000}
                value={enteredAmount}
                onChange={(e) => setEnteredAmount(parseFloat(e.target.value) || 0)}
                style={{
                  width: '100%',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--bg-card)',
                  padding: '10px 14px',
                  fontSize: '16px',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-main)',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
                required
              />
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <Input
              label="Your Full Name"
              required
              placeholder="e.g. Sarah Jenkins"
              value={payerName}
              onChange={(e) => setPayerName(e.target.value)}
            />
            <Input
              label="Your Email (For Confirmation Receipt)"
              type="email"
              required
              placeholder="sarah@company.com"
              value={payerEmail}
              onChange={(e) => setPayerEmail(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            isLoading={processing}
            style={{ width: '100%', padding: '12px', fontSize: '14px', borderRadius: 'var(--radius-full)' }}
          >
            <ShieldCheck size={16} />
            <span>Pay {formatCurrency(enteredAmount, link.currency)}</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
