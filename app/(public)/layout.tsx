import React from 'react';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { AgentViewProvider } from '@/components/public/AgentViewContext';
import { AgentViewHost } from '@/components/public/AgentViewHost';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AgentViewProvider>
      <div
        style={{
          display: 'flex',
          minHeight: '100vh',
          flexDirection: 'column',
          backgroundColor: 'var(--bg)',
          color: 'var(--text-main)',
        }}
      >
        <Navbar />
        <main style={{ width: '100%', paddingTop: '72px' }}>
          <AgentViewHost>{children}</AgentViewHost>
        </main>
        <Footer />
      </div>
    </AgentViewProvider>
  );
}
