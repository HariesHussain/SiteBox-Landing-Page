import React, { useEffect } from 'react';
import { ArrowLeft, Shield, Eye } from 'lucide-react';

interface LegalPageProps {
  onNavigate: (path: string) => void;
}

export const PrivacyPolicy: React.FC<LegalPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    document.title = 'Privacy Policy – SiteBox';
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
            <Shield size={14} color="var(--brass)" aria-hidden="true" />
            Compliance & Transparency
          </div>
          <h1 className="serif" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)', color: 'var(--ink)', marginBottom: '16px', lineHeight: 1.15 }}>
            Privacy Policy
          </h1>
          <p style={{ color: 'var(--ink-soft)', fontSize: '0.98rem' }}>
            <strong>Effective Date:</strong> October 22, 2026 &nbsp;|&nbsp; <strong>Last Updated:</strong> October 22, 2026
          </p>
        </div>

        {/* Content body */}
        <div className="legal-content" style={{ display: 'flex', flexDirection: 'column', gap: '36px', lineHeight: 1.75, fontSize: '1rem', color: 'rgba(255, 255, 255, 0.9)' }}>
          
          <section>
            <h2 className="serif" style={{ fontSize: '1.5rem', color: 'var(--brass-soft)', marginBottom: '14px' }}>
              1. Introduction & Data Controller
            </h2>
            <p>
              Welcome to <strong>SiteBox</strong> (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), accessible at{' '}
              <a href="https://sitebox.studio/" style={{ color: 'var(--brass)', textDecoration: 'underline' }}>https://sitebox.studio</a>{' '}
              and our application portal at{' '}
              <a href="https://app.sitebox.studio" style={{ color: 'var(--brass)', textDecoration: 'underline' }}>https://app.sitebox.studio</a>.
              SiteBox is an independent software platform created and operated by Haries Hussain (&quot;Data Controller&quot;).
            </p>
            <p style={{ marginTop: '12px' }}>
              We are committed to protecting your privacy and upholding the highest standards of data protection in compliance with the
              <strong> General Data Protection Regulation (EU) 2016/679 (&quot;GDPR&quot;)</strong>, the <strong>UK Data Protection Act 2018 (&quot;UK GDPR&quot;)</strong>,
              and the <strong>California Consumer Privacy Act as amended by the California Privacy Rights Act (&quot;CCPA/CPRA&quot;)</strong>.
            </p>
            <p style={{ marginTop: '12px' }}>
              If you have any questions regarding your personal data or this Policy, you can reach our Data Protection contact directly at:{' '}
              <a href="mailto:privacy@sitebox.studio" style={{ color: 'var(--brass)', fontWeight: 600 }}>privacy@sitebox.studio</a>.
            </p>
          </section>

          <section>
            <h2 className="serif" style={{ fontSize: '1.5rem', color: 'var(--brass-soft)', marginBottom: '14px' }}>
              2. Core Philosophy: Data Minimization
            </h2>
            <p>
              We adhere strictly to the principle of <em>Data Minimization</em> (Article 5(1)(c) GDPR). We do not collect personal data &quot;just in case.&quot;
              We only collect and process the minimum information necessary to deliver our website builder workspace, provide client preview links, and communicate with you.
            </p>
            <div style={{ background: 'rgba(212, 175, 55, 0.08)', border: '1px solid var(--border)', borderRadius: '10px', padding: '20px', marginTop: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--brass)', fontWeight: 600, marginBottom: '8px' }}>
                <Eye size={18} aria-hidden="true" />
                What We Do NOT Do
              </div>
              <ul style={{ paddingLeft: '20px', listStyleType: 'disc', color: 'var(--ink-soft)' }}>
                <li>We do <strong>NOT</strong> sell, rent, or trade your personal information to third-party data brokers.</li>
                <li>We do <strong>NOT</strong> employ third-party cross-site advertising cookies or behavioral tracking pixels.</li>
                <li>We do <strong>NOT</strong> collect sensitive personal data (e.g. biometric data, health records, or political affiliations).</li>
                <li>We do <strong>NOT</strong> track you across other websites.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="serif" style={{ fontSize: '1.5rem', color: 'var(--brass-soft)', marginBottom: '14px' }}>
              3. Information We Collect and How We Use It
            </h2>
            <p>We process personal data only under specific, lawful bases recognized by data protection legislation:</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border)', padding: '18px', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--cream)', marginBottom: '8px' }}>A. Account &amp; Workspace Data</h3>
                <p style={{ color: 'var(--ink-soft)', fontSize: '0.94rem' }}>
                  <strong>Data:</strong> Email address, hashed authentication credentials, account preferences, and billing information (processed through secure PCI-DSS compliant payment gateways).<br />
                  <strong>Purpose:</strong> Creating and managing your account, authorizing workspace access, sending service notices.<br />
                  <strong>Lawful Basis:</strong> Performance of a Contract (GDPR Art. 6(1)(b)).
                </p>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border)', padding: '18px', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--cream)', marginBottom: '8px' }}>B. Client Project &amp; Template Content</h3>
                <p style={{ color: 'var(--ink-soft)', fontSize: '0.94rem' }}>
                  <strong>Data:</strong> Text, images, branding assets, client domain names, and configuration files you upload to customize websites.<br />
                  <strong>Purpose:</strong> Generating client preview links and deploying client websites.<br />
                  <strong>Lawful Basis:</strong> Performance of a Contract (GDPR Art. 6(1)(b)). You retain ownership of this content.
                </p>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border)', padding: '18px', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--cream)', marginBottom: '8px' }}>C. Direct Inquiries &amp; Support Requests</h3>
                <p style={{ color: 'var(--ink-soft)', fontSize: '0.94rem' }}>
                  <strong>Data:</strong> Name, work email address, and message content submitted via our contact or template request forms.<br />
                  <strong>Purpose:</strong> Responding to your inquiry, addressing feedback, providing technical assistance.<br />
                  <strong>Lawful Basis:</strong> Consent (GDPR Art. 6(1)(a)) and Legitimate Interest (GDPR Art. 6(1)(f)).
                </p>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border)', padding: '18px', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--cream)', marginBottom: '8px' }}>D. Essential Server Logs &amp; Security Telemetry</h3>
                <p style={{ color: 'var(--ink-soft)', fontSize: '0.94rem' }}>
                  <strong>Data:</strong> Anonymized IP address, HTTP request method, browser user-agent, and server response codes.<br />
                  <strong>Purpose:</strong> Preventing Distributed Denial of Service (DDoS) attacks, detecting unauthorized access, diagnosing infrastructure errors.<br />
                  <strong>Lawful Basis:</strong> Legitimate Interest (GDPR Art. 6(1)(f)) in maintaining high availability and enterprise-grade security.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="serif" style={{ fontSize: '1.5rem', color: 'var(--brass-soft)', marginBottom: '14px' }}>
              4. Third-Party Sub-processors &amp; Embeds
            </h2>
            <p>
              To maintain reliable global hosting and high-speed delivery, we partner with reputable sub-processors who adhere to strict data security standards:
            </p>
            <ul style={{ paddingLeft: '20px', listStyleType: 'disc', marginTop: '12px', color: 'var(--ink-soft)' }}>
              <li>
                <strong>Vercel Inc. (United States):</strong> Cloud edge hosting, SSL termination, and content delivery network.
                Transfers are protected by standard contractual clauses (SCCs) and GDPR Data Processing Agreements (DPA).
              </li>
              <li>
                <strong>Google Fonts (Google LLC):</strong> We reference fonts from Google Fonts. Requests send standard HTTP referrer and browser user-agent headers to Google. No cookies are sent with font requests.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="serif" style={{ fontSize: '1.5rem', color: 'var(--brass-soft)', marginBottom: '14px' }}>
              5. Data Retention &amp; Deletion
            </h2>
            <p>
              We retain personal data only for as long as necessary to fulfill the purposes for which it was collected:
            </p>
            <ul style={{ paddingLeft: '20px', listStyleType: 'disc', marginTop: '12px', color: 'var(--ink-soft)' }}>
              <li><strong>Active Accounts:</strong> Retained while your workspace account is active.</li>
              <li><strong>Account Deletion:</strong> Upon receiving an account deletion request, all account records and project databases are permanently deleted from active production servers within thirty (30) days.</li>
              <li><strong>Temporary Server Logs:</strong> Edge server access logs are automatically rotated and expunged within 30 to 90 days.</li>
            </ul>
          </section>

          <section>
            <h2 className="serif" style={{ fontSize: '1.5rem', color: 'var(--brass-soft)', marginBottom: '14px' }}>
              6. Your Privacy Rights (GDPR, UK GDPR &amp; CCPA/CPRA)
            </h2>
            <p>
              Depending on your location, you have legal rights regarding your personal information:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginTop: '16px' }}>
              <div style={{ border: '1px solid var(--border)', padding: '14px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.02)' }}>
                <strong>Right to Access</strong>
                <p style={{ fontSize: '0.88rem', color: 'var(--ink-soft)', marginTop: '4px' }}>Request a copy of the personal data we hold about you.</p>
              </div>
              <div style={{ border: '1px solid var(--border)', padding: '14px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.02)' }}>
                <strong>Right to Rectification</strong>
                <p style={{ fontSize: '0.88rem', color: 'var(--ink-soft)', marginTop: '4px' }}>Correct inaccurate or incomplete personal information.</p>
              </div>
              <div style={{ border: '1px solid var(--border)', padding: '14px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.02)' }}>
                <strong>Right to Erasure</strong>
                <p style={{ fontSize: '0.88rem', color: 'var(--ink-soft)', marginTop: '4px' }}>Request the permanent deletion of your data (&quot;Right to be Forgotten&quot;).</p>
              </div>
              <div style={{ border: '1px solid var(--border)', padding: '14px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.02)' }}>
                <strong>Right to Data Portability</strong>
                <p style={{ fontSize: '0.88rem', color: 'var(--ink-soft)', marginTop: '4px' }}>Export your account and project content in a machine-readable JSON format.</p>
              </div>
              <div style={{ border: '1px solid var(--border)', padding: '14px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.02)' }}>
                <strong>Right to Object &amp; Restrict</strong>
                <p style={{ fontSize: '0.88rem', color: 'var(--ink-soft)', marginTop: '4px' }}>Object to or restrict specific forms of data processing.</p>
              </div>
              <div style={{ border: '1px solid var(--border)', padding: '14px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.02)' }}>
                <strong>Right to Non-Discrimination</strong>
                <p style={{ fontSize: '0.88rem', color: 'var(--ink-soft)', marginTop: '4px' }}>We will never deny services, charge different prices, or degrade service quality if you exercise your rights.</p>
              </div>
            </div>
            <p style={{ marginTop: '16px' }}>
              To exercise any of these rights, email us at <a href="mailto:privacy@sitebox.studio" style={{ color: 'var(--brass)' }}>privacy@sitebox.studio</a>.
              We respond to all verified requests within thirty (30) days without charge.
            </p>
          </section>

          <section>
            <h2 className="serif" style={{ fontSize: '1.5rem', color: 'var(--brass-soft)', marginBottom: '14px' }}>
              7. Security &amp; Encryption
            </h2>
            <p>
              We implement industry-standard administrative, physical, and technical safeguards to prevent unauthorized access, loss, or disclosure:
            </p>
            <ul style={{ paddingLeft: '20px', listStyleType: 'disc', marginTop: '12px', color: 'var(--ink-soft)' }}>
              <li>All communications between your browser and SiteBox are encrypted using modern Transport Layer Security (TLS 1.3 / HTTPS).</li>
              <li>Authentication tokens and user passwords are cryptographically salted and hashed using modern algorithms.</li>
              <li>We enforce automated DDoS protection and HTTP security headers (including <code>X-Content-Type-Options: nosniff</code> and <code>Referrer-Policy: strict-origin-when-cross-origin</code>).</li>
            </ul>
          </section>

          <section>
            <h2 className="serif" style={{ fontSize: '1.5rem', color: 'var(--brass-soft)', marginBottom: '14px' }}>
              8. Children&apos;s Privacy
            </h2>
            <p>
              SiteBox is a professional workspace engineered for adult freelancers, agencies, and businesses. We do not knowingly solicit or collect
              personal data from individuals under the age of 16 (or under 13 under COPPA). If we discover that a minor has provided us with personal data,
              we immediately delete such information from our records.
            </p>
          </section>

          <section>
            <h2 className="serif" style={{ fontSize: '1.5rem', color: 'var(--brass-soft)', marginBottom: '14px' }}>
              9. Contact &amp; Supervisory Complaints
            </h2>
            <p>
              For inquiries, notices, or data subject requests, please contact:
            </p>
            <div style={{ marginTop: '12px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border)', padding: '16px', borderRadius: '8px' }}>
              <p><strong>SiteBox Studio</strong></p>
              <p>Attention: Haries Hussain (Data Protection Lead)</p>
              <p>Email: <a href="mailto:privacy@sitebox.studio" style={{ color: 'var(--brass)' }}>privacy@sitebox.studio</a></p>
              <p>General Support: <a href="mailto:support@sitebox.studio" style={{ color: 'var(--brass)' }}>support@sitebox.studio</a></p>
            </div>
            <p style={{ marginTop: '14px' }}>
              European Union residents have the right to lodge a complaint with their local supervisory authority (such as the CNIL in France, BfDI in Germany, or DPC in Ireland)
              if they believe our processing violates applicable data protection laws.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
};
