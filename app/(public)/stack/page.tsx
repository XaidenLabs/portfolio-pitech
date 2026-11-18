import React from 'react';
import { ArrowUpRight } from '@/components/ui/icons';
import { CtaBanner } from '@/components/public/CtaBanner';

export const metadata = {
  title: 'Stack & Tools | Pitech',
  description:
    'Detailed breakdown of the tools, frameworks, and cloud infrastructure used by Pitech across design, frontend, backend, payments, and AI.',
};

interface ToolItem {
  name: string;
  category: string;
  description: string;
  status: 'Daily Driver' | 'Production Core' | 'Standard' | 'Experimental';
  url?: string;
}

export default function StackPage() {
  const stackSections: { category: string; description: string; tools: ToolItem[] }[] = [
    {
      category: 'Design & Prototyping',
      description: 'Translating product strategy into cohesive design systems and micro-interactions.',
      tools: [
        {
          name: 'Figma',
          category: 'UI/UX & Design Tokens',
          description: 'Daily driver for vector design, component libraries, variable tokens, and client presentations.',
          status: 'Daily Driver',
          url: 'https://figma.com',
        },
        {
          name: 'Framer',
          category: 'Interactive Prototyping',
          description: 'Crafting high-fidelity prototypes, cinematic scroll interactions, and editorial showcases.',
          status: 'Production Core',
          url: 'https://framer.com',
        },
        {
          name: 'FigJam',
          category: 'Architecture & Journey Mapping',
          description: 'Information architecture, user flow diagrams, and collaborative database schema workshops.',
          status: 'Standard',
          url: 'https://figma.com/figjam',
        },
        {
          name: 'Penpot',
          category: 'Open-Source Design',
          description: 'Open web standards vector exploration and automated CSS grid prototyping.',
          status: 'Experimental',
          url: 'https://penpot.app',
        },
      ],
    },
    {
      category: 'Frontend Engineering',
      description: 'Building ultra-fast, accessible, and type-safe user interfaces with modern React paradigms.',
      tools: [
        {
          name: 'Next.js 16',
          category: 'React Application Framework',
          description: 'App Router, Partial Prerendering (PPR), Server Actions, and edge runtime optimization.',
          status: 'Production Core',
          url: 'https://nextjs.org',
        },
        {
          name: 'React 19',
          category: 'UI Library',
          description: 'Utilizing Server Components, optimistic mutations, and native form actions with zero client bloat.',
          status: 'Production Core',
          url: 'https://react.dev',
        },
        {
          name: 'TypeScript',
          category: 'Typed JavaScript',
          description: 'Strict mode end-to-end typing from database models to frontend components with Zod schema validation.',
          status: 'Daily Driver',
          url: 'https://typescriptlang.org',
        },
        {
          name: 'Inline CSS & Variables',
          category: 'Component-Level Styling',
          description: 'Zero external CSS runtime, pure typed inline style objects with automatic CSS variable light/dark theming.',
          status: 'Daily Driver',
        },
        {
          name: 'Framer Motion',
          category: 'Animation Engine',
          description: 'Physics-based spring animations, layout transitions, and fluid gesture interactions.',
          status: 'Standard',
          url: 'https://framer.com/motion',
        },
      ],
    },
    {
      category: 'Backend & Database Systems',
      description: 'High-throughput APIs, relational persistence, and event-driven architectures.',
      tools: [
        {
          name: 'Node.js & Bun',
          category: 'JavaScript Runtimes',
          description: 'High-speed package execution, serverless route handlers, and streaming edge responses.',
          status: 'Production Core',
        },
        {
          name: 'PostgreSQL',
          category: 'Relational Database',
          description: 'Battle-tested ACID transactions, JSONB indexing, and rock-solid relational consistency.',
          status: 'Production Core',
        },
        {
          name: 'Prisma & Drizzle ORM',
          category: 'Database Tooling',
          description: 'Type-safe database migrations, declarative schema definitions, and high-performance querying.',
          status: 'Daily Driver',
        },
        {
          name: 'Redis / Upstash',
          category: 'In-Memory Cache',
          description: 'Sub-millisecond session caching, distributed locks, and API rate-limiting.',
          status: 'Standard',
        },
      ],
    },
    {
      category: 'Payments, Fintech & Billing',
      description: 'Multi-currency invoicing, cross-border payment gateways, and automated reconciliation.',
      tools: [
        {
          name: 'Paystack API',
          category: 'African Gateway (NGN)',
          description: 'Direct debit, bank transfer virtual accounts, and automated webhook settlement orchestration.',
          status: 'Production Core',
          url: 'https://paystack.com',
        },
        {
          name: 'Stripe',
          category: 'Global Gateway (USD / EUR / GBP)',
          description: 'International card billing, subscription checkout sessions, and multi-currency payouts.',
          status: 'Production Core',
          url: 'https://stripe.com',
        },
        {
          name: 'Tokenized Billing Portal',
          category: 'Proprietary System',
          description: 'Secure tokenized invoice links allowing clients to review, download PDF receipts, and settle without sign-in.',
          status: 'Production Core',
        },
      ],
    },
    {
      category: 'AI & Autonomous Workflows',
      description: 'Leveraging frontier LLMs to accelerate engineering pipelines and synthesize knowledge.',
      tools: [
        {
          name: 'Gemini 2.0 API',
          category: 'Multimodal Frontier LLM',
          description: 'High-throughput reasoning, structured schema extraction, and fast document analysis.',
          status: 'Production Core',
        },
        {
          name: 'Anthropic Claude',
          category: 'Advanced Reasoning & Code',
          description: 'Complex architecture synthesis, code audits, and nuanced technical writing.',
          status: 'Daily Driver',
        },
        {
          name: 'Vercel AI SDK',
          category: 'Agent & Streaming Library',
          description: 'Streaming text and UI responses, tool-calling agents, and structured outputs in Next.js.',
          status: 'Standard',
        },
      ],
    },
    {
      category: 'Infrastructure & DevOps',
      description: 'Continuous integration, edge deployments, and enterprise monitoring.',
      tools: [
        {
          name: 'Vercel Enterprise',
          category: 'Edge Platform',
          description: 'Instant preview deployments, edge caching, and serverless compute with global CDN.',
          status: 'Production Core',
        },
        {
          name: 'Docker',
          category: 'Containerization',
          description: 'Reproducible multi-stage container builds for testing, local parity, and cloud deployment.',
          status: 'Standard',
        },
        {
          name: 'GitHub Actions',
          category: 'CI / CD Pipelines',
          description: 'Automated type checking, linting, unit testing, and zero-downtime deployment workflows.',
          status: 'Daily Driver',
        },
      ],
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Header section */}
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
            Tooling &amp; Infrastructure
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
            Production Stack &amp; Technologies
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
            The software, frameworks, databases, and deployment platforms engineered into our client products and internal digital systems.
          </p>
        </div>
      </section>

      {/* Main Stack Groups */}
      <section style={{ padding: '64px 20px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '56px' }}>
          {stackSections.map((section) => (
            <div key={section.category}>
              <div style={{ marginBottom: '20px' }}>
                <h2
                  style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    letterSpacing: '-0.01em',
                    color: 'var(--text-main)',
                    margin: 0,
                  }}
                >
                  {section.category}
                </h2>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px', margin: '4px 0 0 0' }}>
                  {section.description}
                </p>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '16px',
                }}
              >
                {section.tools.map((tool) => (
                  <div
                    key={tool.name}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      padding: '20px',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--border)',
                      backgroundColor: 'var(--bg-card)',
                      boxShadow: 'var(--shadow-sm)',
                      boxSizing: 'border-box',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          justifyContent: 'space-between',
                          gap: '12px',
                          marginBottom: '6px',
                        }}
                      >
                        <h3
                          style={{
                            fontSize: '15px',
                            fontWeight: 700,
                            color: 'var(--text-main)',
                            margin: 0,
                          }}
                        >
                          {tool.name}
                        </h3>
                        <span
                          style={{
                            borderRadius: 'var(--radius-full)',
                            padding: '2px 8px',
                            fontSize: '10px',
                            fontFamily: 'var(--font-mono)',
                            fontWeight: 600,
                            backgroundColor:
                              tool.status === 'Production Core'
                                ? 'var(--success-bg)'
                                : 'var(--bg-elevated)',
                            color:
                              tool.status === 'Production Core'
                                ? 'var(--success)'
                                : 'var(--text-muted)',
                            border: '1px solid var(--border)',
                          }}
                        >
                          {tool.status}
                        </span>
                      </div>
                      <p
                        style={{
                          fontSize: '11px',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--text-dim)',
                          marginBottom: '8px',
                          margin: '0 0 8px 0',
                        }}
                      >
                        {tool.category}
                      </p>
                      <p
                        style={{
                          fontSize: '13px',
                          color: 'var(--text-muted)',
                          lineHeight: 1.5,
                          margin: 0,
                        }}
                      >
                        {tool.description}
                      </p>
                    </div>

                    {tool.url && (
                      <div
                        style={{
                          marginTop: '16px',
                          paddingTop: '12px',
                          borderTop: '1px solid var(--border)',
                        }}
                      >
                        <a
                          href={tool.url}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '11px',
                            fontFamily: 'var(--font-mono)',
                            fontWeight: 600,
                            color: 'var(--text-dim)',
                            textDecoration: 'none',
                          }}
                        >
                          <span>Official Documentation</span>
                          <ArrowUpRight size={11} />
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <CtaBanner />
    </div>
  );
}
