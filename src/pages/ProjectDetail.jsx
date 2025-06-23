import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ProjectCarousel } from '../components/ProjectCarousel';
import { projects } from '../data/projects';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: var(--bg-primary);
  padding-top: var(--header-height);
`;

const ProjectContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const ProjectHeader = styled(motion.div)`
  margin-bottom: 4rem;
  
  h1 {
    font-size: 3.5rem;
    font-weight: 800;
    color: var(--text-primary);
    margin-bottom: 1.5rem;
    background: linear-gradient(120deg, #ffffff 0%, var(--accent) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -0.02em;

    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  .category {
    display: inline-block;
    background: var(--accent);
    color: var(--bg-primary);
    padding: 0.5rem 1.5rem;
    border-radius: 6px;
    font-size: 0.95rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const ProjectInfo = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  margin-top: 4rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const Description = styled(motion.div)`
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.8;

  p {
    margin-bottom: 1.5rem;
    &:last-child {
      margin-bottom: 0;
    }
  }

  h3 {
    color: var(--text-primary);
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    font-weight: 700;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 40px;
      height: 3px;
      background: var(--accent);
      border-radius: 2px;
    }
  }

  .details-list {
    list-style: none;
    padding: 0;
    margin: 0 0 2rem 0;

    li {
      position: relative;
      padding-left: 1.5rem;
      margin-bottom: 1rem;
      color: var(--text-secondary);
      font-size: 1.1rem;
      line-height: 1.6;

      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0.5rem;
        width: 8px;
        height: 8px;
        background: var(--accent);
        border-radius: 50%;
        transform: translateY(-50%);
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

const Details = styled(motion.div)`
  background: var(--bg-secondary);
  padding: 2.5rem;
  border-radius: 16px;
  border: 1px solid var(--border);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  height: fit-content;
  position: sticky;
  top: calc(var(--header-height) + 2rem);

  h3 {
    color: var(--text-primary);
    font-size: 1.5rem;
    margin-bottom: 2rem;
    font-weight: 700;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 40px;
      height: 3px;
      background: var(--accent);
      border-radius: 2px;
    }
  }

  .detail-item {
    margin-bottom: 1.75rem;
    padding-bottom: 1.75rem;
    border-bottom: 1px solid var(--border);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateX(5px);
    }

    &:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
    }

    h4 {
      color: var(--accent);
      font-size: 0.95rem;
      margin-bottom: 0.5rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      &:before {
        content: '';
        display: inline-block;
        width: 6px;
        height: 6px;
        background: var(--accent);
        border-radius: 50%;
      }
    }

    p {
      color: var(--text-secondary);
      font-size: 1.1rem;
      line-height: 1.6;
    }
  }
`;

const CarouselWrapper = styled(motion.div)`
  margin-bottom: 4rem;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--border);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const SectionTitle = styled.h3`
  color: var(--text-primary);
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 40px;
    height: 3px;
    background: var(--accent);
    border-radius: 2px;
  }
`;

export const ProjectDetail = () => {
  const { projectUrl } = useParams();
  const project = projects.find(p => p.projectUrl === projectUrl);

  if (!project) {
    return (
      <PageContainer>
        <ProjectContainer>
          <h1>Project not found</h1>
        </ProjectContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ProjectContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <ProjectHeader
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="category">{project.category}</span>
          <h1>{project.title}</h1>
        </ProjectHeader>

        <CarouselWrapper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ProjectCarousel images={project.images} />
        </CarouselWrapper>

        <ProjectInfo>
          <Description
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <SectionTitle>Project Overview</SectionTitle>
            <p>{project.fullDescription}</p>
            {project.additionalDetails && (
              <>
                <SectionTitle>Additional Details</SectionTitle>
                <ul className="details-list">
                  {project.additionalDetails.map((detail, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                    >
                      {detail}
                    </motion.li>
                  ))}
                </ul>
              </>
            )}
          </Description>

          <Details
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h3>Project Details</h3>
            <div className="detail-item">
              <h4>Location</h4>
              <p>{project.location}</p>
            </div>
            <div className="detail-item">
              <h4>Year</h4>
              <p>{project.year}</p>
            </div>
            {project.specifications && Object.entries(project.specifications).map(([key, value]) => (
              <div key={key} className="detail-item">
                <h4>{key}</h4>
                <p>{value}</p>
              </div>
            ))}
          </Details>
        </ProjectInfo>
      </ProjectContainer>
    </PageContainer>
  );
}; 