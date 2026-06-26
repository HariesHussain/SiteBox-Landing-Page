import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Zap, Palette, Users } from 'lucide-react';

const ValueStrip = ({ isMobile, className = "" }) => {
  const items = [
    { icon: Zap, title: "Lightning Fast", subtitle: "Build in minutes" },
    { icon: Palette, title: "Premium Templates", subtitle: "Designed to convert" },
    { icon: Users, title: "Client Ready", subtitle: "Share with ease" }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className={`value-strip ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr auto 1fr',
        alignItems: 'center',
        width: '100%',
        marginTop: isMobile ? '28px' : '32px',
        marginBottom: isMobile ? '28px' : '12px',
        gap: isMobile ? '8px' : '12px',
      }}
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <motion.div 
            variants={itemVariants}
            className="value-strip-item"
            whileHover={{ y: isMobile ? 0 : -2 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: isMobile ? '10px' : '8px',
              textAlign: 'center',
              cursor: 'default'
            }}
          >
            <motion.div 
              className="vs-icon-container"
              whileHover={{ scale: 1.08, backgroundColor: 'rgba(212,175,55,0.12)' }}
              transition={{ duration: 0.25 }}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#D4AF37'
              }}
            >
              <item.icon size={16} />
            </motion.div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div className="vs-title" style={{ 
                fontSize: isMobile ? '12px' : '13px', 
                fontWeight: 600, 
                color: '#FFFFFF',
                fontFamily: 'Inter, sans-serif'
              }}>
                {item.title}
              </div>
              <div className="vs-subtitle" style={{ 
                fontSize: isMobile ? '10px' : '11px', 
                fontWeight: 400, 
                color: 'rgba(255,255,255,0.65)',
                fontFamily: 'Inter, sans-serif',
                lineHeight: 1.2
              }}>
                {item.subtitle}
              </div>
            </div>
          </motion.div>
          {index < items.length - 1 && (
            <div style={{
              width: '1px',
              height: isMobile ? '32px' : '40px',
              background: 'rgba(255,255,255,0.12)'
            }} />
          )}
        </React.Fragment>
      ))}
    </motion.div>
  );
};

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  const [email, setEmail] = React.useState('');
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setIsSubmitted(true);
  };

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
              fontSize: '0.95rem',
              color: 'rgba(255, 255, 255, 0.85)',
              maxWidth: '460px',
              lineHeight: '1.6',
              margin: 0
            }}
          >
            The streamlined website builder for modern freelancers. Designed for focus, professional results, and smooth client collaboration.
          </motion.p>

          <ValueStrip isMobile={false} className="desktop-only" />

          {/* Waitlist Form */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            id="hero-waitlist"
            className="hero-waitlist-container"
            style={{ marginTop: '0px', width: '100%', maxWidth: '440px' }}
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  color: 'var(--brass)',
                  fontSize: '1rem',
                  fontWeight: '600',
                  padding: '12px 18px',
                  background: 'rgba(212, 175, 55, 0.08)',
                  border: '1.5px solid rgba(212, 175, 55, 0.2)',
                  borderRadius: 'var(--radius)',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                You're on the list! 🎉
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="hero-waitlist-form" style={{ display: 'flex', gap: '10px', width: '100%', alignItems: 'center' }}>
                <input
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  style={{
                    flex: 1,
                    minWidth: 0,
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius)',
                    border: '1.5px solid rgba(255, 255, 255, 0.15)',
                    background: 'rgba(255, 255, 255, 0.06)',
                    color: 'var(--cream)',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'border-color 0.2s ease, background 0.2s ease'
                  }}
                  className="hero-waitlist-input"
                />
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: '0.85rem 1.5rem',
                    borderRadius: 'var(--radius)',
                    border: '1.5px solid var(--brass)',
                    background: 'var(--brass)',
                    color: 'var(--green-deep)',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '600',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    whiteSpace: 'nowrap'
                  }}
                  className="hero-waitlist-button"
                >
                  {loading ? 'Joining...' : 'Join the Waitlist'}
                </button>
              </form>
            )}
            {error && (
              <p style={{ color: '#FF6B6B', fontSize: '0.85rem', marginTop: '8px', fontFamily: 'Inter, sans-serif' }}>{error}</p>
            )}
          </motion.div>

          <ValueStrip isMobile={true} className="mobile-only" />
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
            style={{ position: 'relative', zIndex: 2, width: '100%' }}
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
            height: auto !important;
            min-height: 100vh !important;
            max-height: none !important;
            padding: 120px 0 60px !important;
          }
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
            text-align: center;
          }
          .hero-grid > div {
            align-items: center !important;
          }
          .mock-wrap {
            max-width: 520px;
            width: 100%;
            margin: 20px auto 0 !important;
          }
          .mockup-img-container {
            margin-left: 0 !important;
            margin-right: 0 !important;
            max-width: 100% !important;
            margin: 0 auto !important;
          }
        }
        @media (max-width: 980px) {
          .hero-waitlist-container {
            margin-top: 36px !important;
          }
          .mobile-only.value-strip {
            margin-top: 16px !important;
          }
        }
        @media (max-width: 480px) {
          .hero {
            padding: 100px 0 50px !important;
          }
          .mobile-only.value-strip {
            gap: 6px !important;
          }
          .mobile-only.value-strip .vs-icon-container {
            width: 28px !important;
            height: 28px !important;
            border-radius: 8px !important;
          }
          .mobile-only.value-strip .vs-icon-container svg {
            width: 14px !important;
            height: 14px !important;
          }
          .mobile-only.value-strip .vs-title {
            font-size: 11px !important;
          }
          .mobile-only.value-strip .vs-subtitle {
            font-size: 9px !important;
          }
        }
        @media (max-width: 360px) {
          .hero {
            padding: 90px 0 40px !important;
          }
          .mobile-only.value-strip {
            gap: 4px !important;
          }
          .mobile-only.value-strip .vs-icon-container {
            width: 24px !important;
            height: 24px !important;
            border-radius: 6px !important;
          }
          .mobile-only.value-strip .vs-icon-container svg {
            width: 12px !important;
            height: 12px !important;
          }
          .mobile-only.value-strip .vs-title {
            font-size: 10px !important;
          }
          .mobile-only.value-strip .vs-subtitle {
            font-size: 8px !important;
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
          .hero-waitlist-form {
            flex-direction: column !important;
          }
          .hero-waitlist-input {
            width: 100% !important;
          }
          .hero-waitlist-button {
            width: 100% !important;
          }
        }
        .hero-waitlist-input:focus {
          border-color: var(--brass) !important;
          background: rgba(255, 255, 255, 0.08) !important;
        }
        .hero-waitlist-button:hover {
          background: transparent !important;
          color: var(--brass) !important;
          box-shadow: 0 4px 12px rgba(212, 175, 55, 0.15);
        }
      `}</style>
    </section>
  );
}

