import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedText({
  text,
  className = '',
  el: Wrapper = 'h2',
  once = true,
  delay = 0
}) {
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo style
      },
    },
  };

  return (
    <Wrapper className={className}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-100px" }}
        style={{ display: 'inline-block' }}
      >
        {words.map((word, idx) => (
          <span key={idx} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            <motion.span
              variants={wordVariants}
              style={{ display: 'inline-block', marginRight: '0.22em' }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Wrapper>
  );
}
