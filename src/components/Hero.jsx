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
        height: '100vh',
        minHeight: '100vh',
        maxHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #1a3a2a 0%, #1a3a2a 65%, rgba(255, 186, 56, 0.18) 100%)',
        borderBottom: '1.8px solid var(--border)',
        width: '100%',
        padding: '90px 0 30px'
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

      {/* Thick golden-orange glow above the mockup area — matching user hex #ffba38 */}
      <div className="hero-gold-glow" style={{
        position: 'absolute',
        right: '2%',
        top: '22%',
        width: '650px',
        height: '650px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255, 186, 56, 0.65) 0%, rgba(255, 186, 56, 0.25) 55%, transparent 75%)',
        filter: 'blur(80px)',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      <div className="wrap hero-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.45fr)',
        gap: '64px',
        alignItems: 'start',
        position: 'relative',
        zIndex: 2,
        width: '100%'
      }}>

        {/* Left: Content */}
        <div className="hero-text-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', maxWidth: '500px', alignSelf: 'start', marginTop: '0px' }}>

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
            {/* Line 2: Skip the chaos. — forced to single line */}
            <span style={{ whiteSpace: 'nowrap' }}>
              <span style={{ display: 'inline-block', color: '#D4AF37', fontStyle: 'italic', fontWeight: 400, marginRight: '0.22em' }}>
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
            </span>
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

        {/* Right: Mockup — rendered as a single pixel-perfect transparent image from reference */}
        <div className="mock-wrap" style={{ position: 'relative', width: '100%', justifySelf: 'end', marginTop: '150px' }}>
          {/* Thick golden glow behind the mockup area using user hex #ffba38 */}
          <div className="mockup-bg-glow" style={{
            position: 'absolute',
            left: '10%',
            top: '5%',
            width: '90%',
            height: '90%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 186, 56, 0.85) 0%, rgba(255, 186, 56, 0.35) 50%, transparent 75%)',
            filter: 'blur(75px)',
            pointerEvents: 'none',
            zIndex: 1
          }} />

          {/* Golden glow at the top edge of the mockup using user hex #ffba38 */}
          <div className="mockup-top-glow" style={{
            position: 'absolute',
            top: '-80px',
            left: '20%',
            width: '70%',
            height: '200px',
            background: 'radial-gradient(ellipse at center, rgba(255, 186, 56, 0.8) 0%, rgba(255, 186, 56, 0.3) 50%, transparent 75%)',
            filter: 'blur(45px)',
            pointerEvents: 'none',
            zIndex: 1
          }} />

          {/* Rich golden glow behind the bottom-left of the mockup using user hex #ffba38 */}
          <div className="mockup-bottom-left-glow" style={{
            position: 'absolute',
            left: '-20px',
            bottom: '10px',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 186, 56, 0.85) 0%, rgba(255, 186, 56, 0.35) 50%, transparent 75%)',
            filter: 'blur(45px)',
            pointerEvents: 'none',
            zIndex: 1
          }} />

          <motion.div
            className="mockup-img-container"
            style={{ y: yParallax, position: 'relative', zIndex: 2, width: '100%' }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <img
              src="/mockup_clean.png"
              alt="SiteBox Browser Preview Mockup"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                pointerEvents: 'none',
                borderRadius: '12px'
              }}
            />
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (min-width: 981px) {
          .hero {
            height: 100vh !important;
            min-height: 100vh !important;
            max-height: 100vh !important;
            padding: 90px 0 30px !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
            overflow: hidden !important;
          }
          .hero-grid {
            align-items: start !important;
          }
          .mock-wrap {
            margin-top: 150px !important;
          }
          .hero-text-col {
            align-self: start !important;
            margin-top: 0 !important;
          }
          .mockup-img-container {
            max-width: 840px !important;
            margin-left: -52px !important;
            margin-right: 0 !important;
          }
        }
        @media (max-width: 980px) {
          .hero {
            padding: 130px 0 80px !important;
          }
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
          .mockup-img-container {
            margin-left: 0 !important;
            margin-right: 0 !important;
            max-width: 100% !important;
            margin: 0 auto !important;
          }
        }
        @media (max-width: 640px) {
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

