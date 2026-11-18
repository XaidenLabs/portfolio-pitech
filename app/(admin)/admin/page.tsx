'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getDashboardStats } from '@/lib/api/settings';
import { getInvoices } from '@/lib/api/invoices';
import { getEnquiries } from '@/lib/api/enquiries';
import { DashboardStats, Invoice, Enquiry } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils/format';
import { getStatusBadgeConfig } from '@/lib/utils/invoice';
import {
  ArrowUpRight,
  Briefcase,
  CheckCircle,
  CreditCard,
  DollarSign,
  FileText,
  Plus,
} from '@/components/ui/icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [st, invs, enqs] = await Promise.all([
          getDashboardStats(),
          getInvoices(),
          getEnquiries(),
        ]);
        setStats(st);
        setInvoices(invs);
        setEnquiries(enqs);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

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

  const recentInvoices = invoices.slice(0, 5);
  const unreadEnquiries = enquiries.filter((e) => !e.read);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Top Header & Quick Actions */}
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
            Dashboard Overview
          </h1>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4, marginBottom: 0 }}>
            Real-time financial performance, billing pipeline &amp; client enquiries
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10 }}>
          <Link href="/admin/invoices/new" style={{ textDecoration: 'none' }}>
            <Button size="sm" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Plus size={15} />
              <span>New Invoice</span>
            </Button>
          </Link>
          <Link href="/admin/payment-links/new" style={{ textDecoration: 'none' }}>
            <Button variant="outline" size="sm" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <CreditCard size={15} />
              <span>Create Payment Link</span>
            </Button>
          </Link>
          <Link href="/admin/projects/new" style={{ textDecoration: 'none' }}>
            <Button variant="outline" size="sm" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Briefcase size={15} />
              <span>Add Project</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Stat Cards */}
      {stats && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 16,
          }}
        >
          {/* Card 1: Total Invoiced */}
          <div
            style={{
              borderRadius: 16,
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-card)',
              padding: 20,
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--text-muted)',
                }}
              >
                Invoiced (This Month)
              </span>
              <div
                style={{
                  borderRadius: 10,
                  padding: 8,
                  backgroundColor: 'var(--bg-elevated)',
                  color: 'var(--text-main)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <DollarSign size={16} />
              </div>
            </div>
            <div style={{ marginTop: 12 }}>
              <p
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-main)',
                  margin: 0,
                }}
              >
                {formatCurrency(stats.totalInvoicedMonth.USD, 'USD')}
              </p>
              <p
                style={{
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-muted)',
                  marginTop: 2,
                  marginBottom: 0,
                }}
              >
                + {formatCurrency(stats.totalInvoicedMonth.NGN, 'NGN')}
              </p>
            </div>
          </div>

          {/* Card 2: Total Paid */}
          <div
            style={{
              borderRadius: 16,
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-card)',
              padding: 20,
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--text-muted)',
                }}
              >
                Collected Revenue
              </span>
              <div
                style={{
                  borderRadius: 10,
                  padding: 8,
                  backgroundColor: 'var(--success-bg)',
                  color: 'var(--success)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CheckCircle size={16} />
              </div>
            </div>
            <div style={{ marginTop: 12 }}>
              <p
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--success)',
                  margin: 0,
                }}
              >
                {formatCurrency(stats.totalPaidMonth.USD, 'USD')}
              </p>
              <p
                style={{
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--success)',
                  opacity: 0.8,
                  marginTop: 2,
                  marginBottom: 0,
                }}
              >
                + {formatCurrency(stats.totalPaidMonth.NGN, 'NGN')}
              </p>
            </div>
          </div>

          {/* Card 3: Outstanding */}
          <div
            style={{
              borderRadius: 16,
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-card)',
              padding: 20,
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--text-muted)',
                }}
              >
                Outstanding Balance
              </span>
              <div
                style={{
                  borderRadius: 10,
                  padding: 8,
                  backgroundColor: 'var(--warning-bg)',
                  color: 'var(--warning)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CreditCard size={16} />
              </div>
            </div>
            <div style={{ marginTop: 12 }}>
              <p
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--warning)',
                  margin: 0,
                }}
              >
                {formatCurrency(stats.totalOutstanding.USD, 'USD')}
              </p>
              <p
                style={{
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--warning)',
                  opacity: 0.8,
                  marginTop: 2,
                  marginBottom: 0,
                }}
              >
                + {formatCurrency(stats.totalOutstanding.NGN, 'NGN')}
              </p>
            </div>
          </div>

          {/* Card 4: Overdue Action */}
          <div
            style={{
              borderRadius: 16,
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-card)',
              padding: 20,
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--text-muted)',
                }}
              >
                Overdue Invoices
              </span>
              <div
                style={{
                  borderRadius: 10,
                  padding: 8,
                  backgroundColor: 'var(--danger-bg)',
                  color: 'var(--danger)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FileText size={16} />
              </div>
            </div>
            <div style={{ marginTop: 12 }}>
              <p
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--danger)',
                  margin: 0,
                }}
              >
                {stats.overdueCount} {stats.overdueCount === 1 ? 'Invoice' : 'Invoices'}
              </p>
              <p
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  marginTop: 2,
                  marginBottom: 0,
                }}
              >
                Requires reminder or follow-up
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mid Section: Revenue Trajectory & Enquiries Inbox */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 24,
        }}
      >
        {/* Monthly Revenue Visualizer */}
        <div
          style={{
            borderRadius: 16,
            border: '1px solid var(--border)',
            backgroundColor: 'var(--bg-card)',
            padding: 24,
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 24,
            }}
          >
            <div>
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: 'var(--text-main)',
                  margin: 0,
                }}
              >
                Monthly Billing Trajectory
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
                Recent cash inflows across currencies
              </p>
            </div>
            <span
              style={{
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                color: 'var(--success)',
                backgroundColor: 'var(--success-bg)',
                padding: '4px 10px',
                borderRadius: 9999,
              }}
            >
              +38% vs prev period
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: 12,
              paddingTop: 16,
            }}
          >
            {stats?.revenueByMonth.map((item) => (
              <div key={item.month} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--bg-elevated)',
                    borderRadius: 12,
                    padding: 8,
                    height: 144,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      height: `${Math.min(100, Math.max(20, (item.USD / 9000) * 100))}%`,
                      width: '100%',
                      backgroundColor: 'var(--text-main)',
                      borderRadius: 8,
                      transition: 'all 200ms ease',
                    }}
                  />
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                  {item.month}
                </span>
                <span style={{ fontSize: '0.625rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>
                  ${item.USD.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* New Enquiries / Leads Box */}
        <div
          style={{
            borderRadius: 16,
            border: '1px solid var(--border)',
            backgroundColor: 'var(--bg-card)',
            padding: 24,
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 16,
              }}
            >
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: 'var(--text-main)',
                  margin: 0,
                }}
              >
                New Leads &amp; Briefs
              </h3>
              {unreadEnquiries.length > 0 && (
                <span
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    backgroundColor: 'var(--danger)',
                    color: '#ffffff',
                    padding: '2px 8px',
                    borderRadius: 9999,
                  }}
                >
                  {unreadEnquiries.length} New
                </span>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {enquiries.slice(0, 3).map((enq) => (
                <Link
                  key={enq.id}
                  href="/admin/enquiries"
                  style={{
                    display: 'block',
                    padding: 12,
                    borderRadius: 12,
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--bg-subtle)',
                    textDecoration: 'none',
                    transition: 'border-color 150ms ease',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.75rem',
                      marginBottom: 4,
                    }}
                  >
                    <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                      {enq.name}
                    </span>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-dim)' }}>
                      {formatDate(enq.createdAt)}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      margin: 0,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {enq.message}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div
            style={{
              paddingTop: 16,
              marginTop: 16,
              borderTop: '1px solid var(--border)',
            }}
          >
            <Link
              href="/admin/enquiries"
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--text-main)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                textDecoration: 'none',
              }}
            >
              <span>View all enquiries inbox</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Invoices Table */}
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
          <div style={{ flex: 1 }}>
            <h3
              style={{
                fontWeight: 700,
                fontSize: '1rem',
                color: 'var(--text-main)',
                margin: 0,
              }}
            >
              Recent Invoices
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
              Live invoice statuses and client tokens
            </p>
          </div>
          <Link
            href="/admin/invoices"
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--text-main)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              textDecoration: 'none',
            }}
          >
            <span>All invoices</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
            <thead>
              <tr
                style={{
                  borderBottom: '1px solid var(--border)',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--text-dim)',
                }}
              >
                <th style={{ padding: '12px 16px 12px 0' }}>Number</th>
                <th style={{ padding: '12px 16px' }}>Due Date</th>
                <th style={{ padding: '12px 16px' }}>Total</th>
                <th style={{ padding: '12px 16px' }}>Balance</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
                <th style={{ padding: '12px 0 12px 16px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentInvoices.map((inv) => {
                const badge = getStatusBadgeConfig(inv.status);
                return (
                  <tr
                    key={inv.id}
                    style={{
                      borderBottom: '1px solid var(--border-subtle)',
                      transition: 'background-color 150ms ease',
                    }}
                  >
                    <td style={{ padding: '14px 16px 14px 0', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                      <Link
                        href={`/admin/invoices/${inv.id}`}
                        style={{ color: 'var(--text-main)', textDecoration: 'none' }}
                      >
                        {inv.number}
                      </Link>
                    </td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-muted)' }}>
                      {formatDate(inv.dueDate)}
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
                    <td style={{ padding: '14px 0 14px 16px', textAlign: 'right' }}>
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
                          }}
                        >
                          Client View &nearr;
                        </Link>
                        <Link
                          href={`/admin/invoices/${inv.id}`}
                          style={{
                            fontSize: '0.6875rem',
                            fontWeight: 600,
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
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
