'use client';

import React, { useEffect, useState } from 'react';
import { getTestimonials, saveTestimonial, deleteTestimonial } from '@/lib/api/services';
import { Testimonial } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input, Select, Textarea } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { Plus, Search, Star, Trash } from '@/components/ui/icons';

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Modal for new testimonial
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [photo, setPhoto] = useState('');
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await getTestimonials(false);
        setTestimonials(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleToggleVisibility = async (testimonial: Testimonial) => {
    const updated = await saveTestimonial({ ...testimonial, visible: !testimonial.visible });
    setTestimonials((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    await deleteTestimonial(id);
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  const handleCreateTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !quote) {
      alert('Please provide a client name and quote.');
      return;
    }

    setSaving(true);
    try {
      const created = await saveTestimonial({
        name,
        role: role || undefined,
        company: company || undefined,
        photo: photo || undefined,
        quote,
        rating: Number(rating),
        visible: true,
      });

      setTestimonials((prev) => [...prev, created]);
      setIsModalOpen(false);
      setName('');
      setRole('');
      setCompany('');
      setPhoto('');
      setQuote('');
      setRating(5);
    } catch {
      alert('Failed to save testimonial');
    } finally {
      setSaving(false);
    }
  };

  const filtered = testimonials.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      (t.company && t.company.toLowerCase().includes(search.toLowerCase())) ||
      t.quote.toLowerCase().includes(search.toLowerCase())
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
      {/* Top Header */}
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
            Client Testimonials
          </h1>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4, marginBottom: 0 }}>
            Manage client reviews, endorsements, ratings, and homepage visibility
          </p>
        </div>

        <Button
          size="sm"
          onClick={() => setIsModalOpen(true)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
        >
          <Plus size={15} />
          <span>Add Testimonial</span>
        </Button>
      </div>

      {/* Filter and Search Bar */}
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
            placeholder="Search testimonials by name, company, or quote..."
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
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {filtered.length} total
        </span>
      </div>

      {/* Testimonials Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 20,
        }}
      >
        {filtered.map((test) => (
          <div
            key={test.id}
            style={{
              padding: 24,
              borderRadius: 16,
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-card)',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 16,
            }}
          >
            <div>
              {/* Top rating & badge */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 3, color: 'var(--warning)' }}>
                  {[...Array(test.rating || 5)].map((_, i) => (
                    <Star key={i} size={15} />
                  ))}
                </div>
                <Badge variant={test.visible ? 'success' : 'secondary'} size="sm">
                  {test.visible ? 'Visible' : 'Hidden'}
                </Badge>
              </div>

              {/* Quote text */}
              <blockquote
                style={{
                  fontSize: '0.8125rem',
                  lineHeight: 1.6,
                  color: 'var(--text-main)',
                  fontStyle: 'italic',
                  margin: 0,
                  marginBottom: 16,
                }}
              >
                &ldquo;{test.quote}&rdquo;
              </blockquote>
            </div>

            {/* Author details & actions */}
            <div
              style={{
                paddingTop: 16,
                borderTop: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {test.photo ? (
                  <img
                    src={test.photo}
                    alt={test.name}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '1px solid var(--border)',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      backgroundColor: 'var(--bg-elevated)',
                      border: '1px solid var(--border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      color: 'var(--text-main)',
                    }}
                  >
                    {test.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p style={{ fontWeight: 700, fontSize: '0.8125rem', color: 'var(--text-main)', margin: 0 }}>
                    {test.name}
                  </p>
                  <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                    {test.role ? `${test.role}, ` : ''}{test.company || 'Client'}
                  </p>
                </div>
              </div>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                <button
                  type="button"
                  onClick={() => handleToggleVisibility(test)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                >
                  {test.visible ? 'Hide' : 'Show'}
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(test.id)}
                  aria-label="Delete testimonial"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-dim)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 4,
                  }}
                >
                  <Trash size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Testimonial Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Client Testimonial"
      >
        <form onSubmit={handleCreateTestimonial} style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 8 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Input
              label="Client Name *"
              placeholder="e.g. Sarah Jenkins"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="Company Name"
              placeholder="e.g. Apex Global UK"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Input
              label="Client Role / Title"
              placeholder="e.g. Head of Digital Product"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
            <Select
              label="Rating (Stars)"
              value={String(rating)}
              onChange={(e) => setRating(parseInt(e.target.value, 10) || 5)}
              options={[
                { value: '5', label: '5 Stars (★★★★★)' },
                { value: '4', label: '4 Stars (★★★★☆)' },
                { value: '3', label: '3 Stars (★★★☆☆)' },
              ]}
            />
          </div>

          <Input
            label="Avatar Photo URL (Optional)"
            placeholder="https://images.unsplash.com/..."
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />

          <Textarea
            label="Quote / Review Text *"
            placeholder="What the client said about the engineering deliverables, velocity, or impact..."
            rows={4}
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            required
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 16 }}>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={saving}>
              Save Testimonial
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
