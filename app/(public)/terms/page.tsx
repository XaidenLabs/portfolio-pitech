import React from 'react';

export const metadata = {
  title: 'Terms of Service | Pitech',
  description: 'Terms of Service and Master Engagement Agreement for Pitech Digital Solutions Ltd.',
};

export default function TermsPage() {
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
          Terms of Service
        </h1>
        <p style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', margin: 0 }}>
          Last Updated: February 2026 &bull; Pitech Digital Solutions Ltd
        </p>

        <div style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ margin: 0 }}>
            Welcome to Pitech. By accessing our website, engaging our design and engineering services, or settling invoices through our tokenized billing platform, you agree to these Terms of Service.
          </p>

          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)', margin: '12px 0 0 0' }}>1. Scope of Work &amp; Retainers</h3>
          <p style={{ margin: 0 }}>
            All professional engagements are governed by individual Scopes of Work (SOW), Project Briefs, or Retainer Schedules agreed upon in writing between the client and Pitech Digital Solutions Ltd.
          </p>

          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)', margin: '12px 0 0 0' }}>2. Invoices &amp; Payment Terms</h3>
          <p style={{ margin: 0 }}>
            Invoices issued via Pitech Billing are payable in the designated currency (typically USD or NGN) within the specified due period. Late payments exceeding 14 calendar days past the due date may be subject to a 5% monthly late settlement fee. Work delivered remains the intellectual property of Pitech until all invoice balances for the relevant milestone are settled in full.
          </p>

          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)', margin: '12px 0 0 0' }}>3. Intellectual Property Rights</h3>
          <p style={{ margin: 0 }}>
            Upon receipt of full payment for completed milestones, all custom codebase assets, Figma files, and project deliverables are transferred unconditionally to the client, excluding proprietary reusable utilities and open-source packages.
          </p>

          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)', margin: '12px 0 0 0' }}>4. Warranties &amp; Production Support</h3>
          <p style={{ margin: 0 }}>
            We warrant that deliverables will perform substantially in accordance with agreed specifications. Standard deliverables include a 30-day post-launch warranty window covering bug fixes and critical remediation at zero additional charge.
          </p>
        </div>
      </div>
    </div>
  );
}
