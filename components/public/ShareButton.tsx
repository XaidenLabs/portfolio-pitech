'use client';

import React, { useState } from 'react';
import { Share2 } from '../ui/icons';

export function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        borderRadius: 'var(--radius-full)',
        border: '1px solid var(--border)',
        backgroundColor: 'var(--bg-elevated)',
        padding: '5px 12px',
        fontSize: '11px',
        fontFamily: 'var(--font-mono)',
        fontWeight: 600,
        color: 'var(--text-main)',
        cursor: 'pointer',
      }}
    >
      <Share2 size={13} />
      <span>{copied ? 'Link Copied!' : 'Share Article'}</span>
    </button>
  );
}
