'use client';

import React, { useEffect, useState, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/admin/Sidebar';
import { TopBar } from '@/components/admin/TopBar';

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

function getSnapshot() {
  return localStorage.getItem('pitech_admin_session');
}

function getServerSnapshot() {
  return null;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const session = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('pitech_admin_session')) {
      router.replace('/admin-login');
    }
  }, [router, session]);

  if (!session) {
    return (
      <div
        style={{
          display: 'flex',
          height: '100vh',
          width: '100vw',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--bg)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              height: 32,
              width: 32,
              borderRadius: '50%',
              border: '3px solid var(--border)',
              borderTopColor: 'var(--primary)',
              animation: 'spin 0.8s linear infinite',
            }}
          />
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
            Verifying admin session...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-subtle)',
        color: 'var(--text-main)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'background-color 150ms ease',
      }}
    >
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div
        className="admin-main-content"
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          transition: 'padding-left 200ms ease',
        }}
      >
        <TopBar onToggleSidebar={() => setSidebarOpen(true)} />
        <main
          style={{
            flex: 1,
            padding: '32px 24px',
            maxWidth: 1280,
            width: '100%',
            margin: '0 auto',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
