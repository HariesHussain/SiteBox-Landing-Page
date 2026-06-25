import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ui/ScrollReveal';

export default function WorkflowSection() {
  const steps = [
    {
      num: "01",
      title: "Choose a template",
      desc: "Pick from templates built for real niches — restaurants, clinics, salons, gyms, agencies, and more."
    },
    {
      num: "02",
      title: "Customize & preview",
      desc: "Edit content, images, and styling, then preview exactly what your client will see."
    },
    {
      num: "03",
      title: "Share & get approved",
      desc: "Send a live preview link and know the moment your client opens it."
    },
    {
      num: "04",
      title: "Deploy & manage",
      desc: "Publish with one click, then track clients, projects, and analytics from a single dashboard."
    }
  ];

  return (
    <section 
      className="workflow dot-grid" 
      id="workflow" 
      style={{
        background: 'var(--green-deep)',
        color: 'var(--cream)',
        padding: '96px 0 0', // padding-bottom handled by steps spacing
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="wrap">
        <ScrollReveal className="section-head">
          <p className="eyebrow" style={{ color: 'var(--brass)' }}>How it works</p>
          <h2 className="serif" style={{ color: 'var(--cream)' }}>Four steps from idea to invoice.</h2>
          <p style={{ color: '#C9D3CB' }}>The same flow whether it's your first client site or your fiftieth.</p>
        </ScrollReveal>

        {/* Visual Workflow Diagram */}
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
            padding: '50px 30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            position: 'relative'
          }}
        >
          {/* Step 1: Code/Build Mockup */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
            <div style={{
              width: '130px',
              height: '90px',
              background: 'rgba(0,0,0,0.2)',
              border: '1.5px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '6px',
              display: 'flex',
              gap: '6px',
              position: 'relative'
            }}>
              {/* Sidebar in mockup */}
              <div style={{
                width: '30px',
                height: '100%',
                background: 'rgba(255, 255, 255, 0.04)',
                borderRadius: '4px',
                padding: '4px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                <div style={{ height: '5px', background: 'rgba(255,255,255,0.1)', borderRadius: '1px' }} />
                <div style={{ height: '5px', background: 'rgba(255,255,255,0.1)', borderRadius: '1px' }} />
                <div style={{ height: '5px', background: 'rgba(255,255,255,0.1)', borderRadius: '1px' }} />
              </div>
              {/* Main content in mockup */}
              <div style={{
                flex: 1,
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '4px',
                padding: '6px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                {/* Visual block */}
                <div style={{ height: '24px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', position: 'relative' }}>
                  {/* Miniature image block */}
                  <div style={{ width: '12px', height: '12px', background: 'var(--brass)', borderRadius: '50%', margin: '6px auto 0' }} />
                </div>
                <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '1px', width: '80%' }} />
                <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '1px', width: '50%' }} />
              </div>
              {/* Small cursor */}
              <div style={{
                position: 'absolute',
                right: '20px',
                bottom: '15px',
                width: '0',
                height: '0',
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderBottom: '8px solid var(--cream)',
                transform: 'rotate(-45deg)'
              }} />
            </div>
            <span style={{ fontSize: '0.8rem', fontFamily: 'var(--mono)', color: 'var(--brass)', fontWeight: 600 }}>1. Build</span>
          </div>

          {/* SVG Arrow 1 */}
          <svg width="70" height="24" style={{ overflow: 'visible', display: 'block', flexShrink: 0 }} className="workflow-arrow">
            <motion.path
              d="M0,12 L60,12"
              fill="none"
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.4, duration: 0.6 }}
            />
            <motion.polygon
              points="55,8 63,12 55,16"
              fill="rgba(255, 255, 255, 0.25)"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.9 }}
            />
          </svg>

          {/* Step 2: Share Preview */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', flexShrink: 0 }} className="workflow-preview-step">
            <div style={{
              background: 'var(--cream)',
              color: 'var(--green-deep)',
              borderRadius: '20px',
              padding: '10px 20px',
              fontSize: '0.8rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
              border: '1.5px solid var(--border)'
            }}>
              <span>🔗 Preview Link</span>
            </div>
            <span style={{ fontSize: '0.8rem', fontFamily: 'var(--mono)', color: 'var(--brass)', fontWeight: 600 }}>2. Share</span>
          </div>

          {/* SVG Arrow 2 */}
          <svg width="70" height="24" style={{ overflow: 'visible', display: 'block', flexShrink: 0 }} className="workflow-arrow">
            <motion.path
              d="M0,12 L60,12"
              fill="none"
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 1.0, duration: 0.6 }}
            />
            <motion.polygon
              points="55,8 63,12 55,16"
              fill="rgba(255, 255, 255, 0.25)"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 1.5 }}
            />
          </svg>

          {/* Step 3: Deployed */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '2px solid rgba(255, 255, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              {/* Checkmark drawing */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <motion.path
                  d="M20 6L9 17L4 12"
                  stroke="var(--brass)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: 1.6, duration: 0.4 }}
                />
              </svg>
            </div>
            <span style={{ fontSize: '0.8rem', fontFamily: 'var(--mono)', color: 'var(--brass)', fontWeight: 600 }}>3. Deploy</span>
          </div>
        </ScrollReveal>
      </div>

      {/* Grid of Steps */}
      <div className="steps" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        borderTop: '1.5px solid rgba(247, 244, 236, 0.14)',
        background: 'rgba(0, 0, 0, 0.1)'
      }}>
        {steps.map((step, idx) => (
          <div 
            key={idx} 
            className="step" 
            style={{
              padding: '44px 32px',
              borderRight: idx < 3 ? '1.5px solid rgba(247, 244, 236, 0.14)' : 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            {/* Number slide up and bounce */}
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ type: 'spring', stiffness: 120, delay: idx * 0.1, duration: 0.6 }}
              className="num serif" 
              style={{
                fontSize: '2.2rem',
                color: 'var(--brass)',
                lineHeight: 1,
                marginBottom: '4px'
              }}
            >
              {step.num}
            </motion.p>
            
            <motion.h4 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: idx * 0.1 + 0.2, duration: 0.5 }}
              style={{
                fontSize: '1.05rem',
                fontWeight: 600,
                color: 'var(--cream)'
              }}
            >
              {step.title}
            </motion.h4>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: idx * 0.1 + 0.3, duration: 0.5 }}
              style={{
                fontSize: '0.9rem',
                color: '#C9D3CB',
                lineHeight: 1.6
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
}
