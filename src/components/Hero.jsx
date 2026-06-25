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

  const line1Words = "Build the site.".split(" ");
  const line2Rest = "the chaos.".split(" ");

  return (
    <section 
      ref={containerRef}
      className="hero" 
      style={{
        padding: '130px 0 110px',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #1a3a2a 0%, #1a3a2a 65%, rgba(148, 130, 80, 0.48) 100%)',
        borderBottom: '1.8px solid var(--border)',
        width: '100%'
      }}
    >
      {/* Vercel-style Large Grid Pattern */}
      <div className="grid-bg-overlay" />

      {/* Background checks / grid texture */}
      <div className="check-grid" style={{ 
        left: 0, 
        bottom: 0, 
        width: '450px', 
        height: '450px', 
        opacity: 0.8, 
        maskImage: 'radial-gradient(circle at bottom left, black 25%, transparent 75%)', 
        WebkitMaskImage: 'radial-gradient(circle at bottom left, black 25%, transparent 75%)' 
      }} />
      <div className="check-grid" style={{ 
        right: 0, 
        top: 0, 
        width: '450px', 
        height: '450px', 
        opacity: 0.8, 
        maskImage: 'radial-gradient(circle at top right, black 25%, transparent 75%)', 
        WebkitMaskImage: 'radial-gradient(circle at top right, black 25%, transparent 75%)' 
      }} />

      {/* Subtle golden glow above the mockup area — matching reference */}
      <div className="hero-gold-glow" style={{
        position: 'absolute',
        right: '5%',
        top: '10%',
        width: '580px',
        height: '580px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.35) 0%, rgba(212, 175, 55, 0.12) 60%, transparent 80%)',
        filter: 'blur(90px)',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      <div className="wrap hero-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 0.95fr)',
        gap: '60px',
        alignItems: 'start',
        position: 'relative',
        zIndex: 2
      }}>
        
        {/* Left: Content */}
        <div className="hero-text-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', maxWidth: '500px', alignSelf: 'flex-start', marginTop: '0px' }}>
          
          {/* Header matching Reference Image 2 exactly */}
          <motion.h1 
            variants={headingContainerVariants}
            initial="hidden"
            animate="visible"
            className="serif" 
            style={{
              fontSize: 'clamp(2.8rem, 5.8vw, 4.8rem)',
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: '-.025em',
              marginBottom: '24px',
              color: 'var(--ink)'
            }}
          >
            {/* Line 1: Build the site. */}
            {line1Words.map((word, i) => (
              <span key={`l1-${i}`} style={{ display: 'inline-block', marginRight: '0.22em' }}>
                <motion.span variants={wordVariants} style={{ display: 'inline-block' }}>
                  {word}
                </motion.span>
              </span>
            ))}
            <br />
            {/* Line 2: Skip (golden italic) the chaos. */}
            <span style={{ display: 'inline-block', color: 'var(--brass)', fontStyle: 'italic', fontWeight: 400, marginRight: '0.22em' }}>
              <motion.span variants={wordVariants} style={{ display: 'inline-block' }}>
                Skip
              </motion.span>
            </span>
            {line2Rest.map((word, i) => (
              <span key={`l2-${i}`} style={{ display: 'inline-block', marginRight: '0.22em' }}>
                <motion.span variants={wordVariants} style={{ display: 'inline-block' }}>
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              fontSize: '1.16rem',
              color: 'rgba(255, 255, 255, 0.85)',
              maxWidth: '460px',
              lineHeight: '1.6',
              margin: 0
            }}
          >
            The streamlined website builder for modern freelancers. Designed for focus, professional results, and smooth client collaboration.
          </motion.p>
        </div>

        {/* Right: Mockup — positioned to start at paragraph level and extend below */}
        <div className="mock-wrap" style={{ position: 'relative', width: '100%', justifySelf: 'end', marginTop: '35px' }}>
          {/* Subtle golden glow behind the mockup area */}
          <div className="mockup-bg-glow" style={{
            position: 'absolute',
            left: '10%',
            top: '10%',
            width: '80%',
            height: '80%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.35) 0%, rgba(212, 175, 55, 0.12) 60%, transparent 80%)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
            zIndex: 1
          }} />

          {/* Golden glow at the top edge of the mockup */}
          <div className="mockup-top-glow" style={{
            position: 'absolute',
            top: '-80px',
            left: '15%',
            width: '70%',
            height: '180px',
            background: 'radial-gradient(ellipse at center, rgba(212, 175, 55, 0.38) 0%, rgba(212, 175, 55, 0.15) 50%, transparent 75%)',
            filter: 'blur(50px)',
            pointerEvents: 'none',
            zIndex: 1
          }} />

          {/* Rich golden glow behind the bottom-left of the mockup */}
          <div className="mockup-bottom-left-glow" style={{
            position: 'absolute',
            left: '-80px',
            bottom: '20px',
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.45) 0%, rgba(212, 175, 55, 0.18) 50%, transparent 75%)',
            filter: 'blur(50px)',
            pointerEvents: 'none',
            zIndex: 1
          }} />

          <motion.div 
            style={{ y: yParallax, position: 'relative', zIndex: 2, maxWidth: '510px', marginLeft: 'auto', marginRight: '0' }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <div className="browser-card" style={{
              background: '#FFFFFF',
              border: '1.8px solid var(--border)',
              borderRadius: '14px',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
              width: '100%',
              position: 'relative'
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
                  gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.15fr)',
                  padding: '24px 18px',
                  gap: '16px',
                  alignItems: 'center'
                }}>
                  <div style={{
                    borderRadius: '8px',
                    overflow: 'hidden',
                    height: '180px',
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
                      fontSize: '1.4rem',
                      fontWeight: 600,
                      lineHeight: '1.15',
                      color: '#1C1E1A'
                    }}>
                      Studio Aura | Beauty Reimagined
                    </h4>
                    <p style={{ fontSize: '0.78rem', color: 'rgba(0,0,0,0.5)', lineHeight: '1.4' }}>
                      Premier local spa and salon experiences designed to refresh your body, mind, and spirit.
                    </p>
                    <span style={{
                      alignSelf: 'flex-start',
                      background: '#1F3D30',
                      color: '#FFFFFF',
                      fontSize: '0.75rem',
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

            {/* Floating notification chip matching Image 1 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.8 }}
              className="notify-chip"
              style={{
                position: 'absolute',
                left: '-24px',
                bottom: '120px',
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
              {/* Avatar circle */}
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
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (min-width: 981px) {
          .hero {
            padding: 130px 0 120px !important;
          }
          .hero-grid {
            align-items: start !important;
          }
          .mock-wrap {
            margin-top: 35px !important;
          }
          .hero-text-col {
            align-self: flex-start !important;
            margin-top: 0 !important;
          }
        }
        @media (max-width: 980px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 54px !important;
            text-align: center;
          }
          .hero-grid > div {
            align-items: center !important;
          }
          .mock-wrap {
            max-width: 520px;
            width: 100%;
            margin: 40px auto 0 !important;
          }
        }
        @media (max-width: 640px) {
          .notify-chip {
            position: static !important;
            margin: 16px auto 0 !important;
            max-width: max-content !important;
            z-index: 1 !important;
          }
          .link-chip {
            position: static !important;
            margin: 12px auto 0 !important;
            max-width: max-content !important;
            justify-content: center !important;
            z-index: 1 !important;
          }
          .browser-bar {
            padding: 8px 12px !important;
          }
          .browser-url {
            font-size: 0.68rem !important;
            padding: 4px 8px !important;
          }
        }
      `}</style>
    </section>
  );
}
