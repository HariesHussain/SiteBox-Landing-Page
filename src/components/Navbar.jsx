import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

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
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(7, 19, 15, 0.85)',
      backdropFilter: 'saturate(140%) blur(12px)',
      borderBottom: '1.8px solid var(--border)',
    }}>
      <nav className="wrap" style={{
        padding: '18px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative'
      }}>
        {/* Logo matching Image 1 */}
        <a href="#" onClick={(e) => handleScrollTo(e, 'root')} className="logo" style={{
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
            fontSize: '1.1rem',
            flexShrink: 0,
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}>S</span>
          Site<span style={{ color: 'var(--brass)' }}>Box</span>
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
          <a href="#" className="btn btn-ghost" style={{ padding: '0.65rem 1.3rem', fontSize: '0.9rem' }}>Log in</a>
          <a href="#" className="btn btn-primary" style={{ padding: '0.65rem 1.3rem', fontSize: '0.9rem' }}>Get Started</a>
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
                <a href="#" className="btn btn-ghost" style={{ flex: 1, padding: '0.8rem' }}>Log in</a>
                <a href="#" className="btn btn-primary" style={{ flex: 1, padding: '0.8rem' }}>Get Started</a>
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
        }
        @media (max-width: 680px) {
          .nav-cta .btn-ghost {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
