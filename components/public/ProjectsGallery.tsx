'use client';

import React, { useState, useMemo } from 'react';
import { Project } from '@/types';
import { ProjectCard } from './ProjectCard';
import { Search } from '../ui/icons';

interface ProjectsGalleryProps {
  initialProjects: Project[];
}

export function ProjectsGallery({ initialProjects }: ProjectsGalleryProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'AI & Systems',
    'Web Apps',
    'Mobile',
    'Fintech & Invoicing',
  ];

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.summary.toLowerCase().includes(search.toLowerCase()) ||
        project.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

      const matchesCat =
        selectedCategory === 'All' ||
        project.category.toLowerCase() === selectedCategory.toLowerCase() ||
        (project.industry &&
          project.industry.toLowerCase().includes(selectedCategory.toLowerCase()));

      return matchesSearch && matchesCat;
    });
  }, [initialProjects, search, selectedCategory]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Search and Filters Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          padding: '16px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)',
          backgroundColor: 'var(--bg-subtle)',
        }}
      >
        {/* Category Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              style={{
                borderRadius: 'var(--radius-full)',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: selectedCategory === cat ? 600 : 500,
                cursor: 'pointer',
                border: selectedCategory === cat ? '1px solid var(--primary)' : '1px solid var(--border)',
                backgroundColor: selectedCategory === cat ? 'var(--primary)' : 'var(--bg-card)',
                color: selectedCategory === cat ? 'var(--primary-text)' : 'var(--text-muted)',
                boxShadow: selectedCategory === cat ? 'var(--shadow-sm)' : 'none',
                transition: 'all 0.15s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '280px' }}>
          <Search
            size={14}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-dim)',
            }}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search work or stack..."
            style={{
              width: '100%',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-card)',
              padding: '7px 14px 7px 34px',
              fontSize: '12px',
              color: 'var(--text-main)',
              outline: 'none',
              boxSizing: 'border-box',
              fontFamily: 'inherit',
            }}
          />
        </div>
      </div>

      {/* Grid */}
      {filteredProjects.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div
          style={{
            padding: '80px 20px',
            textAlign: 'center',
            borderRadius: 'var(--radius-lg)',
            border: '1px dashed var(--border)',
          }}
        >
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>
            No projects matched your search criteria.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch('');
              setSelectedCategory('All');
            }}
            style={{
              marginTop: '12px',
              background: 'none',
              border: 'none',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--text-main)',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
