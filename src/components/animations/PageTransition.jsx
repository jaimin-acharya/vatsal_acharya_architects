import { motion } from 'framer-motion';
import styled from 'styled-components';

const PageWrapper = styled(motion.div)`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const PageTransition = ({ children }) => {
  return (
    <PageWrapper
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {children}
    </PageWrapper>
  );
}; 