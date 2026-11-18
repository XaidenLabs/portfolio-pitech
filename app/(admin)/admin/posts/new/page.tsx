'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { savePost } from '@/lib/api/posts';
import { slugify } from '@/lib/utils/format';
import { ArrowLeft } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Input, Select, Textarea } from '@/components/ui/input';

export default function CreatePostPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState(
    'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80'
  );
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('Engineering');
  const [tagsInput, setTagsInput] = useState('Next.js, Architecture, Billing');
  const [readingMinutes, setReadingMinutes] = useState(5);
  const [status, setStatus] = useState<'published' | 'draft'>('published');
  const [saving, setSaving] = useState(false);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    setSlug(slugify(val));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !body) {
      alert('Please provide a title and article body');
      return;
    }

    setSaving(true);
    try {
      const tags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean);
      await savePost({
        title,
        slug: slug || slugify(title),
        excerpt,
        coverImage,
        body,
        category,
        tags,
        readingMinutes: Number(readingMinutes),
        status,
      });

      router.push('/admin/posts');
    } catch {
      alert('Failed to save article');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: 768, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Link
        href="/admin/posts"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          fontSize: '0.75rem',
          fontWeight: 600,
          color: 'var(--text-muted)',
          textDecoration: 'none',
        }}
      >
        <ArrowLeft size={14} />
        <span>Back to Articles</span>
      </Link>

      <div
        style={{
          borderRadius: 24,
          border: '1px solid var(--border)',
          backgroundColor: 'var(--bg-card)',
          padding: 32,
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 20, marginBottom: 24 }}>
          <h1
            style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--text-main)',
              margin: 0,
            }}
          >
            Write New Technical Article
          </h1>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4, marginBottom: 0 }}>
            Publish insights, architecture breakdowns, and engineering notes.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            <Input
              label="Article Title *"
              placeholder="e.g. Architecting Multi-Currency Billing Flows"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
            />
            <Input
              label="Slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
          </div>

          <Textarea
            label="Excerpt / Abstract *"
            placeholder="A brief summary for previews and social sharing cards..."
            rows={2}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            required
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            <Select
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={[
                { value: 'Engineering', label: 'Engineering' },
                { value: 'Product Design', label: 'Product Design' },
                { value: 'Performance', label: 'Performance' },
                { value: 'Fintech', label: 'Fintech & Invoicing' },
              ]}
            />
            <Input
              label="Reading Time (Minutes)"
              type="number"
              min="1"
              value={readingMinutes}
              onChange={(e) => setReadingMinutes(parseInt(e.target.value) || 5)}
            />
            <Select
              label="Publish Status"
              value={status}
              onChange={(e) => setStatus(e.target.value as 'published' | 'draft')}
              options={[
                { value: 'published', label: 'Published' },
                { value: 'draft', label: 'Draft' },
              ]}
            />
          </div>

          <Input
            label="Tags (comma-separated)"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
          />

          <Input
            label="Cover Image URL"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
          />

          <Textarea
            label="Full Article Content (Markdown / Text) *"
            placeholder="Write your article markdown or paragraphs here..."
            rows={12}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />

          <Button
            type="submit"
            size="lg"
            isLoading={saving}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Publish Article &rarr;
          </Button>
        </form>
      </div>
    </div>
  );
}
