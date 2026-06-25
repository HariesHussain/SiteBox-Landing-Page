import React from 'react';
import { motion } from 'framer-motion';
import GlowCard from './ui/GlowCard';
import ScrollReveal from './ui/ScrollReveal';

export default function FeaturesSection() {
  const feats = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M21 12H3" />
          <path d="M12 21V3" />
        </svg>
      ),
      title: "Intuitive Editor",
      desc: "Intuitive editor reads the designers and wants to put a dynamic design."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: "Seamless Integrations",
      desc: "Seamless integrations, optimizes lead generation and seamless integrations."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      title: "Performance Optimized",
      desc: "Performance optimized that converts visitors and boosts loading times."
    }
  ];

  return (
    <section 
      className="block light-theme dot-grid" 
      id="features" 
      style={{ 
        padding: '96px 0 60px', 
        background: 'var(--bg-light)',
        position: 'relative'
      }}
    >
      <div className="grid-bg-overlay" />
      
      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
        <ScrollReveal className="section-head" style={{ maxWidth: '750px', textAlign: 'center', margin: '0 auto 56px' }}>
          <h2 className="serif" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: 'var(--ink-light)', textAlign: 'center' }}>
            Premium SiteBox page for website builder
          </h2>
        </ScrollReveal>

        <div className="feat-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px'
        }}>
          {feats.map((feat, idx) => (
            <ScrollReveal
              key={idx}
              direction="up"
              delay={idx * 0.1}
              duration={0.6}
            >
              <GlowCard
                glowColor="rgba(28, 30, 26, 0.03)"
                style={{
                  background: 'var(--surface-light)',
                  padding: '36px 30px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  color: 'var(--ink-light)'
                }}
              >
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '8px',
                  background: 'var(--green-tint)',
                  color: 'var(--green-deep)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <div style={{ width: '22px', height: '22px' }}>
                    {feat.icon}
                  </div>
                </div>

                <h4 style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: 'var(--ink-light)'
                }}>
                  {feat.title}
                </h4>

                <p style={{
                  fontSize: '0.92rem',
                  color: 'var(--ink-soft-light)',
                  lineHeight: '1.6'
                }}>
                  {feat.desc}
                </p>
              </GlowCard>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .feat-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
