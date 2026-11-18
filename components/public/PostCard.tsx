import React from 'react';
import Link from 'next/link';
import { Post } from '@/types';
import { Clock } from '../ui/icons';
import { formatDate } from '@/lib/utils/format';

interface PostCardProps {
  post: Post;
  style?: React.CSSProperties;
}

export function PostCard({ post, style }: PostCardProps) {
  return (
    <article
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        backgroundColor: 'var(--bg-card)',
        boxShadow: 'var(--shadow-sm)',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {post.coverImage && (
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9',
            overflow: 'hidden',
            backgroundColor: 'var(--bg-elevated)',
          }}
        >
          <img
            src={post.coverImage}
            alt={post.title}
            style={{
              height: '100%',
              width: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
          {post.category && (
            <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
              <span
                style={{
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'rgba(255, 255, 255, 0.92)',
                  padding: '3px 10px',
                  fontSize: '10px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  color: '#09090b',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                {post.category}
              </span>
            </div>
          )}
        </div>
      )}

      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          padding: '20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '11px',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-dim)',
            marginBottom: '8px',
          }}
        >
          {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
          <span>&bull;</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={12} />
            <span>{post.readingMinutes} min read</span>
          </span>
        </div>

        <h3
          style={{
            fontSize: '16px',
            fontWeight: 700,
            color: 'var(--text-main)',
            marginBottom: '8px',
            margin: '0 0 8px 0',
          }}
        >
          <Link
            href={`/blog/${post.slug}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            {post.title}
          </Link>
        </h3>

        <p
          style={{
            fontSize: '13px',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            marginBottom: '16px',
            flex: 1,
            margin: '0 0 16px 0',
          }}
        >
          {post.excerpt}
        </p>

        {post.tags && post.tags.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              paddingTop: '12px',
              borderTop: '1px solid var(--border)',
            }}
          >
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--bg-elevated)',
                  padding: '2px 8px',
                  fontSize: '10px',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-dim)',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
