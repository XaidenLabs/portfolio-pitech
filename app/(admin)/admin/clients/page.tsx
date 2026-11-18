'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getClients, saveClient } from '@/lib/api/clients';
import { getInvoices } from '@/lib/api/invoices';
import { Client, Currency, Invoice } from '@/types';
import { formatDate } from '@/lib/utils/format';
import { Mail, Phone, Plus, Search } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Input, Select, Textarea } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // New Client Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [defaultCurrency, setDefaultCurrency] = useState<Currency>('USD');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const [cls, invs] = await Promise.all([getClients(), getInvoices()]);
        setClients(cls);
        setInvoices(invs);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setSaving(true);
    try {
      const created = await saveClient({
        name,
        company: company || undefined,
        email,
        phone: phone || undefined,
        address: address || undefined,
        defaultCurrency,
        notes: notes || undefined,
      });

      setClients((prev) => [created, ...prev]);
      setIsModalOpen(false);
      setName('');
      setCompany('');
      setEmail('');
      setPhone('');
      setAddress('');
      setNotes('');
    } catch {
      alert('Failed to save client');
    } finally {
      setSaving(false);
    }
  };

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.company && c.company.toLowerCase().includes(search.toLowerCase())) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

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
            Client Directory
          </h1>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4, marginBottom: 0 }}>
            Manage client profiles, default billing currencies &amp; invoice history
          </p>
        </div>

        <Button
          size="sm"
          onClick={() => setIsModalOpen(true)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
        >
          <Plus size={15} />
          <span>Add Client</span>
        </Button>
      </div>

      {/* Search */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 16,
          borderRadius: 16,
          border: '1px solid var(--border)',
          backgroundColor: 'var(--bg-card)',
          gap: 16,
        }}
      >
        <div style={{ position: 'relative', width: '100%', maxWidth: 360 }}>
          <Search
            size={15}
            style={{
              position: 'absolute',
              left: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-dim)',
            }}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search clients by name, company, or email..."
            style={{
              width: '100%',
              borderRadius: 10,
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-subtle)',
              paddingLeft: 36,
              paddingRight: 12,
              paddingTop: 8,
              paddingBottom: 8,
              fontSize: '0.75rem',
              color: 'var(--text-main)',
              outline: 'none',
            }}
          />
        </div>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {filtered.length} clients
        </span>
      </div>

      {/* Clients Table */}
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
                <th style={{ padding: '12px 16px' }}>Client &amp; Company</th>
                <th style={{ padding: '12px 16px' }}>Contact</th>
                <th style={{ padding: '12px 16px' }}>Default Currency</th>
                <th style={{ padding: '12px 16px' }}>Invoices Issued</th>
                <th style={{ padding: '12px 16px' }}>Created Date</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => {
                const clientInvoices = invoices.filter((inv) => inv.clientId === c.id);
                return (
                  <tr
                    key={c.id}
                    style={{
                      borderBottom: '1px solid var(--border-subtle)',
                      transition: 'background-color 150ms ease',
                    }}
                  >
                    <td style={{ padding: '14px 16px' }}>
                      <p style={{ fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>{c.name}</p>
                      {c.company && (
                        <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>{c.company}</p>
                      )}
                    </td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-muted)' }}>
                      <p style={{ display: 'flex', alignItems: 'center', gap: 6, margin: 0 }}>
                        <Mail size={12} style={{ color: 'var(--text-dim)' }} />
                        <span>{c.email}</span>
                      </p>
                      {c.phone && (
                        <p style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '4px 0 0 0', color: 'var(--text-dim)' }}>
                          <Phone size={12} style={{ color: 'var(--text-dim)' }} />
                          <span>{c.phone}</span>
                        </p>
                      )}
                    </td>
                    <td style={{ padding: '14px 16px', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                      {c.defaultCurrency}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                        {clientInvoices.length} {clientInvoices.length === 1 ? 'Invoice' : 'Invoices'}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-muted)' }}>
                      {formatDate(c.createdAt)}
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      <Link
                        href={`/admin/invoices/new?clientId=${c.id}`}
                        style={{
                          display: 'inline-block',
                          borderRadius: 8,
                          backgroundColor: 'var(--bg-elevated)',
                          padding: '6px 12px',
                          fontSize: '0.6875rem',
                          fontWeight: 600,
                          color: 'var(--text-main)',
                          textDecoration: 'none',
                          border: '1px solid var(--border)',
                        }}
                      >
                        + Invoice
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Client Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Register New Client Profile"
      >
        <form onSubmit={handleCreateClient} style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 8 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Input
              label="Client Name *"
              placeholder="e.g. Michael Thorne"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="Company Name"
              placeholder="e.g. Thorne Capital UK"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Input
              label="Email Address *"
              type="email"
              placeholder="m.thorne@thornecap.co.uk"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Phone Number"
              placeholder="+44 20 7946 0991"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Input
              label="Billing Address"
              placeholder="Full address for invoice bills"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Select
              label="Default Currency"
              value={defaultCurrency}
              onChange={(e) => setDefaultCurrency(e.target.value as Currency)}
              options={[
                { value: 'USD', label: 'USD ($)' },
                { value: 'NGN', label: 'NGN (₦)' },
                { value: 'GBP', label: 'GBP (£)' },
                { value: 'EUR', label: 'EUR (€)' },
              ]}
            />
          </div>

          <Textarea
            label="Internal Notes"
            placeholder="Special billing terms, milestone preferences, contact notes..."
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 16 }}>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={saving}>
              Save Client Profile
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
