'use client';

import React from 'react';
import Link from 'next/link';
import { Bell, Menu, Moon, Search, Sun } from '../ui/icons';
import { useTheme } from '../theme-provider';

interface TopBarProps {
  onToggleSidebar: () => void;
}

export function TopBar({ onToggleSidebar }: TopBarProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 30,
        display: 'flex',
        height: 64,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--border)',
        backgroundColor: 'var(--bg-card)',
        padding: '0 20px',
        transition: 'background-color 150ms ease, border-color 150ms ease',
      }}
    >
      {/* Left side: Hamburger and Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, maxWidth: 440 }}>
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
          style={{
            borderRadius: 10,
            padding: 8,
            color: 'var(--text-muted)',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Menu size={20} />
        </button>

        <div style={{ position: 'relative', width: '100%' }}>
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: 14,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-dim)',
            }}
          />
          <input
            type="text"
            placeholder="Search projects, invoices, clients..."
            style={{
              width: '100%',
              borderRadius: 12,
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-subtle)',
              paddingLeft: 40,
              paddingRight: 16,
              paddingTop: 8,
              paddingBottom: 8,
              fontSize: '0.75rem',
              color: 'var(--text-main)',
              outline: 'none',
              transition: 'border-color 150ms ease, background-color 150ms ease',
            }}
          />
        </div>
      </div>

      {/* Right side: Actions, Theme, Notifications & User */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          style={{
            display: 'flex',
            height: 36,
            width: 36,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            border: '1px solid var(--border)',
            backgroundColor: 'var(--bg-subtle)',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            transition: 'background-color 150ms ease',
          }}
        >
          {isDark ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        <Link
          href="/admin/enquiries"
          aria-label="Admin notifications"
          style={{
            position: 'relative',
            display: 'flex',
            height: 36,
            width: 36,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            border: '1px solid var(--border)',
            backgroundColor: 'var(--bg-subtle)',
            color: 'var(--text-muted)',
            textDecoration: 'none',
            transition: 'background-color 150ms ease',
          }}
        >
          <Bell size={17} />
          <span
            style={{
              position: 'absolute',
              top: 7,
              right: 7,
              height: 8,
              width: 8,
              borderRadius: '50%',
              backgroundColor: 'var(--danger)',
            }}
          />
        </Link>

        {/* User Pill */}
        <Link
          href="/admin/settings"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            borderRadius: 12,
            border: '1px solid var(--border)',
            padding: '6px 12px 6px 6px',
            textDecoration: 'none',
            backgroundColor: 'var(--bg-subtle)',
            transition: 'background-color 150ms ease',
          }}
        >
          <div
            style={{
              display: 'flex',
              height: 28,
              width: 28,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
              backgroundColor: 'var(--text-main)',
              color: 'var(--bg)',
              fontWeight: 600,
              fontSize: '0.75rem',
            }}
          >
            A
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--text-main)',
                lineHeight: 1.1,
              }}
            >
              Pitech Admin
            </span>
            <span
              style={{
                fontSize: '0.625rem',
                color: 'var(--text-muted)',
                lineHeight: 1.1,
                marginTop: 2,
              }}
            >
              admin@pitech.dev
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
}
