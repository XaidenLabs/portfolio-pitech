import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getInvoiceByToken } from '@/lib/api/invoices';
import { getClientById } from '@/lib/api/clients';
import { getSettings } from '@/lib/api/settings';
import { formatCurrency, formatDate } from '@/lib/utils/format';
import { CheckCircle } from '@/components/ui/icons';
import { PrintButton } from '@/components/billing/PrintButton';

interface PageProps {
  params: Promise<{ token: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { token } = await params;
  const invoice = await getInvoiceByToken(token);
  if (!invoice) return { title: 'Receipt Not Found' };

  return {
    title: `Receipt for ${invoice.number} | Pitech Billing`,
    description: `Official payment receipt for invoice ${invoice.number}`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function ReceiptPage({ params }: PageProps) {
  const { token } = await params;
  const invoice = await getInvoiceByToken(token);

  if (!invoice) {
    notFound();
  }

  const [client, settings] = await Promise.all([
    invoice.clientId ? getClientById(invoice.clientId) : null,
    getSettings(),
  ]);

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Actions Bar */}
      <div
        className="no-print"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 18px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)',
          backgroundColor: 'var(--bg-card)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <Link
          href={`/invoice/${invoice.token}`}
          style={{
            fontSize: '12px',
            fontFamily: 'var(--font-mono)',
            fontWeight: 600,
            color: 'var(--text-muted)',
            textDecoration: 'none',
          }}
        >
          &larr; View Invoice Document
        </Link>

        <div>
          <PrintButton />
        </div>
      </div>

      {/* Main Printable Receipt Card */}
      <div
        style={{
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border)',
          backgroundColor: 'var(--bg-card)',
          padding: '36px',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border)',
            paddingBottom: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                display: 'flex',
                height: '36px',
                width: '36px',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-text)',
                fontWeight: 800,
                fontSize: '15px',
              }}
            >
              P
            </div>
            <div>
              <h2 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
                {settings.business.legalName}
              </h2>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>Official Settlement Receipt</p>
            </div>
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              color: 'var(--success)',
              backgroundColor: 'var(--success-bg)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
            }}
          >
            <CheckCircle size={12} />
            <span>PAID &amp; SETTLED</span>
          </div>
        </div>

        {/* Receipt Details */}
        <div style={{ padding: '28px 0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', fontSize: '12px' }}>
            <div>
              <p style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 600, margin: '0 0 4px 0' }}>Receipt Number</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '13px', color: 'var(--text-main)', margin: 0 }}>
                REC-{invoice.number.replace('INV-', '')}
              </p>
            </div>
            <div>
              <p style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 600, margin: '0 0 4px 0' }}>Payment Date</p>
              <p style={{ fontWeight: 600, color: 'var(--text-main)', margin: 0 }}>
                {formatDate(invoice.paidAt || invoice.updatedAt)}
              </p>
            </div>
            <div>
              <p style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 600, margin: '0 0 4px 0' }}>Invoice Reference</p>
              <p style={{ fontWeight: 600, color: 'var(--text-main)', margin: 0 }}>
                {invoice.number}
              </p>
            </div>
            <div>
              <p style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 600, margin: '0 0 4px 0' }}>Settlement Method</p>
              <p style={{ fontWeight: 600, color: 'var(--text-main)', margin: 0 }}>
                Electronic Gateway / Bank Transfer
              </p>
            </div>
          </div>

          {/* Paid by */}
          <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-subtle)', fontSize: '12px', lineHeight: 1.5 }}>
            <p style={{ fontWeight: 600, color: 'var(--text-main)', margin: '0 0 4px 0' }}>Billed &amp; Paid By:</p>
            <p style={{ fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>{client ? client.name : 'Authorized Client'}</p>
            {client?.company && <p style={{ color: 'var(--text-muted)', margin: '2px 0 0 0' }}>{client.company}</p>}
            {client?.email && <p style={{ color: 'var(--text-dim)', margin: '2px 0 0 0' }}>{client.email}</p>}
          </div>

          {/* Total paid */}
          <div
            style={{
              padding: '20px',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)' }}>
              Total Amount Succeeded
            </span>
            <span style={{ fontSize: '22px', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-main)' }}>
              {formatCurrency(invoice.amountPaid || invoice.total, invoice.currency)}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div style={{ paddingTop: '20px', borderTop: '1px solid var(--border)', textAlign: 'center', fontSize: '11px', color: 'var(--text-dim)', lineHeight: 1.5 }}>
          <p style={{ margin: 0 }}>Thank you for your business. This document serves as official proof of payment.</p>
          <p style={{ margin: '2px 0 0 0' }}>{settings.business.address} &bull; TIN: {settings.business.taxNumber}</p>
        </div>
      </div>
    </div>
  );
}
