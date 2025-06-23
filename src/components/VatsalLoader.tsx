import React from 'react';
import styled, { keyframes } from 'styled-components';

const shine = keyframes`
  0% {
    background-position: -200% center;
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
  100% {
    background-position: 200% center;
    opacity: 0.8;
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.85);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(8px);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const StyledSVG = styled.svg`
  animation: ${shine} 4s ease-in-out infinite;
  background: linear-gradient(
    90deg,
    #c9a959 0%,
    #e6c77d 15%,
    #c9a959 30%,
    #d4b76b 45%,
    #c9a959 60%,
    #e6c77d 75%,
    #c9a959 90%,
    #c9a959 100%
  );
  background-size: 300% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 2px rgba(201, 169, 89, 0.2));
`;

interface VatsalLoaderProps {}

const VatsalLoader: React.FC<VatsalLoaderProps> = () => {
  return (
    <LoaderContainer>
      <StyledSVG
        width="400"
        height="150"
        viewBox="0 0 400 150"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#c9a959', stopOpacity: 1 }} />
            <stop offset="25%" style={{ stopColor: '#e6c77d', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#c9a959', stopOpacity: 1 }} />
            <stop offset="75%" style={{ stopColor: '#d4b76b', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#c9a959', stopOpacity: 1 }} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Main text */}
        <text
          x="200"
          y="60"
          textAnchor="middle"
          fill="url(#gradient)"
          filter="url(#glow)"
          style={{
            fontSize: '32px',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: '600',
            letterSpacing: '2px'
          }}
        >
          VATSAL ACHARYA
        </text>
        
        {/* Subtitle */}
        <text
          x="200"
          y="100"
          textAnchor="middle"
          fill="url(#gradient)"
          filter="url(#glow)"
          style={{
            fontSize: '24px',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: '400',
            letterSpacing: '3px'
          }}
        >
          ARCHITECTS
        </text>
        
        {/* Decorative line */}
        <line
          x1="100"
          y1="120"
          x2="300"
          y2="120"
          stroke="url(#gradient)"
          strokeWidth="1.5"
          filter="url(#glow)"
          className="animate-draw"
        />
      </StyledSVG>
    </LoaderContainer>
  );
};

export default VatsalLoader; 