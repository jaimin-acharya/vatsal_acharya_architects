import { motion } from 'framer-motion';
import styled from 'styled-components';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/animations/AnimatedComponents';
import CountUp from '../components/animations/CountUp';
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

  h1 {
    font-size: clamp(2.5rem, 8vw, 4rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    color: var(--text-primary);
    margin-bottom: 1.5rem;
    background: linear-gradient(120deg, #ffffff 0%, var(--accent) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    color: var(--text-secondary);
    line-height: 1.6;
    font-size: clamp(1rem, 3vw, 1.2rem);
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 0 1rem;
  }
`;

const Section = styled.section`
  padding: clamp(4rem, 8vw, 8rem) 0;
  background: ${props => props.$alternate ? 'var(--bg-secondary)' : 'var(--bg-primary)'};

  h2 {
    font-size: clamp(2rem, 5vw, 2.5rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--text-primary);
    margin-bottom: 2rem;
    text-align: center;
  }

  p {
    color: var(--text-secondary);
    font-size: clamp(1rem, 2.5vw, 1.1rem);
    line-height: 1.6;
    margin-bottom: 2rem;
    text-align: center;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: clamp(1.5rem, 3vw, 2.5rem);
  margin: clamp(2rem, 4vw, 3rem) 0;
`;

const TeamGrid = styled(Grid)`
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;

const Card = styled(motion.div)`
  background: var(--bg-tertiary);
  padding: clamp(1.5rem, 3vw, 2.5rem);
  border-radius: 12px;
  border: 1px solid var(--border);
  height: 100%;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow);
    border-color: var(--accent);
  }

  h3 {
    color: var(--accent);
    font-size: clamp(1.2rem, 3vw, 1.5rem);
    font-weight: 700;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
  }

  p {
    color: var(--text-secondary);
    font-size: clamp(0.9rem, 2.5vw, 1rem);
    line-height: 1.6;
    margin-bottom: 0;
    text-align: left;
  }
`;

const TeamCard = styled(Card)`
  text-align: center;
  padding: clamp(2rem, 4vw, 3rem) clamp(1.5rem, 3vw, 2rem);

  img {
    display: inline;
    width: clamp(120px, 25vw, 180px);
    height: clamp(120px, 25vw, 180px);
    border-radius: 50%;
    margin-bottom: clamp(1.5rem, 3vw, 2rem);
    object-fit: cover;
    border: 4px solid var(--border);
    transition: all 0.3s ease;
  }

  &:hover img {
    border-color: var(--accent);
  }

  h3 {
    margin-bottom: 0.5rem;
    color: var(--text-primary);
  }

  .position {
    color: var(--accent);
    font-size: clamp(0.9rem, 2.5vw, 1rem);
    margin-bottom: 1.5rem;
    font-weight: 500;
  }

  p {
    text-align: center;
    color: var(--text-secondary);
  }
`;

const Stats = styled.div`
  display: grid;
  place-items: center;
  justify-content: center;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;
  text-align: center;
  margin: 4rem 0;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--border);
    transform: translateY(-50%);
  }

  @media (max-width: 1200px) {
    gap: 2rem;
  }

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;

    &::before {
      display: none;
    }
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    margin: 2rem 0;
  }
`;

const StatItem = styled.div`
  position: relative;
  padding: 2rem;
  background: var(--bg-tertiary);
  border-radius: 12px;
  border: 1px solid var(--border);
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    transform: translateY(-5px);
    border-color: var(--accent);
  }

  h3 {
    color: var(--accent);
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 700;
    margin-bottom: 0.5rem;
    line-height: 1;
  }

  p {
    font-size: clamp(0.9rem, 2vw, 1.1rem);
    margin: 0;
    color: var(--text-secondary);
    white-space: normal;
  }

  @media (max-width: 576px) {
    padding: 1.5rem;
  }
`;

const teamMembers = [
  {
    name: 'Vatsal Acharya',
    position: 'Principal Architect',
    image: '/team/vatsal.jpg',
    bio: 'With over 5 years of experience in sustainable architecture.'
  },
  {
    name: 'Ravi Acharya',
    position: 'Civil Engineer',
    image: '/team/ravibhai.jpg',
    bio: 'Civil Engineer at Dhruvanshi Construction Company.'
  },
  {
    name: 'Jamir Sompura',
    position: 'Design Director',
    image: '/team/jamirbhai.jpg',
    bio: 'Design Director at Dhruvanshi Construction Company.'
  },
  
];

const achievements = [
  { number: 100, text: 'Projects Completed', suffix: '+' },
  { number: 5, text: 'Years Experience', suffix: '+' },
  { number: 15, text: 'Design Awards', suffix: '+' },
  { number: 95, text: 'Client Satisfaction',  suffix: '%' }
];

const HeroContent = styled(motion.div)`
  max-width: 800px;
  
  h1 {
    font-size: clamp(2.5rem, 10vw, 6rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.2;
    background: linear-gradient(135deg, #ffffff 0%, var(--accent) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: clamp(1.5rem, 3vw, 2rem);
    text-shadow: 0 20px 30px rgba(0, 0, 0, 0.2);
  }

  p {
    font-size: clamp(1rem, 2.5vw, 1.4rem);
    line-height: 1.6;
    color: var(--text-secondary);
    margin-bottom: clamp(2rem, 5vw, 4rem);
    opacity: 0.9;
    max-width: 700px;
  }
`;

const StyledStaggerContainer = styled(StaggerContainer)`
  ${props => props.as === Grid && `
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2.5rem;
    margin: 3rem 0;
  `}

  ${props => props.as === TeamGrid && `
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2.5rem;
    margin: 3rem 0;
  `}

  ${props => props.as === Stats && `
    // Styles for Stats are now handled directly within the Stats styled component
  `}
`;

export const About = () => {
  const storyCards = [
    {
      title: 'Our Vision',
      description: 'To create architectural masterpieces that harmoniously blend form, function, and sustainability while exceeding our clients\' expectations.'
    },
    {
      title: 'Our Mission',
      description: 'To deliver innovative architectural solutions that transform spaces and enhance the quality of life for our clients and communities.'
    },
    {
      title: 'Our Values',
      description: 'Excellence, innovation, sustainability, and client satisfaction are the cornerstones of our architectural practice.'
    }
  ];

  return (
    <PageContainer>
      <HeroSection>
        <Container>
          <HeroContent>
            <h1> <ShinyText text="About Us" disabled={false} speed={3} className='custom-class' /></h1>
            <p>Creating exceptional architectural experiences since 2015.</p>
          </HeroContent>
        </Container>
      </HeroSection>

      <Section>
        <Container>
          <ScrollReveal>
            <h2>Our Story</h2>
          </ScrollReveal>
          <StyledStaggerContainer
            as={Grid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            <StaggerItem
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <Card>
                <h3>Our Vision</h3>
                <p>
                  To create architectural masterpieces that harmoniously blend form,
                  function, and sustainability while exceeding our clients' expectations.
                </p>
              </Card>
            </StaggerItem>
            <StaggerItem
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <Card>
                <h3>Our Mission</h3>
                <p>
                  To deliver innovative architectural solutions that transform spaces
                  and enhance the quality of life for our clients and communities.
                </p>
              </Card>
            </StaggerItem>
            <StaggerItem
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <Card>
                <h3>Our Values</h3>
                <p>
                  Excellence, innovation, sustainability, and client satisfaction
                  are the cornerstones of our architectural practice.
                </p>
              </Card>
            </StaggerItem>
          </StyledStaggerContainer>
        </Container>
      </Section>

      <Section>
        <Container>
          <ScrollReveal>
            <h2>Our Team</h2>
          </ScrollReveal>
          <StyledStaggerContainer
            as={TeamGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
          >
            {teamMembers.map((member, index) => (
              <StaggerItem
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
              >
                <TeamCard>
                  <img src={member.image} alt={member.name} />
                  <h3>{member.name}</h3>
                  <div className="position">{member.position}</div>
                  <p>{member.bio}</p>
                </TeamCard>
              </StaggerItem>
            ))}
          </StyledStaggerContainer>
        </Container>
      </Section>

      <Section $alternate>
        <Container>
          <ScrollReveal>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2>Our Achievements</h2>
              <StyledStaggerContainer
                as={Stats}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
              >
                {achievements.map((achievement, index) => (
                  <StaggerItem
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                    }}
                  >
                    <StatItem>
                      <h3>
                        <CountUp 
                          end={achievement.number} 
                          duration={2.5}
                          suffix={achievement.suffix || ''}
                        />
                      </h3>
                      <p>{achievement.text}</p>
                    </StatItem>
                  </StaggerItem>
                ))}
              </StyledStaggerContainer>
            </motion.div>
          </ScrollReveal>
        </Container>
      </Section>
    </PageContainer>
  );
};
  