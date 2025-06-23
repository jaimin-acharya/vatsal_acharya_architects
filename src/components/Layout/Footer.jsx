import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FooterContainer = styled.footer`
  background: var(--bg-primary);
  color: var(--text-primary);
  padding: 4rem 0 3rem;
  position: relative;
  z-index: 10;
  width: 100%;
  border-top: 1px solid var(--border);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const FooterSection = styled.div`
  h3 {
    color: var(--text-primary);
    margin-bottom: 1.5rem;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 600;
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;

  li {
    margin-bottom: 1rem;
  }

  a {
    color: var(--text-secondary);
    text-decoration: none;
    transition: all 0.2s ease;
    font-size: 1rem;
    display: inline-block;

    &:hover {
      color: var(--accent);
      transform: translateX(5px);
    }
  }

  li:not(a) {
    color: var(--text-secondary);
    font-size: 1rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const SocialIcon = styled(motion.a)`
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.2s ease;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border);

  &:hover {
    color: var(--accent);
    border-color: var(--accent);
    transform: translateY(-2px);
  }
`;

const BottomBar = styled.div`
  border-top: 1px solid var(--border);
  margin-top: 4rem;
  padding-top: 2rem;
  text-align: center;
  color: var(--text-tertiary);
  font-size: 0.9rem;
`;

const Logo = styled(motion.div)`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
  
  span {
    display: block;
    font-size: 1rem;
    color: var(--text-secondary);
    margin-top: 0.5rem;
    font-weight: 400;
  }
`;

export const Footer = () => {
  return (
    <FooterContainer>
      <Container>
        <FooterContent>
          <FooterSection>
            <Logo
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Vatsal Acharya Architects
              <span>Creating spaces that inspire</span>
            </Logo>
            <SocialLinks>
              <SocialIcon 
                href="https://www.instagram.com/vatsal_acharya8/" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fab fa-instagram"></i>
              </SocialIcon>
              <SocialIcon 
                href="https://www.linkedin.com/in/vatsal-acharya-6b4106203/" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fab fa-linkedin-in"></i>
              </SocialIcon>
              <SocialIcon 
                href="mailto:vatsalacharya82@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="far fa-envelope"></i>
              </SocialIcon>
            </SocialLinks>
          </FooterSection>

          <FooterSection>
            <h3>Navigation</h3>
            <FooterLinks>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/projects">Projects</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <h3>Contact</h3>
            <FooterLinks>
              <li>Palitana, Gujarat, India</li>
              <li>+91 8511189224</li>
              <li><a href="mailto:vatsalacharya82@gmail.com">vatsalacharya82@gmail.com</a></li>
            </FooterLinks>
          </FooterSection>
        </FooterContent>
        
        <BottomBar>
          <p>&copy; {new Date().getFullYear()} Vatsal Acharya Architects. All rights reserved.</p>
        </BottomBar>
      </Container>
    </FooterContainer>
  );
};
