import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'secondary' | 'outline';
  size?: 'sm' | 'md';
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  style,
  ...props
}: BadgeProps) {
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    borderRadius: 'var(--radius-full)',
    fontFamily: 'var(--font-mono)',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    boxSizing: 'border-box',
    lineHeight: 1,
  };

  const sizeStyles: Record<'sm' | 'md', React.CSSProperties> = {
    sm: { fontSize: '10px', padding: '3px 8px' },
    md: { fontSize: '11px', padding: '4px 10px' },
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    default: {
      backgroundColor: 'var(--bg-elevated)',
      color: 'var(--text-main)',
      border: '1px solid var(--border)',
    },
    secondary: {
      backgroundColor: 'var(--bg-subtle)',
      color: 'var(--text-muted)',
      border: '1px solid var(--border)',
    },
    success: {
      backgroundColor: 'var(--success-bg)',
      color: 'var(--success)',
      border: '1px solid rgba(16, 185, 129, 0.2)',
    },
    warning: {
      backgroundColor: 'var(--warning-bg)',
      color: 'var(--warning)',
      border: '1px solid rgba(245, 158, 11, 0.2)',
    },
    danger: {
      backgroundColor: 'var(--danger-bg)',
      color: 'var(--danger)',
      border: '1px solid rgba(239, 68, 68, 0.2)',
    },
    info: {
      backgroundColor: 'rgba(37, 99, 235, 0.1)',
      color: 'var(--accent)',
      border: '1px solid rgba(37, 99, 235, 0.2)',
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--text-main)',
      border: '1px solid var(--border)',
    },
  };

  return (
    <span
      style={{
        ...baseStyle,
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  );
}
