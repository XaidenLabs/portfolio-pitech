'use client';

import React, { useState } from 'react';
import { Send, Sparkles } from '../ui/icons';

export function AskMeAnything() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);

  const presets = [
    {
      q: 'Are you available for new projects?',
      a: 'Yes, I am currently taking on select client engagements and systems architecture contracts for Q1/Q2 2026. You can reach out directly via contact@pitech.dev or book an intro call.',
    },
    {
      q: 'What is your core tech stack?',
      a: 'Next.js 16 (App Router), React 19, TypeScript, PostgreSQL, Tailwind/CSS variables, Node.js, and multi-currency billing engines with Paystack & Stripe.',
    },
    {
      q: 'Do you work remotely with international teams?',
      a: 'Yes! Over 80% of my clients are based in the UK, United States, and Europe, operating on overlapping timezone sprints with asynchronous communication.',
    },
  ];

  const handleAsk = (text?: string) => {
    const qText = text || query;
    if (!qText.trim()) return;

    const matched = presets.find((p) =>
      p.q.toLowerCase().includes(qText.toLowerCase()) || qText.toLowerCase().includes('rate') || qText.toLowerCase().includes('avail')
    );

    if (matched) {
      setResponse(matched.a);
    } else {
      setResponse(
        `Thanks for asking! I specialize in full-stack technical product design, scalable component libraries, and custom multi-currency invoicing systems. Feel free to shoot me an email at contact@pitech.dev with your specific requirements.`
      );
    }
  };

  return (
    <section
      style={{
        padding: '32px 20px 64px',
        maxWidth: 780,
        margin: '0 auto',
        width: '100%',
        textAlign: 'center',
      }}
    >
      <div style={{ marginBottom: 28 }}>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: 'var(--text-main)',
            margin: '0 0 6px 0',
          }}
        >
          Ask me anything...
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
          Direct AI prompt interface to ask about my engineering background, rates, and availability.
        </p>
      </div>

      {/* Iridescent Glowing Input Box */}
      <div
        style={{
          position: 'relative',
          borderRadius: 24,
          padding: 2,
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.4), rgba(236, 72, 153, 0.4), rgba(59, 130, 246, 0.4))',
          boxShadow: '0 4px 20px rgba(99, 102, 241, 0.1)',
        }}
      >
        <div
          style={{
            borderRadius: 22,
            backgroundColor: 'var(--bg-card)',
            padding: '8px 14px 8px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <Sparkles size={18} style={{ color: 'var(--text-dim)', flexShrink: 0 }} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            placeholder="Ask anything about my experience, stack, or availability..."
            style={{
              width: '100%',
              border: 'none',
              background: 'transparent',
              fontSize: '13px',
              color: 'var(--text-main)',
              outline: 'none',
            }}
          />
          <button
            type="button"
            onClick={() => handleAsk()}
            aria-label="Submit question"
            style={{
              height: 36,
              width: 36,
              borderRadius: '50%',
              backgroundColor: 'var(--text-main)',
              color: 'var(--bg)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Send size={14} />
          </button>
        </div>
      </div>

      {/* Quick Prompt Chips */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          marginTop: 16,
        }}
      >
        {presets.map((p, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setQuery(p.q);
              handleAsk(p.q);
            }}
            style={{
              borderRadius: 'var(--radius-full)',
              padding: '5px 12px',
              fontSize: '11px',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-subtle)',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              transition: 'color 150ms ease, border-color 150ms ease',
            }}
          >
            {p.q}
          </button>
        ))}
      </div>

      {/* Response Box */}
      {response && (
        <div
          style={{
            marginTop: 20,
            borderRadius: 16,
            border: '1px solid var(--border)',
            backgroundColor: 'var(--bg-card)',
            padding: 20,
            textAlign: 'left',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, color: 'var(--accent)', fontSize: '11px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
            <Sparkles size={13} />
            <span>AI RESPONSE</span>
          </div>
          <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--text-main)', margin: 0 }}>
            {response}
          </p>
        </div>
      )}
    </section>
  );
}
