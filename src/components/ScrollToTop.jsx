import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollButton = styled(motion.button)`
  position: fixed;
  bottom: 2rem;
  // left: 0;
  right: 10px;
  margin: 0 auto;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  background: transparent;
  color: var(--accent);
  border: 2px solid var(--accent);
  cursor: pointer;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(201, 168, 124, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0.9;
  -webkit-tap-highlight-color: transparent;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  min-width: 140px;
  line-height: 1;
  width: fit-content;

  &:hover {
    background: var(--accent);
    color: var(--bg-primary);
    transform: translateY(-2px);
    opacity: 1;
    box-shadow: 0 6px 16px rgba(201, 168, 124, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    bottom: 1.5rem;
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    min-width: 120px;
    gap: 0.5rem;
  }

  @media (min-width: 1200px) {
    bottom: 3rem;
  }
`;

const ScrollIcon = styled(motion.div)`
  width: 16px;
  height: 16px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -1px;

  &::before {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    border-top: 2px solid currentColor;
    border-left: 2px solid currentColor;
    transform: rotate(45deg);
    margin-top: 2px;
  }
`;

// Component for automatic scroll to top on navigation
export const ScrollToTopOnMount = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollToTop = () => {
      const c = document.documentElement.scrollTop || document.body.scrollTop;
      if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8);
      }
    };

    try {
      // First try smooth scrolling
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    } catch (error) {
      // Fallback for browsers that don't support smooth scrolling
      scrollToTop();
    }
  }, [pathname]);

  return null;
};

// Component for scroll to top button
export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    const scrolled = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrolled > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    try {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    } catch (error) {
      // Fallback for browsers that don't support smooth scrolling
      const scrollToTop = () => {
        const c = document.documentElement.scrollTop || document.body.scrollTop;
        if (c > 0) {
          window.requestAnimationFrame(scrollToTop);
          window.scrollTo(0, c - c / 8);
        }
      };
      scrollToTop();
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <ScrollButton
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ 
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1]
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll to top"
        >
          <ScrollIcon
            animate={{ y: [0, -2, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
          Back to Top
        </ScrollButton>
      )}
    </AnimatePresence>
  );
}; 