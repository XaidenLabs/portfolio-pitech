'use client';

import React from 'react';
import HalftoneWordmarkFooter from '@/components/ui/halftone-wordmark-footer';

export default function FooterDemoPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', backgroundColor: 'var(--bg)' }}>
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px' }}>Pitech Halftone Wordmark Footer</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          Move your mouse over the wordmark to interact with physics springs. Click to emit shock rings.
        </p>
      </div>
      <div style={{ width: '100%' }}>
        <HalftoneWordmarkFooter
          wordmark="pitech"
          label="Pitech Digital"
          meta="©2026 · Lagos / London / Worldwide"
          preset="night"
          palette={{
            background: "#141416",
            ink: "#FAF7F0",
            warm: "#FF9E00",
          }}
          height="560px"
          backToTop={true}
          dotGap={6}
          radius={85}
          crop={0.2}
          grain={0.4}
        />
      </div>
    </main>
  );
}
