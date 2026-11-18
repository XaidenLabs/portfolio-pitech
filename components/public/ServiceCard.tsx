import React from 'react';
import Link from 'next/link';
import { Service } from '@/types';
import { ArrowRight, Briefcase, Check, Code, CreditCard, Layers } from '../ui/icons';
import { formatCurrency } from '@/lib/utils/format';

interface ServiceCardProps {
  service: Service;
  style?: React.CSSProperties;
}

export function ServiceCard({ service, style }: ServiceCardProps) {
  const getIcon = (name?: string) => {
    switch (name) {
      case 'Code':
        return <Code size={22} style={{ color: 'var(--text-main)' }} />;
      case 'Layers':
        return <Layers size={22} style={{ color: 'var(--text-main)' }} />;
      case 'CreditCard':
        return <CreditCard size={22} style={{ color: 'var(--text-main)' }} />;
      case 'Briefcase':
      default:
        return <Briefcase size={22} style={{ color: 'var(--text-main)' }} />;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        backgroundColor: 'var(--bg-card)',
        padding: '24px',
        boxShadow: 'var(--shadow-sm)',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      <div
        style={{
          display: 'flex',
          height: '44px',
          width: '44px',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--bg-elevated)',
          marginBottom: '18px',
        }}
      >
        {getIcon(service.icon)}
      </div>

      <h3
        style={{
          fontSize: '17px',
          fontWeight: 700,
          color: 'var(--text-main)',
          marginBottom: '8px',
          margin: '0 0 8px 0',
        }}
      >
        {service.name}
      </h3>

      <p
        style={{
          fontSize: '13px',
          color: 'var(--text-muted)',
          lineHeight: 1.6,
          marginBottom: '20px',
          flex: 1,
          margin: '0 0 20px 0',
        }}
      >
        {service.summary}
      </p>

      {service.deliverables && service.deliverables.length > 0 && (
        <div
          style={{
            marginBottom: '20px',
            paddingTop: '16px',
            borderTop: '1px solid var(--border)',
          }}
        >
          <p
            style={{
              fontSize: '10px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              textTransform: 'uppercase',
              color: 'var(--text-dim)',
              marginBottom: '8px',
              margin: '0 0 8px 0',
            }}
          >
            What is included:
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {service.deliverables.slice(0, 3).map((item, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                }}
              >
                <Check size={13} style={{ color: 'var(--success)', flexShrink: 0, marginTop: '2px' }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '16px',
          borderTop: '1px solid var(--border)',
        }}
      >
        {service.startingPrice ? (
          <div>
            <span style={{ fontSize: '10px', color: 'var(--text-dim)', textTransform: 'uppercase', display: 'block' }}>
              Starting from
            </span>
            <span style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-main)' }}>
              {formatCurrency(service.startingPrice, 'USD')}
            </span>
          </div>
        ) : (
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Custom Scope</span>
        )}

        <Link
          href={`/request-quote?service=${service.slug}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--text-main)',
            textDecoration: 'none',
          }}
        >
          <span>Enquire</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}
