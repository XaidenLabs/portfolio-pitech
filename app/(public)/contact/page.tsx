'use client';

import React, { useState } from 'react';
import { Mail, MapPin, WhatsApp, CheckCircle, ArrowRight } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Input, Select, Textarea } from '@/components/ui/input';
import { submitEnquiry } from '@/lib/api/enquiries';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Bespoke Web Applications',
    budget: '$5,000 - $10,000',
    message: '',
    honeypot: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const services = [
    'Bespoke Web Applications',
    'UI/UX Design Systems & Audits',
    'Payment & Billing Integrations',
    'MVP Acceleration Sprint',
    'Technical Advisory / Architecture Consultation',
  ];

  const budgets = [
    'Under $2,500',
    '$2,500 - $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000+',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return;

    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in your name, email, and message.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await submitEnquiry({
        type: 'contact',
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        service: formData.service,
        budget: formData.budget,
        message: formData.message,
      });
      setSubmitted(true);
    } catch {
      setError('Failed to send enquiry. Please try again or message via WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <section
        style={{
          padding: '48px 20px 40px',
          borderBottom: '1px solid var(--border)',
          backgroundColor: 'var(--bg-subtle)',
        }}
      >
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <p
            style={{
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--text-muted)',
              marginBottom: '6px',
              margin: '0 0 6px 0',
            }}
          >
            Let&apos;s Connect
          </p>
          <h1
            style={{
              fontSize: 'clamp(28px, 4.5vw, 44px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--text-main)',
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            Initiate a project or schedule an engineering consultation.
          </h1>
          <p
            style={{
              marginTop: '12px',
              fontSize: '15px',
              color: 'var(--text-muted)',
              maxWidth: '600px',
              lineHeight: 1.6,
            }}
          >
            We respond to every qualified enquiry within 24 business hours with an initial technical assessment.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: '64px 20px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '40px',
            }}
          >
            {/* Direct Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)', margin: '0 0 6px 0' }}>
                  Direct Channels
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                  Prefer direct communication? Reach out via WhatsApp or email directly.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a
                  href="mailto:contact@pitech.dev"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--bg-card)',
                    textDecoration: 'none',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      height: '38px',
                      width: '38px',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-elevated)',
                      color: 'var(--text-main)',
                    }}
                  >
                    <Mail size={18} />
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', color: 'var(--text-dim)', margin: 0 }}>Email Enquiries</p>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', margin: '2px 0 0 0' }}>contact@pitech.dev</p>
                  </div>
                </a>

                <a
                  href="https://wa.me/2348012345678"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--bg-card)',
                    textDecoration: 'none',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      height: '38px',
                      width: '38px',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--success-bg)',
                      color: 'var(--success)',
                    }}
                  >
                    <WhatsApp size={18} />
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', color: 'var(--text-dim)', margin: 0 }}>WhatsApp Instant</p>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--success)', margin: '2px 0 0 0' }}>+234 801 234 5678</p>
                  </div>
                </a>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--bg-card)',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      height: '38px',
                      width: '38px',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-elevated)',
                      color: 'var(--text-main)',
                    }}
                  >
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', color: 'var(--text-dim)', margin: 0 }}>Operating Locations</p>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', margin: '2px 0 0 0' }}>Lagos &bull; London &bull; Remote</p>
                  </div>
                </div>
              </div>

              <div
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--bg-subtle)',
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                }}
              >
                <p style={{ fontWeight: 600, color: 'var(--text-main)', margin: '0 0 4px 0' }}>Working Hours &amp; SLA:</p>
                <p style={{ margin: 0 }}>Monday &ndash; Friday, 9:00 AM &ndash; 6:00 PM (WAT / GMT+1)</p>
                <p style={{ margin: '2px 0 0 0' }}>Emergency support available 24/7 for SLA retainer clients.</p>
              </div>
            </div>

            {/* Form */}
            <div
              style={{
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-card)',
                padding: '28px',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '36px 16px' }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      height: '56px',
                      width: '56px',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      backgroundColor: 'var(--success-bg)',
                      color: 'var(--success)',
                      marginBottom: '16px',
                    }}
                  >
                    <CheckCircle size={32} />
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-main)', margin: '0 0 8px 0' }}>
                    Enquiry Received
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 24px 0' }}>
                    Thank you, {formData.name}. Our principal architect will review your project requirements and respond within 24 business hours.
                  </p>
                  <Button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        service: services[0],
                        budget: budgets[1],
                        message: '',
                        honeypot: '',
                      });
                    }}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)', margin: '0 0 16px 0' }}>
                    Project Consultation Form
                  </h3>

                  {error && (
                    <div
                      style={{
                        padding: '12px 14px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--danger-bg)',
                        color: 'var(--danger)',
                        fontSize: '12px',
                        marginBottom: '16px',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                      }}
                    >
                      {error}
                    </div>
                  )}

                  {/* Honeypot hidden input */}
                  <input
                    type="text"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <Input
                    label="Your Name *"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />

                  <Input
                    label="Work Email *"
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />

                  <Input
                    label="Phone / WhatsApp (Optional)"
                    placeholder="+234 or +44..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />

                  <Select
                    label="Service Needed"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    options={services.map((s) => ({ label: s, value: s }))}
                  />

                  <Select
                    label="Estimated Budget Range"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    options={budgets.map((b) => ({ label: b, value: b }))}
                  />

                  <Textarea
                    label="Project Scope &amp; Details *"
                    required
                    rows={4}
                    placeholder="Describe your product vision, timeline, target users, or current bottlenecks..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />

                  <Button
                    type="submit"
                    isLoading={loading}
                    style={{ width: '100%', marginTop: '8px' }}
                  >
                    <span>Submit Project Brief</span>
                    <ArrowRight size={14} />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
