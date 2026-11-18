'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Briefcase,
  Code,
  CreditCard,
  DollarSign,
  FileText,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  Mail,
  Settings,
  Star,
  Users,
  X,
} from '../ui/icons';
import { logout } from '@/lib/api/auth';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/admin-login');
  };

  const navGroups = [
    {
      title: 'Overview',
      items: [
        { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
      ],
    },
    {
      title: 'Content & CMS',
      items: [
        { label: 'Projects', href: '/admin/projects', icon: Briefcase },
        { label: 'Articles & Posts', href: '/admin/posts', icon: FileText },
        { label: 'Services', href: '/admin/services', icon: Code },
        { label: 'Testimonials', href: '/admin/testimonials', icon: Star },
        { label: 'Media Library', href: '/admin/media', icon: ImageIcon },
      ],
    },
    {
      title: 'Clients & Billing',
      items: [
        { label: 'Clients', href: '/admin/clients', icon: Users },
        { label: 'Invoices', href: '/admin/invoices', icon: DollarSign },
        { label: 'Payment Links', href: '/admin/payment-links', icon: CreditCard },
      ],
    },
    {
      title: 'Operations',
      items: [
        { label: 'Enquiries & Quotes', href: '/admin/enquiries', icon: Mail },
        { label: 'Settings', href: '/admin/settings', icon: Settings },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 40,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)',
          }}
        />
      )}

      {/* Sidebar container */}
      <aside
        className="admin-desktop-sidebar"
        style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 50,
          display: 'flex',
          width: 260,
          flexDirection: 'column',
          borderRight: '1px solid var(--border)',
          backgroundColor: 'var(--bg-card)',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 200ms ease, background-color 150ms ease, border-color 150ms ease',
        }}
      >
        {/* Brand header */}
        <div
          style={{
            display: 'flex',
            height: 64,
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <Link
            href="/admin"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              textDecoration: 'none',
            }}
          >
            <div
              style={{
                display: 'flex',
                height: 32,
                width: 32,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                backgroundColor: 'var(--text-main)',
                color: 'var(--bg)',
                fontWeight: 700,
                fontSize: '0.875rem',
              }}
            >
              P
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontWeight: 700,
                  color: 'var(--text-main)',
                  fontSize: '0.875rem',
                  lineHeight: 1.2,
                }}
              >
                Pitech Admin
              </span>
              <span
                style={{
                  fontSize: '0.625rem',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.05em',
                }}
              >
                Management Console
              </span>
            </div>
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 6,
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation list */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
        >
          {navGroups.map((group) => (
            <div key={group.title} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <h5
                style={{
                  padding: '0 10px',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--text-dim)',
                  margin: 0,
                }}
              >
                {group.title}
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.href === '/admin'
                      ? pathname === '/admin'
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => onClose()}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        borderRadius: 10,
                        padding: '8px 12px',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        textDecoration: 'none',
                        transition: 'all 150ms ease',
                        backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                        color: isActive ? 'var(--primary-text)' : 'var(--text-muted)',
                      }}
                    >
                      <Icon size={18} style={{ flexShrink: 0 }} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer profile & quick links */}
        <div
          style={{
            borderTop: '1px solid var(--border)',
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <Link
            href="/"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.75rem',
              fontWeight: 500,
              color: 'var(--text-muted)',
              padding: '6px 8px',
              borderRadius: 8,
              textDecoration: 'none',
            }}
          >
            <span>View Live Portfolio</span>
            <span
              style={{
                fontSize: '0.6875rem',
                backgroundColor: 'var(--bg-elevated)',
                padding: '2px 6px',
                borderRadius: 4,
                border: '1px solid var(--border)',
              }}
            >
              &nearr;
            </span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            style={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              gap: 8,
              borderRadius: 10,
              padding: '8px 12px',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--danger)',
              backgroundColor: 'var(--danger-bg)',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 150ms ease',
            }}
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
