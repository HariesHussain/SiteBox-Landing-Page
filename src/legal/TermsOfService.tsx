import React, { useEffect } from 'react';
import { ArrowLeft, Scale } from 'lucide-react';

interface LegalPageProps {
  onNavigate: (path: string) => void;
}

export const TermsOfService: React.FC<LegalPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    document.title = 'Terms and Conditions – SiteBox';
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
            <Scale size={14} color="var(--brass)" aria-hidden="true" />
            Terms of Service &amp; Agreement
          </div>
          <h1 className="serif" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)', color: 'var(--ink)', marginBottom: '16px', lineHeight: 1.15 }}>
            Terms &amp; Conditions
          </h1>
          <p style={{ color: 'var(--ink-soft)', fontSize: '0.98rem' }}>
            <strong>Effective Date:</strong> October 22, 2026 &nbsp;|&nbsp; <strong>Last Updated:</strong> October 22, 2026
          </p>
        </div>

        {/* Content body */}
        <div className="legal-content" style={{ display: 'flex', flexDirection: 'column', gap: '36px', lineHeight: 1.75, fontSize: '1rem', color: 'rgba(255, 255, 255, 0.9)' }}>
          
          <section>
            <h2 className="serif" style={{ fontSize: '1.5rem', color: 'var(--brass-soft)', marginBottom: '14px' }}>
              1. Acceptance of Terms
            </h2>
            <p>
              These Terms and Conditions (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;User&quot;, &quot;you&quot;, or &quot;your&quot;)
              and <strong>SiteBox</strong> (&quot;SiteBox&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), regarding your access to and use of the{' '}
              <a href="https://sitebox.studio/" style={{ color: 'var(--brass)', textDecoration: 'underline' }}>https://sitebox.studio</a> website,
              the <a href="https://app.sitebox.studio" style={{ color: 'var(--brass)', textDecoration: 'underline' }}>https://app.sitebox.studio</a> platform,
              and associated software services (collectively, the &quot;Service&quot;).
            </p>
            <p style={{ marginTop: '12px' }}>
              By creating an account, accessing, or using the Service, you signify that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.
              If you do not agree to these Terms, you must immediately discontinue using the Service.
            </p>
          </section>

          <section>
            <h2 className="serif" style={{ fontSize: '1.5rem', color: 'var(--brass-soft)', marginBottom: '14px' }}>
              2. Eligibility &amp; Account Security
            </h2>
            <p>
              To access the Service, you must be at least 18 years of age (or the age of legal majority in your jurisdiction).
              When creating an account, you agree to:
            </p>
            <ul style={{ paddingLeft: '20px', listStyleType: 'disc', marginTop: '12px', color: 'var(--ink-soft)' }}>
              <li>Provide accurate, current, and complete registration information.</li>
              <li>Maintain the confidentiality and security of your account credentials.</li>
              <li>Accept sole responsibility for all activities, actions, and client sites managed under your account.</li>
              <li>Promptly notify us at <a href="mailto:support@sitebox.studio" style={{ color: 'var(--brass)' }}>support@sitebox.studio</a> if you discover any unauthorized access or breach of security.</li>
            </ul>
          </section>

          <section>
            <h2 className="serif" style={{ fontSize: '1.5rem', color: 'var(--brass-soft)', marginBottom: '14px' }}>
              3. Intellectual Property Rights
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '14px' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border)', padding: '18px', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--cream)', marginBottom: '8px' }}>A. Your Content &amp; Client Projects (100% Yours)</h3>
                <p style={{ color: 'var(--ink-soft)', fontSize: '0.94rem' }}>
                  You retain complete and exclusive intellectual property ownership of all custom text, branding, graphics, trademarks, and code that you or your clients upload to the Service (&quot;User Content&quot;).
                  SiteBox claims zero ownership over your client websites. You grant SiteBox only the limited, revocable, non-exclusive license necessary to host, preview, and transmit your User Content solely to operate the Service on your behalf.
                </p>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border)', padding: '18px', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--cream)', marginBottom: '8px' }}>B. SiteBox Proprietary Technology &amp; Templates</h3>
                <p style={{ color: 'var(--ink-soft)', fontSize: '0.94rem' }}>
                  The Service, including its proprietary codebase, user interface, design systems, algorithms, documentation, brand identity, and original template layout structures, is the exclusive intellectual property of SiteBox and its licensors.
                  You are granted a non-exclusive, non-transferable license to use the templates to build client sites. You may not extract, re-sell, or sublicense SiteBox template engines as standalone website-builder products or competing software.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="serif" style={{ fontSize: '1.5rem', color: 'var(--brass-soft)', marginBottom: '14px' }}>
              4. Client Sites &amp; User Warranties
            </h2>
            <p>
              Because SiteBox empowers freelancers to publish and deliver sites to third-party clients, you expressly represent, warrant, and covenant that:
            </p>
            <ul style={{ paddingLeft: '20px', listStyleType: 'disc', marginTop: '12px', color: 'var(--ink-soft)' }}>
              <li>You have secured all required client rights, commercial licenses, model releases, and intellectual property permissions for all text, logos, photography, and fonts embedded into client websites.</li>
              <li>Your client websites comply with all applicable local, national, and international laws, including consumer protection regulations, privacy notice obligations, and accessibility standards.</li>
              <li>You are solely responsible for contracts, invoices, client expectations, and service level agreements between you and your clients. SiteBox is not a party to your client contracts.</li>
            </ul>
          </section>

          <section>
            <h2 className="serif" style={{ fontSize: '1.5rem', color: 'var(--brass-soft)', marginBottom: '14px' }}>
              5. Acceptable Use Policy (AUP)
            </h2>
            <p>You agree not to use the Service to:</p>
            <ul style={{ paddingLeft: '20px', listStyleType: 'disc', marginTop: '12px', color: 'var(--ink-soft)' }}>
              <li>Build or host deceptive, fraudulent, or malicious sites (including phishing pages, fake login portals, or financial scam funnels).</li>
              <li>Distribute malware, ransomware, spyware, or viruses.</li>
              <li>Publish unlawful, defamatory, harassing, or hate-speech content.</li>
              <li>Infringe upon any third party&apos;s copyright, trademark, patent, or trade secret.</li>
              <li>Conduct unauthorized security vulnerability scans, denial of service attacks, or penetration tests against our infrastructure.</li>
              <li>Circumvent plan limits, user quotas, or authentication controls.</li>
            </ul>
            <p style={{ marginTop: '12px', color: 'var(--brass-soft)' }}>
              Violation of this Acceptable Use Policy constitutes grounds for immediate, permanent termination of account access without prior notice or refund.
            </p>
          </section>

          <section>
            <h2 className="serif" style={{ fontSize: '1.5rem', color: 'var(--brass-soft)', marginBottom: '14px' }}>
              6. Service Availability &amp; Uptime Disclaimer
            </h2>
            <p>
              The Service is provided on an <strong>&quot;AS IS&quot;</strong> and <strong>&quot;AS AVAILABLE&quot;</strong> basis without warranties of any kind,
              whether express, implied, or statutory, including without limitation warranties of merchantability, fitness for a particular purpose, or non-infringement.
            </p>
            <p style={{ marginTop: '12px' }}>
              While we strive for 99.9% uptime and utilize enterprise-grade global infrastructure via Vercel, we do not warrant that the Service will be completely error-free, uninterrupted, or immune from hardware failures or third-party outages.
            </p>
          </section>

          <section>
            <h2 className="serif" style={{ fontSize: '1.5rem', color: 'var(--brass-soft)', marginBottom: '14px' }}>
              7. Limitation of Liability
            </h2>
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border)', padding: '20px', borderRadius: '8px' }}>
              <p style={{ fontWeight: 600, color: 'var(--cream)', marginBottom: '8px' }}>IMPORTANT LEGAL LIABILITY CAP:</p>
              <p style={{ color: 'var(--ink-soft)', fontSize: '0.94rem' }}>
                To the maximum extent permitted by applicable law, in no event shall SiteBox, its founder, operators, affiliates, or licensors be liable for any indirect, incidental, special, exemplary, consequential, or punitive damages, including loss of profits, loss of client goodwill, business interruption, or data loss, arising from or related to your use of or inability to use the Service.
              </p>
              <p style={{ color: 'var(--ink-soft)', fontSize: '0.94rem', marginTop: '12px' }}>
                In any case, SiteBox&apos;s aggregate liability for all claims arising under or relating to these Terms shall strictly be limited to the greater of: (a) Fifty United States Dollars ($50.00 USD), or (b) the actual fees paid by you to SiteBox during the twelve (12) months immediately preceding the claim.
              </p>
            </div>
          </section>

          <section>
            <h2 className="serif" style={{ fontSize: '1.5rem', color: 'var(--brass-soft)', marginBottom: '14px' }}>
              8. Indemnification
            </h2>
            <p>
              You agree to defend, indemnify, and hold harmless SiteBox, its operator, contributors, and agents from and against any and all third-party claims, damages, obligations, losses, liabilities, costs, and expenses (including reasonable attorney fees) arising from:
            </p>
            <ul style={{ paddingLeft: '20px', listStyleType: 'disc', marginTop: '12px', color: 'var(--ink-soft)' }}>
              <li>Your use of the Service or your breach of these Terms.</li>
              <li>Any content, image, trademark, or code published on your client websites that infringes third-party rights or violates applicable laws.</li>
              <li>Any contractual dispute between you and your freelance clients.</li>
            </ul>
          </section>

          <section>
            <h2 className="serif" style={{ fontSize: '1.5rem', color: 'var(--brass-soft)', marginBottom: '14px' }}>
              9. Termination &amp; Account Closure
            </h2>
            <p>
              You may terminate your account at any time via your workspace settings. SiteBox reserves the right to suspend or terminate accounts that violate these Terms, breach our Acceptable Use Policy, or create security risks.
              Upon termination, your right to use the Service ceases, but provisions regarding Intellectual Property, Limitation of Liability, Indemnification, and Dispute Resolution shall survive.
            </p>
          </section>

          <section>
            <h2 className="serif" style={{ fontSize: '1.5rem', color: 'var(--brass-soft)', marginBottom: '14px' }}>
              10. Governing Law &amp; Informal Dispute Resolution
            </h2>
            <p>
              We believe in resolving issues collaboratively. Before initiating any formal legal proceeding, you agree to contact us at{' '}
              <a href="mailto:support@sitebox.studio" style={{ color: 'var(--brass)' }}>support@sitebox.studio</a> and engage in good-faith informal negotiations for at least thirty (30) days.
            </p>
            <p style={{ marginTop: '12px' }}>
              These Terms shall be governed by and construed in accordance with the substantive laws of the operating jurisdiction, without regard to conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="serif" style={{ fontSize: '1.5rem', color: 'var(--brass-soft)', marginBottom: '14px' }}>
              11. Contact Information
            </h2>
            <p>If you have any questions or formal legal notices regarding these Terms, please contact:</p>
            <div style={{ marginTop: '12px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border)', padding: '16px', borderRadius: '8px' }}>
              <p><strong>SiteBox Studio</strong></p>
              <p>Operator: Haries Hussain</p>
              <p>Legal &amp; Support Inquiries: <a href="mailto:support@sitebox.studio" style={{ color: 'var(--brass)' }}>support@sitebox.studio</a></p>
              <p>Privacy Inquiries: <a href="mailto:privacy@sitebox.studio" style={{ color: 'var(--brass)' }}>privacy@sitebox.studio</a></p>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
};
