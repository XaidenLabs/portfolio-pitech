'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun, Volume2, X } from '../ui/icons';
import { useTheme } from '../theme-provider';
import { AgentViewToggle } from './AgentViewToggle';

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 820);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'Blogs', href: '/blog' },
    { label: 'About Me', href: '/about' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'Invoices', href: '/invoice/inv_live_demo_vanguard_02' },
  ];

  // Play pleasant subtle Web Audio chime on sound toggle
  const handleToggleSound = () => {
    try {
      const AudioContext =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (AudioContext) {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(soundActive ? 320 : 587.33, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(soundActive ? 220 : 880, ctx.currentTime + 0.18);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.18);
      }
    } catch {
      // AudioContext fallback
    }
    setSoundActive((prev) => !prev);
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: '16px',
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        padding: '0 16px',
        pointerEvents: 'none',
      }}
    >
      <div style={{ position: 'relative', pointerEvents: 'auto', width: '100%', maxWidth: '960px' }}>
        {/* Floating Top Nav Capsule (Signature Dark & Orange Dribbble Aesthetic) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: '9999px',
            backgroundColor: '#141416',
            padding: '7px 10px 7px 14px',
            boxShadow: '0 12px 30px -5px rgba(20, 20, 22, 0.35), 0 4px 10px -3px rgba(20, 20, 22, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            gap: '12px',
          }}
        >
          {/* Brand Logo & Name */}
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            {/* Orange Monogram Circle */}
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#FF9E00',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 12px rgba(255, 158, 0, 0.4)',
              }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                <path
                  d="M13 2L4 14H12L11 22L20 10H12L13 2Z"
                  fill="#141416"
                  stroke="#141416"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span
              style={{
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '16px',
                letterSpacing: '-0.02em',
              }}
            >
              Pitech<span style={{ color: '#FF9E00' }}>.</span>
            </span>
          </Link>

          {/* Center Links (Desktop only) */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              flexWrap: 'nowrap',
            }}
            className="desktop-only-nav"
          >
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    color: isActive ? '#FF9E00' : '#D1D5DB',
                    fontSize: '13.5px',
                    fontWeight: isActive ? 700 : 500,
                    textDecoration: 'none',
                    transition: 'color 0.15s ease',
                    position: 'relative',
                    padding: '4px 0',
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        backgroundColor: '#FF9E00',
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Tools */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Theme Toggle (Moon / Sun - Desktop) */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle dark/light mode"
              title="Toggle theme"
              className="desktop-only-nav"
              style={{
                display: 'flex',
                height: '32px',
                width: '32px',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Sound Toggle (Ambient Chime - Desktop) */}
            <button
              type="button"
              onClick={handleToggleSound}
              aria-label="Toggle audio feedback"
              title={soundActive ? 'Sound feedback on' : 'Sound feedback muted'}
              className="desktop-only-nav"
              style={{
                display: 'flex',
                height: '32px',
                width: '32px',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                backgroundColor: soundActive ? 'rgba(255, 158, 0, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                color: soundActive ? '#FF9E00' : '#D1D5DB',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <Volume2 size={15} />
            </button>

            {/* White CTA Pill: "Let's Talk" (Desktop) */}
            <Link
              href="/contact"
              className="desktop-only-nav"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '9999px',
                backgroundColor: '#FFFFFF',
                color: '#141416',
                padding: '8px 18px',
                fontSize: '13px',
                fontWeight: 700,
                textDecoration: 'none',
                letterSpacing: '-0.01em',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                transition: 'transform 0.15s ease, opacity 0.15s ease',
              }}
            >
              Let&apos;s Talk
            </Link>

            {/* Mobile Hamburger Button (Orange Circle) */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle mobile menu"
              className="mobile-only-btn"
              style={{
                display: 'flex',
                height: '34px',
                width: '34px',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: '#FF9E00',
                color: '#141416',
                cursor: 'pointer',
                boxShadow: '0 0 10px rgba(255, 158, 0, 0.4)',
              }}
            >
              {isOpen ? (
                <X size={18} strokeWidth={2.5} />
              ) : (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Card */}
        {isOpen && (
          <div
            style={{
              position: 'absolute',
              top: '56px',
              left: 0,
              right: 0,
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backgroundColor: '#141416',
              padding: '20px',
              boxShadow: '0 25px 40px -10px rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              zIndex: 1001,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '12px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                marginBottom: '6px',
              }}
            >
              <span
                style={{
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#9CA3AF',
                }}
              >
                Navigation
              </span>
              <AgentViewToggle />
            </div>

            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    fontSize: '14px',
                    fontWeight: isActive ? 700 : 500,
                    textDecoration: 'none',
                    backgroundColor: isActive ? 'rgba(255, 158, 0, 0.15)' : 'transparent',
                    color: isActive ? '#FF9E00' : '#E5E7EB',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span
                      style={{
                        height: 7,
                        width: 7,
                        borderRadius: '50%',
                        backgroundColor: '#FF9E00',
                        boxShadow: '0 0 8px #FF9E00',
                      }}
                    />
                  )}
                </Link>
              );
            })}

            {/* Mobile Actions Footer */}
            <div
              style={{
                paddingTop: '12px',
                marginTop: '6px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {/* Quick Preferences Bar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: '#9CA3AF' }}>Mode & Audio</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={toggleTheme}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 12px',
                      borderRadius: '9999px',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      backgroundColor: 'rgba(255, 255, 255, 0.06)',
                      color: '#FFFFFF',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {isDark ? <Sun size={13} /> : <Moon size={13} />}
                    <span>{isDark ? 'Light' : 'Dark'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleToggleSound}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 12px',
                      borderRadius: '9999px',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      backgroundColor: soundActive ? 'rgba(255, 158, 0, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                      color: soundActive ? '#FF9E00' : '#FFFFFF',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    <Volume2 size={13} />
                    <span>{soundActive ? 'Sound On' : 'Muted'}</span>
                  </button>
                </div>
              </div>

              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  borderRadius: '9999px',
                  backgroundColor: '#FF9E00',
                  color: '#141416',
                  padding: '12px',
                  fontSize: '14px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(255, 158, 0, 0.4)',
                }}
              >
                Let&apos;s Talk &rarr;
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
