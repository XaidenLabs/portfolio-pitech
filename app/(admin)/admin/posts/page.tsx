'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getPosts, deletePost } from '@/lib/api/posts';
import { Post } from '@/types';
import { formatDate } from '@/lib/utils/format';
import { ArrowUpRight, Plus, Trash } from '@/components/ui/icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function AdminPostsListPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const data = await getPosts('all');
        setPosts(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    await deletePost(id);
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{ display: 'flex', height: 260, alignItems: 'center', justifyContent: 'center' }}>
        <div
          style={{
            height: 32,
            width: 32,
            borderRadius: '50%',
            border: '3px solid var(--border)',
            borderTopColor: 'var(--primary)',
            animation: 'spin 0.8s linear infinite',
          }}
        />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'var(--text-main)',
              margin: 0,
            }}
          >
            Blog Articles &amp; Insights
          </h1>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4, marginBottom: 0 }}>
            Write and publish technical engineering guides and billing architectures
          </p>
        </div>

        <Link href="/admin/posts/new" style={{ textDecoration: 'none' }}>
          <Button size="sm" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Plus size={15} />
            <span>New Article</span>
          </Button>
        </Link>
      </div>

      <div
        style={{
          borderRadius: 16,
          border: '1px solid var(--border)',
          backgroundColor: 'var(--bg-card)',
          boxShadow: 'var(--shadow-sm)',
          overflow: 'hidden',
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
            <thead>
              <tr
                style={{
                  borderBottom: '1px solid var(--border)',
                  backgroundColor: 'var(--bg-subtle)',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--text-dim)',
                }}
              >
                <th style={{ padding: '12px 16px' }}>Title</th>
                <th style={{ padding: '12px 16px' }}>Category</th>
                <th style={{ padding: '12px 16px' }}>Reading Time</th>
                <th style={{ padding: '12px 16px' }}>Published Date</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((post) => (
                <tr
                  key={post.id}
                  style={{
                    borderBottom: '1px solid var(--border-subtle)',
                    transition: 'background-color 150ms ease',
                  }}
                >
                  <td style={{ padding: '14px 16px' }}>
                    <p style={{ fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>{post.title}</p>
                    <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', margin: '2px 0 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 360 }}>
                      {post.excerpt}
                    </p>
                  </td>
                  <td style={{ padding: '14px 16px', color: 'var(--text-muted)' }}>
                    {post.category || 'Engineering'}
                  </td>
                  <td style={{ padding: '14px 16px', color: 'var(--text-muted)' }}>
                    {post.readingMinutes} min
                  </td>
                  <td style={{ padding: '14px 16px', color: 'var(--text-muted)' }}>
                    {post.publishedAt ? formatDate(post.publishedAt) : 'Draft'}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <Badge
                      variant={post.status === 'published' ? 'success' : 'secondary'}
                      size="sm"
                    >
                      {post.status}
                    </Badge>
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          padding: 4,
                          color: 'var(--text-muted)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <ArrowUpRight size={15} />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(post.id)}
                        style={{
                          padding: 4,
                          color: 'var(--text-dim)',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Trash size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
