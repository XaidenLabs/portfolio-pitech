'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getProjects, deleteProject, saveProject } from '@/lib/api/projects';
import { Project } from '@/types';
import { formatDate } from '@/lib/utils/format';
import { ArrowUpRight, Plus, Search, Star, Trash } from '@/components/ui/icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function AdminProjectsListPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const data = await getProjects('all');
        setProjects(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleToggleFeatured = async (project: Project) => {
    const updated = await saveProject({ ...project, featured: !project.featured });
    setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    await deleteProject(id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
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
            Projects Portfolio
          </h1>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4, marginBottom: 0 }}>
            Manage showcase case studies, client work &amp; technical deliverables
          </p>
        </div>

        <Link href="/admin/projects/new" style={{ textDecoration: 'none' }}>
          <Button size="sm" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Plus size={15} />
            <span>Add New Project</span>
          </Button>
        </Link>
      </div>

      {/* Filter and search */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 16,
          borderRadius: 16,
          border: '1px solid var(--border)',
          backgroundColor: 'var(--bg-card)',
          gap: 16,
        }}
      >
        <div style={{ position: 'relative', width: '100%', maxWidth: 360 }}>
          <Search
            size={15}
            style={{
              position: 'absolute',
              left: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-dim)',
            }}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            style={{
              width: '100%',
              borderRadius: 10,
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-subtle)',
              paddingLeft: 36,
              paddingRight: 12,
              paddingTop: 8,
              paddingBottom: 8,
              fontSize: '0.75rem',
              color: 'var(--text-main)',
              outline: 'none',
            }}
          />
        </div>

        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{filtered.length} total</span>
      </div>

      {/* Projects Table */}
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
                <th style={{ padding: '12px 16px' }}>Project</th>
                <th style={{ padding: '12px 16px' }}>Category</th>
                <th style={{ padding: '12px 16px' }}>Featured</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
                <th style={{ padding: '12px 16px' }}>Updated</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((proj) => (
                <tr
                  key={proj.id}
                  style={{
                    borderBottom: '1px solid var(--border-subtle)',
                    transition: 'background-color 150ms ease',
                  }}
                >
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <img
                        src={proj.coverImage}
                        alt={proj.title}
                        style={{
                          height: 40,
                          width: 56,
                          borderRadius: 8,
                          objectFit: 'cover',
                          border: '1px solid var(--border)',
                        }}
                      />
                      <div>
                        <p style={{ fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
                          {proj.title}
                        </p>
                        <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                          {proj.clientName || 'Personal'} &bull; {proj.year}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px', textTransform: 'uppercase', fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    {proj.category}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <button
                      type="button"
                      onClick={() => handleToggleFeatured(proj)}
                      style={{
                        padding: 4,
                        borderRadius: 8,
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: proj.featured ? 'var(--warning)' : 'var(--text-dim)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Star size={16} />
                    </button>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <Badge
                      variant={proj.status === 'published' ? 'success' : 'secondary'}
                      size="sm"
                    >
                      {proj.status}
                    </Badge>
                  </td>
                  <td style={{ padding: '14px 16px', color: 'var(--text-muted)' }}>
                    {formatDate(proj.updatedAt)}
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                      <Link
                        href={`/projects/${proj.slug}`}
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
                        onClick={() => handleDelete(proj.id)}
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
