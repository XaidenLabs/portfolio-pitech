import React from 'react';
import { getPosts } from '@/lib/api/posts';
import { PostCard } from '@/components/public/PostCard';
import { CtaBanner } from '@/components/public/CtaBanner';

export const metadata = {
  title: 'Engineering & Architecture Blog | Pitech',
  description:
    'Deep dives on Next.js performance, multi-currency billing architectures, and software design systems.',
};

export default async function BlogPage() {
  const posts = await getPosts('published');

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <section
        style={{
          padding: '48px 20px 40px',
          borderBottom: '1px solid var(--border)',
          backgroundColor: 'var(--bg-subtle)',
        }}
      >
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <p
            style={{
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--text-muted)',
              marginBottom: '6px',
              margin: '0 0 6px 0',
            }}
          >
            Engineering Insights
          </p>
          <h1
            style={{
              fontSize: 'clamp(28px, 4.5vw, 44px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--text-main)',
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            Writings on Systems, Invoicing &amp; Web Performance
          </h1>
          <p
            style={{
              marginTop: '12px',
              fontSize: '15px',
              color: 'var(--text-muted)',
              maxWidth: '600px',
              lineHeight: 1.6,
            }}
          >
            Practical architectural playbooks, lessons learned building billing engines, and full-stack technical breakdowns.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section style={{ padding: '64px 20px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaBanner />
    </div>
  );
}
