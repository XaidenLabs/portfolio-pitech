import React from 'react';

export const inlineStyles = {
  // Layout
  pageContainer: {
    maxWidth: '1080px',
    margin: '0 auto',
    padding: '0 20px',
    width: '100%',
  } as React.CSSProperties,

  section: {
    padding: '72px 0',
  } as React.CSSProperties,

  sectionBordered: {
    padding: '72px 0',
    borderTop: '1px solid var(--border)',
  } as React.CSSProperties,

  flexBetween: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as React.CSSProperties,

  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as React.CSSProperties,

  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  } as React.CSSProperties,

  // Cards & Containers
  card: {
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '24px',
    boxShadow: 'var(--shadow-sm)',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  } as React.CSSProperties,

  cardSubtle: {
    backgroundColor: 'var(--bg-subtle)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '24px',
  } as React.CSSProperties,

  pill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 12px',
    borderRadius: 'var(--radius-full)',
    fontSize: '12px',
    fontWeight: 500,
    backgroundColor: 'var(--bg-subtle)',
    border: '1px solid var(--border)',
    color: 'var(--text-main)',
  } as React.CSSProperties,

  // Typography
  monoBadge: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'var(--text-muted)',
    fontWeight: 600,
  } as React.CSSProperties,

  heading1: {
    fontSize: 'clamp(32px, 5vw, 56px)',
    fontWeight: 800,
    letterSpacing: '-0.03em',
    lineHeight: 1.1,
    color: 'var(--text-main)',
  } as React.CSSProperties,

  heading2: {
    fontSize: 'clamp(24px, 3.5vw, 36px)',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
    color: 'var(--text-main)',
  } as React.CSSProperties,

  subheading: {
    fontSize: '17px',
    color: 'var(--text-muted)',
    lineHeight: 1.6,
  } as React.CSSProperties,

  // Buttons
  buttonPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    backgroundColor: 'var(--primary)',
    color: 'var(--primary-text)',
    border: 'none',
    borderRadius: 'var(--radius-full)',
    padding: '10px 20px',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'opacity 0.2s ease, transform 0.1s ease',
    textDecoration: 'none',
  } as React.CSSProperties,

  buttonSecondary: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    backgroundColor: 'transparent',
    color: 'var(--text-main)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-full)',
    padding: '10px 20px',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    textDecoration: 'none',
  } as React.CSSProperties,

  // Form Inputs
  input: {
    width: '100%',
    padding: '10px 14px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border)',
    backgroundColor: 'var(--bg-card)',
    color: 'var(--text-main)',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  } as React.CSSProperties,

  label: {
    display: 'block',
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--text-muted)',
    marginBottom: '6px',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  } as React.CSSProperties,

  // Tables
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '13px',
  } as React.CSSProperties,

  th: {
    textAlign: 'left',
    padding: '12px 16px',
    borderBottom: '1px solid var(--border)',
    color: 'var(--text-muted)',
    fontWeight: 600,
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  } as React.CSSProperties,

  td: {
    padding: '14px 16px',
    borderBottom: '1px solid var(--border)',
    color: 'var(--text-main)',
  } as React.CSSProperties,
};
