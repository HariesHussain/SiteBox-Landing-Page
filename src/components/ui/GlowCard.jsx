import React, { useRef, useState } from 'react';

export default function GlowCard({
  children,
  className = '',
  glowColor = 'rgba(168, 121, 62, 0.07)', // default subtle brass/gold glow
  ...props
}) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`strong-card ${className}`}
      style={{
        '--mouse-x': `${coords.x}px`,
        '--mouse-y': `${coords.y}px`,
      }}
      {...props}
    >
      {/* Mouse tracking radial spotlight */}
      <div
        style={{
          position: 'absolute',
          inset: '-1.5px', // expand slightly to align with border
          pointerEvents: 'none',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          background: `radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), ${glowColor}, transparent 80%)`,
          zIndex: 0,
          borderRadius: 'inherit'
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
        {children}
      </div>
    </div>
  );
}
