'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { savePaymentLink } from '@/lib/api/paymentLinks';
import { Currency } from '@/types';
import { generateToken } from '@/lib/utils/invoice';
import { ArrowLeft } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Input, Select, Textarea } from '@/components/ui/input';

export default function CreatePaymentLinkPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amountType, setAmountType] = useState<'fixed' | 'open'>('fixed');
  const [amount, setAmount] = useState<number>(500);
  const [minAmount, setMinAmount] = useState<number>(50);
  const [currency, setCurrency] = useState<Currency>('USD');
  const [reusable, setReusable] = useState(true);
  const [collectName, setCollectName] = useState(true);
  const [collectEmail, setCollectEmail] = useState(true);
  const [collectPhone, setCollectPhone] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      alert('Please enter a payment link title');
      return;
    }

    setSaving(true);
    try {
      const token = generateToken('pay');
      await savePaymentLink({
        token,
        title,
        description: description || undefined,
        amountType,
        amount: amountType === 'fixed' ? Number(amount) : undefined,
        minAmount: amountType === 'open' ? Number(minAmount) : undefined,
        currency,
        reusable,
        collect: {
          name: collectName,
          email: collectEmail,
          phone: collectPhone,
        },
        active: true,
      });

      router.push('/admin/payment-links');
    } catch {
      alert('Failed to create payment link');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Link
        href="/admin/payment-links"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          fontSize: '0.75rem',
          fontWeight: 600,
          color: 'var(--text-muted)',
          textDecoration: 'none',
        }}
      >
        <ArrowLeft size={14} />
        <span>Back to Payment Links</span>
      </Link>

      <div
        style={{
          borderRadius: 24,
          border: '1px solid var(--border)',
          backgroundColor: 'var(--bg-card)',
          padding: 32,
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 20, marginBottom: 24 }}>
          <h1
            style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--text-main)',
              margin: 0,
            }}
          >
            Create Standalone Payment Link
          </h1>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4, marginBottom: 0 }}>
            Generate a fast, shareable checkout link for retainers, deposits, or consulting sessions.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Input
            label="Payment Link Title *"
            placeholder="e.g. Discovery Architecture Sprint Deposit"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <Textarea
            label="Description / Instructions for Payer"
            placeholder="Details on what this payment covers..."
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Select
              label="Amount Type"
              value={amountType}
              onChange={(e) => setAmountType(e.target.value as 'fixed' | 'open')}
              options={[
                { value: 'fixed', label: 'Fixed Amount' },
                { value: 'open', label: 'Open Amount (Customer Enters)' },
              ]}
            />

            <Select
              label="Currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              options={[
                { value: 'USD', label: 'USD ($)' },
                { value: 'NGN', label: 'NGN (₦)' },
                { value: 'GBP', label: 'GBP (£)' },
                { value: 'EUR', label: 'EUR (€)' },
              ]}
            />
          </div>

          {amountType === 'fixed' ? (
            <Input
              label={`Amount (${currency})`}
              type="number"
              min="1"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              required
            />
          ) : (
            <Input
              label={`Minimum Amount (${currency})`}
              type="number"
              min="1"
              step="0.01"
              value={minAmount}
              onChange={(e) => setMinAmount(parseFloat(e.target.value) || 0)}
            />
          )}

          {/* Usage & Collect options */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              paddingTop: 16,
              borderTop: '1px solid var(--border)',
            }}
          >
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Information to Collect from Payer:
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: '0.75rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: 'var(--text-main)' }}>
                <input
                  type="checkbox"
                  checked={collectName}
                  onChange={(e) => setCollectName(e.target.checked)}
                  style={{ borderRadius: 4, accentColor: 'var(--primary)', cursor: 'pointer' }}
                />
                <span>Customer Name</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: 'var(--text-main)' }}>
                <input
                  type="checkbox"
                  checked={collectEmail}
                  onChange={(e) => setCollectEmail(e.target.checked)}
                  style={{ borderRadius: 4, accentColor: 'var(--primary)', cursor: 'pointer' }}
                />
                <span>Email Address</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: 'var(--text-main)' }}>
                <input
                  type="checkbox"
                  checked={collectPhone}
                  onChange={(e) => setCollectPhone(e.target.checked)}
                  style={{ borderRadius: 4, accentColor: 'var(--primary)', cursor: 'pointer' }}
                />
                <span>Phone Number</span>
              </label>
            </div>
          </div>

          <div style={{ paddingTop: 8 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.75rem', cursor: 'pointer', color: 'var(--text-main)' }}>
              <input
                type="checkbox"
                checked={reusable}
                onChange={(e) => setReusable(e.target.checked)}
                style={{ borderRadius: 4, accentColor: 'var(--primary)', cursor: 'pointer' }}
              />
              <span>Reusable (Allow multiple clients to pay through this same link)</span>
            </label>
          </div>

          <Button
            type="submit"
            size="lg"
            isLoading={saving}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Generate Payment Link &rarr;
          </Button>
        </form>
      </div>
    </div>
  );
}
