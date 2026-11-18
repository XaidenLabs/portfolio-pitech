'use client';

import React from 'react';
import { Printer } from '../ui/icons';

export function PrintButton({ label = 'Print Receipt' }: { label?: string }) {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <button
      type="button"
      onClick={handlePrint}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border)',
        backgroundColor: 'var(--bg-elevated)',
        padding: '7px 14px',
        fontSize: '12px',
        fontWeight: 600,
        color: 'var(--text-main)',
        cursor: 'pointer',
      }}
    >
      <Printer size={14} />
      <span>{label}</span>
    </button>
  );
}
