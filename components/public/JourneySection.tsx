'use client';

import React from 'react';

export function JourneySection() {
  const experiences = [
    {
      role: 'Principal Systems Architect & Designer',
      company: 'Pitech Digital',
      period: '2024 — Present',
      location: 'Remote / Lagos',
    },
    {
      role: 'Senior Product Designer & Systems Lead',
      company: 'Apex Global UK',
      period: '2022 — 2024',
      location: 'London / Remote',
    },
    {
      role: 'Full-Stack Product Engineer',
      company: 'Paystack Fintech Lab',
      period: '2020 — 2022',
      location: 'Lagos',
    },
    {
      role: 'UI/UX Systems Engineer',
      company: 'Decagon Institute',
      period: '2018 — 2020',
      location: 'Lagos',
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
      <div style={{ marginBottom: 24 }}>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: 'var(--text-main)',
            margin: '0 0 6px 0',
          }}
        >
          Journey
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
          Track record across VC-funded scaleups, enterprise billing systems, and product engineering.
        </p>
      </div>

      <div
        style={{
          borderRadius: 20,
          border: '1px solid var(--border)',
          backgroundColor: 'var(--bg-card)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '13px' }}>
            <tbody>
              {experiences.map((exp, idx) => (
                <tr
                  key={idx}
                  style={{
                    borderBottom: idx === experiences.length - 1 ? 'none' : '1px solid var(--border)',
                    transition: 'background-color 150ms ease',
                  }}
                >
                  <td style={{ padding: '18px 24px', fontWeight: 700, color: 'var(--text-main)' }}>
                    {exp.role}
                  </td>
                  <td style={{ padding: '18px 24px', color: 'var(--text-muted)' }}>
                    {exp.company}
                  </td>
                  <td style={{ padding: '18px 24px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-dim)' }}>
                    {exp.period}
                  </td>
                  <td style={{ padding: '18px 24px', textAlign: 'right', fontSize: '12px', color: 'var(--text-muted)' }}>
                    {exp.location}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
