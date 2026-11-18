import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getPosts } from '@/lib/api/posts';
import { ArrowLeft, Clock } from '@/components/ui/icons';
import { formatDate } from '@/lib/utils/format';
import { PostCard } from '@/components/public/PostCard';
import { CtaBanner } from '@/components/public/CtaBanner';
import { ShareButton } from '@/components/public/ShareButton';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPosts('published');
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Article Not Found | Pitech' };

  return {
    title: `${post.title} | Pitech Insights`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getPosts('published');
  const relatedPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <article style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Top back navigation */}
      <div
        style={{
          borderBottom: '1px solid var(--border)',
          backgroundColor: 'var(--bg-subtle)',
          padding: '12px 20px',
        }}
      >
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <Link
            href="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              color: 'var(--text-muted)',
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={13} />
            <span>Back to All Articles</span>
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <header style={{ padding: '48px 20px 24px' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>
            {post.category && (
              <span
                style={{
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--bg-elevated)',
                  border: '1px solid var(--border)',
                  padding: '2px 8px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  color: 'var(--text-main)',
                }}
              >
                {post.category}
              </span>
            )}
            {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
            <span>&bull;</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={12} />
              <span>{post.readingMinutes} min read</span>
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(28px, 4.5vw, 42px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--text-main)',
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            {post.title}
          </h1>

          <p
            style={{
              fontSize: '16px',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {post.excerpt}
          </p>

          {/* Author Box Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '20px',
              borderTop: '1px solid var(--border)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt="Pitech Editorial"
                style={{ height: '36px', width: '36px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border)' }}
              />
              <div style={{ fontSize: '12px' }}>
                <p style={{ fontWeight: 600, color: 'var(--text-main)', margin: 0 }}>Pitech Editorial Team</p>
                <p style={{ color: 'var(--text-dim)', fontSize: '11px', margin: '2px 0 0 0' }}>Architecture &amp; Billing Systems</p>
              </div>
            </div>

            <ShareButton />
          </div>
        </div>
      </header>

      {/* Cover image */}
      {post.coverImage && (
        <div style={{ maxWidth: '820px', margin: '0 auto 32px', padding: '0 20px', width: '100%', boxSizing: 'border-box' }}>
          <div
            style={{
              overflow: 'hidden',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border)',
              aspectRatio: '16/9',
              backgroundColor: 'var(--bg-elevated)',
            }}
          >
            <img
              src={post.coverImage}
              alt={post.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>
      )}

      {/* Body Content */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 20px 48px', width: '100%', boxSizing: 'border-box' }}>
        <div
          style={{
            fontSize: '15px',
            lineHeight: 1.7,
            color: 'var(--text-main)',
            whiteSpace: 'pre-line',
          }}
        >
          {post.body}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div
            style={{
              marginTop: '40px',
              paddingTop: '20px',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
            }}
          >
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--bg-elevated)',
                  padding: '3px 10px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-muted)',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section
          style={{
            padding: '56px 20px',
            borderTop: '1px solid var(--border)',
            backgroundColor: 'var(--bg-subtle)',
          }}
        >
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <h3
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: 'var(--text-main)',
                marginBottom: '24px',
                margin: '0 0 24px 0',
              }}
            >
              Related Articles
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
              }}
            >
              {relatedPosts.map((rel) => (
                <PostCard key={rel.id} post={rel} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <CtaBanner />
    </article>
  );
}
