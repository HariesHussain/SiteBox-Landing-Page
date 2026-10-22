import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Palette, Users, ArrowRight } from 'lucide-react';
import { PrivacyPolicy } from './legal/PrivacyPolicy';
import { TermsOfService } from './legal/TermsOfService';
import { CookiePolicy } from './legal/CookiePolicy';
import { RefundPolicy } from './legal/RefundPolicy';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { ContactModal } from './components/ContactModal';

const APP_URL = "https://app.sitebox.studio";

// ==========================================
// Card with Interactive Radial Mouse Glow
// ==========================================
interface InteractiveCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({
  children,
  className = '',
  glowColor = 'rgba(212, 175, 55, 0.08)',
  style,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`strong-card ${className}`}
      style={{
        ...style,
        position: 'relative',
      }}
      {...props}
    >
      <div
        style={{
          position: 'absolute',
          inset: '-1px',
          pointerEvents: 'none',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          background: `radial-gradient(320px circle at ${coords.x}px ${coords.y}px, ${glowColor}, transparent 80%)`,
          zIndex: 0,
          borderRadius: 'inherit',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
        {children}
      </div>
    </div>
  );
};

// ==========================================
// Scroll Reveal Animation Wrapper
// ==========================================
interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  className?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className = '',
  style,
}) => {
  const directionOffset = {
    up: { y: 35, x: 0 },
    down: { y: -35, x: 0 },
    left: { x: 35, y: 0 },
    right: { x: -35, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...directionOffset[direction],
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

// ==========================================
// Header Navigation Component
// ==========================================
interface NavbarProps {
  onNavigate: (path: string) => void;
  currentPath: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPath }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (currentPath !== '/') return;
    const sectionIds = ['why', 'workflow', 'templates', 'features'];
    const observers: { obs: IntersectionObserver; el: HTMLElement }[] = [];

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const options = { rootMargin: '-25% 0px -50% 0px' };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const obs = new IntersectionObserver(handleIntersect, options);
        obs.observe(el);
        observers.push({ obs, el });
      }
    });

    return () => {
      observers.forEach(({ obs, el }) => obs.unobserve(el));
    };
  }, [currentPath]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (currentPath !== '/') {
      onNavigate('/');
      setTimeout(() => {
        if (id === 'root') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }
      }, 80);
      return;
    }
    if (id === 'root') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'why', label: 'Why SiteBox' },
    { id: 'workflow', label: 'How it works' },
    { id: 'templates', label: 'Templates' },
    { id: 'features', label: 'Features' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 50,
        background: isScrolled ? 'rgba(7, 19, 15, 0.88)' : 'transparent',
        backdropFilter: isScrolled ? 'saturate(140%) blur(12px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'saturate(140%) blur(12px)' : 'none',
        borderBottom: isScrolled ? '1.8px solid var(--border)' : '1.8px solid transparent',
        transition: 'background 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease',
      }}
    >
      <nav
        className="wrap"
        style={{
          padding: '18px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
        }}
        aria-label="Main Navigation"
      >
        {/* Brand Logo */}
        <a
          href="#root"
          onClick={(e) => scrollToSection(e, 'root')}
          className="logo"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontWeight: 600,
            fontSize: '1.25rem',
            color: 'var(--ink)',
          }}
          aria-label="SiteBox Home"
        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--brass)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ flexShrink: 0 }}
            aria-hidden="true"
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
          <span
            className="serif"
            style={{
              fontWeight: 500,
              fontSize: '1.28rem',
              color: 'var(--cream)',
              letterSpacing: '-0.015em',
            }}
          >
            SiteBox
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '34px' }}>
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                style={{
                  fontSize: '0.92rem',
                  fontWeight: 500,
                  color: activeSection === item.id ? 'var(--brass)' : 'var(--ink-soft)',
                  position: 'relative',
                  padding: '4px 0',
                  transition: 'color 0.2s ease',
                }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'var(--brass)',
                      borderRadius: '1px',
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA Links */}
        <div className="nav-cta" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <a
            href={APP_URL}
            className="btn btn-ghost"
            style={{
              padding: '0.65rem 1.35rem',
              fontSize: '0.9rem',
              borderColor: 'var(--cream)',
              color: 'var(--cream)',
              background: 'transparent',
            }}
          >
            Log in
          </a>
          <a
            href={APP_URL}
            className="btn btn-primary"
            style={{
              padding: '0.65rem 1.35rem',
              fontSize: '0.9rem',
              background: 'var(--cream)',
              color: 'var(--green-deep)',
              border: '1.5px solid var(--cream)',
            }}
          >
            Get Started
          </a>
        </div>

        {/* Mobile Navigation Toggle Button */}
        <button
          type="button"
          className="nav-links-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '6px',
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          <motion.span
            animate={mobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            style={{ display: 'block', width: '22px', height: '2px', background: 'var(--ink)' }}
          />
          <motion.span
            animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            style={{ display: 'block', width: '22px', height: '2px', background: 'var(--ink)' }}
          />
          <motion.span
            animate={mobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            style={{ display: 'block', width: '22px', height: '2px', background: 'var(--ink)' }}
          />
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'var(--bg)',
              borderBottom: '1.8px solid var(--border)',
              overflow: 'hidden',
              zIndex: 49,
            }}
          >
            <ul style={{ display: 'flex', flexDirection: 'column', padding: '20px 24px', gap: '18px' }}>
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => scrollToSection(e, item.id)}
                    style={{
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: activeSection === item.id ? 'var(--brass)' : 'var(--ink)',
                      display: 'block',
                      padding: '8px 0',
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                <a
                  href={APP_URL}
                  className="btn btn-ghost"
                  style={{
                    flex: 1,
                    padding: '0.8rem',
                    textAlign: 'center',
                    borderColor: 'var(--cream)',
                    color: 'var(--cream)',
                    background: 'transparent',
                  }}
                >
                  Log in
                </a>
                <a
                  href={APP_URL}
                  className="btn btn-primary"
                  style={{
                    flex: 1,
                    padding: '0.8rem',
                    textAlign: 'center',
                    background: 'var(--cream)',
                    color: 'var(--green-deep)',
                    border: '1.5px solid var(--cream)',
                  }}
                >
                  Get Started
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 980px) {
          .nav-links {
            display: none !important;
          }
          .nav-links-mobile-toggle {
            display: flex !important;
          }
          header nav.wrap {
            padding: 12px 20px !important;
          }
        }
        @media (max-width: 680px) {
          .nav-cta .btn-ghost {
            display: none !important;
          }
        }
        @media (max-width: 480px) {
          header nav.wrap {
            padding: 10px 16px !important;
          }
          .logo span {
            font-size: 1.15rem !important;
          }
          .logo svg {
            width: 22px !important;
            height: 22px !important;
          }
          .nav-cta .btn-primary {
            padding: 0.5rem 1rem !important;
            font-size: 0.8rem !important;
          }
        }
        @media (max-width: 360px) {
          header nav.wrap {
            padding: 8px 12px !important;
          }
          .logo span {
            font-size: 1.05rem !important;
          }
          .logo svg {
            width: 18px !important;
            height: 18px !important;
          }
          .nav-cta .btn-primary {
            padding: 0.45rem 0.8rem !important;
            font-size: 0.75rem !important;
          }
          .nav-links-mobile-toggle {
            padding: 2px !important;
          }
        }
      `}</style>
    </header>
  );
};

// ==========================================
// Value Strip Sub-component
// ==========================================
interface ValueStripProps {
  isMobile?: boolean;
  className?: string;
}

const ValueStrip: React.FC<ValueStripProps> = ({ isMobile = false, className = '' }) => {
  const items = [
    { icon: Zap, title: 'Lightning Fast', subtitle: 'Build in minutes' },
    { icon: Palette, title: 'Premium Templates', subtitle: 'Designed to convert' },
    { icon: Users, title: 'Client Ready', subtitle: 'Share with ease' },
  ];

  return (
    <motion.div
      className={`value-strip ${className}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr auto 1fr',
        alignItems: 'center',
        width: '100%',
        marginTop: isMobile ? '28px' : '32px',
        marginBottom: isMobile ? '28px' : '20px',
        gap: isMobile ? '8px' : '12px',
      }}
    >
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <motion.div
            className="value-strip-item"
            whileHover={{ y: isMobile ? 0 : -2 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: isMobile ? '10px' : '8px',
              textAlign: 'center',
              cursor: 'default',
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
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--brass)',
              }}
            >
              <item.icon size={16} aria-hidden="true" />
            </motion.div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div
                className="vs-title"
                style={{
                  fontSize: isMobile ? '12px' : '13px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {item.title}
              </div>
              <div
                className="vs-subtitle"
                style={{
                  fontSize: isMobile ? '10px' : '11px',
                  fontWeight: 400,
                  color: 'rgba(255, 255, 255, 0.65)',
                  fontFamily: 'Inter, sans-serif',
                  lineHeight: 1.2,
                }}
              >
                {item.subtitle}
              </div>
            </div>
          </motion.div>
          {idx < items.length - 1 && (
            <div
              style={{
                width: '1px',
                height: isMobile ? '32px' : '40px',
                background: 'rgba(255, 255, 255, 0.12)',
              }}
            />
          )}
        </React.Fragment>
      ))}
    </motion.div>
  );
};

// ==========================================
// Hero Section Component
// ==========================================
const Hero: React.FC = () => {
  const line1 = 'Build the site.'.split(' ');
  const line2 = 'the chaos.'.split(' ');

  return (
    <section
      className="hero"
      id="root"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #1a3a2a 0%, #1a3a2a 65%, rgba(255, 186, 56, 0.18) 100%)',
        borderBottom: '1.8px solid var(--border)',
        width: '100%',
        padding: '110px 0 40px',
      }}
    >
      {/* Background Overlays & Decorative Grids */}
      <div className="grid-bg-overlay" />
      <div
        className="check-grid"
        style={{
          left: 0,
          bottom: 0,
          width: '450px',
          height: '450px',
          opacity: 0.8,
          maskImage: 'radial-gradient(circle at bottom left, black 25%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(circle at bottom left, black 25%, transparent 75%)',
        }}
      />
      <div
        className="check-grid"
        style={{
          right: 0,
          top: 0,
          width: '450px',
          height: '450px',
          opacity: 0.8,
          maskImage: 'radial-gradient(circle at top right, black 25%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(circle at top right, black 25%, transparent 75%)',
        }}
      />
      <div
        className="hero-gold-glow"
        style={{
          position: 'absolute',
          right: '2%',
          top: '22%',
          width: '650px',
          height: '650px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 186, 56, 0.65) 0%, rgba(255, 186, 56, 0.25) 55%, transparent 75%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div
        className="wrap hero-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.45fr)',
          gap: '56px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
          width: '100%',
        }}
      >
        {/* Left Column: Copy & Primary CTA */}
        <div
          className="hero-text-col"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',
            maxWidth: '520px',
            alignSelf: 'center',
          }}
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow"
          >
            A workspace for freelancers & agencies
          </motion.p>

          {/* Staggered Serif Headline */}
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
            }}
            className="serif"
            style={{
              fontSize: 'clamp(2.8rem, 5.5vw, 4.6rem)',
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: '-.025em',
              marginBottom: '20px',
              color: 'var(--ink)',
            }}
          >
            {line1.map((word, idx) => (
              <span key={`w1-${idx}`} style={{ display: 'inline-block', marginRight: '0.22em' }}>
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
                  }}
                  style={{ display: 'inline-block' }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
            <br />
            <span style={{ whiteSpace: 'nowrap' }}>
              <span
                style={{
                  display: 'inline-block',
                  color: 'var(--brass)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  marginRight: '0.22em',
                }}
              >
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
                  }}
                  style={{ display: 'inline-block' }}
                >
                  Skip
                </motion.span>
              </span>
              {line2.map((word, idx) => (
                <span key={`w2-${idx}`} style={{ display: 'inline-block', marginRight: '0.22em' }}>
                  <motion.span
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
                    }}
                    style={{ display: 'inline-block' }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              fontSize: '1rem',
              color: 'rgba(255, 255, 255, 0.85)',
              maxWidth: '460px',
              lineHeight: 1.65,
              margin: '0 0 16px 0',
            }}
          >
            The streamlined website builder for modern freelancers. Designed for focus, professional results, and smooth client collaboration.
          </motion.p>

          {/* Desktop Value Strip */}
          <ValueStrip isMobile={false} className="desktop-only" />

          {/* Primary CTA (Waitlist & Talk to Us removed completely per specs) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hero-cta-container"
            style={{
              marginTop: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <a
              href={APP_URL}
              className="btn btn-primary"
              style={{
                position: 'relative',
                overflow: 'hidden',
                padding: '0.95rem 2.2rem',
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: 'var(--radius)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: 'var(--cream)',
                color: 'var(--green-deep)',
                boxShadow: '0 8px 24px rgba(212, 175, 55, 0.25)',
              }}
            >
              Start Building Free
              <ArrowRight size={16} aria-hidden="true" />
              {/* Subtle light sweep */}
              <motion.div
                animate={{ x: ['-100%', '220%'] }}
                transition={{ repeat: Infinity, duration: 2.8, ease: 'linear', repeatDelay: 1.5 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '35%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                  transform: 'skewX(-20deg)',
                  pointerEvents: 'none',
                }}
              />
            </a>
          </motion.div>

          {/* Mobile Value Strip */}
          <ValueStrip isMobile={true} className="mobile-only" />
        </div>

        {/* Right Column: High Performance LCP Browser Workspace Mockup */}
        <div
          className="mock-wrap"
          style={{
            position: 'relative',
            width: '100%',
            justifySelf: 'end',
          }}
        >
          {/* Ambient Glows behind Mockup */}
          <div
            className="mockup-bg-glow"
            style={{
              position: 'absolute',
              left: '10%',
              top: '5%',
              width: '90%',
              height: '90%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 186, 56, 0.85) 0%, rgba(255, 186, 56, 0.35) 50%, transparent 75%)',
              filter: 'blur(75px)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
          <div
            className="mockup-top-glow"
            style={{
              position: 'absolute',
              top: '-60px',
              left: '20%',
              width: '70%',
              height: '180px',
              background: 'radial-gradient(ellipse at center, rgba(255, 186, 56, 0.8) 0%, rgba(255, 186, 56, 0.3) 50%, transparent 75%)',
              filter: 'blur(45px)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />

          <motion.div
            className="mockup-img-container"
            style={{ position: 'relative', zIndex: 2, width: '100%' }}
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <picture>
              <source srcSet="/mockup_clean.webp" type="image/webp" />
              <img
                src="/mockup_clean.png"
                alt="SiteBox client website builder workspace interface preview and responsive canvas"
                width={1600}
                height={951}
                fetchPriority="high"
                loading="eager"
                decoding="async"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  pointerEvents: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.45)',
                }}
              />
            </picture>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (min-width: 981px) {
          .hero {
            min-height: 100vh !important;
            padding: 110px 0 50px !important;
          }
          .hero-grid {
            align-items: center !important;
          }
          .mockup-img-container {
            max-width: 840px !important;
            margin-left: -30px !important;
            margin-right: 0 !important;
          }
        }
        @media (max-width: 980px) {
          .hero {
            min-height: auto !important;
            padding: 110px 0 60px !important;
          }
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
            text-align: center;
          }
          .hero-text-col {
            align-items: center !important;
            margin: 0 auto !important;
          }
          .hero-cta-container {
            justify-content: center !important;
          }
          .mock-wrap {
            max-width: 580px;
            width: 100%;
            margin: 10px auto 0 !important;
          }
          .mockup-img-container {
            margin: 0 auto !important;
          }
        }
      `}</style>
    </section>
  );
};

// ==========================================
// Audience / Features Section Component
// ==========================================
const AudienceFeatures: React.FC = () => {
  const pills = [
    'Freelancers',
    'Agencies',
    'Creators',
    'Students',
    'Developers',
    'Small businesses',
  ];

  return (
    <section
      className="audience light-theme"
      id="features"
      style={{
        borderTop: '1.8px solid var(--border-light)',
        borderBottom: '1.8px solid var(--border-light)',
        padding: '28px 0',
        background: 'var(--bg-light)',
        overflow: 'hidden',
      }}
    >
      <div className="wrap">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px 24px',
          }}
        >
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className="label"
            style={{
              fontSize: '0.82rem',
              color: 'var(--ink-soft-light)',
              fontWeight: 600,
              fontFamily: 'var(--mono)',
              letterSpacing: '0.08em',
            }}
          >
            BUILT FOR —
          </motion.span>
          {pills.map((pill, idx) => (
            <motion.span
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              whileHover={{ y: -2, boxShadow: '0 6px 0px var(--border-light)' }}
              className="pill"
              style={{
                fontSize: '0.88rem',
                fontWeight: 600,
                color: 'var(--ink-light)',
                padding: '6px 18px',
                borderRadius: '20px',
                border: '1.8px solid var(--border-light)',
                background: 'var(--surface-light)',
                boxShadow: '0 3px 0px var(--border-light)',
                cursor: 'default',
                transition: 'all 0.2s ease',
              }}
            >
              {pill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ==========================================
// Why SiteBox Section Component
// ==========================================
const WhySiteBox: React.FC = () => {
  const reasons = [
    {
      from: 'Sending screenshots back and forth for feedback',
      title: 'One link, real preview',
      desc: 'Share a live preview link. The client sees the real site, on any device, before anything goes live.',
    },
    {
      from: 'Re-explaining project status over email',
      title: 'A dashboard for every client',
      desc: 'Track every project, every client, and where each site stands — in one workspace instead of scattered folders.',
    },
    {
      from: 'Wrestling with hosting just to go live',
      title: 'Deploy in one click',
      desc: 'Publish without touching servers, DNS, or config files. SiteBox handles the infrastructure seamlessly.',
    },
  ];

  return (
    <section
      className="block light-theme dot-grid"
      id="why"
      style={{
        padding: '96px 0',
        background: 'var(--bg-light)',
        position: 'relative',
      }}
    >
      <div className="grid-bg-overlay" />
      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
        <ScrollReveal className="section-head">
          <p className="eyebrow" style={{ color: 'var(--brass)' }}>
            Why people switch
          </p>
          <h2 className="serif" style={{ color: 'var(--ink-light)' }}>
            Built for client work, not hobby projects.
          </h2>
          <p style={{ color: 'var(--ink-soft-light)' }}>
            General-purpose builders weren't designed for the way agencies actually deliver sites.
          </p>
        </ScrollReveal>

        <div
          className="why-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '28px',
          }}
        >
          {reasons.map((reason, idx) => (
            <ScrollReveal key={idx} direction="up" delay={idx * 0.15} duration={0.6}>
              <InteractiveCard
                glowColor="rgba(28, 30, 26, 0.04)"
                style={{
                  padding: '34px 30px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'var(--surface-light)',
                  color: 'var(--ink-light)',
                }}
              >
                <div
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--ink-soft-light)',
                    marginBottom: '18px',
                    position: 'relative',
                    display: 'inline-block',
                    alignSelf: 'flex-start',
                  }}
                >
                  <span
                    style={{
                      opacity: 0.85,
                      textDecoration: 'line-through',
                      textDecorationColor: 'var(--ink-soft-light)',
                    }}
                  >
                    {reason.from}
                  </span>
                </div>
                <h3
                  className="serif"
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    marginBottom: '12px',
                    color: 'var(--ink-light)',
                  }}
                >
                  {reason.title}
                </h3>
                <p
                  style={{
                    color: 'var(--ink-soft-light)',
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    marginTop: 'auto',
                  }}
                >
                  {reason.desc}
                </p>
              </InteractiveCard>
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
};

// ==========================================
// How It Works Timeline Component
// ==========================================
const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Choose a template',
      desc: 'Pick from templates built for real niches — restaurants, clinics, salons, gyms, agencies, and more.',
    },
    {
      num: '02',
      title: 'Customize & preview',
      desc: 'Edit content, images, and styling, then preview exactly what your client will see.',
    },
    {
      num: '03',
      title: 'Share & get approved',
      desc: 'Send a live preview link and know the moment your client opens it.',
    },
    {
      num: '04',
      title: 'Deploy & manage',
      desc: 'Publish with one click, then track clients, projects, and analytics from a single dashboard.',
    },
  ];

  return (
    <section
      className="workflow dot-grid"
      id="workflow"
      style={{
        background: 'var(--green-deep)',
        color: 'var(--cream)',
        padding: '96px 0 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="wrap">
        <ScrollReveal className="section-head">
          <p className="eyebrow" style={{ color: 'var(--brass)' }}>
            How it works
          </p>
          <h2 className="serif" style={{ color: 'var(--cream)' }}>
            Four steps from idea to invoice.
          </h2>
          <p style={{ color: '#C9D3CB' }}>
            The same flow whether it's your first client site or your fiftieth.
          </p>
        </ScrollReveal>

        {/* Visual Timeline Diagram */}
        <ScrollReveal
          direction="up"
          delay={0.2}
          className="visual-diagram"
          style={{
            maxWidth: '850px',
            margin: '0 auto 64px',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1.8px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '48px 30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            position: 'relative',
          }}
        >
          {/* Step 1: Wireframe */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
            <div
              style={{
                width: '130px',
                height: '90px',
                background: 'rgba(0, 0, 0, 0.25)',
                border: '1.5px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '6px',
                display: 'flex',
                gap: '6px',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: '30px',
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.04)',
                  borderRadius: '4px',
                  padding: '4px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <div style={{ height: '5px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '1px' }} />
                <div style={{ height: '5px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '1px' }} />
                <div style={{ height: '5px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '1px' }} />
              </div>
              <div
                style={{
                  flex: 1,
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '4px',
                  padding: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <div
                  style={{
                    height: '24px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    borderRadius: '3px',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      width: '12px',
                      height: '12px',
                      background: 'var(--brass)',
                      borderRadius: '50%',
                      margin: '6px auto 0',
                    }}
                  />
                </div>
                <div style={{ height: '4px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '1px', width: '80%' }} />
                <div style={{ height: '4px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '1px', width: '50%' }} />
              </div>
              <div
                style={{
                  position: 'absolute',
                  right: '20px',
                  bottom: '15px',
                  width: 0,
                  height: 0,
                  borderLeft: '5px solid transparent',
                  borderRight: '5px solid transparent',
                  borderBottom: '8px solid var(--cream)',
                  transform: 'rotate(-45deg)',
                }}
              />
            </div>
            <span style={{ fontSize: '0.8rem', fontFamily: 'var(--mono)', color: 'var(--brass)', fontWeight: 600 }}>
              1. Build
            </span>
          </div>

          {/* Animated Arrow 1 */}
          <svg width="70" height="24" style={{ overflow: 'visible', display: 'block', flexShrink: 0 }} className="workflow-arrow" aria-hidden="true">
            <motion.path
              d="M0,12 L60,12"
              fill="none"
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />
            <motion.polygon
              points="55,8 63,12 55,16"
              fill="rgba(255, 255, 255, 0.25)"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            />
          </svg>

          {/* Step 2: Share */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
            <div
              style={{
                background: 'var(--cream)',
                color: 'var(--green-deep)',
                borderRadius: '20px',
                padding: '10px 20px',
                fontSize: '0.8rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
                border: '1.5px solid var(--border)',
              }}
            >
              <span>🔗 Preview Link</span>
            </div>
            <span style={{ fontSize: '0.8rem', fontFamily: 'var(--mono)', color: 'var(--brass)', fontWeight: 600 }}>
              2. Share
            </span>
          </div>

          {/* Animated Arrow 2 */}
          <svg width="70" height="24" style={{ overflow: 'visible', display: 'block', flexShrink: 0 }} className="workflow-arrow" aria-hidden="true">
            <motion.path
              d="M0,12 L60,12"
              fill="none"
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
            />
            <motion.polygon
              points="55,8 63,12 55,16"
              fill="rgba(255, 255, 255, 0.25)"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2 }}
            />
          </svg>

          {/* Step 3: Deploy */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
            <div
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '2px solid rgba(255, 255, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <motion.path
                  d="M20 6L9 17L4 12"
                  stroke="var(--brass)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.3, duration: 0.5 }}
                />
              </svg>
            </div>
            <span style={{ fontSize: '0.8rem', fontFamily: 'var(--mono)', color: 'var(--brass)', fontWeight: 600 }}>
              3. Deploy
            </span>
          </div>
        </ScrollReveal>
      </div>

      {/* 4 Step Cards */}
      <div
        className="steps"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          borderTop: '1.5px solid rgba(247, 244, 236, 0.14)',
          background: 'rgba(0, 0, 0, 0.12)',
        }}
      >
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="step"
            style={{
              padding: '44px 32px',
              borderRight: idx < 3 ? '1.5px solid rgba(247, 244, 236, 0.14)' : 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 120, delay: idx * 0.1, duration: 0.6 }}
              className="num serif"
              style={{
                fontSize: '2.2rem',
                color: 'var(--brass)',
                lineHeight: 1,
                marginBottom: '4px',
              }}
            >
              {step.num}
            </motion.p>
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 + 0.15, duration: 0.5 }}
              style={{
                fontSize: '1.05rem',
                fontWeight: 600,
                color: 'var(--cream)',
              }}
            >
              {step.title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 + 0.25, duration: 0.5 }}
              style={{
                fontSize: '0.9rem',
                color: '#C9D3CB',
                lineHeight: 1.6,
              }}
            >
              {step.desc}
            </motion.p>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 980px) {
          .steps {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .step {
            border-bottom: 1.5px solid rgba(247, 244, 236, 0.14) !important;
          }
          .step:nth-child(even) {
            border-right: none !important;
          }
          .step:nth-child(3), .step:nth-child(4) {
            border-bottom: none !important;
          }
        }
        @media (max-width: 768px) {
          .visual-diagram {
            flex-direction: column !important;
            padding: 30px 20px !important;
            gap: 20px !important;
          }
          .workflow-arrow {
            width: 24px !important;
            height: 24px !important;
            transform: rotate(90deg) !important;
          }
        }
        @media (max-width: 680px) {
          .steps {
            grid-template-columns: 1fr !important;
          }
          .step {
            border-right: none !important;
            border-bottom: 1.5px solid rgba(247, 244, 236, 0.14) !important;
            padding: 30px 24px !important;
          }
          .step:last-child {
            border-bottom: none !important;
          }
        }
      `}</style>
    </section>
  );
};

// ==========================================
// Templates Showcase Component
// ==========================================
const TemplatesSection: React.FC = () => {
  const templates = [
    {
      title: 'Restaurants & Cafes',
      imgWebp: '/restaurants.webp',
      imgPng: '/restaurants.png',
      width: 800,
      height: 399,
    },
    {
      title: 'Clinics',
      imgWebp: '/clinics.webp',
      imgPng: '/clinics.png',
      width: 800,
      height: 800,
    },
    {
      title: 'Salons',
      imgWebp: '/salons.webp',
      imgPng: '/salons.png',
      width: 800,
      height: 393,
    },
    {
      title: 'Gyms',
      imgWebp: '/gyms.webp',
      imgPng: '/gyms.png',
      width: 800,
      height: 800,
    },
  ];

  return (
    <section
      className="block light-theme dot-grid"
      id="templates"
      style={{
        padding: '96px 0',
        background: 'var(--bg-light)',
        position: 'relative',
      }}
    >
      <div className="grid-bg-overlay" />
      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
        <ScrollReveal className="section-head" style={{ maxWidth: '620px', margin: '0 auto 48px', textAlign: 'center' }}>
          <h2 className="serif" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', color: 'var(--ink-light)' }}>
            Templates built for real businesses
          </h2>
        </ScrollReveal>

        <div className="tmpl-scroll-container">
          <div
            className="tmpl-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '18px',
            }}
          >
            {templates.map((tpl, idx) => (
              <ScrollReveal
                key={idx}
                direction="up"
                delay={idx * 0.08}
                duration={0.5}
                style={{ height: '100%' }}
              >
                <InteractiveCard
                  glowColor="rgba(28, 30, 26, 0.04)"
                  style={{
                    background: 'var(--surface-light)',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    padding: '12px',
                    color: 'var(--ink-light)',
                  }}
                >
                  <div
                    style={{
                      aspectRatio: '16/9',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: '1.8px solid var(--border-light)',
                      marginBottom: '14px',
                      position: 'relative',
                      background: 'var(--border-light)',
                    }}
                  >
                    <picture>
                      <source srcSet={tpl.imgWebp} type="image/webp" />
                      <img
                        src={tpl.imgPng}
                        alt={`SiteBox ${tpl.title} website template preview for client projects`}
                        width={tpl.width}
                        height={tpl.height}
                        loading="lazy"
                        decoding="async"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                    </picture>
                  </div>
                  <h3
                    style={{
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      textAlign: 'center',
                      marginBottom: '6px',
                      color: 'var(--ink-light)',
                    }}
                  >
                    {tpl.title}
                  </h3>
                </InteractiveCard>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Browse All Templates Action (Navigates to canonical app) */}
        <ScrollReveal
          direction="up"
          delay={0.3}
          className="tmpl-more"
          style={{ textAlign: 'center', marginTop: '40px' }}
        >
          <a
            href={APP_URL}
            className="btn btn-ghost"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            Browse all templates
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              style={{ display: 'inline-block' }}
              aria-hidden="true"
            >
              →
            </motion.span>
          </a>
        </ScrollReveal>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .tmpl-grid {
            grid-template-columns: repeat(2, 1fr) !important;
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
            width: 220px !important;
            scroll-snap-align: start;
            flex-shrink: 0;
          }
        }
      `}</style>
    </section>
  );
};

// ==========================================
// Final CTA Section Component
// ==========================================
const FinalCTA: React.FC = () => {
  return (
    <section
      className="cta-final dot-grid"
      style={{
        background: 'radial-gradient(circle at center, var(--green-glow) 0%, var(--bg) 100%)',
        borderTop: '1.8px solid var(--border)',
        borderBottom: '1.8px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
        padding: '110px 0',
      }}
    >
      <div className="grid-bg-overlay" />
      <div className="wrap" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <ScrollReveal direction="up" delay={0.1} duration={0.6}>
          <h2
            className="serif"
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              fontWeight: 500,
              maxWidth: '700px',
              margin: '0 auto 18px',
              lineHeight: 1.15,
              color: 'var(--ink)',
            }}
          >
            Stop juggling tools. Start shipping sites.
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2} duration={0.6}>
          <p
            style={{
              color: 'var(--ink-soft)',
              maxWidth: '500px',
              margin: '0 auto 38px',
              fontSize: '1.08rem',
              lineHeight: 1.6,
            }}
          >
            Choose a template, customize it, and send your first client preview today.
          </p>
        </ScrollReveal>

        {/* Primary CTA (Talk to Us removed per specs) */}
        <ScrollReveal direction="up" delay={0.3} duration={0.6}>
          <div
            className="hero-actions"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '18px',
              flexWrap: 'wrap',
            }}
          >
            <a
              href={APP_URL}
              className="btn btn-primary"
              style={{
                position: 'relative',
                overflow: 'hidden',
                padding: '0.95rem 2.4rem',
                fontSize: '1.05rem',
                fontWeight: 600,
                borderRadius: 'var(--radius)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              Start Building Free
              <ArrowRight size={16} aria-hidden="true" />
              <motion.div
                animate={{ x: ['-100%', '220%'] }}
                transition={{ repeat: Infinity, duration: 2.8, ease: 'linear', repeatDelay: 1.5 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '35%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                  transform: 'skewX(-20deg)',
                  pointerEvents: 'none',
                }}
              />
            </a>
          </div>
        </ScrollReveal>
      </div>

      {/* Subtle Floating Ambient Particles */}
      <div className="decorations" style={{ pointerEvents: 'none' }} aria-hidden="true">
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
            background: 'var(--brass)',
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
            background: 'var(--green)',
          }}
        />
      </div>
    </section>
  );
};

// ==========================================
// Footer Component
// ==========================================
interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenCookieSettings: () => void;
  onOpenContact: (topic?: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenCookieSettings, onOpenContact }) => {
  const currentYear = new Date().getFullYear();

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onNavigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const productLinks = [
    { label: 'Templates', href: '#templates' },
    { label: 'How it works', href: '#workflow' },
    { label: 'Why SiteBox', href: '#why' },
  ];

  return (
    <footer
      style={{
        padding: '80px 0 40px',
        background: 'var(--bg)',
        borderTop: '1.8px solid var(--border)',
        color: 'var(--ink)',
      }}
    >
      <div className="wrap">
        <div
          className="foot-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.6fr 0.9fr 1.1fr 1.1fr 0.9fr',
            gap: '36px',
            marginBottom: '60px',
          }}
        >
          {/* Brand Info & Business Details */}
          <div className="foot-brand">
            <a
              href="/"
              onClick={handleLogoClick}
              className="logo"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontWeight: 600,
                fontSize: '1.25rem',
                color: 'var(--ink)',
              }}
              aria-label="SiteBox Home"
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--brass)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0 }}
                aria-hidden="true"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
              <span className="serif" style={{ color: 'var(--cream)' }}>
                Site<span style={{ color: 'var(--brass)' }}>Box</span>
              </span>
            </a>
            <p
              style={{
                color: 'var(--ink-soft)',
                fontSize: '0.92rem',
                marginTop: '16px',
                maxWidth: '280px',
                lineHeight: 1.6,
              }}
            >
              The workspace for building, previewing, and delivering client websites — without the infrastructure headache.
            </p>
            {/* Operator and Business Details */}
            <div style={{ marginTop: '18px', fontSize: '0.82rem', color: 'var(--ink-faint)', lineHeight: 1.6 }}>
              <span style={{ color: 'var(--cream)', fontWeight: 600 }}>SiteBox Studio</span><br />
              Independent product by Haries Hussain<br />
              Direct support: <a href="mailto:support@sitebox.studio" style={{ color: 'var(--brass)', textDecoration: 'underline' }}>support@sitebox.studio</a>
            </div>
          </div>

          {/* Product Links */}
          <div className="foot-col" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '0.72rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--ink-faint)',
                marginBottom: '16px',
                fontWeight: 600,
              }}
            >
              Product
            </h3>
            {productLinks.map((link) => (
              <motion.a
                key={link.label}
                whileHover={{ x: 2, color: 'var(--brass)' }}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/');
                  setTimeout(() => {
                    document.getElementById(link.href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
                  }, 80);
                }}
                style={{
                  fontSize: '0.92rem',
                  color: 'var(--ink-soft)',
                  alignSelf: 'flex-start',
                  transition: 'color 0.2s ease',
                }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* Company & Inquiries */}
          <div className="foot-col" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '0.72rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--ink-faint)',
                marginBottom: '16px',
                fontWeight: 600,
              }}
            >
              Inquiries
            </h3>
            <motion.button
              type="button"
              whileHover={{ x: 2, color: 'var(--brass)' }}
              onClick={() => onOpenContact('Template Request')}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '0.92rem',
                color: 'var(--ink-soft)',
                alignSelf: 'flex-start',
                transition: 'color 0.2s ease',
              }}
            >
              Request a Template
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ x: 2, color: 'var(--brass)' }}
              onClick={() => onOpenContact('Freelancer Partnership')}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '0.92rem',
                color: 'var(--ink-soft)',
                alignSelf: 'flex-start',
                transition: 'color 0.2s ease',
              }}
            >
              Contact Support
            </motion.button>
            <motion.a
              whileHover={{ x: 2, color: 'var(--brass)' }}
              href={APP_URL}
              style={{
                fontSize: '0.92rem',
                color: 'var(--ink-soft)',
                alignSelf: 'flex-start',
                transition: 'color 0.2s ease',
              }}
            >
              Start Free
            </motion.a>
          </div>

          {/* Legal & Compliance */}
          <div className="foot-col" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '0.72rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--ink-faint)',
                marginBottom: '16px',
                fontWeight: 600,
              }}
            >
              Legal &amp; Privacy
            </h3>
            <motion.button
              type="button"
              whileHover={{ x: 2, color: 'var(--brass)' }}
              onClick={() => onNavigate('/privacy')}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '0.92rem',
                color: 'var(--ink-soft)',
                alignSelf: 'flex-start',
                transition: 'color 0.2s ease',
              }}
            >
              Privacy Policy
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ x: 2, color: 'var(--brass)' }}
              onClick={() => onNavigate('/terms')}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '0.92rem',
                color: 'var(--ink-soft)',
                alignSelf: 'flex-start',
                transition: 'color 0.2s ease',
              }}
            >
              Terms of Service
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ x: 2, color: 'var(--brass)' }}
              onClick={() => onNavigate('/cookies')}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '0.92rem',
                color: 'var(--ink-soft)',
                alignSelf: 'flex-start',
                transition: 'color 0.2s ease',
              }}
            >
              Cookie Policy
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ x: 2, color: 'var(--brass)' }}
              onClick={() => onNavigate('/refunds')}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '0.92rem',
                color: 'var(--ink-soft)',
                alignSelf: 'flex-start',
                transition: 'color 0.2s ease',
              }}
            >
              Refund Policy
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ x: 2, color: 'var(--brass)' }}
              onClick={onOpenCookieSettings}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '0.92rem',
                color: 'var(--ink-soft)',
                alignSelf: 'flex-start',
                transition: 'color 0.2s ease',
              }}
            >
              Cookie Preferences
            </motion.button>
          </div>

          {/* Get Started Links */}
          <div className="foot-col" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '0.72rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--ink-faint)',
                marginBottom: '16px',
                fontWeight: 600,
              }}
            >
              Get started
            </h3>
            <motion.a
              whileHover={{ x: 2, color: 'var(--brass)' }}
              href={APP_URL}
              style={{
                fontSize: '0.92rem',
                color: 'var(--ink-soft)',
                alignSelf: 'flex-start',
                transition: 'color 0.2s ease',
              }}
            >
              Create free account
            </motion.a>
            <motion.a
              whileHover={{ x: 2, color: 'var(--brass)' }}
              href={APP_URL}
              style={{
                fontSize: '0.92rem',
                color: 'var(--ink-soft)',
                alignSelf: 'flex-start',
                transition: 'color 0.2s ease',
              }}
            >
              Log in
            </motion.a>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div
          className="foot-bottom"
          style={{
            borderTop: '1.8px solid var(--border)',
            paddingTop: '28px',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '0.82rem',
            color: 'var(--ink-faint)',
          }}
        >
          <span>© {currentYear} SiteBox Studio. All rights reserved.</span>
          <span style={{ maxWidth: '620px', lineHeight: 1.5, textAlign: 'right' }}>
            Disclaimer: All template previews, client mockups, and trade marks are demonstrative portfolio materials. Brand marks belong to their respective owners.
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
          .foot-bottom span {
            text-align: left !important;
          }
        }
      `}</style>
    </footer>
  );
};

// ==========================================
// Main Application Export
// ==========================================
export default function App() {
  const [currentPath, setCurrentPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );
  const [isCookieSettingsOpen, setIsCookieSettingsOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactTopic, setContactTopic] = useState('Template Request');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenContact = (topic = 'Template Request') => {
    setContactTopic(topic);
    setIsContactModalOpen(true);
  };

  return (
    <>
      {/* Accessibility Skip to Main Content Link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Navbar onNavigate={navigate} currentPath={currentPath} />

      <main id="main-content">
        {currentPath === '/privacy' ? (
          <PrivacyPolicy onNavigate={navigate} />
        ) : currentPath === '/terms' ? (
          <TermsOfService onNavigate={navigate} />
        ) : currentPath === '/cookies' ? (
          <CookiePolicy onNavigate={navigate} onOpenCookieSettings={() => setIsCookieSettingsOpen(true)} />
        ) : currentPath === '/refunds' ? (
          <RefundPolicy onNavigate={navigate} />
        ) : (
          <>
            <Hero />
            <AudienceFeatures />
            <WhySiteBox />
            <HowItWorks />
            <TemplatesSection />
            <FinalCTA />
          </>
        )}
      </main>

      <Footer
        onNavigate={navigate}
        onOpenCookieSettings={() => setIsCookieSettingsOpen(true)}
        onOpenContact={handleOpenContact}
      />

      {/* Accessible Cookie Consent Banner & Settings Modal */}
      <CookieConsentBanner
        onNavigate={navigate}
        forceOpenSettings={isCookieSettingsOpen}
        onCloseSettings={() => setIsCookieSettingsOpen(false)}
      />

      {/* Accessible Contact & Template Request Modal with Affirmative Consent */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        onNavigate={navigate}
        initialTopic={contactTopic}
      />
    </>
  );
}

