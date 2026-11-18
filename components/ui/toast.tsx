'use client';

import React from 'react';
import { AlertCircle, CheckCircle, Info, X } from './icons';

export interface AlertBannerProps {
  type?: 'success' | 'warning' | 'error' | 'info';
  title?: string;
  message: string;
  onClose?: () => void;
  style?: React.CSSProperties;
}

export function AlertBanner({
  type = 'info',
  title,
  message,
  onClose,
  style,
}: AlertBannerProps) {
  const typeStyles: Record<string, { bg: string; border: string; text: string; iconColor: string }> = {
    info: {
      bg: 'rgba(37, 99, 235, 0.08)',
      border: 'rgba(37, 99, 235, 0.2)',
      text: 'var(--accent)',
      iconColor: 'var(--accent)',
    },
    success: {
      bg: 'var(--success-bg)',
      border: 'rgba(16, 185, 129, 0.25)',
      text: 'var(--success)',
      iconColor: 'var(--success)',
    },
    warning: {
      bg: 'var(--warning-bg)',
      border: 'rgba(245, 158, 11, 0.25)',
      text: 'var(--warning)',
      iconColor: 'var(--warning)',
    },
    error: {
      bg: 'var(--danger-bg)',
      border: 'rgba(239, 68, 68, 0.25)',
      text: 'var(--danger)',
      iconColor: 'var(--danger)',
    },
  };

  const current = typeStyles[type];

  const icons = {
    info: <Info size={18} style={{ color: current.iconColor, flexShrink: 0 }} />,
    success: <CheckCircle size={18} style={{ color: current.iconColor, flexShrink: 0 }} />,
    warning: <AlertCircle size={18} style={{ color: current.iconColor, flexShrink: 0 }} />,
    error: <AlertCircle size={18} style={{ color: current.iconColor, flexShrink: 0 }} />,
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '12px',
        padding: '14px 16px',
        borderRadius: 'var(--radius-md)',
        border: `1px solid ${current.border}`,
        backgroundColor: current.bg,
        color: current.text,
        fontSize: '13px',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
        {icons[type]}
        <div>
          {title && <h5 style={{ fontWeight: 600, margin: 0 }}>{title}</h5>}
          <p style={{ fontSize: '12px', marginTop: '2px', margin: 0, opacity: 0.9 }}>{message}</p>
        </div>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close notification"
          style={{
            background: 'none',
            border: 'none',
            color: 'inherit',
            opacity: 0.7,
            cursor: 'pointer',
            padding: '2px',
          }}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
