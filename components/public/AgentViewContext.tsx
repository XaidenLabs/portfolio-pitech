'use client';

import React, { createContext, useContext, useSyncExternalStore } from 'react';

interface AgentViewContextType {
  isAgentView: boolean;
  toggleAgentView: () => void;
  setAgentView: (val: boolean) => void;
}

const AgentViewContext = createContext<AgentViewContextType>({
  isAgentView: false,
  toggleAgentView: () => {},
  setAgentView: () => {},
});

function subscribeAgentView(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('agent-view-change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('agent-view-change', callback);
  };
}

function getAgentViewSnapshot(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem('pitech_agent_view') === 'true';
  } catch {
    return false;
  }
}

function getAgentViewServerSnapshot(): boolean {
  return false;
}

export function AgentViewProvider({ children }: { children: React.ReactNode }) {
  const isAgentView = useSyncExternalStore(
    subscribeAgentView,
    getAgentViewSnapshot,
    getAgentViewServerSnapshot
  );

  const setAgentView = (val: boolean) => {
    try {
      localStorage.setItem('pitech_agent_view', String(val));
    } catch {
      // ignore
    }
    window.dispatchEvent(new Event('agent-view-change'));
  };

  const toggleAgentView = () => {
    setAgentView(!isAgentView);
  };

  return (
    <AgentViewContext.Provider value={{ isAgentView, toggleAgentView, setAgentView }}>
      {children}
    </AgentViewContext.Provider>
  );
}

export function useAgentView() {
  const context = useContext(AgentViewContext);
  return context;
}
