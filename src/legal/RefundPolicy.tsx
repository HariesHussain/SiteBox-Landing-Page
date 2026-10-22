import React, { useEffect } from 'react';
import { ArrowLeft, RefreshCw, CheckCircle } from 'lucide-react';

interface LegalPageProps {
  onNavigate: (path: string) => void;
}

export const RefundPolicy: React.FC<LegalPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    document.title = 'Refund & Cancellation Policy – SiteBox';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page-container" style={{ background: 'var(--bg)', color: 'var(--ink)', minHeight: '100vh', padding: '120px 0 80px' }}>
      <div className="wrap" style={{ maxWidth: '860px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Back navigation */}
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="btn btn-ghost"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '36px',
            padding: '8px 16px',
            fontSize: '0.9rem',
            color: 'var(--brass)',
            borderColor: 'var(--border)',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: 'var(--radius)',
            cursor: 'pointer',
          }}
          aria-label="Back to SiteBox homepage"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to SiteBox
        </button>

        {/* Header */}
        <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '32px', marginBottom: '40px' }}>
          <div className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <RefreshCw size={14} color="var(--brass)" aria-hidden="true" />
            Billing Transparency &amp; Protection
          </div>
          <h1 className="serif" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)', color: 'var(--ink)', marginBottom: '16px', lineHeight: 1.15 }}>
            Refund &amp; Cancellation Policy
          </h1>
          <p style={{ color: 'var(--ink-soft)', fontSize: '0.98rem' }}>
            <strong>Effective Date:</strong> October 22, 2026 &nbsp;|&nbsp; <strong>Last Updated:</strong> October 22, 2026
          </p>
        </div>

        {/* Content body */}
        <div className="legal-content" style={{ display: 'flex', flexDirection: 'column', gap: '36px', lineHeight: 1.75, fontSize: '1rem', color: 'rgba(255, 255, 255, 0.9)' }}>
          
          <section>
            <h2 className="serif" style={{ fontSize: '1.5rem', color: 'var(--brass-soft)', marginBottom: '14px' }}>
              1. Our Philosophy on Fair Billing
            </h2>
            <p>
              SiteBox is built for freelancers, agencies, and independent creators. We believe you should only pay for software that genuinely adds speed, clarity, and profit to your client delivery pipeline.
              Our refund and cancellation policies are straightforward, fair, and free from hidden traps.
            </p>
          </section>

          <section>
            <h2 className="serif" style={{ fontSize: '1.5rem', color: 'var(--brass-soft)', marginBottom: '14px' }}>
              2. 14-Day Money-Back Guarantee
            </h2>
            <div style={{ background: 'rgba(212, 175, 55, 0.08)', border: '1px solid var(--border)', padding: '24px', borderRadius: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--brass)', fontWeight: 600, fontSize: '1.1rem', marginBottom: '10px' }}>
                <CheckCircle size={20} aria-hidden="true" />
                No-Questions-Asked First Purchase Guarantee
              </div>
              <p style={{ color: 'var(--ink-soft)', fontSize: '0.96rem' }}>
                If you purchase a paid SiteBox subscription for the first time and find that it does not fit your workflow, you are entitled to a <strong>100% full refund</strong> within <strong>fourteen (14) calendar days</strong> of your initial transaction.
                Simply send an email to <a href="mailto:billing@sitebox.studio" style={{ color: 'var(--brass)', fontWeight: 600 }}>billing@sitebox.studio</a> within the 14-day window.
              </p>
            </div>
          </section>

          <section>
            <h2 className="serif" style={{ fontSize: '1.5rem', color: 'var(--brass-soft)', marginBottom: '14px' }}>
              3. Subscription Renewals &amp; Cancellations
            </h2>
            <p>
              For ongoing monthly or annual subscription plans:
            </p>
            <ul style={{ paddingLeft: '20px', listStyleType: 'disc', marginTop: '12px', color: 'var(--ink-soft)' }}>
              <li>
                <strong>One-Click Cancellation:</strong> You may cancel recurring billing at any time directly through your workspace billing settings, without needing to contact sales or speak to an agent.
              </li>
              <li>
                <strong>Continued Access:</strong> When you cancel a subscription, your account remains active with full access to all features and templates until the conclusion of your current paid billing period.
              </li>
              <li>
                <strong>No Surprise Automatic Charges:</strong> We send advance renewal reminder notices for annual plans prior to the renewal charge.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="serif" style={{ fontSize: '1.5rem', color: 'var(--brass-soft)', marginBottom: '14px' }}>
              4. Exceptions &amp; Non-Refundable Items
            </h2>
            <p>
              The following categories are strictly non-refundable:
            </p>
            <ul style={{ paddingLeft: '20px', listStyleType: 'disc', marginTop: '12px', color: 'var(--ink-soft)' }}>
              <li>
                <strong>Custom Domain Registrations:</strong> When you purchase or register a custom domain through our registrar integration, ICANN registry registry fees are paid immediately and cannot be refunded or cancelled once the domain is provisioned.
              </li>
              <li>
                <strong>Completed One-Off Design or Migration Services:</strong> Bespoke custom consulting services that have already been performed and delivered.
              </li>
              <li>
                <strong>Accounts Terminated for Terms Violation:</strong> Accounts permanently suspended or terminated due to violations of our Acceptable Use Policy (e.g. hosting phishing sites, malware, or fraudulent schemes) forfeit eligibility for refunds.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="serif" style={{ fontSize: '1.5rem', color: 'var(--brass-soft)', marginBottom: '14px' }}>
              5. How to Request a Refund (Step-by-Step)
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginTop: '14px' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border)', padding: '18px', borderRadius: '8px' }}>
                <span className="mono" style={{ color: 'var(--brass)', fontSize: '0.85rem' }}>STEP 01</span>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--cream)', margin: '8px 0' }}>Send an Email</h3>
                <p style={{ color: 'var(--ink-soft)', fontSize: '0.9rem' }}>
                  Email <a href="mailto:billing@sitebox.studio" style={{ color: 'var(--brass)' }}>billing@sitebox.studio</a> using the email address associated with your SiteBox workspace.
                </p>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border)', padding: '18px', borderRadius: '8px' }}>
                <span className="mono" style={{ color: 'var(--brass)', fontSize: '0.85rem' }}>STEP 02</span>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--cream)', margin: '8px 0' }}>Include Order Details</h3>
                <p style={{ color: 'var(--ink-soft)', fontSize: '0.9rem' }}>
                  Provide your invoice number or transaction date. Feedback is welcome, but never required for your 14-day refund.
                </p>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border)', padding: '18px', borderRadius: '8px' }}>
                <span className="mono" style={{ color: 'var(--brass)', fontSize: '0.85rem' }}>STEP 03</span>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--cream)', margin: '8px 0' }}>Receive Reimbursement</h3>
                <p style={{ color: 'var(--ink-soft)', fontSize: '0.9rem' }}>
                  We review requests within 24–48 hours. Approved refunds are credited back to your original payment card within 3–5 business days.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="serif" style={{ fontSize: '1.5rem', color: 'var(--brass-soft)', marginBottom: '14px' }}>
              6. Statutory EU/UK Consumer Cancellation Rights
            </h2>
            <p>
              If you are a consumer residing in the European Union or United Kingdom, you have a statutory right under Directive 2011/83/EU on Consumer Rights to withdraw from a distance contract within 14 days without giving any reason.
              Our 14-day money-back guarantee fully satisfies and exceeds this requirement by offering a frictionless refund process without administrative deduction.
            </p>
          </section>

          <section>
            <h2 className="serif" style={{ fontSize: '1.5rem', color: 'var(--brass-soft)', marginBottom: '14px' }}>
              7. Billing Support
            </h2>
            <p>Have questions about an invoice, tax receipt, or refund status?</p>
            <div style={{ marginTop: '12px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border)', padding: '16px', borderRadius: '8px' }}>
              <p><strong>SiteBox Billing &amp; Invoicing</strong></p>
              <p>Email: <a href="mailto:billing@sitebox.studio" style={{ color: 'var(--brass)' }}>billing@sitebox.studio</a></p>
              <p>General Help: <a href="mailto:support@sitebox.studio" style={{ color: 'var(--brass)' }}>support@sitebox.studio</a></p>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
};
