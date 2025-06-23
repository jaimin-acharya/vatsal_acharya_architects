import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/animations/AnimatedComponents';
import ShinyText from '../components/Ui/ShinyText';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: var(--bg-primary);
  padding-top: var(--header-height);
`;

const HeroSection = styled.section`
  background: var(--bg-secondary);
  padding: 1rem 0;
  position: relative;
  overflow: hidden;
  margin-bottom: 0;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  padding: 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const StyledStaggerContainer = styled(StaggerContainer)`
  ${props => props.as === ServicesGrid && `
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2.5rem;
    padding: 0;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  `}
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const ServicesSection = styled.section`
  padding: 8rem 0;
  background: var(--bg-primary);

  @media (max-width: 768px) {
    padding: 4rem 0;
  }
`;

const HeroContent = styled(motion.div)`
  max-width: 800px;
  
  h1 {
    font-size: clamp(3.5rem, 10vw, 6rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1;
    background: linear-gradient(135deg, #ffffff 0%, var(--accent) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 2rem;
    text-shadow: 0 20px 30px rgba(0, 0, 0, 0.2);
  }

  p {
    font-size: clamp(1.2rem, 2.5vw, 1.4rem);
    line-height: 1.6;
    color: var(--text-secondary);
    margin-bottom: 4rem;
    opacity: 0.9;
    max-width: 700px;
  }
`;

const ServiceCard = styled(motion.div)`
  background: var(--bg-tertiary);
  border-radius: 16px;
  padding: 3rem;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid var(--border);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--accent), var(--accent-light));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover {
    transform: translateY(-8px);
    border-color: var(--accent);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);

    &::before {
      transform: scaleX(1);
    }
  }

  .icon-wrapper {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    transition: transform 0.3s ease;

    svg {
      width: 30px;
      height: 30px;
      color: white;
    }
  }

  &:hover .icon-wrapper {
    transform: scale(1.1) rotate(5deg);
  }

  h3 {
    color: var(--text-primary);
    margin-bottom: 1rem;
    font-size: 1.8rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    background: linear-gradient(120deg, var(--text-primary) 0%, var(--accent) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    color: var(--text-secondary);
    line-height: 1.7;
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
    flex-grow: 1;
  }

  .features {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    li {
      color: var(--text-secondary);
      display: flex;
      align-items: center;
      font-size: 1rem;
      transition: all 0.3s ease;

      &:hover {
        transform: translateX(5px);
        color: var(--accent);
      }

      &:before {
        content: '→';
        color: var(--accent);
        font-size: 1.2rem;
        margin-right: 0.75rem;
        line-height: 1;
        transition: transform 0.3s ease;
      }

      &:hover:before {
        transform: translateX(5px);
      }
    }
  }
`;

const ProcessSection = styled.section`
  padding: 8rem 0;
  background: var(--bg-secondary);

  @media (max-width: 768px) {
    padding: 4rem 0;
  }

  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--text-primary);
    text-align: center;
    margin-bottom: 2rem;
    letter-spacing: -0.02em;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  p {
    color: var(--text-secondary);
    text-align: center;
    max-width: 800px;
    margin: 0 auto 4rem;
    font-size: 1.1rem;
    line-height: 1.6;
  }
`;

const ProcessTimeline = styled.div`
  position: relative;
  max-width: 900px;
  margin: 4rem auto;
  padding: 2rem 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background: linear-gradient(to bottom, 
      var(--accent) 0%, 
      var(--accent) 50%, 
      var(--border) 50%, 
      var(--border) 100%
    );
    background-size: 100% 200%;
    animation: timelineProgress 2s linear infinite;

    @media (max-width: 768px) {
      left: 20px;
    }
  }

  @keyframes timelineProgress {
    from {
      background-position: 0 200%;
    }
    to {
      background-position: 0 0;
    }
  }
`;

const ProcessStep = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4rem;
  position: relative;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding-left: 48px;
    margin-bottom: 3rem;
  }

  &::before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    background: var(--accent);
    border-radius: 50%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;

    @media (max-width: 768px) {
      left: 13px;
      top: 0;
    }
  }
`;

const StepContent = styled(motion.div)`
  background: var(--bg-tertiary);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid var(--border);
  width: calc(50% - 2rem);
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--accent);
    transform: translateY(-5px);
    box-shadow: var(--shadow);
  }

  @media (max-width: 768px) {
    width: 100%;
  }

  h3 {
    color: var(--accent);
    font-size: 1.5rem;
    margin-bottom: 1rem;
    font-weight: 700;
  }

  p {
    color: var(--text-secondary);
    font-size: 1rem;
    line-height: 1.6;
    margin: 0;
    text-align: left;
  }
`;

const CTASection = styled.section`
  padding: 8rem 0;
  text-align: center;
  background: var(--bg-primary);

  h2 {
    font-size: 3rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 1.5rem;
    letter-spacing: -0.02em;

    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  p {
    color: var(--text-secondary);
    font-size: 1.2rem;
    line-height: 1.6;
    max-width: 600px;
    margin: 0 auto 2.5rem;
  }
`;

const CTAButton = styled(motion.button)`
  background: var(--accent);
  color: var(--bg-primary);
  border: 2px solid var(--accent);
  padding: 1.2rem 2.5rem;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  letter-spacing: -0.01em;

  &:hover {
    background: transparent;
    color: var(--accent);
    transform: translateY(-2px);
  }
`;

export const Services = () => {
  const navigate = useNavigate();
  const services = [
    {
      title: 'Architectural Design',
      description: 'From concept to completion, we create innovative and sustainable architectural designs that transform your vision into reality.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      features: [
        'Custom architectural solutions',
        '3D modeling and visualization',
        'Sustainable design principles',
        'Building code compliance'
      ]
    },
    {
      title: 'Project Planning',
      description: 'Comprehensive project planning services ensuring smooth execution and successful delivery of your architectural projects.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      features: [
        'Detailed project timelines',
        'Resource allocation',
        'Budget management',
        'Risk assessment'
      ]
    },
    {
      title: 'Interior Design',
      description: 'Creating harmonious interior spaces that blend functionality with aesthetics, tailored to your lifestyle and preferences.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      features: [
        'Space planning',
        'Color schemes',
        'Furniture selection',
        'Lighting design'
      ]
    },
    {
      title: 'Sustainable Design',
      description: 'Environmentally conscious design solutions that minimize environmental impact while maximizing energy efficiency.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      features: [
        'Energy-efficient solutions',
        'Green building materials',
        'Renewable energy integration',
        'Environmental impact analysis'
      ]
    }
  ];

  const processSteps = [
    {
      title: 'Initial Consultation',
      description: 'We begin with a detailed discussion of your vision, requirements, and project goals to ensure perfect alignment.'
    },
    {
      title: 'Concept Development',
      description: 'Our team creates initial design concepts and preliminary sketches based on your input and requirements.'
    },
    {
      title: 'Design Refinement',
      description: 'We refine the chosen concept through detailed drawings and 3D visualizations, incorporating your feedback.'
    },
    {
      title: 'Final Documentation',
      description: 'Complete technical drawings and documentation are prepared for approval and construction.'
    }
  ];

  return (
    <PageContainer>
      <HeroSection>
        <Container>
          <HeroContent>
            <h1> <ShinyText text="Our Services" disabled={false} speed={3} className='custom-class' /></h1>
            <p>Comprehensive architectural solutions tailored to your vision.</p>
          </HeroContent>
        </Container>
      </HeroSection>

      <ServicesSection>
        <Container>
          <StyledStaggerContainer as={ServicesGrid}>
            {services.map((service, index) => (
              <StaggerItem key={index}>
                <ServiceCard
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="icon-wrapper">
                    {service.icon}
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul className="features">
                    {service.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </ServiceCard>
              </StaggerItem>
            ))}
          </StyledStaggerContainer>
        </Container>
      </ServicesSection>

      <ProcessSection>
        <Container>
          <ScrollReveal>
            <h2>Our Process</h2>
            <p>
              We follow a systematic approach to ensure every project is delivered
              with the highest quality and attention to detail.
            </p>
          </ScrollReveal>

          <ProcessTimeline>
            {processSteps.map((step, index) => (
              <ProcessStep
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ 
                  justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end'
                }}
              >
                <StepContent
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </StepContent>
              </ProcessStep>
            ))}
          </ProcessTimeline>
        </Container>
      </ProcessSection>

      <CTASection>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Start Your Project?</h2>
            <p>
              Let's collaborate to create something extraordinary. Contact us today
              to discuss your vision.
            </p>
            <CTAButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/contact')}
            >
              Schedule a Consultation
            </CTAButton>
          </motion.div>
        </Container>
      </CTASection>
    </PageContainer>
  );
};
