import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  staggerChildren = 0,
  threshold = 0.1,
  className = '',
  style = {},
  ...props
}) {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: false
  });

  const getVariants = () => {
    const directions = {
      up: { y: 60, x: 0 },
      down: { y: -60, x: 0 },
      left: { x: 60, y: 0 },
      right: { x: -60, y: 0 },
      none: { x: 0, y: 0 }
    };

    const initial = {
      opacity: 0,
      ...directions[direction]
    };

    return {
      hidden: initial,
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1], // easeOutExpo style
          when: "beforeChildren",
          staggerChildren
        }
      }
    };
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={getVariants()}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}
