'use client';

import React, { useEffect, useState } from 'react';
import { getMedia, addMedia, deleteMedia } from '@/lib/api/media';
import { MediaItem } from '@/types';
import { formatFileSize, formatDate } from '@/lib/utils/format';
import { Copy, Plus, Search, Trash } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';

export default function AdminMediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  // Upload modal
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [altText, setAltText] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const data = await getMedia();
        setMedia(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleCopy = (itemUrl: string, id: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(itemUrl);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media asset?')) return;
    await deleteMedia(id);
    setMedia((prev) => prev.filter((m) => m.id !== id));
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !url) return;

    const added = await addMedia({
      name,
      url,
      size: 250000,
      type: 'image/jpeg',
      altText,
    });

    setMedia((prev) => [added, ...prev]);
    setIsUploadOpen(false);
    setName('');
    setUrl('');
    setAltText('');
  };

  const filtered = media.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      (m.altText && m.altText.toLowerCase().includes(search.toLowerCase()))
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
            Media Asset Library
          </h1>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4, marginBottom: 0 }}>
            Store and retrieve project screenshots, architecture diagrams &amp; receipts
          </p>
        </div>

        <Button
          size="sm"
          onClick={() => setIsUploadOpen(true)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
        >
          <Plus size={15} />
          <span>Add Media Asset</span>
        </Button>
      </div>

      {/* Search */}
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
            placeholder="Search assets by file name..."
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
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{filtered.length} files</span>
      </div>

      {/* Media Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 24,
        }}
      >
        {filtered.map((item) => (
          <div
            key={item.id}
            style={{
              overflow: 'hidden',
              borderRadius: 16,
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-card)',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ aspectRatio: '16/10', overflow: 'hidden', backgroundColor: 'var(--bg-subtle)', position: 'relative' }}>
              <img
                src={item.url}
                alt={item.altText || item.name}
                style={{
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>

            <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <p
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--text-main)',
                  margin: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.name}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.625rem', color: 'var(--text-dim)' }}>
                <span>{formatFileSize(item.size)}</span>
                <span>{formatDate(item.createdAt)}</span>
              </div>

              <div
                style={{
                  paddingTop: 12,
                  borderTop: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <button
                  type="button"
                  onClick={() => handleCopy(item.url, item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <Copy size={13} />
                  <span>{copiedId === item.id ? 'Copied' : 'Copy URL'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  aria-label="Delete asset"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-dim)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Trash size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Asset Modal */}
      <Modal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        title="Register Image or Asset URL"
      >
        <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 8 }}>
          <Input
            label="File Name *"
            placeholder="e.g. telemetry-dashboard-v2.png"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="Image / Hosted Asset URL *"
            placeholder="https://images.unsplash.com/..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <Input
            label="Alt Text Description"
            placeholder="Accessibility description for screen readers"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 16 }}>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsUploadOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Asset</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
