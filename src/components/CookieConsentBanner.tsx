import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Cookie, X, Settings } from 'lucide-react';

interface CookieConsentBannerProps {
  onNavigate: (path: string) => void;
  forceOpenSettings?: boolean;
  onCloseSettings?: () => void;
}

const getStoredConsent = () => {
  try {
    if (typeof window === 'undefined') return { isSet: false, analytics: false, marketing: false };
    const consent = localStorage.getItem('sitebox_cookie_consent');
    if (consent) {
      const parsed = JSON.parse(consent);
      return { isSet: true, analytics: !!parsed.analytics, marketing: !!parsed.marketing };
    }
  } catch {
    // Ignore error
  }
  return { isSet: false, analytics: false, marketing: false };
};

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  onNavigate,
  forceOpenSettings = false,
  onCloseSettings,
}) => {
  const [initialConsent] = useState(getStoredConsent);
  const [isVisible, setIsVisible] = useState(() => !initialConsent.isSet);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(() => initialConsent.analytics);
  const [marketingConsent, setMarketingConsent] = useState(() => initialConsent.marketing);

  const isModalOpen = isUserModalOpen || forceOpenSettings;

  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const handleCloseModal = useCallback(() => {
    setIsUserModalOpen(false);
    if (onCloseSettings) onCloseSettings();
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  }, [onCloseSettings]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        handleCloseModal();
      }
    };
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      const timer = setTimeout(() => {
        const firstBtn = modalRef.current?.querySelector('button');
        firstBtn?.focus();
      }, 50);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isModalOpen, handleCloseModal]);

  const saveConsent = (analytics: boolean, marketing: boolean) => {
    const preference = {
      essential: true,
      analytics,
      marketing,
      timestamp: new Date().toISOString(),
    };
    try {
      localStorage.setItem('sitebox_cookie_consent', JSON.stringify(preference));
    } catch {
      // Ignore storage errors in restrictive browser environments
    }
    setAnalyticsConsent(analytics);
    setMarketingConsent(marketing);
    setIsVisible(false);
    handleCloseModal();
  };

  const handleAcceptEssential = () => {
    saveConsent(false, false);
  };

  const handleAcceptAll = () => {
    saveConsent(true, true);
  };

  return (
    <>
      {/* Floating Bottom Banner */}
      <AnimatePresence>
        {isVisible && !isModalOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            role="region"
            aria-label="Cookie consent banner"
            style={{
              position: 'fixed',
              bottom: '20px',
              left: '20px',
              right: '20px',
              maxWidth: '820px',
              margin: '0 auto',
              background: 'rgba(7, 19, 15, 0.96)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1.5px solid var(--border)',
              borderRadius: 'var(--radius)',
              boxShadow: '0 20px 45px rgba(0, 0, 0, 0.65), 0 0 20px rgba(212, 175, 55, 0.1)',
              padding: '22px 26px',
              zIndex: 9990,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '18px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: '1 1 380px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(212, 175, 55, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--brass)',
                  flexShrink: 0,
                  marginTop: '2px',
                }}
              >
                <Shield size={20} aria-hidden="true" />
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--cream)', lineHeight: 1.55 }}>
                <strong style={{ color: 'var(--brass)' }}>Privacy &amp; Cookie Notice:</strong>{' '}
                We use strictly necessary technical storage for security and core functionality. We do{' '}
                <strong>not</strong> use third-party tracking or advertising cookies.{' '}
                <button
                  type="button"
                  onClick={() => onNavigate('/cookies')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--brass)',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    fontSize: 'inherit',
                    padding: 0,
                  }}
                >
                  Cookie Policy
                </button>
                {' '}&amp;{' '}
                <button
                  type="button"
                  onClick={() => onNavigate('/privacy')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--brass)',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    fontSize: 'inherit',
                    padding: 0,
                  }}
                >
                  Privacy Policy
                </button>.
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => {
                  triggerRef.current = document.activeElement as HTMLElement;
                  setIsUserModalOpen(true);
                }}
                className="btn btn-ghost"
                style={{
                  padding: '0.65rem 1.15rem',
                  fontSize: '0.85rem',
                  borderColor: 'var(--border)',
                  color: 'var(--cream)',
                }}
              >
                <Settings size={14} aria-hidden="true" />
                Preferences
              </button>
              <button
                type="button"
                onClick={handleAcceptEssential}
                className="btn btn-primary"
                style={{
                  padding: '0.65rem 1.35rem',
                  fontSize: '0.85rem',
                  background: 'var(--cream)',
                  color: 'var(--green-deep)',
                }}
              >
                Accept Essential
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preferences Modal Dialog */}
      <AnimatePresence>
        {isModalOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(5, 15, 12, 0.85)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
            onClick={handleCloseModal}
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.25 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="cookie-modal-title"
              style={{
                width: '100%',
                maxWidth: '560px',
                background: 'var(--bg)',
                border: '1.8px solid var(--border)',
                borderRadius: 'var(--radius)',
                padding: '30px',
                color: 'var(--ink)',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
                position: 'relative',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Cookie size={22} color="var(--brass)" aria-hidden="true" />
                  <h2 id="cookie-modal-title" className="serif" style={{ fontSize: '1.4rem', color: 'var(--cream)' }}>
                    Cookie &amp; Storage Preferences
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--ink-soft)',
                    cursor: 'pointer',
                    padding: '6px',
                    display: 'flex',
                  }}
                  aria-label="Close cookie preferences modal"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--ink-soft)', lineHeight: 1.6, marginBottom: '22px' }}>
                We respect your sovereignty over your personal data. You can inspect and toggle individual storage categories below.
                For complete technical details, consult our{' '}
                <button
                  type="button"
                  onClick={() => {
                    handleCloseModal();
                    onNavigate('/cookies');
                  }}
                  style={{ background: 'none', border: 'none', color: 'var(--brass)', textDecoration: 'underline', cursor: 'pointer', padding: 0 }}
                >
                  Cookie Policy
                </button>.
              </p>

              {/* Toggles */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
                {/* Essential Category */}
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border)', borderRadius: '8px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 600, color: 'var(--cream)', fontSize: '0.95rem' }}>Strictly Necessary Storage</span>
                    <span className="mono" style={{ fontSize: '0.75rem', background: 'rgba(212, 175, 55, 0.15)', color: 'var(--brass)', padding: '2px 8px', borderRadius: '4px' }}>
                      ALWAYS ACTIVE
                    </span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', lineHeight: 1.5 }}>
                    Essential for secure authentication, CSRF attack defense, and remembering your privacy choices. These cannot be switched off under applicable ePrivacy regulations.
                  </p>
                </div>

                {/* Analytics Category */}
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border)', borderRadius: '8px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 600, color: 'var(--cream)', fontSize: '0.95rem' }}>Performance &amp; Diagnostics</span>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '8px' }}>
                      <input
                        type="checkbox"
                        checked={analyticsConsent}
                        onChange={(e) => setAnalyticsConsent(e.target.checked)}
                        style={{ accentColor: 'var(--brass)', width: '18px', height: '18px', cursor: 'pointer' }}
                        aria-label="Allow performance and diagnostic cookies"
                      />
                    </label>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', lineHeight: 1.5 }}>
                    Allows anonymized aggregation of site uptime and page speeds. (Currently, no analytics scripts run on SiteBox).
                  </p>
                </div>

                {/* Marketing Category */}
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border)', borderRadius: '8px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 600, color: 'var(--cream)', fontSize: '0.95rem' }}>Targeted Advertising</span>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '8px' }}>
                      <input
                        type="checkbox"
                        checked={marketingConsent}
                        onChange={(e) => setMarketingConsent(e.target.checked)}
                        style={{ accentColor: 'var(--brass)', width: '18px', height: '18px', cursor: 'pointer' }}
                        aria-label="Allow marketing cookies"
                      />
                    </label>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', lineHeight: 1.5 }}>
                    Used by advertisers to build behavioral interest profiles. SiteBox does not serve targeted ads or use advertising cookies.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => saveConsent(analyticsConsent, marketingConsent)}
                  className="btn btn-ghost"
                  style={{ padding: '0.65rem 1.3rem', fontSize: '0.9rem', borderColor: 'var(--border)' }}
                >
                  Save Choices
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="btn btn-primary"
                  style={{ padding: '0.65rem 1.4rem', fontSize: '0.9rem', background: 'var(--cream)', color: 'var(--green-deep)' }}
                >
                  Accept All
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
