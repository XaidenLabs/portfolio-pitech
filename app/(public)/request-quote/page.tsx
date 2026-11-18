'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Input, Select, Textarea } from '@/components/ui/input';
import { submitEnquiry } from '@/lib/api/enquiries';

export default function RequestQuotePage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectType: 'Web Application (Next.js)',
    features: [] as string[],
    timeline: '1 - 2 Months',
    budget: '$5,000 - $10,000',
    references: '',
    name: '',
    email: '',
    company: '',
    phone: '',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const featureOptions = [
    'User Authentication & Roles',
    'Payment Gateway Integration (Paystack / Stripe)',
    'Automated Invoice & Receipt Generation',
    'Real-time Notifications / WebSockets',
    'Custom CMS & Admin Control Panel',
    'Multi-language / Multi-Currency',
    'Mobile Responsive PWA',
    'Search & Filtering Architecture',
  ];

  const toggleFeature = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const handleFinish = async () => {
    setLoading(true);
    try {
      const summaryMessage = `
PROJECT QUOTE BRIEF:
Type: ${formData.projectType}
Timeline: ${formData.timeline}
Budget: ${formData.budget}
Selected Features: ${formData.features.join(', ') || 'None selected'}
Reference Links: ${formData.references || 'None'}
Company: ${formData.company || 'N/A'}
Notes: ${formData.notes || 'None'}
      `.trim();

      await submitEnquiry({
        type: 'quote',
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        service: formData.projectType,
        budget: formData.budget,
        message: summaryMessage,
      });

      setSubmitted(true);
    } catch {
      alert('Could not submit quote. Please email contact@pitech.dev directly.');
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
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <Link
            href="/services"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              color: 'var(--text-muted)',
              textDecoration: 'none',
              marginBottom: '16px',
            }}
          >
            <ArrowLeft size={13} />
            <span>Back to Services</span>
          </Link>
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
            Structured Scoping
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
            Interactive Project Quote Generator
          </h1>
          <p
            style={{
              marginTop: '12px',
              fontSize: '15px',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
            }}
          >
            Configure your technical requirements to receive a detailed breakdown of scope, architecture, and timeline estimates.
          </p>
        </div>
      </section>

      {/* Main Scoper Form */}
      <section style={{ padding: '64px 20px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          {submitted ? (
            <div
              style={{
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-card)',
                padding: '48px 24px',
                textAlign: 'center',
                boxShadow: 'var(--shadow-md)',
              }}
            >
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
              <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-main)', margin: '0 0 8px 0' }}>
                Quote Request Dispatched
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '480px', margin: '0 auto 24px' }}>
                Thank you, {formData.name}. We will analyze your feature set and provide an architectural breakdown and proposal within 24 hours.
              </p>
              <Link href="/" style={{ textDecoration: 'none' }}>
                <Button>Return to Home</Button>
              </Link>
            </div>
          ) : (
            <div
              style={{
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-card)',
                padding: '32px',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              {/* Stepper Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '20px',
                  borderBottom: '1px solid var(--border)',
                  marginBottom: '28px',
                }}
              >
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                  Step {step} of 3
                </span>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-main)' }}>
                  {step === 1 && 'Platform & Features'}
                  {step === 2 && 'Timeline & Budget'}
                  {step === 3 && 'Contact & Proposal Delivery'}
                </span>
              </div>

              {/* Step 1: Platform & Features */}
              {step === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <Select
                    label="Platform Type"
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    options={[
                      { label: 'Web Application (Next.js & TypeScript)', value: 'Web Application (Next.js)' },
                      { label: 'Design System & Component Library (Figma)', value: 'Design System & Figma' },
                      { label: 'Fintech Billing & Paystack/Stripe Engine', value: 'Billing Engine & Payments' },
                      { label: 'Full MVP Architecture (From 0 to 1)', value: 'Full MVP Architecture' },
                      { label: 'Performance Audit & Re-Architecture', value: 'Performance Audit' },
                    ]}
                  />

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '10px' }}>
                      Required Capabilities (Select all that apply):
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '8px' }}>
                      {featureOptions.map((feat) => {
                        const isChecked = formData.features.includes(feat);
                        return (
                          <button
                            key={feat}
                            type="button"
                            onClick={() => toggleFeature(feat)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              padding: '10px 14px',
                              borderRadius: 'var(--radius-md)',
                              border: isChecked ? '1px solid var(--primary)' : '1px solid var(--border)',
                              backgroundColor: isChecked ? 'var(--bg-elevated)' : 'transparent',
                              color: isChecked ? 'var(--text-main)' : 'var(--text-muted)',
                              fontSize: '12px',
                              textAlign: 'left',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease',
                            }}
                          >
                            <span
                              style={{
                                height: '14px',
                                width: '14px',
                                borderRadius: '4px',
                                border: isChecked ? '1px solid var(--primary)' : '1px solid var(--border)',
                                backgroundColor: isChecked ? 'var(--primary)' : 'transparent',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--primary-text)',
                                fontSize: '10px',
                                flexShrink: 0,
                              }}
                            >
                              {isChecked ? '✓' : ''}
                            </span>
                            <span>{feat}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '16px' }}>
                    <Button onClick={() => setStep(2)}>
                      <span>Next: Timeline &amp; Budget</span>
                      <ArrowRight size={14} />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Timeline & Budget */}
              {step === 2 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <Select
                    label="Desired Timeline"
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    options={[
                      { label: 'Rush Sprint (< 1 Month)', value: '< 1 Month' },
                      { label: 'Standard Delivery (1 - 2 Months)', value: '1 - 2 Months' },
                      { label: 'Enterprise Roadmap (3 - 6 Months)', value: '3 - 6 Months' },
                      { label: 'Ongoing Architecture Retainer', value: 'Monthly Retainer' },
                    ]}
                  />

                  <Select
                    label="Allocated Budget"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    options={[
                      { label: '$2,500 - $5,000 USD', value: '$2,500 - $5,000' },
                      { label: '$5,000 - $10,000 USD', value: '$5,000 - $10,000' },
                      { label: '$10,000 - $25,000 USD', value: '$10,000 - $25,000' },
                      { label: '$25,000+ USD', value: '$25,000+' },
                    ]}
                  />

                  <Textarea
                    label="Design / Functional References (Optional)"
                    rows={3}
                    placeholder="Paste URLs to sites, Figma files, or products you admire..."
                    value={formData.references}
                    onChange={(e) => setFormData({ ...formData, references: e.target.value })}
                  />

                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '16px' }}>
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button onClick={() => setStep(3)}>
                      <span>Next: Contact Information</span>
                      <ArrowRight size={14} />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact Details */}
              {step === 3 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <Input
                    label="Your Full Name *"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />

                  <Input
                    label="Corporate Email *"
                    type="email"
                    required
                    placeholder="alex@enterprise.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />

                  <Input
                    label="Company / Project Name"
                    placeholder="e.g. Apex Global"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />

                  <Input
                    label="Phone / WhatsApp (Optional)"
                    placeholder="+234 or +44..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />

                  <Textarea
                    label="Additional Notes / Architecture Requirements"
                    rows={3}
                    placeholder="Any specific API constraints, hosting requirements, or compliance needs..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />

                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '16px' }}>
                    <Button variant="outline" onClick={() => setStep(2)}>
                      Back
                    </Button>
                    <Button
                      onClick={handleFinish}
                      isLoading={loading}
                      disabled={!formData.name || !formData.email}
                    >
                      <span>Submit Detailed Brief</span>
                      <ArrowRight size={14} />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
