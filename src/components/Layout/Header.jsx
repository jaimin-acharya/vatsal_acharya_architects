import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const MotionImg = motion.img;
const MotionDiv = motion.div;

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 80px;
  display: flex;
  align-items: center;
  background: rgba(18, 18, 18, 0.95);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  transform: translateY(${props => props.$hide ? '-100%' : '0'});
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    height: 70px;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: var(--max-width);
  width: 100%;
  margin: 0 auto;
  padding: 0 var(--spacing-xl);
  height: 100%;
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  text-decoration: none;
  position: relative;
  padding: var(--spacing-sm) 0;
`;

const Logo = styled(MotionImg)`
  height: 50px;
  width: auto;
  cursor: pointer;
  transition: all 0.3s ease;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));

  @media (max-width: 768px) {
    height: 40px;
  }
`;

const CompanyName = styled(motion.span)`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  white-space: nowrap;
  position: relative;
  padding: var(--spacing-xs) 0;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    display: none;
  }
`;

const CompanyNameMobile = styled(motion.span)`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  display: none;
  padding: var(--spacing-xs) 0;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: var(--accent);
    transition: width 0.3s ease;
  }

  @media (max-width: 480px) {
    display: block;
    font-size: 1rem;
    white-space: normal;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: var(--spacing-xl);
  align-items: center;
  height: 100%;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.3s ease;
  position: relative;
  padding: var(--spacing-sm) 0;
  height: 100%;
  display: flex;
  align-items: center;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--accent);
    transition: width 0.3s ease;
  }

  &:hover {
    color: var(--accent);
    transform: translateY(-1px);
    &:after {
      width: 100%;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.5rem;
  cursor: pointer;
  padding: var(--spacing-sm);
  transition: all 0.3s ease;
  height: 40px;
  width: 40px;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--accent);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &:hover {
    color: var(--accent);
    transform: translateY(-2px);
    &:before {
      opacity: 0.1;
    }
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileMenu = styled(MotionDiv)`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(18, 18, 18, 0.98);
  padding: var(--spacing-xl);
  z-index: 1001;
  height: 100vh;
  overflow-y: auto;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-xl);
  }
`;

const MobileNavLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: var(--spacing-md) 0;
  width: 100%;
  text-align: center;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);

  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--accent);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  &:hover {
    color: var(--accent);
    transform: translateX(10px);
    &:before {
      transform: translateX(0);
    }
  }
`;

const MobileMenuHeader = styled.div`
  position: absolute;
  top: var(--spacing-xl);
  left: var(--spacing-xl);
  right: var(--spacing-xl);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-md);
`;

const MobileMenuHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
`;

const MobileMenuLogo = styled.img`
  height: 40px;
  width: auto;
`;

const MobileMenuTitle = styled.span`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: -0.02em;

  @media (max-width: 480px) {
    font-size: 1.1rem;
    white-space: normal;
  }
`;

const MobileMenuFooter = styled.div`
  position: absolute;
  bottom: var(--spacing-xl);
  left: var(--spacing-xl);
  right: var(--spacing-xl);
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.5rem;
  cursor: pointer;
  padding: var(--spacing-sm);
  transition: all 0.3s ease;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--accent);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &:hover {
    color: var(--accent);
    transform: rotate(90deg);
    &:before {
      opacity: 0.1;
    }
  }
`;

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <HeaderContainer $hide={isScrolled}>
      <Nav>
        <LogoContainer to="/">
          <Logo
            src="/logo.png"
            alt="Architectural Firm"
            whileTap={{ scale: 0.95 }}
          />
          <CompanyName
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            VATSAL ACHARYA ARCHITECTS
          </CompanyName>
          <CompanyNameMobile
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            VATSAL ACHARYA ARCHITECTS
          </CompanyNameMobile>
        </LogoContainer>
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </NavLinks>
        <MobileMenuButton onClick={() => setIsMobileMenuOpen(true)}>
          ☰
        </MobileMenuButton>
      </Nav>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <MobileMenuHeader>
              <MobileMenuHeaderLeft>
                <MobileMenuLogo src="/logo.png" alt="Logo" />
                <MobileMenuTitle>VATSAL ACHARYA ARCHITECTS</MobileMenuTitle>
              </MobileMenuHeaderLeft>
              <CloseButton onClick={() => setIsMobileMenuOpen(false)}>×</CloseButton>
            </MobileMenuHeader>
            <MobileNavLink 
              to="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Home
            </MobileNavLink>
            <MobileNavLink 
              to="/projects" 
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Projects
            </MobileNavLink>
            <MobileNavLink 
              to="/services" 
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Services
            </MobileNavLink>
            <MobileNavLink 
              to="/about" 
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              About
            </MobileNavLink>
            <MobileNavLink 
              to="/contact" 
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Contact
            </MobileNavLink>
            <MobileMenuFooter>
              © {new Date().getFullYear()} VATSAL ACHARYA ARCHITECTS. All rights reserved.
            </MobileMenuFooter>
          </MobileMenu>
        )}
      </AnimatePresence>
    </HeaderContainer>
  );
};