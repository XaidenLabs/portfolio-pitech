'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getInvoiceById, recordInvoicePayment, saveInvoice } from '@/lib/api/invoices';
import { getClientById } from '@/lib/api/clients';
import { getSettings } from '@/lib/api/settings';
import { AdminSettings, Client, Invoice } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils/format';
import { getStatusBadgeConfig } from '@/lib/utils/invoice';
import {
  ArrowLeft,
  ArrowUpRight,
  Copy,
  DollarSign,
  Send,
  WhatsApp,
} from '@/components/ui/icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input, Select } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { InvoiceDocument } from '@/components/billing/InvoiceDocument';

export default function AdminInvoiceDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [client, setClient] = useState<Client | null>(null);
  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [loading, setLoading] = useState(true);

  // Modals
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isManualPaymentModalOpen, setIsManualPaymentModalOpen] = useState(false);

  // Send modal fields
  const [recipientEmail, setRecipientEmail] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [, setEmailMessage] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Manual payment fields
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<'bank_transfer' | 'cash' | 'other'>('bank_transfer');
  const [paymentRef, setPaymentRef] = useState('');
  const [recordingPayment, setRecordingPayment] = useState(false);

  useEffect(() => {
    async function load() {
      if (!id) return;
      try {
        const inv = await getInvoiceById(id);
        const setts = await getSettings();
        if (inv) {
          setInvoice(inv);
          setPaymentAmount(inv.balance);
          const cl = inv.clientId ? await getClientById(inv.clientId) : null;
          setClient(cl);
          if (cl) {
            setRecipientEmail(cl.email);
            setEmailSubject(`Invoice ${inv.number} from Pitech Digital`);
            setEmailMessage(
              `Hello ${cl.name},\n\nPlease find your invoice ${inv.number} for ${formatCurrency(
                inv.total,
                inv.currency
              )} due on ${formatDate(inv.dueDate)}.\n\nYou can review and settle it securely online here:\n${
                typeof window !== 'undefined' ? window.location.origin : ''
              }/invoice/${inv.token}\n\nBest regards,\nPitech Team`
            );
          }
        }
        setSettings(setts);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

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

  if (!invoice) {
    return (
      <div style={{ padding: '64px 0', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>Invoice Not Found</h2>
        <Link href="/admin/invoices" style={{ textDecoration: 'none' }}>
          <Button variant="outline">Return to Invoices</Button>
        </Link>
      </div>
    );
  }

  const badge = getStatusBadgeConfig(invoice.status);
  const invoicePublicUrl = typeof window !== 'undefined' ? `${window.location.origin}/invoice/${invoice.token}` : `/invoice/${invoice.token}`;

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(invoicePublicUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleMarkVoid = async () => {
    if (!confirm('Are you sure you want to void this invoice? This will cancel payment links.')) return;
    const updated = await saveInvoice({ ...invoice, status: 'void' });
    setInvoice(updated);
  };

  const handleRecordPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentAmount <= 0) return;

    setRecordingPayment(true);
    try {
      const res = await recordInvoicePayment({
        invoiceId: invoice.id,
        amount: Number(paymentAmount),
        method: paymentMethod,
        reference: paymentRef || `MANUAL-${Date.now().toString(36).toUpperCase()}`,
        payerName: client ? client.name : undefined,
        payerEmail: client ? client.email : undefined,
      });
      setInvoice(res.invoice);
      setIsManualPaymentModalOpen(false);
      alert('Payment recorded successfully!');
    } catch {
      alert('Failed to record payment');
    } finally {
      setRecordingPayment(false);
    }
  };

  const whatsAppUrl = client?.phone
    ? `https://wa.me/${client.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
        `Hello ${client.name}, here is your invoice ${invoice.number} (${formatCurrency(
          invoice.balance,
          invoice.currency
        )}): ${invoicePublicUrl}`
      )}`
    : `https://wa.me/?text=${encodeURIComponent(
        `Invoice ${invoice.number} (${formatCurrency(invoice.balance, invoice.currency)}): ${invoicePublicUrl}`
      )}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Top Header */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link
            href="/admin/invoices"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              border: '1px solid var(--border)',
              padding: 8,
              color: 'var(--text-muted)',
              backgroundColor: 'var(--bg-card)',
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <h1
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '-0.02em',
                  color: 'var(--text-main)',
                  margin: 0,
                }}
              >
                {invoice.number}
              </h1>
              <Badge variant={badge.variant} size="sm">
                {badge.label}
              </Badge>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2, marginBottom: 0 }}>
              Issued for {client ? client.name : 'Client'} &bull; Due {formatDate(invoice.dueDate)}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10 }}>
          <Button
            size="sm"
            onClick={() => setIsSendModalOpen(true)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            <Send size={14} />
            <span>Send / Share</span>
          </Button>

          {invoice.balance > 0 && invoice.status !== 'void' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsManualPaymentModalOpen(true)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              <DollarSign size={14} />
              <span>Record Payment</span>
            </Button>
          )}

          <a
            href={invoicePublicUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              borderRadius: 10,
              border: '1px solid var(--border)',
              padding: '6px 12px',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--text-main)',
              backgroundColor: 'var(--bg-card)',
              textDecoration: 'none',
            }}
          >
            <span>Client View</span>
            <ArrowUpRight size={13} />
          </a>

          {invoice.status !== 'void' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkVoid}
              style={{ fontSize: '0.75rem', color: 'var(--danger)' }}
            >
              Void
            </Button>
          )}
        </div>
      </div>

      {/* Invoice Overview & Status Timeline */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 16,
        }}
      >
        <div
          style={{
            padding: 16,
            borderRadius: 16,
            border: '1px solid var(--border)',
            backgroundColor: 'var(--bg-card)',
          }}
        >
          <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Total Amount
          </span>
          <p style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-main)', margin: '4px 0 0 0' }}>
            {formatCurrency(invoice.total, invoice.currency)}
          </p>
        </div>
        <div
          style={{
            padding: 16,
            borderRadius: 16,
            border: '1px solid var(--border)',
            backgroundColor: 'var(--bg-card)',
          }}
        >
          <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Paid So Far
          </span>
          <p style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--success)', margin: '4px 0 0 0' }}>
            {formatCurrency(invoice.amountPaid, invoice.currency)}
          </p>
        </div>
        <div
          style={{
            padding: 16,
            borderRadius: 16,
            border: '1px solid var(--border)',
            backgroundColor: 'var(--bg-card)',
          }}
        >
          <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Balance Due
          </span>
          <p style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--warning)', margin: '4px 0 0 0' }}>
            {formatCurrency(invoice.balance, invoice.currency)}
          </p>
        </div>
        <div
          style={{
            padding: 16,
            borderRadius: 16,
            border: '1px solid var(--border)',
            backgroundColor: 'var(--bg-card)',
          }}
        >
          <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Status Lifecycle
          </span>
          <p style={{ fontSize: '0.875rem', fontWeight: 600, textTransform: 'capitalize', color: 'var(--text-main)', margin: '4px 0 0 0' }}>
            {invoice.status.replace('_', ' ')}
          </p>
        </div>
      </div>

      {/* Document View */}
      {settings && (
        <InvoiceDocument
          invoice={invoice}
          client={client}
          settings={settings}
          isClientView={false}
        />
      )}

      {/* Send / Share Modal */}
      <Modal
        isOpen={isSendModalOpen}
        onClose={() => setIsSendModalOpen(false)}
        title={`Send Invoice ${invoice.number}`}
        description="Deliver invoice link via email, direct URL or instant WhatsApp dispatch"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 8 }}>
          {/* Quick Copy Link */}
          <div
            style={{
              padding: 14,
              borderRadius: 12,
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Direct Unguessable Token URL:
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type="text"
                readOnly
                value={invoicePublicUrl}
                style={{
                  width: '100%',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  borderRadius: 8,
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--bg-card)',
                  padding: 8,
                  color: 'var(--text-main)',
                  outline: 'none',
                }}
              />
              <button
                type="button"
                onClick={handleCopyLink}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  flexShrink: 0,
                  borderRadius: 8,
                  backgroundColor: 'var(--text-main)',
                  padding: '8px 12px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--bg)',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <Copy size={13} />
                <span>{copiedLink ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* WhatsApp Direct Share */}
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              borderRadius: 12,
              backgroundColor: '#10b981',
              padding: '10px 16px',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#ffffff',
              textDecoration: 'none',
              width: '100%',
            }}
          >
            <WhatsApp size={16} />
            <span>Share via WhatsApp Link</span>
          </a>

          {/* Email dispatch */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              paddingTop: 12,
              borderTop: '1px solid var(--border)',
            }}
          >
            <h4 style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
              Email to Client:
            </h4>
            <Input
              label="Recipient"
              type="email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
            />
            <Input
              label="Subject"
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 8 }}>
              <Button
                size="sm"
                onClick={() => {
                  alert(`Invoice email dispatched to ${recipientEmail}!`);
                  setIsSendModalOpen(false);
                }}
              >
                Send Email
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Manual Payment Modal */}
      <Modal
        isOpen={isManualPaymentModalOpen}
        onClose={() => setIsManualPaymentModalOpen(false)}
        title="Record Manual Payment"
        description="Manually record offline settlements, wire transfers, or cash receipts"
      >
        <form onSubmit={handleRecordPayment} style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 8 }}>
          <Input
            label={`Payment Amount (${invoice.currency})`}
            type="number"
            step="0.01"
            min="0.01"
            max={invoice.balance}
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(parseFloat(e.target.value) || 0)}
            required
          />

          <Select
            label="Payment Channel"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value as 'bank_transfer' | 'cash' | 'other')}
            options={[
              { value: 'bank_transfer', label: 'Direct Bank Wire / Transfer' },
              { value: 'cash', label: 'Cash Settlement' },
              { value: 'other', label: 'Other Third-Party Instrument' },
            ]}
          />

          <Input
            label="Transaction Reference / Note *"
            placeholder="e.g. GTB-TRF-0918231 or Check #440"
            value={paymentRef}
            onChange={(e) => setPaymentRef(e.target.value)}
            required
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 16 }}>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsManualPaymentModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={recordingPayment}>
              Save Settlement
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
