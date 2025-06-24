import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import styled from 'styled-components';
import { ProjectCarousel } from '../components/ProjectCarousel';
import { ImageLoader } from '../components/ImageLoader';
import { InfiniteMarquee } from '../components/InfiniteMarquee';
import { Link, useNavigate } from 'react-router-dom';
import { projects, categories } from '../data/projects';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/animations/AnimatedComponents';
import ShinyText from '../components/Ui/ShinyText';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: var(--bg-primary);
  overflow-x: hidden;
`;

const HeroSection = styled.section`
  min-height: 80vh;
  background: linear-gradient(
    165deg,
    var(--bg-secondary) 0%,
    var(--bg-primary) 100%
  );
  padding: 1rem 0;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: radial-gradient(
      circle at 30% 20%,
      var(--accent) 0%,
      transparent 70%
    );
    opacity: 0.05;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 150px;
    background: linear-gradient(
      to bottom,
      transparent,
      var(--bg-primary)
    );
    pointer-events: none;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2.5rem;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const HeroContent = styled(motion.div)`
  max-width: 900px;

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



const ProjectsSection = styled.section`
  padding: 8rem 0;
  background: var(--bg-primary);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(
      to bottom,
      var(--bg-primary),
      transparent
    );
    pointer-events: none;
  }
`;

const FilterContainer = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin: 2rem 0 5rem;
  flex-wrap: wrap;
  justify-content: center;
  position: sticky;
  top: var(--header-height);
  background: rgba(var(--bg-primary-rgb), 0.8);
  padding: 1.5rem 0;
  z-index: 10;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const FilterButton = styled(motion.button)`
  background: ${props => props.$active ? 'var(--accent)' : 'rgba(255, 255, 255, 0.03)'};
  color: ${props => props.$active ? 'var(--bg-primary)' : 'var(--text-secondary)'};
  border: 2px solid ${props => props.$active ? 'var(--accent)' : 'rgba(255, 255, 255, 0.05)'};
  padding: 1rem 2rem;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  transition: all 0.3s ease;

  &:hover {
    background: var(--accent);
    border-color: var(--accent);
    color: var(--bg-primary);
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(201, 168, 124, 0.2);
  }
`;

const ProjectGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 3rem;
  margin: 0;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
    gap: 2.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
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

const ProjectInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 3rem;
  color: var(--text-primary);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 2;

  .category {
    display: inline-block;
    background: var(--accent);
    color: var(--bg-primary);
    padding: 0.75rem 1.5rem;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    box-shadow: 0 4px 12px rgba(201, 168, 124, 0.3);
    backdrop-filter: blur(5px);
  }

  h3 {
    font-size: clamp(1.8rem, 3vw, 2.2rem);
    margin-bottom: 1rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    background: linear-gradient(120deg, #ffffff, var(--accent));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }

  p {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.6;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.97);
  z-index: 1000;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  overflow-y: auto;
`;

const ModalContent = styled(motion.div)`
  max-width: 1000px;
  width: 100%;
  background: var(--bg-tertiary);
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  border: 1px solid var(--border);
  margin: auto;
`;

const ModalInfo = styled.div`
  padding: 3rem;
  background: var(--bg-tertiary);
  border-top: 1px solid var(--border);

  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
    background: linear-gradient(120deg, #ffffff, var(--accent));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    color: var(--text-secondary);
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  .details {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    padding-top: 2rem;
    border-top: 1px solid var(--border);
    background: var(--bg-secondary);
    border-radius: 12px;
    padding: 2rem;

    .detail-item {
      h4 {
        color: var(--accent);
        font-size: 1rem;
        margin-bottom: 0.5rem;
        font-weight: 600;
      }

      p {
        margin: 0;
        font-size: 1rem;
      }
    }
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgb(201,169,89);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
  width: 50px;
  height: 35px;
  padding: 8px 12px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1001;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
   line-height: 1.5;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  span{
    display: flex;
    align-items: center;
    justify-content: center;
  font-size: 1.75rem;
  margin-bottom: 6px;

}

  &::before {
    content: '';
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    inset: -1px;
    border-radius: 50%;
    padding: 1px;
    background: linear-gradient(45deg, var(--accent), transparent);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &:hover, &:focus {
    background: rgba(201, 169, 89, 0.22);
    color: #c9a959;
    border: 2.5px solid var(--accent, #c9a959);
    box-shadow: 0 12px 36px rgba(201,169,89,0.18), 0 4px 16px rgba(0,0,0,0.14);
    outline: none;
    svg {
      color: #c9a959;
      filter: drop-shadow(0 2px 6px rgba(201,169,89,0.22));
    }
  }
  
  &:active {
    transform: scale(0.95) rotate(90deg);
  }
`;

const ViewDetailsButton = styled(Link)`
  display: inline-block;
  background: var(--accent);
  color: var(--bg-primary);
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  margin-top: 2rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(201, 168, 124, 0.3);
  }
`;

const StyledStaggerContainer = styled(StaggerContainer)`
  ${props => props.as === ProjectGrid && `
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 3rem;
    margin: 0;

    @media (max-width: 1400px) {
      grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
      gap: 2.5rem;
    }

    @media (max-width: 768px) {
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }
  `}
`;

export const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();

  const projectStats = {
    total: projects.length,
    residential: projects.filter(p => p.category === "Residential").length,
    commercial: projects.filter(p => p.category === "Commercial").length,
    public: projects.filter(p => p.category === "Public").length
  };

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  const handleProjectClick = useCallback((project) => {
    setSelectedProject(project);
  }, []);

  const handleViewDetails = useCallback((e, projectUrl) => {
    e.stopPropagation();
    navigate(`/projects/${projectUrl}`);
  }, [navigate]);

  const handleImageError = useCallback((projectId) => {
    setImageErrors(prev => ({
      ...prev,
      [projectId]: true
    }));
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      handleCloseModal();
    }
  }, [handleCloseModal]);

  useEffect(() => {
    if (selectedProject) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject, handleKeyDown]);

  return (
    <PageContainer>
      <HeroSection>
        <Container>
          <HeroContent>
            <h1> <ShinyText text="Our Projects" disabled={false} speed={3} className='custom-class' /></h1>
            <p>Explore our portfolio of innovative architectural designs.</p>
          </HeroContent>
        </Container>
      </HeroSection>

      <ProjectsSection>
        <Container>
          <ScrollReveal>
            <FilterContainer
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {categories.map((category, index) => (
                <FilterButton
                  key={category}
                  $active={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </FilterButton>
              ))}
            </FilterContainer>
          </ScrollReveal>

          <AnimatePresence mode="wait">
            <StyledStaggerContainer
              as={ProjectGrid}
              key={selectedCategory}
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
              {filteredProjects.map((project, index) => (
                <StaggerItem
                  key={project.id}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                  }}
                >
                  <ProjectCard
                    onClick={() => handleProjectClick(project)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="image">
                      <ImageLoader
                        src={project.images[0]}
                        alt={project.title}
                        priority={index === 0}
                      />
                    </div>
                    <div className="content">
                      <span className="category">{project.category}</span>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                    </div>
                  </ProjectCard>
                </StaggerItem>
              ))}
            </StyledStaggerContainer>
          </AnimatePresence>
        </Container>
      </ProjectsSection>

      <AnimatePresence>
        {selectedProject && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <ModalContent
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <CloseButton
                onClick={handleCloseModal}
                aria-label="Close modal"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span>×</span>
              </CloseButton>
              <ProjectCarousel images={selectedProject.images} />
              <ModalInfo>
                <h2 id="modal-title">{selectedProject.title}</h2>
                <p>{selectedProject.description}</p>
                <div className="details">
                  <div className="detail-item">
                    <h4>Category</h4>
                    <p>{selectedProject.category}</p>
                  </div>
                  <div className="detail-item">
                    <h4>Location</h4>
                    <p>{selectedProject.location}</p>
                  </div>
                </div>
                <ViewDetailsButton
                  to={`/projects/${selectedProject.projectUrl}`}
                  onClick={(e) => handleViewDetails(e, selectedProject.projectUrl)}
                >
                  View Full Details
                </ViewDetailsButton>
              </ModalInfo>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </PageContainer>
  );
};
