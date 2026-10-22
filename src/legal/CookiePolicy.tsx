import React, { useEffect } from 'react';
import { ArrowLeft, Cookie, CheckCircle2, Settings } from 'lucide-react';

interface LegalPageProps {
  onNavigate: (path: string) => void;
  onOpenCookieSettings?: () => void;
}

export const CookiePolicy: React.FC<LegalPageProps> = ({ onNavigate, onOpenCookieSettings }) => {
  useEffect(() => {
    document.title = 'Cookie Policy – SiteBox';
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
            <Cookie size={14} color="var(--brass)" aria-hidden="true" />
            Cookie &amp; Local Storage Disclosure
          </div>
          <h1 className="serif" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)', color: 'var(--ink)', marginBottom: '16px', lineHeight: 1.15 }}>
            Cookie Policy
          </h1>
          <p style={{ color: 'var(--ink-soft)', fontSize: '0.98rem' }}>
            <strong>Effective Date:</strong> October 22, 2026 &nbsp;|&nbsp; <strong>Last Updated:</strong> October 22, 2026
          </p>
        </div>

        {/* Content body */}
        <div className="legal-content" style={{ display: 'flex', flexDirection: 'column', gap: '36px', lineHeight: 1.75, fontSize: '1rem', color: 'rgba(255, 255, 255, 0.9)' }}>
          
          <section>
            <h2 className="serif" style={{ fontSize: '1.5rem', color: 'var(--brass-soft)', marginBottom: '14px' }}>
              1. What Are Cookies and Local Storage?
            </h2>
            <p>
              Cookies are small text files that are stored on your computer or mobile device when you visit a website.
              They are widely used to make websites work properly, improve security, and provide reporting information.
              In addition to cookies, modern web applications also use <strong>HTML5 Local Storage</strong> and <strong>Session Storage</strong>,
              which allow data to be stored locally within your browser without being transmitted back to web servers on every request.
            </p>
          </section>

          <section>
            <h2 className="serif" style={{ fontSize: '1.5rem', color: 'var(--brass-soft)', marginBottom: '14px' }}>
              2. Our Privacy-First Commitment
            </h2>
            <div style={{ background: 'rgba(212, 175, 55, 0.08)', border: '1px solid var(--border)', padding: '20px', borderRadius: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--brass)', fontWeight: 600, marginBottom: '8px' }}>
                <CheckCircle2 size={18} aria-hidden="true" />
                Zero Tracking or Advertising Cookies
              </div>
              <p style={{ color: 'var(--ink-soft)', fontSize: '0.95rem' }}>
                SiteBox operates with a strict privacy-first architecture. <strong>We do not use advertising cookies, third-party marketing beacons, or cross-domain tracking pixels.</strong>{' '}
                Our public marketing website uses only <em>strictly necessary technical storage</em> required for core operation and to remember your privacy choices.
              </p>
            </div>
          </section>

          <section>
            <h2 className="serif" style={{ fontSize: '1.5rem', color: 'var(--brass-soft)', marginBottom: '14px' }}>
              3. The Storage Items We Use
            </h2>
            <p>Here is an exhaustive inventory of the storage keys utilized on the SiteBox platform:</p>

            <div style={{ overflowX: 'auto', marginTop: '16px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem', color: 'var(--ink-soft)' }}>
                <thead>
                  <tr style={{ borderBottom: '1.5px solid var(--border)', background: 'rgba(255, 255, 255, 0.04)', color: 'var(--cream)' }}>
                    <th style={{ padding: '12px 14px' }}>Key / Name</th>
                    <th style={{ padding: '12px 14px' }}>Type</th>
                    <th style={{ padding: '12px 14px' }}>Provider</th>
                    <th style={{ padding: '12px 14px' }}>Purpose</th>
                    <th style={{ padding: '12px 14px' }}>Retention</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '12px 14px', fontFamily: 'monospace', color: 'var(--brass)' }}>sitebox_cookie_consent</td>
                    <td style={{ padding: '12px 14px' }}>Local Storage</td>
                    <td style={{ padding: '12px 14px' }}>SiteBox (First-party)</td>
                    <td style={{ padding: '12px 14px' }}>Stores your acknowledgement of our privacy and cookie settings so the notice is not shown repeatedly.</td>
                    <td style={{ padding: '12px 14px' }}>12 months</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '12px 14px', fontFamily: 'monospace', color: 'var(--brass)' }}>sb_auth_token</td>
                    <td style={{ padding: '12px 14px' }}>Secure HttpOnly Cookie</td>
                    <td style={{ padding: '12px 14px' }}>app.sitebox.studio</td>
                    <td style={{ padding: '12px 14px' }}>Strictly necessary session token verifying your authenticated user identity when logged into the builder app.</td>
                    <td style={{ padding: '12px 14px' }}>Session / 14 days</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px 14px', fontFamily: 'monospace', color: 'var(--brass)' }}>sb_csrf_token</td>
                    <td style={{ padding: '12px 14px' }}>Secure Cookie</td>
                    <td style={{ padding: '12px 14px' }}>app.sitebox.studio</td>
                    <td style={{ padding: '12px 14px' }}>Cryptographic anti-tamper token protecting account forms against Cross-Site Request Forgery (CSRF).</td>
                    <td style={{ padding: '12px 14px' }}>Session</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="serif" style={{ fontSize: '1.5rem', color: 'var(--brass-soft)', marginBottom: '14px' }}>
              4. Legal Basis under the EU ePrivacy Directive
            </h2>
            <p>
              Under <strong>Article 5(3) of the EU ePrivacy Directive (Directive 2002/58/EC as amended)</strong> and national implementing laws,
              prior consent is <em>not required</em> for cookies or technical storage that are strictly necessary for the delivery of an information society service explicitly requested by the subscriber or user.
            </p>
            <p style={{ marginTop: '12px' }}>
              Because SiteBox utilizes exclusively strictly necessary storage keys for authentication, security, and consent logging,
              your navigation is not interrupted by tracking consent gates.
            </p>
          </section>

          <section>
            <h2 className="serif" style={{ fontSize: '1.5rem', color: 'var(--brass-soft)', marginBottom: '14px' }}>
              5. How to Manage and Delete Cookies in Your Browser
            </h2>
            <p>
              You can instruct your browser to refuse all cookies or indicate when a cookie is being sent.
              Most modern web browsers allow you to control cookie settings through their preferences menu:
            </p>
            <ul style={{ paddingLeft: '20px', listStyleType: 'disc', marginTop: '12px', color: 'var(--ink-soft)' }}>
              <li><strong>Google Chrome:</strong> Settings &gt; Privacy and Security &gt; Cookies and other site data</li>
              <li><strong>Mozilla Firefox:</strong> Settings &gt; Privacy &amp; Security &gt; Cookies and Site Data</li>
              <li><strong>Apple Safari:</strong> Preferences &gt; Privacy &gt; Block all cookies</li>
              <li><strong>Microsoft Edge:</strong> Settings &gt; Cookies and site permissions</li>
            </ul>
            <p style={{ marginTop: '14px' }}>
              Please note that disabling strictly necessary cookies may prevent authentication and account functionality on the builder application.
            </p>

            {onOpenCookieSettings && (
              <div style={{ marginTop: '24px' }}>
                <button
                  type="button"
                  onClick={onOpenCookieSettings}
                  className="btn btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <Settings size={16} aria-hidden="true" />
                  Open Cookie Preferences
                </button>
              </div>
            )}
          </section>

          <section>
            <h2 className="serif" style={{ fontSize: '1.5rem', color: 'var(--brass-soft)', marginBottom: '14px' }}>
              6. Policy Updates &amp; Contact
            </h2>
            <p>
              We may update this Cookie Policy from time to time to reflect operational or regulatory changes. Any modifications will be posted here with an updated &quot;Last Updated&quot; date.
            </p>
            <p style={{ marginTop: '12px' }}>
              For inquiries regarding our use of cookies or local storage, please reach out to{' '}
              <a href="mailto:privacy@sitebox.studio" style={{ color: 'var(--brass)' }}>privacy@sitebox.studio</a>.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
};
