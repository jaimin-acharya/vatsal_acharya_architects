import { useEffect, useState, useRef } from 'react';
import { motion, useAnimationFrame, useSpring, useTransform, useMotionValue } from 'framer-motion';
import styled from 'styled-components';

const MarqueeContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  --gap: ${props => props.$gap || '1rem'};
  mask-image: linear-gradient(
    to right,
    transparent,
    black 10%,
    black 90%,
    transparent
  );
`;

const MarqueeTrack = styled(motion.div)`
  display: flex;
  gap: var(--gap);
  width: max-content;
`;

export const InfiniteMarquee = ({ 
  children, 
  speed = 1, 
  direction = 1,
  gap = '1rem',
  pauseOnHover = true,
  className 
}) => {
  const [trackWidth, setTrackWidth] = useState(0);
  const [duplicates, setDuplicates] = useState(1);
  const trackRef = useRef(null);
  const contentRef = useRef(null);

  // Setup motion values
  const baseX = useMotionValue(0);
  const smoothX = useSpring(baseX, {
    damping: 50,
    stiffness: 400
  });

  useEffect(() => {
    if (!trackRef.current || !contentRef.current) return;

    const calculateWidth = () => {
      const containerWidth = trackRef.current.offsetWidth;
      const contentWidth = contentRef.current.offsetWidth;
      const minDuplicates = Math.ceil((containerWidth * 2) / contentWidth);
      setTrackWidth(contentWidth);
      setDuplicates(minDuplicates);
    };

    calculateWidth();
    window.addEventListener('resize', calculateWidth);
    return () => window.removeEventListener('resize', calculateWidth);
  }, [children]);

  useAnimationFrame((time, delta) => {
    if (!trackWidth) return;

    let moveBy = (time * speed * 0.05 * direction) % trackWidth;
    baseX.set(-moveBy);
  });

  const x = useTransform(smoothX, (value) => {
    const normalized = value % trackWidth;
    return normalized;
  });

  return (
    <MarqueeContainer 
      $gap={gap}
      className={className}
      ref={trackRef}
      style={{
        cursor: pauseOnHover ? 'pointer' : 'default'
      }}
      onMouseEnter={pauseOnHover ? () => smoothX.stop() : undefined}
      onMouseLeave={pauseOnHover ? () => smoothX.start() : undefined}
    >
      <MarqueeTrack
        style={{ x }}
      >
        <div ref={contentRef} style={{ display: 'flex', gap }}>
          {children}
        </div>
        {Array.from({ length: duplicates }).map((_, i) => (
          <div key={i} style={{ display: 'flex', gap }} aria-hidden>
            {children}
          </div>
        ))}
      </MarqueeTrack>
    </MarqueeContainer>
  );
}; 