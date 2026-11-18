'use client';

import React, { useState } from 'react';
import { useAgentView } from './AgentViewContext';
import { Check, Copy, Eye, Terminal } from '../ui/icons';

const RAW_MARKDOWN = `# PITECH
> Technical Product Designer & Systems Architect
> Status: Available for select contracts & enterprise advisory (Q1 2026)
> Location: Lagos, Nigeria & London, UK (Remote Worldwide)
> Contact: contact@pitech.dev | https://pitech.dev

---

## 1. Executive Summary
Pitech bridges the gap between high-fidelity product design and fault-tolerant software engineering. Specializing in Next.js 16 (App Router), React 19, TypeScript, and multi-currency billing infrastructures (Paystack, Stripe). Focused on building high-conversion interfaces, scalable design systems, and resilient enterprise applications.

---

## 2. Core Technical Stack

### Design & Systems
- Figma & FigJam (Master components, auto-layout, design tokens)
- Framer (Interactive prototypes & high-fidelity landing pages)
- Penpot & Design-to-Code pipelines (Automated token sync)
- WCAG 2.1 AA Accessibility Standards

### Frontend Engineering
- Next.js 16 (App Router, Server Actions, Partial Prerendering)
- React 19 (Server Components, Optimistic Updates, Actions)
- TypeScript (Strict mode, zod validation, end-to-end type safety)
- Clean CSS Variables & Inline Styling Architecture
- Framer Motion & Three.js / WebGL

### Backend & Infrastructure
- Node.js & Bun runtime
- PostgreSQL, Prisma ORM, Drizzle ORM
- Redis & Upstash (Caching & Rate-limiting)
- REST APIs, GraphQL, tRPC, Idempotent Webhooks
- Vercel Enterprise, Docker, AWS, GitHub Actions CI/CD

### Payments, Fintech & Ops
- Multi-currency billing architecture (NGN, USD, GBP, EUR)
- Gateway orchestration: Paystack API, Stripe Connect & Elements
- Tokenized client billing URLs with zero-login payment flow
- Automated PDF invoice and tax receipt generation

### AI & Automation
- Gemini 2.0 API, Anthropic Claude, OpenAI
- Vercel AI SDK & LangChain
- Autonomous agent workflows & design token generation

---

## 3. Selected Case Studies

### 01. Otera AI — Autonomous Design Systems & Token Pipeline
- **Role:** Product Designer & AI Systems Lead (2026)
- **Category:** AI & Systems
- **Stack:** Gemini 2.0, Next.js 16, TypeScript, Figma REST API
- **Problem:** Design systems teams spent 40% of their sprints manually copying design variables and creating boilerplate component code.
- **Solution:** Engineered an AI agent pipeline ingesting Figma tokens and generating WCAG-compliant TypeScript components with live preview sandboxes.
- **Results:** Reduced design-to-code cycle from 2 weeks to 18 minutes; adopted by 3,400+ frontend engineers.

### 02. Apex Global Freight & Fleet Telemetry Tracker
- **Role:** Lead Architect & Systems Engineer (2026)
- **Category:** Web Apps
- **Stack:** Next.js 16, TypeScript, Mapbox GL, WebSockets
- **Problem:** Siloed legacy software caused severe delays in shipment tracking and billing reconciliation.
- **Solution:** Real-time edge-rendered telemetry dashboard processing 50,000+ daily freight deliveries across West Africa.
- **Results:** 68% reduction in telemetry latency, 32% increase in turnaround velocity, zero downtime transition.

### 03. Pitech Multi-Currency Pay & Invoicing Engine
- **Role:** Lead Architect & Fullstack Developer (2026)
- **Category:** Fintech & Invoicing
- **Stack:** Next.js 16, Paystack, Stripe, TypeScript, PDF Generation
- **Problem:** Cross-border agencies lose up to 12% in FX conversion fees and suffer weeks of manual reconciliation.
- **Solution:** Tokenized client billing infrastructure supporting NGN/USD/GBP/EUR with dual payment gateways, partial payments, and instant receipts.
- **Results:** Zero payment leakage across $450k+ processed; average settlement under 4 hours.

### 04. Vanguard Patient Telehealth & Triage Platform
- **Role:** Full-Stack Frontend Developer (2025)
- **Category:** Web Apps (MedTech)
- **Stack:** React 19, Next.js, WebRTC, Zod
- **Problem:** Patients faced 45+ minute triage queues with unstable video streaming on low-bandwidth networks.
- **Solution:** Ultra-accessible consultation portal with instant WebRTC connections and digital prescription dispatch.
- **Results:** 120,000+ clinical sessions completed, 99.4% video stability, 4.9/5 patient satisfaction score.

---

## 4. Verification & Contact
- **Website:** https://pitech.dev
- **Email:** contact@pitech.dev
- **GitHub:** https://github.com/pitech
- **LinkedIn:** https://linkedin.com/in/pitech
- **Direct Invoice Demo:** https://pitech.dev/invoice/inv_live_demo_vanguard_02
- **Direct Payment Demo:** https://pitech.dev/pay/pay_demo_deposit_500
`;

export function AgentView() {
  const { isAgentView, toggleAgentView } = useAgentView();
  const [copied, setCopied] = useState(false);

  if (!isAgentView) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(RAW_MARKDOWN);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#09090b',
        color: '#f8fafc',
        fontFamily: 'var(--font-mono)',
        paddingBottom: '96px',
      }}
    >
      {/* Sticky Header Bar */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          borderBottom: '1px solid #1e293b',
          backgroundColor: 'rgba(9, 9, 11, 0.95)',
          backdropFilter: 'blur(10px)',
          padding: '12px 20px',
        }}
      >
        <div
          style={{
            maxWidth: '960px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                height: '8px',
                width: '8px',
                borderRadius: '50%',
                backgroundColor: '#34d399',
              }}
            />
            <Terminal size={15} style={{ color: '#34d399' }} />
            <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em' }}>
              AGENT VIEW (LLM-OPTIMIZED MARKDOWN)
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              onClick={handleCopy}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid #334155',
                backgroundColor: '#1e293b',
                color: '#f8fafc',
                padding: '6px 12px',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {copied ? (
                <>
                  <Check size={13} style={{ color: '#34d399' }} />
                  <span style={{ color: '#34d399' }}>Copied</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>Copy Markdown</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={toggleAgentView}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: '#f8fafc',
                color: '#09090b',
                padding: '6px 14px',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              <Eye size={13} />
              <span>Visual Mode</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '40px 20px' }}>
        <div
          style={{
            marginBottom: '28px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            backgroundColor: 'rgba(16, 185, 129, 0.08)',
            padding: '16px 20px',
            fontSize: '12px',
            color: '#34d399',
            lineHeight: 1.6,
          }}
        >
          <p style={{ fontWeight: 700, margin: 0, marginBottom: '4px' }}>
            🤖 Machine-Readable Markdown Mode Active
          </p>
          <p style={{ color: '#94a3b8', margin: 0 }}>
            Structured specifically for LLMs, agent scrapers, and prompt context injection.
          </p>
        </div>

        <div
          style={{
            borderRadius: 'var(--radius-lg)',
            border: '1px solid #1e293b',
            backgroundColor: '#111827',
            padding: '28px',
            boxShadow: 'var(--shadow-xl)',
          }}
        >
          <pre
            style={{
              whiteSpace: 'pre-wrap',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              color: '#e2e8f0',
              lineHeight: 1.7,
              margin: 0,
              userSelect: 'all',
            }}
          >
            {RAW_MARKDOWN}
          </pre>
        </div>
      </div>
    </div>
  );
}
