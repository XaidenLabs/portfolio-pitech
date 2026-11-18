'use client';

import React, { useState } from 'react';

export function MyStackSection() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const tools = [
    { name: 'Next.js', category: 'Framework' },
    { name: 'React 19', category: 'UI Library' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'Figma', category: 'Product Design' },
    { name: 'Node.js', category: 'Runtime' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'Tailwind CSS', category: 'Styling' },
    { name: 'Docker', category: 'DevOps' },
    { name: 'Python', category: 'AI & Data' },
    { name: 'Stripe', category: 'Payments' },
    { name: 'Paystack', category: 'Fintech' },
    { name: 'WebSockets', category: 'Real-time' },
    { name: 'Redis', category: 'Caching' },
    { name: 'Three.js', category: '3D Graphics' },
    { name: 'GraphQL', category: 'API' },
    { name: 'Git', category: 'Version Control' },
  ];

  const graphNodes = [
    { id: 'core', label: 'Systems Architecture', x: 250, y: 150, r: 24, main: true },
    { id: 'design', label: 'Product Design', x: 120, y: 70, r: 16 },
    { id: 'tokens', label: 'Design Tokens', x: 60, y: 140, r: 14 },
    { id: 'next', label: 'Next.js 16', x: 140, y: 230, r: 16 },
    { id: 'ts', label: 'TypeScript', x: 250, y: 260, r: 16 },
    { id: 'ai', label: 'Agentic AI', x: 380, y: 80, r: 16 },
    { id: 'billing', label: 'Fintech Invoicing', x: 420, y: 160, r: 16 },
    { id: 'db', label: 'PostgreSQL', x: 360, y: 240, r: 14 },
    { id: 'security', label: 'Auth & Tokens', x: 260, y: 50, r: 14 },
  ];

  const graphEdges = [
    { from: 'core', to: 'design' },
    { from: 'core', to: 'tokens' },
    { from: 'core', to: 'next' },
    { from: 'core', to: 'ts' },
    { from: 'core', to: 'ai' },
    { from: 'core', to: 'billing' },
    { from: 'core', to: 'db' },
    { from: 'core', to: 'security' },
    { from: 'design', to: 'tokens' },
    { from: 'next', to: 'ts' },
    { from: 'billing', to: 'db' },
    { from: 'ai', to: 'security' },
  ];

  return (
    <section
      style={{
        padding: '32px 20px 80px',
        maxWidth: 1040,
        margin: '0 auto',
        width: '100%',
        textAlign: 'center',
      }}
    >
      <div style={{ marginBottom: 36 }}>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: 'var(--text-main)',
            margin: '0 0 6px 0',
          }}
        >
          My Stack
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
          Tools, languages, and runtime architectures leveraged to build scalable software.
        </p>
      </div>

      {/* Monochromatic Tool Icons / Badges Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
          gap: 12,
          marginBottom: 48,
        }}
      >
        {tools.map((tool, i) => (
          <div
            key={i}
            style={{
              padding: '12px 10px',
              borderRadius: 14,
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-card)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-main)' }}>
              {tool.name}
            </span>
            <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
              {tool.category}
            </span>
          </div>
        ))}
      </div>

      {/* Neural Node Network / Knowledge Map */}
      <div
        style={{
          borderRadius: 24,
          border: '1px solid var(--border)',
          backgroundColor: 'var(--bg-subtle)',
          padding: 24,
          boxShadow: 'var(--shadow-sm)',
          maxWidth: 680,
          margin: '0 auto 40px',
          overflow: 'hidden',
        }}
      >
        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 12 }}>
          Interactive Knowledge &amp; Systems Topology
        </span>

        <svg
          viewBox="0 0 500 300"
          style={{ width: '100%', height: 'auto', maxHeight: 260, overflow: 'visible' }}
        >
          {/* Connecting Edges */}
          {graphEdges.map((edge, i) => {
            const start = graphNodes.find((n) => n.id === edge.from)!;
            const end = graphNodes.find((n) => n.id === edge.to)!;
            const isHighlighted = hoveredNode === edge.from || hoveredNode === edge.to;
            return (
              <line
                key={i}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke={isHighlighted ? 'var(--text-main)' : 'var(--border)'}
                strokeWidth={isHighlighted ? 1.8 : 1}
                strokeDasharray={isHighlighted ? 'none' : '4 3'}
                style={{ transition: 'all 200ms ease' }}
              />
            );
          })}

          {/* Nodes */}
          {graphNodes.map((node) => {
            const isHovered = hoveredNode === node.id;
            return (
              <g
                key={node.id}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.r + (isHovered ? 4 : 0)}
                  fill={node.main ? 'var(--text-main)' : 'var(--bg-card)'}
                  stroke={node.main ? 'var(--text-main)' : isHovered ? 'var(--accent)' : 'var(--border)'}
                  strokeWidth={2}
                  style={{ transition: 'all 200ms ease' }}
                />
                <text
                  x={node.x}
                  y={node.y + node.r + 14}
                  textAnchor="middle"
                  fill={isHovered ? 'var(--text-main)' : 'var(--text-muted)'}
                  fontSize={node.main ? '11px' : '9.5px'}
                  fontWeight={node.main ? 700 : 600}
                  fontFamily="var(--font-sans)"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Steve Jobs Quote */}
      <div style={{ maxWidth: 520, margin: '0 auto', textAlign: 'center' }}>
        <p
          style={{
            fontSize: '14px',
            fontStyle: 'italic',
            lineHeight: 1.6,
            color: 'var(--text-main)',
            margin: '0 0 6px 0',
          }}
        >
          &ldquo;Things in life will teach you that the best design is how it works.&rdquo;
        </p>
        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>
          — Steve Jobs
        </span>
      </div>
    </section>
  );
}
