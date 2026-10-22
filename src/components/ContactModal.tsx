import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
  initialTopic?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  initialTopic = 'Template Request',
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState(initialTopic);
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const handleClose = useCallback(() => {
    setStatus('idle');
    setErrorMessage('');
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        firstInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid work email address.');
      return;
    }

    if (!consent) {
      setErrorMessage('You must confirm consent before submitting your request.');
      return;
    }

    setStatus('submitting');

    // Simulate reliable dispatch or webhook integration
    setTimeout(() => {
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
      setConsent(false);
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
            overflowY: 'auto',
          }}
          onClick={handleClose}
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            style={{
              width: '100%',
              maxWidth: '540px',
              background: 'var(--bg)',
              border: '1.8px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: '32px',
              color: 'var(--ink)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85), 0 0 25px rgba(212, 175, 55, 0.1)',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <span className="eyebrow" style={{ marginBottom: '6px' }}>Direct Communication</span>
                <h2 id="contact-modal-title" className="serif" style={{ fontSize: '1.5rem', color: 'var(--cream)' }}>
                  Inquiries &amp; Template Requests
                </h2>
              </div>
              <button
                type="button"
                onClick={handleClose}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--ink-soft)',
                  cursor: 'pointer',
                  padding: '6px',
                  display: 'flex',
                }}
                aria-label="Close contact form modal"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '36px 12px' }}>
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    background: 'rgba(212, 175, 55, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--brass)',
                    margin: '0 auto 18px',
                  }}
                >
                  <CheckCircle2 size={32} aria-hidden="true" />
                </div>
                <h3 className="serif" style={{ fontSize: '1.4rem', color: 'var(--cream)', marginBottom: '8px' }}>
                  Request Received
                </h3>
                <p style={{ color: 'var(--ink-soft)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>
                  Thank you for reaching out! We collect only necessary details to answer your inquiry and will respond within 1 business day.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="btn btn-primary"
                  style={{ padding: '0.75rem 1.8rem', background: 'var(--cream)', color: 'var(--green-deep)' }}
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                
                {errorMessage && (
                  <div
                    role="alert"
                    style={{
                      background: 'rgba(239, 68, 68, 0.12)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#fca5a5',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      fontSize: '0.88rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <AlertCircle size={16} aria-hidden="true" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Name field (optional) */}
                <div>
                  <label htmlFor="contact-name" style={{ display: 'block', fontSize: '0.88rem', fontWeight: 500, color: 'var(--cream)', marginBottom: '6px' }}>
                    Your Name <span style={{ color: 'var(--ink-soft)', fontWeight: 400 }}>(Optional)</span>
                  </label>
                  <input
                    ref={firstInputRef}
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Miller"
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1.5px solid var(--border)',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      color: 'var(--ink)',
                      fontSize: '0.95rem',
                    }}
                  />
                </div>

                {/* Email field (required) */}
                <div>
                  <label htmlFor="contact-email" style={{ display: 'block', fontSize: '0.88rem', fontWeight: 500, color: 'var(--cream)', marginBottom: '6px' }}>
                    Work Email <span style={{ color: 'var(--brass)' }}>*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    aria-required="true"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@agency.com"
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1.5px solid var(--border)',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      color: 'var(--ink)',
                      fontSize: '0.95rem',
                    }}
                  />
                </div>

                {/* Topic / Niche */}
                <div>
                  <label htmlFor="contact-topic" style={{ display: 'block', fontSize: '0.88rem', fontWeight: 500, color: 'var(--cream)', marginBottom: '6px' }}>
                    Inquiry Topic <span style={{ color: 'var(--brass)' }}>*</span>
                  </label>
                  <select
                    id="contact-topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#07130f',
                      border: '1.5px solid var(--border)',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      color: 'var(--ink)',
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="Template Request">Request a New Template Niche</option>
                    <option value="Freelancer Partnership">Freelancer / Agency Inquiry</option>
                    <option value="Technical Question">Technical Support Question</option>
                    <option value="Billing Inquiry">Billing &amp; Refunds</option>
                    <option value="Privacy Request">Data Privacy / GDPR Request</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" style={{ display: 'block', fontSize: '0.88rem', fontWeight: 500, color: 'var(--cream)', marginBottom: '6px' }}>
                    Message <span style={{ color: 'var(--brass)' }}>*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    aria-required="true"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about the client website niche you need or how we can help..."
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1.5px solid var(--border)',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      color: 'var(--ink)',
                      fontSize: '0.95rem',
                      resize: 'vertical',
                    }}
                  />
                </div>

                {/* GDPR Affirmative Consent Checkbox */}
                <div style={{ background: 'rgba(212, 175, 55, 0.06)', border: '1px solid var(--border)', padding: '14px', borderRadius: '8px' }}>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
                    <input
                      id="contact-consent-checkbox"
                      type="checkbox"
                      required
                      aria-required="true"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      style={{
                        accentColor: 'var(--brass)',
                        width: '18px',
                        height: '18px',
                        marginTop: '2px',
                        flexShrink: 0,
                        cursor: 'pointer',
                      }}
                    />
                    <span style={{ fontSize: '0.82rem', color: 'var(--ink-soft)', lineHeight: 1.5 }}>
                      I agree to the{' '}
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onNavigate('/privacy');
                        }}
                        style={{ background: 'none', border: 'none', color: 'var(--brass)', textDecoration: 'underline', cursor: 'pointer', padding: 0 }}
                      >
                        Privacy Policy
                      </button>{' '}
                      and{' '}
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onNavigate('/terms');
                        }}
                        style={{ background: 'none', border: 'none', color: 'var(--brass)', textDecoration: 'underline', cursor: 'pointer', padding: 0 }}
                      >
                        Terms of Service
                      </button>
                      , and I consent to SiteBox processing my email solely to respond to this inquiry. I may withdraw my consent at any time.
                    </span>
                  </label>
                </div>

                {/* Submit button */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '6px' }}>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="btn btn-ghost"
                    style={{ padding: '0.75rem 1.4rem', fontSize: '0.9rem', borderColor: 'var(--border)' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="btn btn-primary"
                    style={{
                      padding: '0.75rem 1.6rem',
                      fontSize: '0.9rem',
                      background: 'var(--cream)',
                      color: 'var(--green-deep)',
                      opacity: status === 'submitting' ? 0.7 : 1,
                    }}
                  >
                    {status === 'submitting' ? 'Submitting...' : 'Send Inquiry'}
                  </button>
                </div>

              </form>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
