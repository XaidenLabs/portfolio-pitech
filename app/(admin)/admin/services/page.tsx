'use client';

import React, { useEffect, useState } from 'react';
import { getServices, saveService, getTestimonials, saveTestimonial } from '@/lib/api/services';
import { Service, Testimonial } from '@/types';
import { formatCurrency } from '@/lib/utils/format';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input, Textarea } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { Plus, Star } from '@/components/ui/icons';

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal for new service
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [serviceName, setServiceName] = useState('');
  const [serviceSummary, setServiceSummary] = useState('');
  const [servicePrice, setServicePrice] = useState<number>(3000);
  const [deliverablesStr, setDeliverablesStr] = useState('Production codebase, Staging deployment, CI/CD setup');

  useEffect(() => {
    async function load() {
      try {
        const [servs, tests] = await Promise.all([
          getServices(false),
          getTestimonials(false),
        ]);
        setServices(servs);
        setTestimonials(tests);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleToggleService = async (service: Service) => {
    const updated = await saveService({ ...service, visible: !service.visible });
    setServices((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  };

  const handleToggleTestimonial = async (test: Testimonial) => {
    const updated = await saveTestimonial({ ...test, visible: !test.visible });
    setTestimonials((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceName) return;

    const deliverables = deliverablesStr.split(',').map((d) => d.trim()).filter(Boolean);
    const created = await saveService({
      name: serviceName,
      summary: serviceSummary,
      description: serviceSummary,
      deliverables,
      startingPrice: Number(servicePrice),
      order: services.length + 1,
      visible: true,
    });

    setServices((prev) => [...prev, created]);
    setIsServiceModalOpen(false);
    setServiceName('');
    setServiceSummary('');
  };

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
      {/* Services Management */}
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
              Service Offerings
            </h1>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4, marginBottom: 0 }}>
              Configure service cards, deliverables, and base package pricing
            </p>
          </div>

          <Button
            size="sm"
            onClick={() => setIsServiceModalOpen(true)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            <Plus size={15} />
            <span>Add Service Package</span>
          </Button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 24,
          }}
        >
          {services.map((serv) => (
            <div
              key={serv.id}
              style={{
                padding: 24,
                borderRadius: 16,
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-card)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
                    {serv.name}
                  </h3>
                  <Badge variant={serv.visible ? 'success' : 'secondary'} size="sm">
                    {serv.visible ? 'Visible' : 'Hidden'}
                  </Badge>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 16 }}>{serv.summary}</p>
                {serv.deliverables && (
                  <ul style={{ fontSize: '0.75rem', color: 'var(--text-muted)', listStyle: 'none', padding: 0, margin: '0 0 16px 0', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {serv.deliverables.map((d, i) => (
                      <li key={i}>&bull; {d}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div
                style={{
                  paddingTop: 16,
                  borderTop: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.75rem',
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-main)' }}>
                  {serv.startingPrice ? formatCurrency(serv.startingPrice, 'USD') : 'Custom'}
                </span>
                <button
                  type="button"
                  onClick={() => handleToggleService(serv)}
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
                  {serv.visible ? 'Hide from site' : 'Show on site'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Management */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
        <div>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'var(--text-main)',
              margin: 0,
            }}
          >
            Client Testimonials
          </h2>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4, marginBottom: 0 }}>
            Manage endorsements, reviews, and featured client quotes
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
          }}
        >
          {testimonials.map((test) => (
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
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--warning)', marginBottom: 12 }}>
                  {[...Array(test.rating || 5)].map((_, i) => (
                    <Star key={i} size={14} />
                  ))}
                </div>
                <blockquote style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: 16, lineHeight: 1.6 }}>
                  &ldquo;{test.quote}&rdquo;
                </blockquote>
              </div>

              <div
                style={{
                  paddingTop: 16,
                  borderTop: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.75rem',
                }}
              >
                <div>
                  <p style={{ fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>{test.name}</p>
                  <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>{test.company}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleTestimonial(test)}
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
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Service Modal */}
      <Modal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        title="Add Service Package"
      >
        <form onSubmit={handleCreateService} style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 8 }}>
          <Input
            label="Service Title *"
            placeholder="e.g. Cloud Architecture &amp; DevOps"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            required
          />
          <Textarea
            label="Summary &amp; Description"
            placeholder="Detailed description of what this service covers..."
            rows={3}
            value={serviceSummary}
            onChange={(e) => setServiceSummary(e.target.value)}
            required
          />
          <Input
            label="Starting Price (USD)"
            type="number"
            value={servicePrice}
            onChange={(e) => setServicePrice(parseFloat(e.target.value) || 0)}
          />
          <Input
            label="Deliverables (comma-separated)"
            value={deliverablesStr}
            onChange={(e) => setDeliverablesStr(e.target.value)}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 16 }}>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsServiceModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Service</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
