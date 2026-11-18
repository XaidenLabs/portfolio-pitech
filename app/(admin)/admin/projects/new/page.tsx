'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { saveProject } from '@/lib/api/projects';
import { slugify } from '@/lib/utils/format';
import { ArrowLeft } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Input, Select, Textarea } from '@/components/ui/input';

export default function CreateProjectPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [summary, setSummary] = useState('');
  const [clientName, setClientName] = useState('');
  const [year, setYear] = useState<number>(2026);
  const [role, setRole] = useState('Principal Architect & Lead Engineer');
  const [category, setCategory] = useState('web app');
  const [industry, setIndustry] = useState('Fintech & Enterprise Systems');
  const [tagsInput, setTagsInput] = useState('Next.js, TypeScript, PostgreSQL, REST APIs');
  const [coverImage, setCoverImage] = useState(
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
  );
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [results, setResults] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [featured, setFeatured] = useState(true);
  const [status, setStatus] = useState<'published' | 'draft'>('published');
  const [saving, setSaving] = useState(false);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    setSlug(slugify(val));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    setSaving(true);
    try {
      const tags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean);
      await saveProject({
        title,
        slug: slug || slugify(title),
        summary,
        clientName,
        year: Number(year),
        role,
        category,
        industry,
        tags,
        coverImage,
        gallery: [coverImage],
        problem,
        solution,
        results,
        liveUrl: liveUrl || undefined,
        repoUrl: repoUrl || undefined,
        featured,
        status,
      });

      router.push('/admin/projects');
    } catch {
      alert('Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: 768, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Link
        href="/admin/projects"
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
        <span>Back to Projects</span>
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
            Create Engineering Case Study
          </h1>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4, marginBottom: 0 }}>
            Add a new portfolio project with technical problem, solution and impact breakdowns.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            <Input
              label="Project Title *"
              placeholder="e.g. Telemetry Fleet Tracker"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
            />
            <Input
              label="Slug (URL identifier)"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
          </div>

          <Textarea
            label="Brief Summary *"
            placeholder="One-to-two sentence executive summary of the project..."
            rows={2}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            <Input
              label="Client Name"
              placeholder="e.g. Apex Logistics"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
            <Input
              label="Year"
              type="number"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value) || 2026)}
            />
            <Select
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={[
                { value: 'web app', label: 'Web Application' },
                { value: 'branding', label: 'Branding & Design System' },
                { value: 'fintech', label: 'Fintech & Billing' },
                { value: 'mobile', label: 'Mobile App / PWA' },
              ]}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            <Input
              label="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
            <Input
              label="Industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            />
          </div>

          <Input
            label="Tech Stack Tags (comma-separated)"
            placeholder="Next.js, TypeScript, PostgreSQL, WebSockets"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
          />

          <Input
            label="Cover Image URL"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
          />

          {/* Deep Dive Case Study Sections */}
          <div
            style={{
              paddingTop: 16,
              borderTop: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
              Case Study Deep Dive Sections
            </h3>

            <Textarea
              label="The Problem &amp; Architecture Challenge"
              placeholder="What bottlenecks, scaling issues, or user frictions existed?"
              rows={3}
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
            />

            <Textarea
              label="The Solution &amp; Implementation"
              placeholder="How did you engineer the solution? Stack details, design decisions..."
              rows={3}
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
            />

            <Textarea
              label="Measurable Impact &amp; Results"
              placeholder="Uptime, performance metrics, conversion acceleration..."
              rows={3}
              value={results}
              onChange={(e) => setResults(e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            <Input
              label="Live Production URL"
              placeholder="https://clientdomain.com"
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
            />
            <Input
              label="Repository URL (Optional)"
              placeholder="https://github.com/..."
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 24, paddingTop: 8 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.75rem', color: 'var(--text-main)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                style={{ borderRadius: 4, accentColor: 'var(--primary)', cursor: 'pointer' }}
              />
              <span>Feature on Homepage</span>
            </label>

            <div style={{ width: 140 }}>
              <Select
                label=""
                value={status}
                onChange={(e) => setStatus(e.target.value as 'published' | 'draft')}
                options={[
                  { value: 'published', label: 'Published' },
                  { value: 'draft', label: 'Draft' },
                ]}
              />
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            isLoading={saving}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Publish Project &rarr;
          </Button>
        </form>
      </div>
    </div>
  );
}
