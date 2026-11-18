'use client';

import React from 'react';

export function TrustStrip() {
  const brandLogos = [
    {
      id: 'asterisk',
      name: 'Asterisk',
      render: () => (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="3" fill="currentColor" />
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
        </svg>
      ),
    },
    {
      id: 'hive',
      name: 'Hive',
      render: () => (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2">
          <ellipse cx="12" cy="13" rx="4" ry="6" />
          <path d="M12 7V4M10 4h4" />
          <path d="M8 10L4 7M16 10l4-3M8 14L4 16M16 14l4 2" />
        </svg>
      ),
    },
    {
      id: 'leaf',
      name: 'Sprout Labs',
      render: () => (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
        </svg>
      ),
    },
    {
      id: 'design',
      name: 'Decagon',
      render: () => (
        <span style={{ fontSize: '15px', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
          D
        </span>
      ),
    },
    {
      id: 'accent',
      name: 'Accent Systems',
      render: () => (
        <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '-0.02em', textTransform: 'lowercase' }}>
          accent
        </span>
      ),
    },
    {
      id: 'lg',
      name: 'LG Electronics',
      render: () => (
        <span style={{ fontSize: '16px', fontWeight: 900, letterSpacing: '-0.04em' }}>
          LG
        </span>
      ),
    },
  ];

  return (
    <section
      style={{
        padding: '24px 20px 48px',
        maxWidth: 960,
        margin: '0 auto',
        width: '100%',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          fontSize: '11px',
          fontFamily: 'var(--font-mono)',
          fontWeight: 500,
          color: 'var(--text-dim)',
          marginBottom: 16,
          margin: '0 0 16px 0',
        }}
      >
        companies I&apos;ve worked with or for
      </p>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        {brandLogos.map((brand) => (
          <div
            key={brand.id}
            title={brand.name}
            style={{
              height: 52,
              width: 52,
              borderRadius: '50%',
              backgroundColor: 'var(--text-main)',
              color: 'var(--bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-sm)',
              transition: 'transform 150ms ease',
            }}
          >
            {brand.render()}
          </div>
        ))}
      </div>
    </section>
  );
}
