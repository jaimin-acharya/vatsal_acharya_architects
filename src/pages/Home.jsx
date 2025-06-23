import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { ImageLoader } from '../components/ImageLoader';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/animations/AnimatedComponents';
import { PageTransition } from '../components/animations/PageTransition';
import ShinyText from '../components/Ui/ShinyText';
import { Helmet } from 'react-helmet';

// Using a curated selection of architectural images
const heroImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80';
const projectImages = [
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80',

];

const HeroSection = styled.section`
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
              url(${heroImage}) no-repeat center center/cover;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(to top, var(--bg-primary), transparent);
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--spacing-xl);
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 0 var(--spacing-lg);
  }
`;

const Section = styled.section`
  padding: var(--spacing-xl) 0;
  background-color: var(--bg-primary);
  position: relative;

  &:nth-child(even) {
    background-color: var(--bg-secondary);
  }

  h2 {
    font-size: clamp(2rem, 5vw, 2.5rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-bottom: var(--spacing-xl);
    color: var(--text-primary);
    text-align: center;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
  margin: var(--spacing-xl) 0;
`;

const Card = styled(motion.div)`
  background: var(--bg-tertiary);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--accent);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform var(--transition-normal);
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-hover);
    border-color: var(--accent);

    &::before {
      transform: scaleX(1);
    }
  }

  h3 {
    color: var(--accent);
    margin-bottom: var(--spacing-md);
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  p {
    color: var(--text-secondary);
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const FeaturedProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin: 3rem 0;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ProjectCard = styled(motion.div)`
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 4/3;
  cursor: pointer;
  background: var(--bg-tertiary);
  border: 1px solid rgba(201, 168, 124, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(201, 168, 124, 0.3);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);

    .image {
      transform: scale(1.05);
    }

    .content {
      background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.6));
    }
  }

  .image {
    position: absolute;
    inset: 0;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .content {
    position: absolute;
    inset: 0;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.4));
    transition: background 0.3s ease;

    h3 {
      color: var(--text-primary);
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      letter-spacing: -0.02em;
    }

    p {
      color: var(--text-secondary);
      font-size: 1rem;
      line-height: 1.6;
      opacity: 0.9;
    }

    .category {
     position: absolute;
      top: 0.7rem;
      right: 0.7rem;
      background: rgba(201, 168, 124, 0.9);
      color: var(--bg-primary);
      padding: 0.5rem 1rem;
      border-radius: 10px;
      font-size: 0.9rem;
      font-weight: 500;
      backdrop-filter: blur(4px);
    }
  }
`;

const ViewAllButton = styled(Link)`
  display: inline-block;
  padding: 1rem 2rem;
  background: transparent;
  color: var(--accent);
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  border: 2px solid var(--accent);
  margin-top: 2rem;
  text-align: center;

  &:hover {
    background: var(--accent);
    color: var(--bg-primary);
    transform: translateY(-2px);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

const HeroContent = styled(motion.div)`
  max-width: 800px;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.1;
  margin-bottom: var(--spacing-lg);
  background: linear-gradient(120deg, var(--text-primary) 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 30px rgba(0,0,0,0.15);
`;

const HeroText = styled.p`
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-weight: 400;
  letter-spacing: -0.01em;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  margin-bottom: 20px;
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 1.2rem 2.5rem;
  background: var(--accent);
  color: var(--bg-primary);
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  border: 2px solid var(--accent);
  letter-spacing: -0.01em;

  &:hover {
    background: transparent;
    color: var(--accent);
    transform: translateY(-2px);
  }
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
  margin: 4rem 0;
  text-align: center;

  .stat {
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      right: -1.5rem;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 50%;
      background: var(--border);
      
      @media (max-width: 768px) {
        display: none;
      }
    }
    
    &:last-child::after {
      display: none;
    }

    h3 {
      font-size: 3.5rem;
      font-weight: 700;
      color: var(--accent);
      margin-bottom: 0.5rem;
      line-height: 1;
    }

    p {
      color: var(--text-secondary);
      font-size: 1.1rem;
      font-weight: 500;
    }
  }
`;

export const Home = () => {
  // Get featured projects (first 3 projects)
  const featuredProjects = projects.slice(0, 3);

  return (
    <>
      <Helmet>
        <title>Vatsal Acharya Architects | Modern Architecture & Design</title>
        <meta name="description" content="Innovative architectural solutions that transform spaces and inspire lives. Discover our featured projects and services." />
        <link rel="canonical" href="https://vatsalacharyaarchitects.vercel.app/" />
        {/* Open Graph tags */}
        <meta property="og:title" content="Vatsal Acharya Architects | Modern Architecture & Design" />
        <meta property="og:description" content="Innovative architectural solutions that transform spaces and inspire lives. Discover our featured projects and services." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vatsalacharyaarchitects.vercel.app/" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80" />
        <meta name="keywords" content="vatsal,vatsal acharya architects, architecture, architects, interior design, project management, modern architecture, Vatsal Acharya, building design, Ahmedabad, Palitana, residential projects, commercial projects, innovative design, sustainable architecture" />
      </Helmet>
      <PageTransition>
        <HeroSection>
          <Container>
            <HeroContent>
              <HeroTitle><ShinyText text="Crafting Spaces, Building Dreams!" disabled={false} speed={3} className='custom-class' /></HeroTitle>
              <HeroText>
                Innovative architectural solutions that transform spaces and inspire lives.
              </HeroText>
              <motion.div>
                <Button to="/projects">View Our Work</Button>
              </motion.div>
            </HeroContent>
          </Container>
        </HeroSection>

        <Section>
          <Container>
            <ScrollReveal>
              <h2>Our Services</h2>
              <Grid>
                <StaggerContainer>
                  <StaggerItem>
                    <Card
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3>Architectural Design</h3>
                      <p>Custom architectural solutions tailored to your vision and needs.</p>
                    </Card>
                  </StaggerItem>
                  <StaggerItem>
                    <Card
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3>Interior Design</h3>
                      <p>Transform your space with our innovative interior design services.</p>
                    </Card>
                  </StaggerItem>
                  <StaggerItem>
                    <Card
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3>Project Management</h3>
                      <p>End-to-end project management ensuring quality and timely delivery.</p>
                    </Card>
                  </StaggerItem>
                </StaggerContainer>
              </Grid>
            </ScrollReveal>
          </Container>
        </Section>

        <Section>
          <Container>
            <ScrollReveal>
              <h2>Featured Projects</h2>
              <FeaturedProjectsGrid>
                {featuredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    as={Link}
                    to={`/projects/${project.projectUrl}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="image">
                      <ImageLoader src={project.images[0]} alt={project.title} />
                    </div>
                    <div className="content">
                      <span className="category">{project.category}</span>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                    </div>
                  </ProjectCard>
                ))}
              </FeaturedProjectsGrid>
              <ButtonContainer>
                <ViewAllButton to="/projects">
                  View All Projects
                </ViewAllButton>
              </ButtonContainer>
            </ScrollReveal>
          </Container>
        </Section>
      </PageTransition>
    </>
  );
};