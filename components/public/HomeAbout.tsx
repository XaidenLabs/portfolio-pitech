'use client';

import React from 'react';

export function HomeAbout() {
  const photos = [
    {
      id: 1,
      caption: 'Playing soccer on weekends',
      url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 2,
      caption: 'Speaking at tech conference',
      url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 3,
      caption: 'Northern lights & travels',
      url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <section
      style={{
        padding: '48px 20px 64px',
        maxWidth: 1040,
        margin: '0 auto',
        width: '100%',
      }}
    >
      <div style={{ maxWidth: 780, marginBottom: 32 }}>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: 'var(--text-main)',
            margin: '0 0 16px 0',
          }}
        >
          About me
        </h2>

        <p
          style={{
            fontSize: '15px',
            fontWeight: 600,
            color: 'var(--text-main)',
            lineHeight: 1.6,
            margin: '0 0 12px 0',
          }}
        >
          I also code, speak in English and French, play soccer and volleyball.
        </p>

        <p
          style={{
            fontSize: '13px',
            lineHeight: 1.7,
            color: 'var(--text-muted)',
            margin: 0,
          }}
        >
          When I&apos;m not designing products or architecting systems, you&apos;ll find me reading whitepapers, building open-source developer tools, or exploring design aesthetics across West Africa and Europe. I believe the best software feels weightless, responsive, and deeply human.
        </p>
      </div>

      {/* Photo Collage */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 18,
        }}
      >
        {photos.map((photo) => (
          <div
            key={photo.id}
            style={{
              borderRadius: 20,
              overflow: 'hidden',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-card)',
              boxShadow: 'var(--shadow-sm)',
              aspectRatio: '4/3',
              position: 'relative',
            }}
          >
            <img
              src={photo.url}
              alt={photo.caption}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
