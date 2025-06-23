import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--bg-secondary);
  overflow: hidden;
`;

const StyledImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  will-change: transform;
  backface-visibility: hidden;
`;

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: var(--bg-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingSpinner = styled(motion.div)`
  width: 40px;
  height: 40px;
  border: 3px solid var(--bg-tertiary);
  border-top-color: var(--accent);
  border-radius: 50%;
`;

const BlurredImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  filter: blur(20px);
  transform: scale(1.1);
  opacity: 0.5;
`;

export const ImageLoader = ({ src, alt, onError, priority = false, placeholderSrc = null }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isPlaceholderLoaded, setIsPlaceholderLoaded] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setError(false);
    setIsPlaceholderLoaded(false);

    // Preload image if priority is true
    if (priority) {
      const img = new Image();
      img.src = src;
    }
  }, [src, priority]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setError(true);
    if (onError) onError();
  };

  const handlePlaceholderLoad = () => {
    setIsPlaceholderLoaded(true);
  };

  return (
    <ImageWrapper>
      <AnimatePresence mode="wait">
        {isLoading && !isPlaceholderLoaded && (
          <Placeholder key="placeholder">
            <LoadingSpinner
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </Placeholder>
        )}
      </AnimatePresence>

      {placeholderSrc && (
        <BlurredImage
          src={placeholderSrc}
          alt={`${alt} placeholder`}
          onLoad={handlePlaceholderLoad}
          initial={{ opacity: 0 }}
          animate={{ opacity: isPlaceholderLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      <StyledImage
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        onLoad={handleLoad}
        onError={handleError}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        decoding={priority ? "sync" : "async"}
        fetchpriority={priority ? "high" : "auto"}
      />

      {error && (
        <Placeholder>
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
            <p>{alt}</p>
            <small>Image not available</small>
          </div>
        </Placeholder>
      )}
    </ImageWrapper>
  );
}; 