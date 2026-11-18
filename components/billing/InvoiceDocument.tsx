'use client';

import React from 'react';
import Link from 'next/link';
import { Invoice, Client, AdminSettings } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils/format';
import { getStatusBadgeConfig } from '@/lib/utils/invoice';
import { Badge } from '../ui/badge';
import { Building, CheckCircle, CreditCard, Download, Printer } from '../ui/icons';
import { Button } from '../ui/button';

interface InvoiceDocumentProps {
  invoice: Invoice;
  client?: Client | null;
  settings: AdminSettings;
  isClientView?: boolean;
}

export function InvoiceDocument({
  invoice,
  client,
  settings,
  isClientView = true,
}: InvoiceDocumentProps) {
  const badge = getStatusBadgeConfig(invoice.status);
  const isPaid = invoice.status === 'paid' || invoice.balance <= 0;
  const isVoid = invoice.status === 'void';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Banner (Status & Actions) */}
      <div
        className="no-print"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          padding: '16px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)',
          backgroundColor: 'var(--bg-card)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Badge size="md">
            <span style={{ textTransform: 'capitalize' }}>{badge.label}</span>
          </Badge>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Invoice #{invoice.number} &bull; Due {formatDate(invoice.dueDate)}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            onClick={() => window.print()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-elevated)',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--text-main)',
              cursor: 'pointer',
            }}
          >
            <Printer size={14} />
            <span>Print</span>
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-elevated)',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--text-main)',
              cursor: 'pointer',
            }}
          >
            <Download size={14} />
            <span>Download PDF</span>
          </button>

          {!isPaid && !isVoid && isClientView && (
            <Link href={`/invoice/${invoice.token}/pay`} style={{ textDecoration: 'none' }}>
              <Button size="sm">
                <CreditCard size={14} />
                <span>Pay Now ({formatCurrency(invoice.balance, invoice.currency)})</span>
              </Button>
            </Link>
          )}

          {isPaid && (
            <Link href={`/receipt/${invoice.token}`} style={{ textDecoration: 'none' }}>
              <Button variant="outline" size="sm">
                <CheckCircle size={14} style={{ color: 'var(--success)' }} />
                <span>View Receipt</span>
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Main Printable Invoice Paper */}
      <div
        style={{
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border)',
          backgroundColor: 'var(--bg-card)',
          padding: '40px',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        {/* Invoice Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '24px',
            paddingBottom: '32px',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div
                style={{
                  display: 'flex',
                  height: '38px',
                  width: '38px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-text)',
                  fontWeight: 800,
                  fontSize: '16px',
                }}
              >
                P
              </div>
              <div>
                <h2 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
                  {settings.business.legalName}
                </h2>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>{settings.business.tagline}</p>
              </div>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-dim)', lineHeight: 1.5 }}>
              <p style={{ margin: 0 }}>{settings.business.address}</p>
              <p style={{ margin: '2px 0' }}>TIN: {settings.business.taxNumber}</p>
              <p style={{ margin: 0 }}>contact@pitech.dev &bull; +234 801 234 5678</p>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--text-dim)', letterSpacing: '0.08em', fontWeight: 600 }}>
              Invoice
            </span>
            <h1 style={{ fontSize: '24px', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-main)', margin: '4px 0' }}>
              {invoice.number}
            </h1>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5, marginTop: '4px' }}>
              <p style={{ margin: 0 }}>Issue Date: <strong style={{ color: 'var(--text-main)' }}>{formatDate(invoice.issueDate)}</strong></p>
              <p style={{ margin: '2px 0' }}>Due Date: <strong style={{ color: 'var(--text-main)' }}>{formatDate(invoice.dueDate)}</strong></p>
              {invoice.reference && (
                <p style={{ margin: 0 }}>PO / Ref: <span style={{ fontFamily: 'var(--font-mono)' }}>{invoice.reference}</span></p>
              )}
            </div>
          </div>
        </div>

        {/* Bill To Info */}
        <div style={{ padding: '28px 0', borderBottom: '1px solid var(--border)' }}>
          <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-dim)', margin: '0 0 8px 0' }}>
            Billed To:
          </p>
          <div style={{ fontSize: '13px', lineHeight: 1.5 }}>
            <p style={{ fontWeight: 700, fontSize: '16px', color: 'var(--text-main)', margin: '0 0 4px 0' }}>
              {client ? client.name : 'Valued Client'}
            </p>
            {client?.company && (
              <p style={{ fontWeight: 600, color: 'var(--text-muted)', margin: '0 0 2px 0' }}>
                {client.company}
              </p>
            )}
            {client?.email && (
              <p style={{ color: 'var(--text-dim)', margin: 0 }}>{client.email}</p>
            )}
            {client?.address && (
              <p style={{ color: 'var(--text-dim)', margin: '2px 0 0 0' }}>{client.address}</p>
            )}
          </div>
        </div>

        {/* Line Items Table */}
        <div style={{ padding: '28px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', fontSize: '11px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--text-dim)' }}>
                <th style={{ padding: '10px 14px 10px 0', fontWeight: 600 }}>Description</th>
                <th style={{ padding: '10px 14px', textAlign: 'center', width: '60px', fontWeight: 600 }}>Qty</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', width: '120px', fontWeight: 600 }}>Rate</th>
                <th style={{ padding: '10px 0 10px 14px', textAlign: 'right', width: '120px', fontWeight: 600 }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, idx) => (
                <tr key={item.id || idx} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '14px 14px 14px 0', fontWeight: 500, color: 'var(--text-main)' }}>
                    {item.description}
                  </td>
                  <td style={{ padding: '14px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    {item.quantity}
                  </td>
                  <td style={{ padding: '14px', textAlign: 'right', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    {formatCurrency(item.unitPrice, invoice.currency)}
                  </td>
                  <td style={{ padding: '14px 0 14px 14px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-main)' }}>
                    {formatCurrency(item.quantity * item.unitPrice, invoice.currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Summary */}
        <div
          style={{
            paddingTop: '20px',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '32px',
          }}
        >
          <div style={{ flex: 1, minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {invoice.notes && (
              <div style={{ fontSize: '12px', padding: '14px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-subtle)' }}>
                <p style={{ fontWeight: 600, color: 'var(--text-main)', margin: '0 0 4px 0' }}>Notes to Client:</p>
                <p style={{ color: 'var(--text-muted)', margin: 0 }}>{invoice.notes}</p>
              </div>
            )}

            {invoice.showBankDetails && (
              <div style={{ fontSize: '12px', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', lineHeight: 1.6 }}>
                <p style={{ fontWeight: 700, color: 'var(--text-main)', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Building size={14} />
                  <span>Direct Bank Transfer Details:</span>
                </p>
                <p style={{ margin: 0 }}>Bank: <strong style={{ color: 'var(--text-main)' }}>{settings.business.bankName}</strong></p>
                <p style={{ margin: '2px 0' }}>Account Number: <strong style={{ color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>{settings.business.accountNumber}</strong></p>
                <p style={{ margin: 0 }}>Account Name: <strong>{settings.business.accountName}</strong></p>
                {settings.business.sortCode && <p style={{ margin: '2px 0' }}>Sort Code: {settings.business.sortCode}</p>}
                {settings.business.swiftBic && <p style={{ margin: 0 }}>SWIFT/BIC: {settings.business.swiftBic}</p>}
              </div>
            )}
          </div>

          <div style={{ width: '100%', maxWidth: '280px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>Subtotal:</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-main)' }}>
                {formatCurrency(invoice.subtotal, invoice.currency)}
              </span>
            </div>

            {invoice.discount && invoice.discount.value > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--success)' }}>
                <span>Discount ({invoice.discount.type === 'percent' ? `${invoice.discount.value}%` : 'Fixed'}):</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                  -{formatCurrency(
                    invoice.discount.type === 'percent'
                      ? (invoice.subtotal * invoice.discount.value) / 100
                      : invoice.discount.value,
                    invoice.currency
                  )}
                </span>
              </div>
            )}

            {invoice.tax && invoice.tax.rate > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>{invoice.tax.label} ({invoice.tax.rate}%):</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-main)' }}>
                  {formatCurrency(
                    ((invoice.subtotal -
                      (invoice.discount
                        ? invoice.discount.type === 'percent'
                          ? (invoice.subtotal * invoice.discount.value) / 100
                          : invoice.discount.value
                        : 0)) *
                      invoice.tax.rate) /
                      100,
                    invoice.currency
                  )}
                </span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: 800, color: 'var(--text-main)', paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
              <span>Total:</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>{formatCurrency(invoice.total, invoice.currency)}</span>
            </div>

            {invoice.amountPaid > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--success)', fontSize: '12px' }}>
                <span>Amount Paid:</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                  {formatCurrency(invoice.amountPaid, invoice.currency)}
                </span>
              </div>
            )}

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-elevated)',
                fontWeight: 800,
                fontSize: '14px',
                color: 'var(--text-main)',
                marginTop: '4px',
              }}
            >
              <span>Balance Due:</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>{formatCurrency(invoice.balance, invoice.currency)}</span>
            </div>
          </div>
        </div>

        {/* Terms */}
        {invoice.terms && (
          <div style={{ marginTop: '36px', paddingTop: '20px', borderTop: '1px solid var(--border)', fontSize: '11px', color: 'var(--text-dim)', lineHeight: 1.5 }}>
            <p style={{ fontWeight: 600, color: 'var(--text-muted)', margin: '0 0 2px 0' }}>Terms &amp; Conditions:</p>
            <p style={{ margin: 0 }}>{invoice.terms}</p>
          </div>
        )}
      </div>
    </div>
  );
}
