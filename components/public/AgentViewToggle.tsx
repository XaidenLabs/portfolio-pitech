'use client';

import React from 'react';
import { useAgentView } from './AgentViewContext';
import { Bot } from '../ui/icons';

interface AgentViewToggleProps {
  style?: React.CSSProperties;
}

export function AgentViewToggle({ style }: AgentViewToggleProps) {
  const { isAgentView, toggleAgentView } = useAgentView();

  return (
    <button
      type="button"
      onClick={toggleAgentView}
      title={isAgentView ? 'Switch to Visual View' : 'Switch to Agent View (Markdown for AI)'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        borderRadius: 'var(--radius-full)',
        padding: '5px 12px',
        fontSize: '11px',
        fontFamily: 'var(--font-mono)',
        fontWeight: 600,
        cursor: 'pointer',
        border: isAgentView ? '1px solid var(--success)' : '1px solid var(--border)',
        backgroundColor: isAgentView ? 'var(--success-bg)' : 'var(--bg-elevated)',
        color: isAgentView ? 'var(--success)' : 'var(--text-muted)',
        transition: 'all 0.15s ease',
        ...style,
      }}
    >
      <Bot size={13} style={{ color: isAgentView ? 'var(--success)' : 'var(--text-dim)' }} />
      <span>Agent view</span>
      {isAgentView && (
        <span
          style={{
            height: '6px',
            width: '6px',
            borderRadius: '50%',
            backgroundColor: 'var(--success)',
          }}
        />
      )}
    </button>
  );
}
