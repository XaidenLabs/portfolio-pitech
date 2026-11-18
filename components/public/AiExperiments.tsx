'use client';

import React, { useState } from 'react';
import { ArrowUpRight } from '../ui/icons';

export function AiExperiments() {
  const [activeExp, setActiveExp] = useState<number | null>(null);

  const experiments = [
    {
      id: 1,
      title: 'Generative 3D Audio Turntable',
      category: 'WebGL & WebAudio',
      description:
        'Interactive WebAudio & Three.js synthesizer transforming design token frequencies into ambient soundscapes.',
      renderPreview: () => (
        <div style={{ height: 130, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#09090b', borderRadius: 12 }}>
          {/* Vinyl Record Turntable graphic */}
          <div
            style={{
              width: 90,
              height: 90,
              borderRadius: '50%',
              backgroundColor: '#18181b',
              border: '2px solid #27272a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(0,0,0,0.8)',
              position: 'relative',
            }}
          >
            {/* Grooves */}
            <div style={{ width: 68, height: 68, borderRadius: '50%', border: '1px dashed #3f3f46', position: 'absolute' }} />
            <div style={{ width: 48, height: 48, borderRadius: '50%', border: '1px solid #3f3f46', position: 'absolute' }} />
            {/* Vinyl Center Label */}
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                backgroundColor: '#ef4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#000000' }} />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: 'Context Window Compressor',
      category: 'Agent Memory',
      description:
        'Recursive prompt tokenizer compressing 128k context buffers down to 4k AST representations with zero semantic loss.',
      renderPreview: () => (
        <div
          style={{
            height: 130,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: '#09090b',
            borderRadius: 12,
            padding: 14,
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: '#a1a1aa',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, color: '#34d399' }}>
            <span>●</span>
            <span style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ast_compression_active</span>
          </div>
          <div style={{ color: '#e4e4e7', marginBottom: 4 }}>
            &gt; tokens_in: <span style={{ color: '#fbbf24' }}>128,420</span>
          </div>
          <div style={{ color: '#e4e4e7' }}>
            &gt; tokens_out: <span style={{ color: '#34d399' }}>4,110</span> (-96.8%)
          </div>
          <div style={{ marginTop: 8, height: 3, backgroundColor: '#27272a', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ width: '96.8%', height: '100%', backgroundColor: '#34d399' }} />
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: 'Voice Synthesis Playground',
      category: 'Real-time Audio',
      description:
        'Real-time zero-latency conversational agent interface built with WebSocket audio streams and neural voice cloning.',
      renderPreview: () => (
        <div
          style={{
            height: 130,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#09090b',
            borderRadius: 12,
            gap: 12,
          }}
        >
          {/* Audio Waveform */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 3, height: 36 }}>
            {[14, 28, 12, 34, 42, 22, 10, 30, 44, 20, 16, 38, 24, 12, 32, 18].map((h, i) => (
              <div
                key={i}
                style={{
                  width: 3,
                  height: h,
                  borderRadius: 2,
                  backgroundColor: i % 2 === 0 ? '#38bdf8' : '#818cf8',
                }}
              />
            ))}
          </div>
          <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#71717a' }}>
            latency: 18ms &bull; 48kHz PCM
          </span>
        </div>
      ),
    },
  ];

  return (
    <section
      style={{
        padding: '32px 20px 64px',
        maxWidth: 1040,
        margin: '0 auto',
        width: '100%',
      }}
    >
      <div style={{ marginBottom: 32 }}>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: 'var(--text-main)',
            margin: '0 0 6px 0',
          }}
        >
          AI Experiments
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
          Explorations in agentic interfaces, neural tokenizers, and real-time audio systems.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: 20,
        }}
      >
        {experiments.map((exp) => (
          <div
            key={exp.id}
            onMouseEnter={() => setActiveExp(exp.id)}
            onMouseLeave={() => setActiveExp(null)}
            style={{
              borderRadius: 20,
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-card)',
              padding: 18,
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 16,
              transition: 'border-color 150ms ease, transform 150ms ease',
              transform: activeExp === exp.id ? 'translateY(-2px)' : 'none',
            }}
          >
            <div>
              {/* Preview Graphic */}
              <div style={{ marginBottom: 16 }}>
                {exp.renderPreview()}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
                  {exp.title}
                </h4>
              </div>

              <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 8 }}>
                {exp.category}
              </span>

              <p style={{ fontSize: '12px', lineHeight: 1.5, color: 'var(--text-muted)', margin: 0 }}>
                {exp.description}
              </p>
            </div>

            <div style={{ paddingTop: 12, borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-main)' }}>
                Demo Experiment
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>
                <ArrowUpRight size={13} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
