import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ui/ScrollReveal';

export default function CTASection() {
  return (
    <section 
      className="cta-final dot-grid" 
      style={{
        background: 'radial-gradient(circle at center, var(--green-glow) 0%, var(--bg) 100%)',
        borderTop: '1.8px solid var(--border)',
        borderBottom: '1.8px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
        padding: '110px 0'
      }}
    >
      {/* Vercel Grid overlay */}
      <div className="grid-bg-overlay" />

      <div className="wrap" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <ScrollReveal direction="up" delay={0.1} duration={0.6}>
          <h2 className="serif" style={{
            fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
            fontWeight: 500,
            maxWidth: '700px',
            margin: '0 auto 18px',
            lineHeight: '1.15',
            color: 'var(--ink)'
          }}>
            Stop juggling tools. Start shipping sites.
          </h2>
        </ScrollReveal>
        
        <ScrollReveal direction="up" delay={0.2} duration={0.6}>
          <p style={{
            color: 'var(--ink-soft)',
            maxWidth: '500px',
            margin: '0 auto 38px',
            fontSize: '1.08rem',
            lineHeight: '1.6'
          }}>
            Choose a template, customize it, and send your first client preview today.
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.3} duration={0.6}>
          <div className="hero-actions" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '18px',
            flexWrap: 'wrap'
          }}>
            <a href="#" className="btn btn-primary" style={{ position: 'relative', overflow: 'hidden' }}>
              Start Building Free
              <motion.div 
                animate={{ x: ['-100%', '200%'] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'linear', repeatDelay: 1 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '30%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
                  skewX: -20,
                  pointerEvents: 'none'
                }}
              />
            </a>
            <a href="#" className="btn btn-ghost">Talk to us →</a>
          </div>
        </ScrollReveal>
      </div>

      {/* Floating micro indicators */}
      <div className="decorations" style={{ pointerEvents: 'none' }}>
        <motion.div
          animate={{ y: [0, -12, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            left: '12%',
            top: '25%',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'var(--brass)'
          }}
        />
        <motion.div
          animate={{ y: [0, -18, 0], opacity: [0.15, 0.45, 0.15] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 1 }}
          style={{
            position: 'absolute',
            right: '15%',
            bottom: '30%',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: 'var(--green)'
          }}
        />
      </div>
    </section>
  );
}
