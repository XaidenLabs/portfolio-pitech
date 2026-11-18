'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getClients, saveClient } from '@/lib/api/clients';
import { getSettings } from '@/lib/api/settings';
import { saveInvoice } from '@/lib/api/invoices';
import { AdminSettings, Client, Currency, InvoiceItem } from '@/types';
import { calcInvoiceTotals, generateToken } from '@/lib/utils/invoice';
import { formatCurrency, formatDate } from '@/lib/utils/format';
import { ArrowLeft, Plus, Trash } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Input, Select, Textarea } from '@/components/ui/input';

export default function CreateInvoicePage() {
  const router = useRouter();

  const [clients, setClients] = useState<Client[]>([]);
  const [, setSettings] = useState<AdminSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form states
  const [clientId, setClientId] = useState('');
  const [newClientName, setNewClientName] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');
  const [isCreatingInlineClient, setIsCreatingInlineClient] = useState(false);

  const [number, setNumber] = useState('INV-2026-108');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [issueDate, setIssueDate] = useState('2026-02-18');
  const [dueDate, setDueDate] = useState('2026-03-04');
  const [reference, setReference] = useState('');

  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: 'item-1',
      description: 'Phase 1: Architecture, Core Schemas & Staging Deployment',
      quantity: 1,
      unitPrice: 3500,
    },
  ]);

  const [discountType, setDiscountType] = useState<'percent' | 'fixed'>('fixed');
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [taxRate, setTaxRate] = useState<number>(7.5);
  const [taxLabel, setTaxLabel] = useState('VAT');
  const [notes, setNotes] = useState('Thank you for partnering with Pitech.');
  const [terms, setTerms] = useState('Net 14 days. Work remains property of Pitech until balance is settled in full.');
  const [showBankDetails, setShowBankDetails] = useState(true);
  const [allowPartialPayment, setAllowPartialPayment] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [cls, setts] = await Promise.all([getClients(), getSettings()]);
        setClients(cls);
        if (cls.length > 0) setClientId(cls[0].id);
        setSettings(setts);
        if (setts) {
          setCurrency(setts.business.defaultCurrency);
          setTaxRate(setts.invoiceDefaults.taxRate);
          setTaxLabel(setts.invoiceDefaults.taxLabel);
          setNotes(setts.invoiceDefaults.defaultNotes);
          setTerms(setts.invoiceDefaults.defaultTerms);
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Compute live calculations
  const totals = useMemo(() => {
    return calcInvoiceTotals({
      items,
      discount: discountValue > 0 ? { type: discountType, value: discountValue } : undefined,
      tax: taxRate > 0 ? { label: taxLabel, rate: taxRate } : undefined,
      amountPaid: 0,
    });
  }, [items, discountType, discountValue, taxRate, taxLabel]);

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: `item-${Date.now()}`,
        description: 'Engineering Sprint Deliverable',
        quantity: 1,
        unitPrice: 1000,
      },
    ]);
  };

  const handleRemoveItem = (id: string) => {
    if (items.length <= 1) return;
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const handleItemChange = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, [field]: value } : it))
    );
  };

  const handleCreateInlineClient = async () => {
    if (!newClientName || !newClientEmail) {
      alert('Please enter a name and email for the new client.');
      return;
    }
    const created = await saveClient({
      name: newClientName,
      email: newClientEmail,
      defaultCurrency: currency,
    });
    setClients((prev) => [created, ...prev]);
    setClientId(created.id);
    setIsCreatingInlineClient(false);
    setNewClientName('');
    setNewClientEmail('');
  };

  const handleSave = async (status: 'draft' | 'sent') => {
    if (!clientId) {
      alert('Please select or create a client.');
      return;
    }

    setSaving(true);
    try {
      const token = generateToken('inv');
      const invoice = await saveInvoice({
        number,
        token,
        clientId,
        currency,
        issueDate,
        dueDate,
        reference: reference || undefined,
        items,
        discount: discountValue > 0 ? { type: discountType, value: discountValue } : undefined,
        tax: taxRate > 0 ? { label: taxLabel, rate: taxRate } : undefined,
        subtotal: totals.subtotal,
        total: totals.total,
        amountPaid: 0,
        balance: totals.total,
        notes,
        terms,
        showBankDetails,
        allowPartialPayment,
        status,
        sentAt: status === 'sent' ? new Date().toISOString() : undefined,
      });

      router.push(`/admin/invoices/${invoice.id}`);
    } catch {
      alert('Failed to save invoice');
    } finally {
      setSaving(false);
    }
  };

  const selectedClient = clients.find((c) => c.id === clientId);

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
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link
          href="/admin/invoices"
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
          <span>Back to Invoices</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSave('draft')}
            isLoading={saving}
          >
            Save as Draft
          </Button>
          <Button
            size="sm"
            onClick={() => handleSave('sent')}
            isLoading={saving}
          >
            Save &amp; Generate Link
          </Button>
        </div>
      </div>

      {/* Main 2-Column Layout: Form on Left, Live Preview on Right */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 24,
          alignItems: 'start',
        }}
      >
        {/* Left Column: Form Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Header Card */}
          <div
            style={{
              borderRadius: 16,
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-card)',
              padding: 24,
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <h3
              style={{
                fontSize: '1rem',
                fontWeight: 700,
                color: 'var(--text-main)',
                margin: 0,
              }}
            >
              Invoice Header &amp; Client
            </h3>

            {/* Client selector / inline creator */}
            {!isCreatingInlineClient ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    Billed Client *
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsCreatingInlineClient(true)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'var(--text-main)',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    }}
                  >
                    + Create New Client Inline
                  </button>
                </div>
                <select
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  style={{
                    width: '100%',
                    borderRadius: 10,
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--bg-subtle)',
                    padding: '10px 14px',
                    fontSize: '0.875rem',
                    color: 'var(--text-main)',
                    outline: 'none',
                  }}
                >
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} {c.company ? `(${c.company})` : ''} - {c.email}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div
                style={{
                  padding: 16,
                  borderRadius: 12,
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--bg-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    Quick Add Client
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsCreatingInlineClient(false)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <Input
                    label="Client Name"
                    placeholder="e.g. Kolawole Davies"
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="kola@brand.com"
                    value={newClientEmail}
                    onChange={(e) => setNewClientEmail(e.target.value)}
                  />
                </div>
                <Button size="sm" onClick={handleCreateInlineClient}>
                  Save Client &amp; Select
                </Button>
              </div>
            )}

            {/* Invoice meta inputs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12, paddingTop: 8 }}>
              <Input
                label="Invoice Number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
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
              <Input
                label="Issue Date"
                type="date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
              />
              <Input
                label="Due Date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <Input
              label="Purchase Order / Internal Reference (Optional)"
              placeholder="e.g. PO-8921"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
            />
          </div>

          {/* Line Items Card */}
          <div
            style={{
              borderRadius: 16,
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-card)',
              padding: 24,
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
                Line Items
              </h3>
              <Button size="sm" variant="outline" onClick={handleAddItem} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <Plus size={14} />
                <span>Add Item Row</span>
              </Button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {items.map((it, idx) => (
                <div
                  key={it.id || idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: 10,
                    borderRadius: 12,
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--bg-subtle)',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <input
                      type="text"
                      placeholder="Item description / deliverable"
                      value={it.description}
                      onChange={(e) => handleItemChange(it.id, 'description', e.target.value)}
                      style={{
                        width: '100%',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        borderRadius: 8,
                        border: '1px solid var(--border)',
                        backgroundColor: 'var(--bg-card)',
                        padding: '6px 10px',
                        color: 'var(--text-main)',
                        outline: 'none',
                      }}
                    />
                  </div>
                  <div style={{ width: 64 }}>
                    <input
                      type="number"
                      min="1"
                      placeholder="Qty"
                      value={it.quantity}
                      onChange={(e) => handleItemChange(it.id, 'quantity', parseFloat(e.target.value) || 1)}
                      style={{
                        width: '100%',
                        fontSize: '0.75rem',
                        textAlign: 'center',
                        fontFamily: 'var(--font-mono)',
                        borderRadius: 8,
                        border: '1px solid var(--border)',
                        backgroundColor: 'var(--bg-card)',
                        padding: '6px 8px',
                        color: 'var(--text-main)',
                        outline: 'none',
                      }}
                    />
                  </div>
                  <div style={{ width: 110 }}>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Unit Price"
                      value={it.unitPrice}
                      onChange={(e) => handleItemChange(it.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                      style={{
                        width: '100%',
                        fontSize: '0.75rem',
                        textAlign: 'right',
                        fontFamily: 'var(--font-mono)',
                        borderRadius: 8,
                        border: '1px solid var(--border)',
                        backgroundColor: 'var(--bg-card)',
                        padding: '6px 8px',
                        color: 'var(--text-main)',
                        outline: 'none',
                      }}
                    />
                  </div>
                  <div style={{ width: 96, textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {formatCurrency(it.quantity * it.unitPrice, currency)}
                  </div>
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(it.id)}
                      aria-label="Remove item"
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 4,
                        color: 'var(--text-dim)',
                        cursor: 'pointer',
                      }}
                    >
                      <Trash size={15} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Discount & Tax Row */}
            <div
              style={{
                paddingTop: 16,
                borderTop: '1px solid var(--border)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 16,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Select
                  label="Discount Type"
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value as 'percent' | 'fixed')}
                  options={[
                    { value: 'fixed', label: `Fixed (${currency})` },
                    { value: 'percent', label: 'Percentage (%)' },
                  ]}
                />
                <Input
                  label="Discount Value"
                  type="number"
                  min="0"
                  value={discountValue}
                  onChange={(e) => setDiscountValue(parseFloat(e.target.value) || 0)}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Input
                  label="Tax Label"
                  value={taxLabel}
                  onChange={(e) => setTaxLabel(e.target.value)}
                />
                <Input
                  label="Tax Rate (%)"
                  type="number"
                  step="0.1"
                  min="0"
                  value={taxRate}
                  onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
          </div>

          {/* Notes & Terms */}
          <div
            style={{
              borderRadius: 16,
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-card)',
              padding: 24,
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
              Notes &amp; Payment Settings
            </h3>
            <Textarea
              label="Notes to Client"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
            />
            <Textarea
              label="Terms &amp; Conditions"
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
              rows={2}
            />

            <div style={{ paddingTop: 8, display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: '0.75rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={showBankDetails}
                  onChange={(e) => setShowBankDetails(e.target.checked)}
                  style={{ borderRadius: 4, accentColor: 'var(--primary)', cursor: 'pointer' }}
                />
                <span>Include Bank Account Details on Document</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={allowPartialPayment}
                  onChange={(e) => setAllowPartialPayment(e.target.checked)}
                  style={{ borderRadius: 4, accentColor: 'var(--primary)', cursor: 'pointer' }}
                />
                <span>Allow Client to Settle in Partial Installments</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Live Side-by-Side Summary Preview */}
        <div style={{ position: 'sticky', top: 96, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            style={{
              borderRadius: 16,
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-card)',
              padding: 24,
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <span
              style={{
                fontSize: '0.6875rem',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.08em',
                color: 'var(--text-dim)',
                fontWeight: 600,
              }}
            >
              Live Preview Summary
            </span>

            <div
              style={{
                padding: 16,
                borderRadius: 12,
                backgroundColor: 'var(--bg-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                fontSize: '0.75rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Invoice Number:</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-main)' }}>{number}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Recipient Client:</span>
                <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                  {selectedClient ? selectedClient.name : 'None selected'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Payment Due:</span>
                <span style={{ fontWeight: 500, color: 'var(--text-main)' }}>{formatDate(dueDate)}</span>
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                paddingTop: 8,
                borderTop: '1px solid var(--border)',
                fontSize: '0.75rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Subtotal:</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{formatCurrency(totals.subtotal, currency)}</span>
              </div>
              {totals.discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--success)' }}>
                  <span>Discount:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>-{formatCurrency(totals.discountAmount, currency)}</span>
                </div>
              )}
              {totals.taxAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                  <span>{taxLabel} ({taxRate}%):</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{formatCurrency(totals.taxAmount, currency)}</span>
                </div>
              )}
              <div
                style={{
                  paddingTop: 8,
                  borderTop: '1px solid var(--border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: 'var(--text-main)',
                }}
              >
                <span>Grand Total:</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>{formatCurrency(totals.total, currency)}</span>
              </div>
            </div>

            <Button
              size="lg"
              onClick={() => handleSave('sent')}
              isLoading={saving}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Generate Live Invoice &amp; Link
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
