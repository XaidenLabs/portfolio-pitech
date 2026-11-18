'use client';

import React, { useEffect, useState } from 'react';
import { getSettings, updateSettings } from '@/lib/api/settings';
import { AdminSettings } from '@/types';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { CheckCircle } from '@/components/ui/icons';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await getSettings();
        setSettings(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setSaving(true);
    try {
      const updated = await updateSettings(settings);
      setSettings(updated);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch {
      alert('Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
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
    <div style={{ maxWidth: 896, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 32 }}>
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
            System &amp; Billing Settings
          </h1>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4, marginBottom: 0 }}>
            Configure business identity, bank details for wire transfers, invoice defaults, and checkout gateways
          </p>
        </div>

        <Button onClick={handleSave} isLoading={saving}>
          <span>Save Changes</span>
        </Button>
      </div>

      {savedSuccess && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: 16,
            borderRadius: 12,
            backgroundColor: 'var(--success-bg)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            color: 'var(--success)',
            fontSize: '0.75rem',
            fontWeight: 600,
          }}
        >
          <CheckCircle size={16} />
          <span>Settings saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {/* Business & Legal Billing Profile */}
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
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
            Business &amp; Legal Identity
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            <Input
              label="Legal Entity Name"
              value={settings.business.legalName}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  business: { ...settings.business, legalName: e.target.value },
                })
              }
            />
            <Input
              label="Tagline / Description"
              value={settings.business.tagline}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  business: { ...settings.business, tagline: e.target.value },
                })
              }
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            <Input
              label="Operating Physical Address"
              value={settings.business.address}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  business: { ...settings.business, address: e.target.value },
                })
              }
            />
            <Input
              label="Tax Identification Number (TIN)"
              value={settings.business.taxNumber}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  business: { ...settings.business, taxNumber: e.target.value },
                })
              }
            />
          </div>
        </div>

        {/* Bank Wire Settlement Account */}
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
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
            Bank Account for Direct Client Transfers
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            <Input
              label="Bank Institution Name"
              value={settings.business.bankName}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  business: { ...settings.business, bankName: e.target.value },
                })
              }
            />
            <Input
              label="Account Number"
              value={settings.business.accountNumber}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  business: { ...settings.business, accountNumber: e.target.value },
                })
              }
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            <Input
              label="Beneficiary Account Name"
              value={settings.business.accountName}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  business: { ...settings.business, accountName: e.target.value },
                })
              }
            />
            <Input
              label="Sort Code / Branch Code"
              value={settings.business.sortCode || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  business: { ...settings.business, sortCode: e.target.value },
                })
              }
            />
            <Input
              label="SWIFT / BIC (International Wire)"
              value={settings.business.swiftBic || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  business: { ...settings.business, swiftBic: e.target.value },
                })
              }
            />
          </div>
        </div>

        {/* Invoice Defaults */}
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
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
            Invoice Numbering &amp; Defaults
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16 }}>
            <Input
              label="Number Prefix"
              value={settings.invoiceDefaults.prefix}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  invoiceDefaults: { ...settings.invoiceDefaults, prefix: e.target.value },
                })
              }
            />
            <Input
              label="Due Period (Days)"
              type="number"
              value={settings.invoiceDefaults.duePeriodDays}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  invoiceDefaults: {
                    ...settings.invoiceDefaults,
                    duePeriodDays: parseInt(e.target.value) || 14,
                  },
                })
              }
            />
            <Input
              label="Tax Label"
              value={settings.invoiceDefaults.taxLabel}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  invoiceDefaults: { ...settings.invoiceDefaults, taxLabel: e.target.value },
                })
              }
            />
            <Input
              label="Default Tax Rate (%)"
              type="number"
              step="0.1"
              value={settings.invoiceDefaults.taxRate}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  invoiceDefaults: {
                    ...settings.invoiceDefaults,
                    taxRate: parseFloat(e.target.value) || 0,
                  },
                })
              }
            />
          </div>

          <Textarea
            label="Default Notes to Client"
            value={settings.invoiceDefaults.defaultNotes}
            onChange={(e) =>
              setSettings({
                ...settings,
                invoiceDefaults: { ...settings.invoiceDefaults, defaultNotes: e.target.value },
              })
            }
            rows={2}
          />

          <Textarea
            label="Default Terms &amp; Conditions"
            value={settings.invoiceDefaults.defaultTerms}
            onChange={(e) =>
              setSettings({
                ...settings,
                invoiceDefaults: { ...settings.invoiceDefaults, defaultTerms: e.target.value },
              })
            }
            rows={2}
          />
        </div>

        {/* Payment Channels & Gateways */}
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
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
            Payment Methods &amp; Gateway Options
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: '0.75rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.payments.enableGateway}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    payments: { ...settings.payments, enableGateway: e.target.checked },
                  })
                }
                style={{ borderRadius: 4, accentColor: 'var(--primary)', cursor: 'pointer' }}
              />
              <span style={{ fontWeight: 500, color: 'var(--text-main)' }}>
                Enable Online Gateway Checkout (Paystack / Stripe)
              </span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.payments.enableBankTransfer}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    payments: { ...settings.payments, enableBankTransfer: e.target.checked },
                  })
                }
                style={{ borderRadius: 4, accentColor: 'var(--primary)', cursor: 'pointer' }}
              />
              <span style={{ fontWeight: 500, color: 'var(--text-main)' }}>
                Enable Direct Bank Wire / Transfer Confirmation
              </span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.payments.allowPartialPayment}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    payments: { ...settings.payments, allowPartialPayment: e.target.checked },
                  })
                }
                style={{ borderRadius: 4, accentColor: 'var(--primary)', cursor: 'pointer' }}
              />
              <span style={{ fontWeight: 500, color: 'var(--text-main)' }}>
                Allow Clients to Settle Invoices in Partial Installments by Default
              </span>
            </label>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 16 }}>
          <Button type="submit" size="lg" isLoading={saving}>
            Save All Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
