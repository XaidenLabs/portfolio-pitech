'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getEnquiries, updateEnquiryStatus } from '@/lib/api/enquiries';
import { Enquiry } from '@/types';
import { formatDate } from '@/lib/utils/format';
import { Mail } from '@/components/ui/icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getEnquiries();
        setEnquiries(data);
        if (data.length > 0) setSelectedEnquiry(data[0]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSelect = async (enq: Enquiry) => {
    setSelectedEnquiry(enq);
    if (!enq.read) {
      await updateEnquiryStatus(enq.id, enq.status, true);
      setEnquiries((prev) =>
        prev.map((e) => (e.id === enq.id ? { ...e, read: true } : e))
      );
    }
  };

  const handleStatusChange = async (status: Enquiry['status']) => {
    if (!selectedEnquiry) return;
    const updated = await updateEnquiryStatus(selectedEnquiry.id, status, true);
    if (updated) {
      setSelectedEnquiry(updated);
      setEnquiries((prev) =>
        prev.map((e) => (e.id === updated.id ? updated : e))
      );
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
          Client Enquiries &amp; Quotes Inbox
        </h1>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4, marginBottom: 0 }}>
          Review incoming project briefs, contact requests, and convert leads into clients
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 24,
          alignItems: 'start',
        }}
      >
        {/* Enquiries List Column */}
        <div
          style={{
            borderRadius: 16,
            border: '1px solid var(--border)',
            backgroundColor: 'var(--bg-card)',
            padding: 12,
            boxShadow: 'var(--shadow-sm)',
            maxHeight: 700,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          {enquiries.map((enq) => {
            const isSelected = selectedEnquiry?.id === enq.id;
            return (
              <div
                key={enq.id}
                onClick={() => handleSelect(enq)}
                style={{
                  padding: 16,
                  borderRadius: 12,
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                  border: isSelected ? '1px solid var(--primary)' : '1px solid transparent',
                  backgroundColor: isSelected ? 'var(--bg-subtle)' : 'transparent',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: '0.75rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    {!enq.read && (
                      <span style={{ height: 8, width: 8, borderRadius: '50%', backgroundColor: 'var(--danger)' }} />
                    )}
                    <span>{enq.name}</span>
                  </span>
                  <span style={{ fontSize: '0.625rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                    {formatDate(enq.createdAt)}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <Badge
                    size="sm"
                    variant={enq.type === 'quote' ? 'info' : 'secondary'}
                  >
                    {enq.type === 'quote' ? 'Structured Quote' : 'Contact Message'}
                  </Badge>
                  {enq.budget && (
                    <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                      {enq.budget}
                    </span>
                  )}
                </div>

                <p
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    margin: 0,
                    lineHeight: 1.5,
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {enq.message}
                </p>
              </div>
            );
          })}
        </div>

        {/* Enquiry Detail Column */}
        <div>
          {selectedEnquiry ? (
            <div
              style={{
                borderRadius: 24,
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-card)',
                padding: 32,
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid var(--border)',
                  paddingBottom: 24,
                }}
              >
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
                    {selectedEnquiry.name}
                  </h2>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12, fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
                    <span>{selectedEnquiry.email}</span>
                    {selectedEnquiry.phone && <span>&bull; {selectedEnquiry.phone}</span>}
                    <span>&bull; {formatDate(selectedEnquiry.createdAt)}</span>
                  </div>
                </div>

                {/* Status Switcher */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <button
                    type="button"
                    onClick={() => handleStatusChange('replied')}
                    style={{
                      padding: '4px 12px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      borderRadius: 8,
                      cursor: 'pointer',
                      border: 'none',
                      backgroundColor: selectedEnquiry.status === 'replied' ? 'var(--accent)' : 'var(--bg-elevated)',
                      color: selectedEnquiry.status === 'replied' ? '#ffffff' : 'var(--text-muted)',
                    }}
                  >
                    Replied
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusChange('converted')}
                    style={{
                      padding: '4px 12px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      borderRadius: 8,
                      cursor: 'pointer',
                      border: 'none',
                      backgroundColor: selectedEnquiry.status === 'converted' ? 'var(--success)' : 'var(--bg-elevated)',
                      color: selectedEnquiry.status === 'converted' ? '#ffffff' : 'var(--text-muted)',
                    }}
                  >
                    Converted
                  </button>
                </div>
              </div>

              {/* Scope & Budget Pills */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 16,
                  padding: 16,
                  borderRadius: 16,
                  backgroundColor: 'var(--bg-subtle)',
                  fontSize: '0.75rem',
                }}
              >
                <div>
                  <span style={{ color: 'var(--text-dim)', fontWeight: 600, textTransform: 'uppercase' }}>Interested Service:</span>
                  <p style={{ fontWeight: 600, color: 'var(--text-main)', margin: '2px 0 0 0' }}>
                    {selectedEnquiry.service || 'General Invoicing / Web'}
                  </p>
                </div>
                <div>
                  <span style={{ color: 'var(--text-dim)', fontWeight: 600, textTransform: 'uppercase' }}>Stated Budget:</span>
                  <p style={{ fontWeight: 600, color: 'var(--text-main)', margin: '2px 0 0 0' }}>
                    {selectedEnquiry.budget || 'Not specified'}
                  </p>
                </div>
              </div>

              {/* Message Body */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <h4 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-dim)', margin: 0 }}>
                  Message Content:
                </h4>
                <div
                  style={{
                    padding: 20,
                    borderRadius: 16,
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--bg-card)',
                    fontSize: '0.875rem',
                    lineHeight: 1.6,
                    color: 'var(--text-main)',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {selectedEnquiry.message}
                </div>
              </div>

              {/* Action Bar */}
              <div
                style={{
                  paddingTop: 16,
                  borderTop: '1px solid var(--border)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                }}
              >
                <a
                  href={`mailto:${selectedEnquiry.email}?subject=${encodeURIComponent(
                    `Re: Your project enquiry with Pitech`
                  )}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    borderRadius: 10,
                    backgroundColor: 'var(--text-main)',
                    color: 'var(--bg)',
                    padding: '10px 16px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  <Mail size={14} />
                  <span>Reply by Direct Email</span>
                </a>

                <Link
                  href={`/admin/invoices/new?email=${encodeURIComponent(selectedEnquiry.email)}&name=${encodeURIComponent(selectedEnquiry.name)}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Button variant="outline" size="sm">
                    Convert to Client &amp; Invoice &rarr;
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.875rem' }}>
              Select an enquiry to view full details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
