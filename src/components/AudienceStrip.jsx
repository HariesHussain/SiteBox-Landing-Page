import React from 'react';
import { motion } from 'framer-motion';

export default function AudienceStrip() {
  const list = ["Freelancers", "Agencies", "Creators", "Students", "Developers", "Small businesses"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section className="audience light-theme" style={{
      borderTop: '1.8px solid var(--border-light)',
      borderBottom: '1.8px solid var(--border-light)',
      padding: '28px 0',
      background: 'var(--bg-light)',
      overflow: 'hidden'
    }}>
      <div className="wrap">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px 28px'
          }}
        >
          <motion.span 
            variants={itemVariants}
            className="label" 
            style={{ fontSize: '0.82rem', color: 'var(--ink-soft-light)', fontWeight: 600, fontFamily: 'var(--mono)' }}
          >
            BUILT FOR —
          </motion.span>
          
          {list.map((item, index) => (
            <motion.span
              key={index}
              variants={itemVariants}
              whileHover={{ y: -2, boxShadow: '0 6px 0px var(--border-light)' }}
              className="pill"
              style={{
                fontSize: '0.88rem',
                fontWeight: 600,
                color: 'var(--ink-light)',
                padding: '6px 16px',
                borderRadius: '20px',
                border: '1.8px solid var(--border-light)',
                background: 'var(--surface-light)',
                boxShadow: '0 3px 0px var(--border-light)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {item}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
