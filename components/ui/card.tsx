import React from 'react';

export function Card({
  children,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      style={{
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        backgroundColor: 'var(--bg-card)',
        padding: '24px',
        boxShadow: 'var(--shadow-sm)',
        boxSizing: 'border-box',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '6px', ...style }} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  style,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      style={{
        fontSize: '17px',
        fontWeight: 700,
        letterSpacing: '-0.01em',
        color: 'var(--text-main)',
        margin: 0,
        ...style,
      }}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  children,
  style,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      style={{
        fontSize: '13px',
        color: 'var(--text-muted)',
        margin: 0,
        lineHeight: 1.5,
        ...style,
      }}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({
  children,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div style={{ ...style }} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  children,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      style={{
        marginTop: '20px',
        paddingTop: '16px',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
