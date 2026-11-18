'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { login, getCurrentUser } from '@/lib/api/auth';
import { ShieldCheck } from '@/components/ui/icons';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // If already logged in, redirect straight to dashboard
    const user = getCurrentUser();
    if (user) {
      router.push('/admin');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide your admin email and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await login(email, password);
      if (res.success) {
        router.push('/admin');
      } else {
        setError(res.error || 'Invalid credentials provided.');
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'var(--bg)',
        padding: '48px 16px',
        transition: 'background-color 150ms ease',
      }}
    >
      <div style={{ width: '100%', maxWidth: 440, display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              marginBottom: 16,
            }}
          >
            <div
              style={{
                display: 'flex',
                height: 48,
                width: 48,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 16,
                backgroundColor: 'var(--text-main)',
                color: 'var(--bg)',
                fontWeight: 700,
                fontSize: '1.25rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
            >
              P
            </div>
          </Link>
          <h1
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'var(--text-main)',
              margin: 0,
            }}
          >
            Admin Authentication
          </h1>
          <p
            style={{
              marginTop: 8,
              fontSize: '0.8125rem',
              color: 'var(--text-muted)',
              marginBottom: 0,
            }}
          >
            Sign in to access the private studio management console
          </p>
        </div>

        {/* Login Box */}
        <div
          style={{
            borderRadius: 24,
            border: '1px solid var(--border)',
            backgroundColor: 'var(--bg-card)',
            padding: 32,
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {error && (
              <div
                style={{
                  borderRadius: 12,
                  backgroundColor: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  padding: 12,
                  fontSize: '0.8125rem',
                  color: 'var(--danger)',
                }}
              >
                {error}
              </div>
            )}

            <Input
              label="Admin Email *"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@pitech.dev"
              required
            />

            <Input
              label="Password *"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
              }}
            >
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="checkbox"
                  defaultChecked
                  style={{
                    borderRadius: 4,
                    borderColor: 'var(--border)',
                    accentColor: 'var(--primary)',
                    cursor: 'pointer',
                  }}
                />
                <span>Keep me signed in</span>
              </label>
            </div>

            <Button
              type="submit"
              size="lg"
              isLoading={loading}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Sign In to Admin &rarr;
            </Button>
          </form>

          <div
            style={{
              marginTop: 24,
              borderTop: '1px solid var(--border)',
              paddingTop: 20,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
              }}
            >
              <ShieldCheck size={14} style={{ color: 'var(--success)' }} />
              <span>Restricted access area &bull; Authorization required</span>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link
            href="/"
            style={{
              fontSize: '0.8125rem',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              transition: 'color 150ms ease',
            }}
          >
            &larr; Return to public site
          </Link>
        </div>
      </div>
    </div>
  );
}
