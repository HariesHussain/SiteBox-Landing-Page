import React from 'react';
import { motion } from 'framer-motion';
import GlowCard from './ui/GlowCard';
import ScrollReveal from './ui/ScrollReveal';

export default function WhySection() {
  const cards = [
    {
      from: "Sending screenshots back and forth for feedback",
      title: "One link, real preview",
      desc: "Share a live preview link. The client sees the real site, on any device, before anything goes live."
    },
    {
      from: "Re-explaining project status over email",
      title: "A dashboard for every client",
      desc: "Track every project, every client, and where each site stands — in one workspace instead of scattered folders."
    },
    {
      from: "Wrestling with hosting just to go live",
      title: "Deploy in one click",
      desc: "Publish without touching servers, DNS, or config files. SiteBox handles the infrastructure."
    }
  ];

  return (
    <section 
      className="block light-theme dot-grid" 
      id="why" 
      style={{ 
        padding: '96px 0', 
        background: 'var(--bg-light)',
        position: 'relative'
      }}
    >
      <div className="grid-bg-overlay" />
      
      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
        <ScrollReveal className="section-head">
          <p className="eyebrow" style={{ color: 'var(--brass)' }}>Why people switch</p>
          <h2 className="serif" style={{ color: 'var(--ink-light)' }}>Built for client work, not hobby projects.</h2>
          <p style={{ color: 'var(--ink-soft-light)' }}>General-purpose builders weren't designed for the way agencies actually deliver sites.</p>
        </ScrollReveal>
        
        <div className="why-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '28px'
        }}>
          {cards.map((card, idx) => (
            <ScrollReveal 
              key={idx} 
              direction="up" 
              delay={idx * 0.15} 
              duration={0.6}
            >
              <GlowCard 
                glowColor="rgba(28, 30, 26, 0.03)"
                style={{
                  padding: '34px 30px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'var(--surface-light)',
                  color: 'var(--ink-light)'
                }}
              >
                {/* Animated strikethrough container */}
                <div style={{ 
                  fontSize: '0.88rem', 
                  color: 'var(--ink-soft-light)', 
                  marginBottom: '18px',
                  position: 'relative',
                  display: 'inline-block',
                  alignSelf: 'flex-start'
                }}>
                  <span style={{ opacity: 0.85 }}>{card.from}</span>
                  <svg style={{
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    width: '100%',
                    height: '2px',
                    pointerEvents: 'none',
                    overflow: 'visible'
                  }}>
                    <motion.line
                      x1="0"
                      y1="1"
                      x2="100%"
                      y2="1"
                      stroke="var(--ink-soft-light)"
                      strokeWidth="1.5"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + idx * 0.15, duration: 0.7, ease: 'easeInOut' }}
                    />
                  </svg>
                </div>
                
                <h3 className="serif" style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  marginBottom: '12px',
                  color: 'var(--ink-light)'
                }}>
                  {card.title}
                </h3>
                
                <p style={{
                  color: 'var(--ink-soft-light)',
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  marginTop: 'auto'
                }}>
                  {card.desc}
                </p>
              </GlowCard>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .why-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
