import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);

  // Track scrolled state for transparent-to-solid transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const sections = ['why', 'workflow', 'templates', 'features'];
    const observers = [];

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      rootMargin: '-30% 0px -60% 0px',
    };

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const obs = new IntersectionObserver(observerCallback, observerOptions);
        obs.observe(el);
        observers.push({ obs, el });
      }
    });

    return () => {
      observers.forEach(({ obs, el }) => obs.unobserve(el));
    };
  }, []);

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 50,
      background: scrolled ? 'rgba(7, 19, 15, 0.85)' : 'transparent',
      backdropFilter: scrolled ? 'saturate(140%) blur(12px)' : 'none',
      borderBottom: scrolled ? '1.8px solid var(--border)' : '1.8px solid transparent',
      transition: 'background 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease'
    }}>
      <nav className="wrap" style={{
        padding: '18px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative'
      }}>
        {/* Logo matching Reference Image 2 */}
        <a href="#" onClick={(e) => handleScrollTo(e, 'root')} className="logo" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontWeight: 600,
          fontSize: '1.25rem',
          color: 'var(--ink)'
        }}>
          {/* Golden 3D perspective box SVG */}
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
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
          <span className="serif" style={{
            fontWeight: 500,
            fontSize: '1.28rem',
            color: 'var(--cream)',
            letterSpacing: '-0.015em'
          }}>SiteBox</span>
        </a>

        {/* Desktop Nav Links (Cream color matching dark green header) */}
        <ul className="nav-links" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '34px',
        }}>
          {[
            { id: 'why', label: 'Why SiteBox' },
            { id: 'workflow', label: 'How it works' },
            { id: 'templates', label: 'Templates' },
            { id: 'features', label: 'Features' }
          ].map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleScrollTo(e, item.id)}
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
                      borderRadius: '1px'
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Nav Actions */}
        <div className="nav-cta" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
        }}>
          <a href="#" className="btn btn-ghost" style={{ 
            padding: '0.65rem 1.35rem', 
            fontSize: '0.9rem', 
            borderColor: 'var(--cream)', 
            color: 'var(--cream)',
            background: 'transparent'
          }}>Log in</a>
          <a href="#" className="btn btn-primary" style={{ 
            padding: '0.65rem 1.35rem', 
            fontSize: '0.9rem',
            background: 'var(--cream)',
            color: 'var(--green-deep)',
            border: '1.5px solid var(--cream)'
          }}>Get Started</a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="nav-links-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '6px',
            display: 'none',
            flexDirection: 'column',
            gap: '5px'
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

      {/* Mobile Animated Dropdown */}
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
              zIndex: 49
            }}
          >
            <ul style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '20px 24px',
              gap: '18px'
            }}>
              {[
                { id: 'why', label: 'Why SiteBox' },
                { id: 'workflow', label: 'How it works' },
                { id: 'templates', label: 'Templates' },
                { id: 'features', label: 'Features' }
              ].map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleScrollTo(e, item.id)}
                    style={{
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: activeSection === item.id ? 'var(--brass)' : 'var(--ink)',
                      display: 'block',
                      padding: '8px 0'
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                <a href="#" className="btn btn-ghost" style={{ 
                  flex: 1, 
                  padding: '0.8rem', 
                  textAlign: 'center', 
                  borderColor: 'var(--cream)', 
                  color: 'var(--cream)',
                  background: 'transparent' 
                }}>Log in</a>
                <a href="#" className="btn btn-primary" style={{ 
                  flex: 1, 
                  padding: '0.8rem', 
                  textAlign: 'center',
                  background: 'var(--cream)',
                  color: 'var(--green-deep)',
                  border: '1.5px solid var(--cream)'
                }}>Get Started</a>
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
}
