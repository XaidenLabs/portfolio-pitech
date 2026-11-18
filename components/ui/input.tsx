import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Input({ label, error, hint, style, id, ...props }: InputProps) {
  const inputId = id || props.name;

  const inputStyle: React.CSSProperties = {
    width: '100%',
    borderRadius: 'var(--radius-md)',
    border: error ? '1px solid var(--danger)' : '1px solid var(--border)',
    backgroundColor: 'var(--bg-card)',
    padding: '9px 14px',
    fontSize: '13px',
    color: 'var(--text-main)',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    ...style,
  };

  return (
    <div style={{ width: '100%', marginBottom: '14px' }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            display: 'block',
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--text-muted)',
            marginBottom: '6px',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {label}
        </label>
      )}
      <input id={inputId} style={inputStyle} {...props} />
      {hint && !error && (
        <p style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '4px' }}>
          {hint}
        </p>
      )}
      {error && (
        <p style={{ fontSize: '11px', color: 'var(--danger)', marginTop: '4px', fontWeight: 500 }}>
          {error}
        </p>
      )}
    </div>
  );
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Textarea({ label, error, hint, style, id, ...props }: TextareaProps) {
  const inputId = id || props.name;

  const textareaStyle: React.CSSProperties = {
    width: '100%',
    borderRadius: 'var(--radius-md)',
    border: error ? '1px solid var(--danger)' : '1px solid var(--border)',
    backgroundColor: 'var(--bg-card)',
    padding: '10px 14px',
    fontSize: '13px',
    color: 'var(--text-main)',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    lineHeight: 1.5,
    ...style,
  };

  return (
    <div style={{ width: '100%', marginBottom: '14px' }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            display: 'block',
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--text-muted)',
            marginBottom: '6px',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {label}
        </label>
      )}
      <textarea id={inputId} rows={props.rows || 4} style={textareaStyle} {...props} />
      {hint && !error && (
        <p style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '4px' }}>
          {hint}
        </p>
      )}
      {error && (
        <p style={{ fontSize: '11px', color: 'var(--danger)', marginTop: '4px', fontWeight: 500 }}>
          {error}
        </p>
      )}
    </div>
  );
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { label: string; value: string | number }[];
}

export function Select({ label, error, options, style, id, ...props }: SelectProps) {
  const selectId = id || props.name;

  const selectStyle: React.CSSProperties = {
    width: '100%',
    borderRadius: 'var(--radius-md)',
    border: error ? '1px solid var(--danger)' : '1px solid var(--border)',
    backgroundColor: 'var(--bg-card)',
    padding: '9px 14px',
    fontSize: '13px',
    color: 'var(--text-main)',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    ...style,
  };

  return (
    <div style={{ width: '100%', marginBottom: '14px' }}>
      {label && (
        <label
          htmlFor={selectId}
          style={{
            display: 'block',
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--text-muted)',
            marginBottom: '6px',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {label}
        </label>
      )}
      <select id={selectId} style={selectStyle} {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p style={{ fontSize: '11px', color: 'var(--danger)', marginTop: '4px', fontWeight: 500 }}>
          {error}
        </p>
      )}
    </div>
  );
}
