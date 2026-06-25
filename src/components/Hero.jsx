import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  
  // Parallax shift on mockup
  const yParallax = useTransform(scrollY, [0, 500], [0, 60]);

  // Framer Motion variants for word-by-word reveal
  const headingContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
      }
    }
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }
    }
  };

  return (
    <section 
      ref={containerRef}
      className="hero" 
      style={{
        padding: '120px 0 96px',
        position: 'relative',
        overflow: 'hidden',
        background: 'radial-gradient(circle at 80% 30%, var(--green-glow) 0%, var(--bg) 70%)',
        borderBottom: '1.8px solid var(--border)'
      }}
    >
      {/* Vercel-style Large Grid Pattern */}
      <div className="grid-bg-overlay" />

      <div className="wrap hero-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '64px',
        alignItems: 'center',
        position: 'relative',
        zIndex: 2
      }}>
        
        {/* Left: Content */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <motion.p 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow"
          >
            Website delivery, simplified
          </motion.p>
          
          <motion.h1 
            variants={headingContainerVariants}
            initial="hidden"
            animate="visible"
            className="serif" 
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
              fontWeight: 500,
              lineHeight: 1.08,
              letterSpacing: '-.02em',
              marginBottom: '24px',
              color: 'var(--ink)'
            }}
          >
            {"Build the site. ".split(" ").map((word, i) => (
              <span key={i} style={{ display: 'inline-block', marginRight: '0.22em' }}>
                <motion.span variants={wordVariants} style={{ display: 'inline-block' }}>
                  {word}
                </motion.span>
              </span>
            ))}
            <br />
            <em style={{ fontStyle: 'italic', color: 'var(--brass)', fontWeight: 400 }}>
              {"Skip the chaos.".split(" ").map((word, i) => (
                <span key={i} style={{ display: 'inline-block', marginRight: '0.22em' }}>
                  <motion.span variants={wordVariants} style={{ display: 'inline-block' }}>
                    {word}
                  </motion.span>
                </span>
              ))}
            </em>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              fontSize: '1.15rem',
              color: 'var(--ink-soft)',
              maxWidth: '490px',
              marginBottom: '36px',
              lineHeight: '1.6'
            }}
          >
            The streamlined website builder for modern freelancers. Designed for focus, professional results, and smooth client collaboration.
          </motion.p>

          <motion.div 
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '28px', flexWrap: 'wrap' }}
          >
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
            <a href="#" className="btn btn-ghost">See a live demo →</a>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            style={{ fontSize: '0.85rem', color: 'var(--ink-faint)', fontWeight: 500 }}
          >
            Free plan available. Upgrade only when you need to.
          </motion.p>
        </div>

        {/* Right: Mockup */}
        <div className="mock-wrap" style={{ position: 'relative' }}>
          <motion.div 
            style={{ y: yParallax }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <div className="browser-card" style={{
              background: '#FFFFFF',
              border: '1.8px solid var(--border)',
              borderRadius: '14px',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0,0,0,0.35)'
            }}>
              {/* Browser top bar */}
              <div className="browser-bar" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 16px',
                borderBottom: '1.8px solid rgba(0, 0, 0, 0.08)'
              }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'rgba(0,0,0,0.1)' }} />
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'rgba(0,0,0,0.1)' }} />
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'rgba(0,0,0,0.1)' }} />
                <span className="browser-url mono" style={{
                  marginLeft: '8px',
                  fontSize: '0.74rem',
                  color: 'rgba(0,0,0,0.5)',
                  background: 'rgba(0,0,0,0.03)',
                  padding: '5px 12px',
                  borderRadius: '6px',
                  flex: 1,
                  textAlign: 'center'
                }}>
                  www.glowstudio.com
                </span>
              </div>
              
              {/* Browser screen area matching Image 1 */}
              <div className="browser-body" style={{
                background: '#FAF8F5',
                color: '#1C1E1A',
                fontFamily: "'Inter', sans-serif"
              }}>
                {/* Micro Navbar */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 18px',
                  borderBottom: '1px solid rgba(0,0,0,0.05)',
                  fontSize: '0.75rem',
                  fontWeight: 500
                }}>
                  <span style={{ fontWeight: 700, fontFamily: 'var(--serif)' }}>Studio Aura</span>
                  <div style={{ display: 'flex', gap: '14px', color: 'rgba(0,0,0,0.6)' }}>
                    <span>Features</span>
                    <span>Pricing</span>
                    <span>Contacts</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ color: 'rgba(0,0,0,0.6)' }}>Log in</span>
                    <span style={{
                      background: '#1F3D30',
                      color: '#FFFFFF',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '0.7rem',
                      fontWeight: 600
                    }}>Book Now</span>
                  </div>
                </div>

                {/* Hero area within preview */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1.1fr',
                  padding: '24px 18px',
                  gap: '16px',
                  alignItems: 'center'
                }}>
                  <div style={{
                    borderRadius: '8px',
                    overflow: 'hidden',
                    height: '140px',
                    border: '1px solid rgba(0,0,0,0.05)'
                  }}>
                    <img 
                      src="/salons.png" 
                      alt="Salon Portrait" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <h4 className="serif" style={{
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      lineHeight: '1.15',
                      color: '#1C1E1A'
                    }}>
                      Studio Aura | Beauty Reimagined
                    </h4>
                    <p style={{ fontSize: '0.68rem', color: 'rgba(0,0,0,0.5)', lineHeight: '1.4' }}>
                      Premier local spa and salon experiences designed to refresh your body, mind, and spirit.
                    </p>
                    <span style={{
                      alignSelf: 'flex-start',
                      background: '#1F3D30',
                      color: '#FFFFFF',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      padding: '5px 12px',
                      borderRadius: '4px',
                      marginTop: '4px'
                    }}>Book Now</span>
                  </div>
                </div>

                {/* Lower tabs row */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  padding: '12px 0',
                  borderTop: '1px solid rgba(0,0,0,0.05)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'rgba(0,0,0,0.7)',
                  background: 'rgba(0,0,0,0.01)'
                }}>
                  <span>About</span>
                  <span>Styling</span>
                  <span>Treatments</span>
                  <span>Services</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating notification chip matching Image 1 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.8 }}
            className="notify-chip"
            style={{
              position: 'absolute',
              left: '-24px',
              bottom: '50px',
              background: '#FFFFFF',
              border: '1.5px solid rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
              fontSize: '0.82rem',
              color: '#1C1E1A',
              fontWeight: 500,
              zIndex: 3
            }}
          >
            {/* Avatar block */}
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: 'var(--brass-soft)',
              color: 'var(--green-deep)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.7rem'
            }}>
              👤
            </div>
            <span>Client opened your preview</span>
          </motion.div>

          {/* Floating link badge under the mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="link-chip"
            style={{
              position: 'absolute',
              right: '24px',
              bottom: '-22px',
              background: 'var(--surface)',
              color: 'var(--cream)',
              border: '1.8px solid var(--border)',
              borderRadius: '8px',
              padding: '8px 16px',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.74rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
              zIndex: 3
            }}
          >
            🔗 Shareable preview link
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 54px !important;
            text-align: center;
          }
          .hero-grid > div {
            align-items: center !important;
          }
          .hero-actions {
            justify-content: center;
            width: 100%;
          }
          .mock-wrap {
            max-width: 520px;
            width: 100%;
            margin: 40px auto 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
