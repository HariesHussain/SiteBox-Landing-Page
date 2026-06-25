import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = (e) => {
    e.preventDefault();
    const el = document.getElementById('root');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer style={{ 
      padding: '80px 0 40px', 
      background: 'var(--bg)', 
      borderTop: '1.8px solid var(--border)',
      color: 'var(--ink)'
    }}>
      <div className="wrap">
        <div className="foot-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
          gap: '40px',
          marginBottom: '60px'
        }}>
          {/* Column 1: Brand Info */}
          <div className="foot-brand">
            <a href="#" onClick={handleScrollToTop} className="logo" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontWeight: 600,
              fontSize: '1.25rem',
              color: 'var(--ink)'
            }}>
              <span className="logo-mark" style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'var(--cream)',
                color: 'var(--green-deep)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Fraunces', serif",
                fontWeight: 700,
                fontSize: '1.1rem'
              }}>S</span>
              Site<span style={{ color: 'var(--brass)' }}>Box</span>
            </a>
            <p style={{
              color: 'var(--ink-soft)',
              fontSize: '0.92rem',
              marginTop: '16px',
              maxWidth: '280px',
              lineHeight: '1.6'
            }}>
              The workspace for building, previewing, and delivering client websites — without the infrastructure headache.
            </p>
          </div>

          {/* Column 2: Product */}
          <div className="foot-col" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h6 style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.72rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--ink-faint)',
              marginBottom: '16px',
              fontWeight: 600
            }}>Product</h6>
            {['Templates', 'Features', 'How it works'].map((link) => (
              <motion.a 
                key={link}
                whileHover={{ x: 2, color: 'var(--brass)' }}
                href={`#${link === 'How it works' ? 'workflow' : link.toLowerCase()}`}
                style={{ fontSize: '0.92rem', color: 'var(--ink-soft)', alignSelf: 'flex-start', transition: 'color 0.2s ease' }}
              >
                {link}
              </motion.a>
            ))}
          </div>

          {/* Column 3: Company */}
          <div className="foot-col" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h6 style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.72rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--ink-faint)',
              marginBottom: '16px',
              fontWeight: 600
            }}>Company</h6>
            {['About', 'Contact', 'Help & Support'].map((link) => (
              <motion.a 
                key={link}
                whileHover={{ x: 2, color: 'var(--brass)' }}
                href="#"
                style={{ fontSize: '0.92rem', color: 'var(--ink-soft)', alignSelf: 'flex-start', transition: 'color 0.2s ease' }}
              >
                {link}
              </motion.a>
            ))}
          </div>

          {/* Column 4: Get Started */}
          <div className="foot-col" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h6 style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.72rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--ink-faint)',
              marginBottom: '16px',
              fontWeight: 600
            }}>Get started</h6>
            {['Create free account', 'Log in'].map((link) => (
              <motion.a 
                key={link}
                whileHover={{ x: 2, color: 'var(--brass)' }}
                href="#"
                style={{ fontSize: '0.92rem', color: 'var(--ink-soft)', alignSelf: 'flex-start', transition: 'color 0.2s ease' }}
              >
                {link}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom copyright & details */}
        <div className="foot-bottom" style={{
          borderTop: '1.8px solid var(--border)',
          paddingTop: '28px',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px',
          fontSize: '0.82rem',
          color: 'var(--ink-faint)'
        }}>
          <span>© {currentYear} SiteBox. All rights reserved.</span>
          <span className="integrations" style={{ fontFamily: "'IBM Plex Mono', monospace", color: 'var(--ink-faint)' }}>
            Monitored with Google Analytics · Microsoft Clarity · Sentry
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .foot-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 32px !important;
          }
        }
        @media (max-width: 680px) {
          .foot-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .foot-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </footer>
  );
}
