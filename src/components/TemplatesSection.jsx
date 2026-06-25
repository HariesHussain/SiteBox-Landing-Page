import React from 'react';
import { motion } from 'framer-motion';
import GlowCard from './ui/GlowCard';
import ScrollReveal from './ui/ScrollReveal';

export default function TemplatesSection() {
  const templates = [
    {
      colors: ['#1F3D30', '#A8793E', '#F4F2ED'], // Restaurants
      img: '/restaurants.png',
      title: "Restaurants & Cafes",
    },
    {
      colors: ['#172E24', '#C3B091', '#E6DFD3'], // Clinics
      title: "Clinics",
    },
    {
      colors: ['#1A3327', '#B58D53', '#FAF7F2'], // Salons
      img: '/salons.png',
      title: "Salons",
    },
    {
      colors: ['#224434', '#9F753E', '#EFECE6'], // Gyms
      title: "Gyms",
    }
  ];

  return (
    <section 
      className="block light-theme dot-grid" 
      id="templates" 
      style={{ 
        padding: '0 0 96px', 
        background: 'var(--bg-light)',
        position: 'relative'
      }}
    >
      <div className="grid-bg-overlay" />

      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
        <ScrollReveal className="section-head" style={{ maxWidth: '620px', margin: '0 auto 48px', textAlign: 'center' }}>
          <h2 className="serif" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', color: 'var(--ink-light)' }}>
            Templates built for real businesses
          </h2>
        </ScrollReveal>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="tmpl-scroll-container">
          <div className="tmpl-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '18px'
          }}>
            {templates.map((tmpl, idx) => (
              <ScrollReveal
                key={idx}
                direction="up"
                delay={idx * 0.08}
                duration={0.5}
                style={{ height: '100%' }}
              >
                <GlowCard
                  glowColor="rgba(28, 30, 26, 0.03)"
                  style={{
                    background: 'var(--surface-light)',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    padding: '12px',
                    color: 'var(--ink-light)',
                    cursor: 'pointer'
                  }}
                >
                  {/* Swatch bars or Image */}
                  <div style={{
                    height: '110px',
                    display: tmpl.img ? 'block' : 'grid',
                    gridTemplateColumns: tmpl.img ? 'none' : '1.2fr 1fr 1fr',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: '1.8px solid var(--border-light)',
                    marginBottom: '14px',
                    position: 'relative'
                  }}>
                    {tmpl.img ? (
                      <img src={tmpl.img} alt={tmpl.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    ) : (
                      <>
                        <div style={{ background: tmpl.colors[0], height: '100%' }} />
                        <div style={{ background: tmpl.colors[1], height: '100%' }} />
                        <div style={{ background: tmpl.colors[2], height: '100%' }} />
                      </>
                    )}
                  </div>
                  
                  {/* Title */}
                  <h5 style={{
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    textAlign: 'center',
                    marginBottom: '6px',
                    color: 'var(--ink-light)'
                  }}>
                    {tmpl.title || "Salons"}
                  </h5>
                </GlowCard>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal direction="up" delay={0.3} className="tmpl-more" style={{ textAlign: 'center', marginTop: '40px' }}>
          <a href="#" className="btn btn-ghost">
            Browse all templates
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              style={{ display: 'inline-block', marginLeft: '4px' }}
            >
              →
            </motion.span>
          </a>
        </ScrollReveal>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .tmpl-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 16px !important;
          }
        }
        @media (max-width: 680px) {
          .tmpl-scroll-container {
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 12px;
            margin: 0 -16px;
            padding-left: 16px;
            padding-right: 16px;
          }
          .tmpl-grid {
            display: flex !important;
            flex-direction: row !important;
            width: max-content;
            gap: 16px !important;
          }
          .tmpl-grid > div {
            width: 170px !important;
            scroll-snap-align: start;
            flex-shrink: 0;
          }
        }
      `}</style>
    </section>
  );
}
