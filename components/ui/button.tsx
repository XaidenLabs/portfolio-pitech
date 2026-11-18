import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  style,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    borderRadius: 'var(--radius-full)',
    border: 'none',
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    opacity: disabled || isLoading ? 0.55 : 1,
    transition: 'opacity 0.2s ease, transform 0.1s ease',
    textDecoration: 'none',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  };

  const sizeStyles: Record<'sm' | 'md' | 'lg', React.CSSProperties> = {
    sm: { padding: '6px 14px', fontSize: '12px', gap: '6px' },
    md: { padding: '9px 18px', fontSize: '13px', gap: '8px' },
    lg: { padding: '12px 24px', fontSize: '15px', gap: '10px' },
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: 'var(--primary)',
      color: 'var(--primary-text)',
      boxShadow: 'var(--shadow-sm)',
    },
    secondary: {
      backgroundColor: 'var(--bg-elevated)',
      color: 'var(--text-main)',
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--text-main)',
      border: '1px solid var(--border)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--text-muted)',
    },
    danger: {
      backgroundColor: 'var(--danger)',
      color: '#ffffff',
      boxShadow: 'var(--shadow-sm)',
    },
    success: {
      backgroundColor: 'var(--success)',
      color: '#ffffff',
      boxShadow: 'var(--shadow-sm)',
    },
  };

  const combinedStyle: React.CSSProperties = {
    ...baseStyle,
    ...sizeStyles[size],
    ...variantStyles[variant],
    ...style,
  };

  return (
    <button style={combinedStyle} disabled={disabled || isLoading} {...props}>
      {isLoading && (
        <svg
          style={{ width: '14px', height: '14px', marginRight: '6px', animation: 'spin 1s linear infinite' }}
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            style={{ opacity: 0.25 }}
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            style={{ opacity: 0.75 }}
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
