'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getPaymentLinks } from '@/lib/api/paymentLinks';
import { PaymentLink } from '@/types';
import { formatCurrency } from '@/lib/utils/format';
import { ArrowUpRight, Copy, Plus } from '@/components/ui/icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function AdminPaymentLinksListPage() {
  const [links, setLinks] = useState<PaymentLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getPaymentLinks();
        setLinks(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleCopy = (token: string, id: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      const url = `${window.location.origin}/pay/${token}`;
      navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', height: 260, alignItems: 'center', justifyContent: 'center' }}>
        <div
          style={{
            height: 32,
            width: 32,
            borderRadius: '50%',
            border: '3px solid var(--border)',
            borderTopColor: 'var(--primary)',
            animation: 'spin 0.8s linear infinite',
          }}
        />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'var(--text-main)',
              margin: 0,
            }}
          >
            Payment Links
          </h1>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4, marginBottom: 0 }}>
            Create standalone payment links for retainer deposits, advisory fees &amp; quick settlements
          </p>
        </div>

        <Link href="/admin/payment-links/new" style={{ textDecoration: 'none' }}>
          <Button size="sm" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Plus size={15} />
            <span>Create Payment Link</span>
          </Button>
        </Link>
      </div>

      <div
        style={{
          borderRadius: 16,
          border: '1px solid var(--border)',
          backgroundColor: 'var(--bg-card)',
          boxShadow: 'var(--shadow-sm)',
          overflow: 'hidden',
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
            <thead>
              <tr
                style={{
                  borderBottom: '1px solid var(--border)',
                  backgroundColor: 'var(--bg-subtle)',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--text-dim)',
                }}
              >
                <th style={{ padding: '12px 16px' }}>Title &amp; Type</th>
                <th style={{ padding: '12px 16px' }}>Amount</th>
                <th style={{ padding: '12px 16px' }}>Usage</th>
                <th style={{ padding: '12px 16px' }}>Total Collected</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {links.map((link) => (
                <tr
                  key={link.id}
                  style={{
                    borderBottom: '1px solid var(--border-subtle)',
                    transition: 'background-color 150ms ease',
                  }}
                >
                  <td style={{ padding: '14px 16px' }}>
                    <p style={{ fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>{link.title}</p>
                    <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', margin: '2px 0 0 0', textTransform: 'capitalize' }}>
                      {link.amountType} Amount &bull; {link.reusable ? 'Reusable Link' : 'Single-use'}
                    </p>
                  </td>
                  <td style={{ padding: '14px 16px', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                    {link.amountType === 'fixed'
                      ? formatCurrency(link.amount || 0, link.currency)
                      : `Open (${link.currency})`}
                  </td>
                  <td style={{ padding: '14px 16px', color: 'var(--text-muted)' }}>
                    {link.timesUsed} {link.timesUsed === 1 ? 'payment' : 'payments'}
                  </td>
                  <td style={{ padding: '14px 16px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--success)' }}>
                    {formatCurrency(link.totalCollected, link.currency)}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <Badge variant={link.active ? 'success' : 'secondary'} size="sm">
                      {link.active ? 'Active' : 'Disabled'}
                    </Badge>
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                      <button
                        type="button"
                        onClick={() => handleCopy(link.token, link.id)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                          borderRadius: 8,
                          border: '1px solid var(--border)',
                          backgroundColor: 'var(--bg-elevated)',
                          padding: '4px 10px',
                          fontSize: '0.6875rem',
                          fontWeight: 600,
                          color: 'var(--text-main)',
                          cursor: 'pointer',
                        }}
                      >
                        <Copy size={12} />
                        <span>{copiedId === link.id ? 'Copied!' : 'Copy'}</span>
                      </button>
                      <Link
                        href={`/pay/${link.token}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                          borderRadius: 8,
                          backgroundColor: 'var(--text-main)',
                          padding: '4px 10px',
                          fontSize: '0.6875rem',
                          fontWeight: 600,
                          color: 'var(--bg)',
                          textDecoration: 'none',
                        }}
                      >
                        <span>Open</span>
                        <ArrowUpRight size={11} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
