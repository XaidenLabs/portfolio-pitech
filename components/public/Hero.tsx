'use client';

import React from 'react';
import Link from 'next/link';

export function Hero() {
  const marqueeItems = [
    'Dashboard',
    'Website Design',
    'Wireframe',
    'Prototype',
    'Mobile App Design',
    'Design System',
    'FinTech Billing',
    'Systems Architecture',
    'Multi-Currency Invoicing',
  ];

  const socialLinks = [
    {
      name: 'X',
      href: 'https://x.com',
      icon: (
        <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: 'https://github.com',
      icon: (
        <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: (
        <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      ),
    },
    {
      name: 'Dribbble',
      href: 'https://dribbble.com',
      icon: (
        <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm7.42 6.13c-.87-.4-2.88-.34-4.88.24-.13-.3-.26-.6-.4-.9-.8-1.74-1.75-3.32-2.07-3.83 2.87.5 5.33 2.11 7.35 4.49zm-8.87-4.2c.36.56 1.3 2.1 2.07 3.8-.75.24-1.54.53-2.36.87-1.72.7-3.36 1.55-4.5 2.22.92-3.23 3.03-5.85 4.79-6.89zm-6.52 8.7c1.19-.7 2.92-1.58 4.74-2.3.83-.34 1.63-.63 2.4-.87.42.92.8 1.86 1.13 2.81-2.9.89-5.93 2.92-7.51 4.54-.53-1.27-.82-2.67-.76-4.18zm8.68 7.37c-.36-.59-1.34-2.22-2.13-4.04 1.6-.33 3.32-.47 5.09-.38.16.88.19 1.77.08 2.64-1.04.99-2.08 1.61-3.04 1.78zm4.51-3.3c-1.63-.1-3.23.03-4.71.34-.3-.88-.65-1.75-1.04-2.61 2-.59 4.1-.66 5.05-.28.48.74.75 1.63.7 2.55zm-8.2 2.8c-2.48-.4-4.63-1.84-5.94-3.83 1.4-1.46 4.19-3.29 6.84-4.1.75 1.73 1.68 3.3 2.03 3.88-1.01 1.77-2.14 3.2-2.93 4.05z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        padding: '110px 20px 0',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* Centered Top Column: Badge, Headline, Subtitle */}
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Rotating Circular Stamp: "HIRE ME • HIRE ME •" (Desktop only) */}
        <Link
          href="/contact"
          aria-label="Hire Me Contact"
          className="desktop-only-stamp"
          style={{
            position: 'absolute',
            top: '0px',
            right: 'clamp(8px, 4vw, 40px)',
            textDecoration: 'none',
            zIndex: 10,
            display: 'block',
          }}
        >
            <div
              className="animate-spin-slow"
              style={{
                width: 'clamp(85px, 9vw, 110px)',
                height: 'clamp(85px, 9vw, 110px)',
                cursor: 'pointer',
                filter: 'drop-shadow(0 10px 22px rgba(20, 20, 22, 0.22))',
                transition: 'transform 0.2s ease',
              }}
            >
              <svg viewBox="0 0 110 110" width="100%" height="100%" style={{ overflow: 'visible' }}>
                <defs>
                  <path
                    id="stampTextPath"
                    d="M 55, 55 m -32, 0 a 32,32 0 1,1 64,0 a 32,32 0 1,1 -64,0"
                  />
                </defs>
                {/* 24-point Scalloped Outer Seal */}
                <polygon
                  points="107.0,55.0 100.9,67.2 99.9,80.9 90.9,90.9 80.9,99.9 67.2,100.9 55.0,107.0 42.8,100.9 29.1,99.9 19.1,90.9 10.1,80.9 9.1,67.2 3.0,55.0 9.1,42.8 10.1,29.1 19.1,19.1 29.1,10.1 42.8,9.1 55.0,3.0 67.2,9.1 80.9,10.1 90.9,19.1 99.9,29.1 100.9,42.8"
                  fill="#141416"
                  stroke="rgba(255, 255, 255, 0.15)"
                  strokeWidth="1"
                />
                {/* Center Orange Disc */}
                <circle cx="55" cy="55" r="16" fill="#FF9E00" />
                {/* Center Arrow */}
                <path
                  d="M48 55 H62 M57 50 L62 55 L57 60"
                  stroke="#141416"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Circular Text */}
                <text
                  fill="#FFFFFF"
                  fontSize="8.5px"
                  fontWeight="900"
                  letterSpacing="2.8px"
                  style={{ textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}
                >
                  <textPath href="#stampTextPath" startOffset="50%" textAnchor="middle">
                    HIRE ME &bull; HIRE ME &bull;
                  </textPath>
                </text>
              </svg>
            </div>
          </Link>

        {/* 1. Award-Winning Pill Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 18px',
            borderRadius: '9999px',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '12px',
          }}
        >
          <div
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: '#141416',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FF9E00',
              fontSize: '11px',
            }}
          >
            🏅
          </div>
          <span
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--text-main)',
              letterSpacing: '-0.01em',
            }}
          >
            Award-Winning Product Designer
          </span>
        </div>

        {/* 2. Headline with Warm Amber Highlight and Doodle Sparkle */}
        <h1
          style={{
            fontSize: 'clamp(38px, 5.8vw, 70px)',
            fontWeight: 800,
            letterSpacing: '-0.035em',
            lineHeight: 1.1,
            color: 'var(--text-main)',
            margin: '0 0 8px 0',
          }}
        >
          I&apos;m <span style={{ color: '#FF9E00' }}>Jenny Scott</span>
          <span
            style={{
              display: 'inline-block',
              marginLeft: '8px',
              verticalAlign: 'middle',
              color: 'var(--text-main)',
            }}
          >
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
              <path
                d="M12 2L14.2 9.2L21.5 11.5L14.2 13.8L12 21L9.8 13.8L2.5 11.5L9.8 9.2L12 2Z"
                fill="currentColor"
              />
              <circle cx="19" cy="5" r="2" fill="#FF9E00" />
            </svg>
          </span>
        </h1>

        <p
          style={{
            fontSize: 'clamp(14px, 1.8vw, 17px)',
            color: 'var(--text-muted)',
            fontWeight: 500,
            margin: '0 0 24px 0',
          }}
        >
          Product Designer based in USA &bull; Technical Architect for Global FinTechs
        </p>
      </div>

      {/* 3. Hero Visual Stage (3-Column Layout: Left Cards, Center Portrait, Right Badges) */}
      <div
        style={{
          maxWidth: '1140px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}
        className="hero-grid-stage"
      >
        {/* Left Column: Socials + Client Reviews */}
        <div className="hero-left-col">
          {/* Follow Me On */}
          <div>
            <p
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--text-main)',
                margin: '0 0 12px 0',
              }}
            >
              Follow Me On
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="hero-social-list">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.name}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#141416',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none',
                    transition: 'transform 0.15s ease, background-color 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.backgroundColor = '#FF9E00';
                    e.currentTarget.style.color = '#141416';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.backgroundColor = '#141416';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* 350+ Reviews Social Proof */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/review_avatars.png"
              alt="Valued Clients"
              style={{ width: '160px', height: 'auto', display: 'block' }}
            />
            <div>
              <p
                style={{
                  fontSize: '15px',
                  fontWeight: 800,
                  color: '#FF9E00',
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                350+ Reviews <span style={{ color: 'var(--text-main)', fontWeight: 700 }}>(4.9 of 5)</span>
              </p>
              <p
                style={{
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  margin: '3px 0 0 0',
                }}
              >
                Reviews from Valued Clients
              </p>
            </div>
          </div>
        </div>

        {/* Center Column: Portrait with Dual Pill CTA Capsule */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className="hero-center-col"
        >
          {/* Subtle Warm Halo Background */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'clamp(280px, 35vw, 420px)',
              height: 'clamp(280px, 35vw, 420px)',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 158, 0, 0.12) 0%, rgba(255, 158, 0, 0.02) 65%, transparent 70%)',
              zIndex: 0,
              pointerEvents: 'none',
            }}
          />

          {/* Designer Portrait (Smiling with cap and glasses) */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              width: 'clamp(280px, 34vw, 430px)',
              maxHeight: '480px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero_face_perfect.png"
              alt="Jenny Scott"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'contain',
              }}
            />
          </div>

          {/* Dual Pill Button Container (Overlapping bottom of portrait) */}
          <div
            style={{
              position: 'relative',
              marginTop: '-24px',
              zIndex: 3,
              display: 'inline-flex',
              alignItems: 'center',
              borderRadius: '9999px',
              backgroundColor: '#FFFFFF',
              padding: '6px',
              boxShadow: '0 14px 30px -4px rgba(20, 20, 22, 0.16)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              gap: '6px',
            }}
          >
            {/* Orange Button: Portfolio → */}
            <Link
              href="/projects"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '9999px',
                backgroundColor: '#FF9E00',
                color: '#141416',
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'transform 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <span>Portfolio</span>
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: '#141416',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                }}
              >
                &rarr;
              </div>
            </Link>

            {/* White Button: Hire Me */}
            <Link
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '9999px',
                backgroundColor: '#FFFFFF',
                color: '#141416',
                border: '1.5px solid #141416',
                padding: '10px 22px',
                fontSize: '14px',
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'background-color 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-subtle)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
              }}
            >
              Hire Me
            </Link>
          </div>
        </div>

        {/* Right Column: Testimonial Quote + Skill Pill Cluster */}
        <div className="hero-right-col">
          {/* Quote Block */}
          <div style={{ maxWidth: '280px' }} className="hero-quote-block">
            <span
              style={{
                fontSize: '44px',
                fontWeight: 900,
                color: '#FF9E00',
                lineHeight: 0.8,
                display: 'block',
                fontFamily: 'serif',
                marginBottom: '4px',
              }}
            >
              &ldquo;
            </span>
            <p
              style={{
                fontSize: '14.5px',
                fontWeight: 600,
                color: 'var(--text-main)',
                lineHeight: 1.4,
                margin: 0,
              }}
            >
              Highly Professional Product Designer with Great Creativity!
            </p>
          </div>

          {/* Group of Floating Skill Badges (Black & Orange alternating pills) */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              alignItems: 'flex-start',
            }}
            className="hero-skill-cluster"
          >
            {/* Row 1: Prototype + Dashboard */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  display: 'inline-block',
                  backgroundColor: '#141416',
                  color: '#FFFFFF',
                  padding: '7px 16px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                }}
              >
                Prototype
              </span>
              <span
                style={{
                  display: 'inline-block',
                  backgroundColor: '#FF9E00',
                  color: '#141416',
                  padding: '7px 16px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                }}
              >
                Dashboard
              </span>
            </div>

            {/* Row 2: Star + Mobile App Design */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  backgroundColor: '#FF9E00',
                  color: '#141416',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                }}
              >
                ✦
              </div>
              <span
                style={{
                  display: 'inline-block',
                  backgroundColor: '#141416',
                  color: '#FFFFFF',
                  padding: '7px 16px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontWeight: 600,
                }}
              >
                Mobile App Design
              </span>
            </div>

            {/* Row 3: Website + Design System */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  display: 'inline-block',
                  backgroundColor: '#141416',
                  color: '#FFFFFF',
                  padding: '7px 16px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontWeight: 600,
                }}
              >
                Website
              </span>
              <span
                style={{
                  display: 'inline-block',
                  backgroundColor: '#FF9E00',
                  color: '#141416',
                  padding: '7px 16px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontWeight: 700,
                }}
              >
                Design System
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Full-Width Striking Dark Marquee Ribbon with Orange 4-Point Stars */}
      <div
        style={{
          width: 'calc(100% + 40px)',
          marginLeft: '-20px',
          marginRight: '-20px',
          backgroundColor: '#141416',
          borderTop: '2.5px solid #FF9E00',
          borderBottom: '2.5px solid #FF9E00',
          padding: '18px 0',
          marginTop: '48px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div className="animate-marquee">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '24px',
                padding: '0 24px',
                whiteSpace: 'nowrap',
              }}
            >
              <span
                style={{
                  color: '#FFFFFF',
                  fontSize: 'clamp(18px, 2.2vw, 24px)',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                }}
              >
                {item}
              </span>
              <span
                style={{
                  color: '#FF9E00',
                  fontSize: '18px',
                  display: 'inline-block',
                  textShadow: '0 0 10px rgba(255, 158, 0, 0.6)',
                }}
              >
                ✦
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .hero-grid-stage {
            grid-template-columns: 1fr !important;
            justify-items: center !important;
            text-align: center !important;
          }
          .hero-left-col,
          .hero-right-col {
            align-items: center !important;
            padding-bottom: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}
