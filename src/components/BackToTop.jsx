import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const BackToTopButton = styled(motion.button)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: var(--accent);
  color: var(--bg-primary);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 2px solid var(--accent);
  z-index: 9999;
  transition: all 0.3s ease;
  padding: 0;
  outline: none;

  &:hover {
    background: transparent;
    color: var(--accent);
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 45px;
    height: 45px;
    font-size: 1.25rem;
  }

  svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }
`;

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the scroll event listener with throttling
  useEffect(() => {
    const throttledToggleVisibility = () => {
      let timeoutId;
      return () => {
        if (!timeoutId) {
          timeoutId = setTimeout(() => {
            toggleVisibility();
            timeoutId = null;
          }, 100);
        }
      };
    };

    const throttled = throttledToggleVisibility();
    window.addEventListener('scroll', throttled);
    
    // Initial check
    toggleVisibility();

    return () => window.removeEventListener('scroll', throttled);
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <BackToTopButton
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24"
          >
            <path d="M12 4l8 8h-6v8h-4v-8H4z" />
          </svg>
        </BackToTopButton>
      )}
    </AnimatePresence>
  );
}; 