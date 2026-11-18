'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { getInvoices } from '@/lib/api/invoices';
import { getClients } from '@/lib/api/clients';
import { Client, Invoice } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils/format';
import { getStatusBadgeConfig } from '@/lib/utils/invoice';
import { ArrowUpRight, Plus, Search } from '@/components/ui/icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function AdminInvoicesListPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    async function load() {
      try {
        const [invs, cls] = await Promise.all([getInvoices(), getClients()]);
        setInvoices(invs);
        setClients(cls);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const clientMap = useMemo(() => {
    const map: Record<string, Client> = {};
    clients.forEach((c) => {
      map[c.id] = c;
    });
    return map;
  }, [clients]);

  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      const client = clientMap[inv.clientId];
      const clientName = client ? client.name.toLowerCase() : '';
      const clientCompany = client?.company ? client.company.toLowerCase() : '';

      const matchesSearch =
        inv.number.toLowerCase().includes(search.toLowerCase()) ||
        clientName.includes(search.toLowerCase()) ||
        clientCompany.includes(search.toLowerCase()) ||
        (inv.reference && inv.reference.toLowerCase().includes(search.toLowerCase()));

      const matchesStatus =
        statusFilter === 'all' || inv.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [invoices, clientMap, search, statusFilter]);

  const statusOptions = ['all', 'draft', 'sent', 'viewed', 'partially_paid', 'paid', 'overdue', 'void'];

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
      {/* Page Header */}
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
            Client Invoices
          </h1>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4, marginBottom: 0 }}>
            Create, track, and manage multi-currency client invoices &amp; tokens
          </p>
        </div>

        <Link href="/admin/invoices/new" style={{ textDecoration: 'none' }}>
          <Button size="sm" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Plus size={15} />
            <span>Create Invoice</span>
          </Button>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          padding: 16,
          borderRadius: 16,
          border: '1px solid var(--border)',
          backgroundColor: 'var(--bg-card)',
        }}
      >
        {/* Status Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6 }}>
          {statusOptions.map((st) => {
            const isSelected = statusFilter === st;
            return (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                style={{
                  borderRadius: 10,
                  padding: '6px 12px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                  cursor: 'pointer',
                  border: isSelected ? '1px solid var(--primary)' : '1px solid var(--border)',
                  backgroundColor: isSelected ? 'var(--primary)' : 'var(--bg-subtle)',
                  color: isSelected ? 'var(--primary-text)' : 'var(--text-muted)',
                  transition: 'all 150ms ease',
                }}
              >
                {st === 'all' ? 'All Invoices' : st.replace('_', ' ')}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div style={{ position: 'relative', width: '100%', maxWidth: 280 }}>
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
            placeholder="Search invoice # or client..."
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
      </div>

      {/* Invoices Table */}
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
                <th style={{ padding: '12px 16px' }}>Invoice</th>
                <th style={{ padding: '12px 16px' }}>Client</th>
                <th style={{ padding: '12px 16px' }}>Issue / Due</th>
                <th style={{ padding: '12px 16px' }}>Total</th>
                <th style={{ padding: '12px 16px' }}>Balance</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((inv) => {
                  const client = clientMap[inv.clientId];
                  const badge = getStatusBadgeConfig(inv.status);
                  return (
                    <tr
                      key={inv.id}
                      style={{
                        borderBottom: '1px solid var(--border-subtle)',
                        transition: 'background-color 150ms ease',
                      }}
                    >
                      <td style={{ padding: '14px 16px', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                        <Link
                          href={`/admin/invoices/${inv.id}`}
                          style={{ color: 'var(--text-main)', textDecoration: 'none' }}
                        >
                          {inv.number}
                        </Link>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <p style={{ fontWeight: 600, color: 'var(--text-main)', margin: 0 }}>
                          {client ? client.name : 'Unknown Client'}
                        </p>
                        {client?.company && (
                          <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>{client.company}</p>
                        )}
                      </td>
                      <td style={{ padding: '14px 16px', color: 'var(--text-muted)' }}>
                        <p style={{ margin: 0 }}>{formatDate(inv.issueDate)}</p>
                        <p style={{ fontSize: '0.6875rem', color: 'var(--text-dim)', margin: '2px 0 0 0' }}>
                          Due: {formatDate(inv.dueDate)}
                        </p>
                      </td>
                      <td style={{ padding: '14px 16px', fontFamily: 'var(--font-mono)', fontWeight: 500 }}>
                        {formatCurrency(inv.total, inv.currency)}
                      </td>
                      <td style={{ padding: '14px 16px', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                        {formatCurrency(inv.balance, inv.currency)}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <Badge variant={badge.variant} size="sm">
                          {badge.label}
                        </Badge>
                      </td>
                      <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
                          <Link
                            href={`/invoice/${inv.token}`}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              fontSize: '0.6875rem',
                              fontWeight: 600,
                              color: 'var(--text-muted)',
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 2,
                            }}
                          >
                            <span>Client Link</span>
                            <ArrowUpRight size={12} />
                          </Link>
                          <Link
                            href={`/admin/invoices/${inv.id}`}
                            style={{
                              fontSize: '0.6875rem',
                              fontWeight: 700,
                              color: 'var(--text-main)',
                              textDecoration: 'underline',
                            }}
                          >
                            Manage
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} style={{ padding: '48px 16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                    No invoices found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
