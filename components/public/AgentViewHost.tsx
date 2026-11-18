'use client';

import React from 'react';
import { useAgentView } from './AgentViewContext';
import { AgentView } from './AgentView';

export function AgentViewHost({ children }: { children: React.ReactNode }) {
  const { isAgentView } = useAgentView();

  if (isAgentView) {
    return <AgentView />;
  }

  return <>{children}</>;
}
