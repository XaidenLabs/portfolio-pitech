'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getInvoiceByToken, recordInvoicePayment } from '@/lib/api/invoices';
import { getSettings } from '@/lib/api/settings';
import { AdminSettings, Invoice } from '@/types';
import { formatCurrency } from '@/lib/utils/format';
import { ArrowLeft, Building, CreditCard, ShieldCheck } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function PayInvoicePage() {
  const params = useParams();
  const router = useRouter();
  const token = params?.token as string;

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const [payAmount, setPayAmount] = useState<number>(0);
  const [method, setMethod] = useState<'gateway' | 'bank_transfer'>('gateway');
  const [payerName, setPayerName] = useState('');
  const [payerEmail, setPayerEmail] = useState('');
  const [transferRef, setTransferRef] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (!token) return;
      try {
        const inv = await getInvoiceByToken(token);
        const setts = await getSettings();
        if (inv) {
          setInvoice(inv);
          setPayAmount(inv.balance);
        }
        setSettings(setts);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [token]);

  if (loading) {
    return (
      <div style={{ display: 'flex', height: '240px', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Loading payment gateway...</p>
      </div>
    );
  }

  if (!invoice || invoice.balance <= 0) {
    return (
      <div style={{ textAlign: 'center', padding: '64px 20px', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>This invoice has no outstanding balance.</h2>
        <Link href={`/invoice/${token}`} style={{ textDecoration: 'none' }}>
          <Button variant="outline">View Invoice</Button>
        </Link>
      </div>
    );
  }

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const reference =
        method === 'gateway'
          ? `GATEWAY-PAY-${Date.now().toString(36).toUpperCase()}`
          : transferRef || `TRF-${Date.now().toString(36).toUpperCase()}`;

      await recordInvoicePayment({
        invoiceId: invoice.id,
        amount: Number(payAmount),
        method,
        reference,
        payerName: payerName || undefined,
        payerEmail: payerEmail || undefined,
      });

      router.push(`/payment/success?ref=${reference}&inv=${invoice.number}&amount=${payAmount}&cur=${invoice.currency}&token=${invoice.token}`);
    } catch {
      router.push(`/payment/failed?ref=ERR-${Date.now()}&token=${invoice.token}`);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Link
        href={`/invoice/${token}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '12px',
          fontFamily: 'var(--font-mono)',
          fontWeight: 600,
          color: 'var(--text-muted)',
          textDecoration: 'none',
        }}
      >
        <ArrowLeft size={13} />
        <span>Return to Invoice {invoice.number}</span>
      </Link>

      <div
        style={{
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border)',
          backgroundColor: 'var(--bg-card)',
          padding: '32px',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '20px', marginBottom: '24px' }}>
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--text-dim)', letterSpacing: '0.08em', fontWeight: 600 }}>
            Invoice Payment Checkout
          </span>
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-main)', margin: '4px 0 12px 0' }}>
            Pay Invoice {invoice.number}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Total Outstanding Balance:</span>
            <span style={{ fontWeight: 800, fontSize: '17px', fontFamily: 'var(--font-mono)', color: 'var(--text-main)' }}>
              {formatCurrency(invoice.balance, invoice.currency)}
            </span>
          </div>
        </div>

        <form onSubmit={handlePay} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Amount input */}
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '6px' }}>
              Payment Amount ({invoice.currency})
            </label>
            <input
              type="number"
              step="0.01"
              min="1"
              max={invoice.balance}
              value={payAmount}
              disabled={!invoice.allowPartialPayment}
              onChange={(e) => setPayAmount(parseFloat(e.target.value) || 0)}
              style={{
                width: '100%',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-elevated)',
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
            {invoice.allowPartialPayment ? (
              <p style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '4px', margin: '4px 0 0 0' }}>
                Partial payment allowed up to {formatCurrency(invoice.balance, invoice.currency)}.
              </p>
            ) : (
              <p style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '4px', margin: '4px 0 0 0' }}>
                Full balance payment required by issuer.
              </p>
            )}
          </div>

          {/* Payment Method Switcher */}
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '8px' }}>
              Select Payment Method
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setMethod('gateway')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px',
                  borderRadius: 'var(--radius-lg)',
                  border: method === 'gateway' ? '1px solid var(--primary)' : '1px solid var(--border)',
                  backgroundColor: method === 'gateway' ? 'var(--primary)' : 'var(--bg-card)',
                  color: method === 'gateway' ? 'var(--primary-text)' : 'var(--text-main)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  boxShadow: method === 'gateway' ? 'var(--shadow-sm)' : 'none',
                }}
              >
                <CreditCard size={18} />
                <div>
                  <p style={{ fontWeight: 700, fontSize: '12px', margin: 0 }}>Card / Online</p>
                  <p style={{ fontSize: '10px', opacity: 0.8, margin: '2px 0 0 0' }}>Paystack / Stripe</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setMethod('bank_transfer')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px',
                  borderRadius: 'var(--radius-lg)',
                  border: method === 'bank_transfer' ? '1px solid var(--primary)' : '1px solid var(--border)',
                  backgroundColor: method === 'bank_transfer' ? 'var(--primary)' : 'var(--bg-card)',
                  color: method === 'bank_transfer' ? 'var(--primary-text)' : 'var(--text-main)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  boxShadow: method === 'bank_transfer' ? 'var(--shadow-sm)' : 'none',
                }}
              >
                <Building size={18} />
                <div>
                  <p style={{ fontWeight: 700, fontSize: '12px', margin: 0 }}>Bank Transfer</p>
                  <p style={{ fontSize: '10px', opacity: 0.8, margin: '2px 0 0 0' }}>Direct Account</p>
                </div>
              </button>
            </div>
          </div>

          {/* Conditional Method Info */}
          {method === 'bank_transfer' && settings && (
            <div
              style={{
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-subtle)',
                padding: '16px',
                fontSize: '12px',
                lineHeight: 1.6,
              }}
            >
              <p style={{ fontWeight: 700, color: 'var(--text-main)', margin: '0 0 6px 0' }}>Bank Settlement Coordinates:</p>
              <p style={{ margin: 0 }}>Bank: <strong>{settings.business.bankName}</strong></p>
              <p style={{ margin: 0 }}>Account Number: <strong style={{ fontFamily: 'var(--font-mono)' }}>{settings.business.accountNumber}</strong></p>
              <p style={{ margin: 0 }}>Account Name: <strong>{settings.business.accountName}</strong></p>
              <div style={{ marginTop: '12px' }}>
                <Input
                  label="Transfer Reference / Bank Transaction ID"
                  placeholder="e.g. GTB-REF-9872635"
                  value={transferRef}
                  onChange={(e) => setTransferRef(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          {/* Payer details */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Input
              label="Payer Full Name"
              placeholder="e.g. John Doe"
              value={payerName}
              onChange={(e) => setPayerName(e.target.value)}
            />
            <Input
              label="Receipt Email"
              type="email"
              placeholder="billing@company.com"
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
            <span>Complete Payment ({formatCurrency(payAmount, invoice.currency)})</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
