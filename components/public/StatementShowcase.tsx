'use client';

import React from 'react';

export function StatementShowcase() {
  return (
    <section
      style={{
        padding: '32px 20px 80px',
        maxWidth: 1040,
        margin: '0 auto',
        width: '100%',
      }}
    >
      {/* Statement Headline */}
      <div style={{ maxWidth: 780, marginBottom: 40 }}>
        <h2
          style={{
            fontSize: 'clamp(24px, 3.2vw, 34px)',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            color: 'var(--text-main)',
            lineHeight: 1.3,
            margin: 0,
          }}
        >
          Designed components and products directly rooted in user discovery; bridging raw customer insights with intuitive UI/UX and core functional requirements.
        </h2>
      </div>

      {/* Floating UI Showcase Composition */}
      <div
        style={{
          borderRadius: 24,
          border: '1px solid var(--border)',
          backgroundColor: 'var(--bg-subtle)',
          padding: '36px 24px',
          boxShadow: 'var(--shadow-sm)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
            gap: 20,
            alignItems: 'start',
          }}
        >
          {/* Mockup 1: Mobile Phone Invoice Receipt */}
          <div
            style={{
              borderRadius: 20,
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-card)',
              padding: 20,
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: 10 }}>
              <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-muted)' }}>
                RECEIPT #INV-2026-08
              </span>
              <span
                style={{
                  fontSize: '9px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  color: 'var(--success)',
                  backgroundColor: 'var(--success-bg)',
                  padding: '2px 6px',
                  borderRadius: 4,
                }}
              >
                PAID
              </span>
            </div>

            <div>
              <span style={{ fontSize: '10px', color: 'var(--text-dim)' }}>Total Amount</span>
              <p style={{ fontSize: '20px', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-main)', margin: '2px 0 0 0' }}>
                $3,500.00
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '11px', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Architecture Sprint</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>$2,500.00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Staging Deployment</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>$1,000.00</span>
              </div>
            </div>

            {/* Faux Barcode */}
            <div style={{ paddingTop: 8, borderTop: '1px dashed var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ display: 'flex', gap: 3, height: 20, opacity: 0.6 }}>
                {[3, 1, 4, 2, 1, 3, 2, 4, 1, 3, 1, 2, 4, 2, 1].map((w, i) => (
                  <div key={i} style={{ width: w * 2, height: '100%', backgroundColor: 'var(--text-main)' }} />
                ))}
              </div>
              <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>
                pitech_token_auth_verified
              </span>
            </div>
          </div>

          {/* Column 2: Circular Gauge & Particle Globe */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Circular Gauge */}
            <div
              style={{
                borderRadius: 20,
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-card)',
                padding: 20,
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <div style={{ position: 'relative', width: 68, height: 68, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="var(--border)"
                    strokeWidth="3.5"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="var(--text-main)"
                    strokeWidth="3.5"
                    strokeDasharray="72, 100"
                    strokeLinecap="round"
                  />
                </svg>
                <span style={{ position: 'absolute', fontSize: '15px', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-main)' }}>
                  72%
                </span>
              </div>
              <div>
                <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
                  Token Parity Rate
                </p>
                <p style={{ fontSize: '10px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                  Figma to React pipeline sync
                </p>
              </div>
            </div>

            {/* Particle Globe / Node Wireframe */}
            <div
              style={{
                borderRadius: 20,
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-card)',
                padding: 16,
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 120,
              }}
            >
              <svg viewBox="0 0 100 100" style={{ width: 84, height: 84, opacity: 0.85 }}>
                <circle cx="50" cy="50" r="40" fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 3" />
                <ellipse cx="50" cy="50" rx="40" ry="16" fill="none" stroke="var(--border)" strokeWidth="1" />
                <ellipse cx="50" cy="50" rx="16" ry="40" fill="none" stroke="var(--border)" strokeWidth="1" />
                {/* Node dots */}
                <circle cx="50" cy="10" r="3" fill="var(--text-main)" />
                <circle cx="50" cy="90" r="3" fill="var(--text-main)" />
                <circle cx="10" cy="50" r="3" fill="var(--text-main)" />
                <circle cx="90" cy="50" r="3" fill="var(--text-main)" />
                <circle cx="35" cy="35" r="2.5" fill="var(--accent)" />
                <circle cx="65" cy="65" r="2.5" fill="var(--success)" />
                <circle cx="70" cy="30" r="2" fill="var(--text-main)" />
                <line x1="35" y1="35" x2="65" y2="65" stroke="var(--text-dim)" strokeWidth="0.8" />
                <line x1="50" y1="10" x2="35" y2="35" stroke="var(--text-dim)" strokeWidth="0.8" />
                <line x1="70" y1="30" x2="65" y2="65" stroke="var(--text-dim)" strokeWidth="0.8" />
              </svg>
            </div>
          </div>

          {/* Column 3: Revenue Chart & Candlestick Metrics */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Revenue Chart */}
            <div
              style={{
                borderRadius: 20,
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-card)',
                padding: 20,
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Revenue Velocity</span>
                <span
                  style={{
                    fontSize: '10px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    color: 'var(--success)',
                    backgroundColor: 'var(--success-bg)',
                    padding: '2px 6px',
                    borderRadius: 4,
                  }}
                >
                  +38.4%
                </span>
              </div>
              <p style={{ fontSize: '18px', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-main)', margin: 0 }}>
                $1,248,500
              </p>

              {/* Area SVG curve */}
              <svg viewBox="0 0 160 45" style={{ width: '100%', height: 45, overflow: 'visible' }}>
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--success)" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="var(--success)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 40 Q25 35, 45 28 T90 20 T130 10 T160 4 L160 45 L0 45 Z"
                  fill="url(#areaGrad)"
                />
                <path
                  d="M0 40 Q25 35, 45 28 T90 20 T130 10 T160 4"
                  fill="none"
                  stroke="var(--success)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Candlestick / Financial bars */}
            <div
              style={{
                borderRadius: 20,
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-card)',
                padding: 16,
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 48 }}>
                {[
                  { h: 22, up: true },
                  { h: 32, up: true },
                  { h: 16, up: false },
                  { h: 28, up: true },
                  { h: 40, up: true },
                  { h: 26, up: false },
                  { h: 44, up: true },
                  { h: 38, up: true },
                ].map((bar, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 12 }}>
                    <div style={{ width: 1, height: 4, backgroundColor: bar.up ? 'var(--success)' : 'var(--danger)' }} />
                    <div
                      style={{
                        width: '100%',
                        height: bar.h,
                        borderRadius: 2,
                        backgroundColor: bar.up ? 'var(--success)' : 'var(--danger)',
                        opacity: 0.9,
                      }}
                    />
                    <div style={{ width: 1, height: 4, backgroundColor: bar.up ? 'var(--success)' : 'var(--danger)' }} />
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-dim)', display: 'block' }}>Liquidity</span>
                <span style={{ fontSize: '13px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-main)' }}>
                  $4.2M vol
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
