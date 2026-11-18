import React from 'react';

export const metadata = {
  title: 'Privacy Policy | Pitech',
  description: 'Privacy Policy for Pitech Digital Solutions Ltd.',
};

export default function PrivacyPage() {
  return (
    <div style={{ padding: '64px 20px' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h1
          style={{
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: 'var(--text-main)',
            margin: 0,
          }}
        >
          Privacy Policy
        </h1>
        <p style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', margin: 0 }}>
          Last Updated: February 2026 &bull; Pitech Digital Solutions Ltd
        </p>

        <div style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ margin: 0 }}>
            At Pitech (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), we take your privacy seriously. This document outlines what information we collect when you visit our website, submit project briefs, or engage with our invoicing and payment link services.
          </p>

          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)', margin: '12px 0 0 0' }}>1. Information We Collect</h3>
          <p style={{ margin: 0 }}>
            When you complete an enquiry, submit a quote brief, or interact with an invoice, we may collect your name, business email, phone number, billing address, and project requirements. When you settle an invoice via third-party checkout gateways (e.g. Stripe, Paystack), all card data is transmitted directly to the PCI-compliant payment gateway. We never store credit or debit card numbers on our servers.
          </p>

          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)', margin: '12px 0 0 0' }}>2. How We Use Information</h3>
          <p style={{ margin: 0 }}>
            Information collected is strictly utilized to respond to your technical requests, prepare scopes of work, generate tokenized client invoices, and communicate milestone updates. We do not sell or monetize personal data to third parties.
          </p>

          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)', margin: '12px 0 0 0' }}>3. Invoicing and Tokenized Pages</h3>
          <p style={{ margin: 0 }}>
            Invoice and payment links generated through Pitech Billing utilize cryptographically random, unguessable tokens. Only parties possessing the secure token URL may view or settle the specified invoice amount.
          </p>

          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)', margin: '12px 0 0 0' }}>4. Contact</h3>
          <p style={{ margin: 0 }}>
            If you have questions regarding data privacy or wish to request data deletion, contact us at <a href="mailto:privacy@pitech.dev" style={{ color: 'var(--text-main)', textDecoration: 'underline' }}>privacy@pitech.dev</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
