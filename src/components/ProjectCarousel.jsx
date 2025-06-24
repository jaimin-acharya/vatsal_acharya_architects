import { useState, useCallback, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { IoIosArrowRoundBack } from "react-icons/io";

import { style } from 'framer-motion/client';



const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 700px;
  background: var(--bg-secondary);
  overflow: hidden;
  border-radius: 16px;

  @media (max-width: 768px) {
    height: 400px;
  }
`;

const SlideContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
`;

const NavigationButton = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background:rgb(201, 169, 89);
  border: 2px solid rgba(201, 169, 89, 0.18);
  width: 52px;
  height: 52px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  opacity: 1;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10);
  backdrop-filter: blur(14px) saturate(1.2);
  -webkit-backdrop-filter: blur(14px) saturate(1.2);
  color: var(--accent, #c9a959);
  cursor: pointer;
  transition: background 0.25s, box-shadow 0.25s, color 0.25s, transform 0.18s, border 0.25s;

  svg {
    width: 30px;
    height: 30px;
    z-index: 20;
    color: #fff;
    filter: drop-shadow(0 1px 2px rgba(201,169,89,0.12));
    transition: color 0.25s, filter 0.25s;
  }

  &:hover, &:focus {
    background: rgba(201, 169, 89, 0.22);
    color: #fff;
    border: 2.5px solid var(--accent, #c9a959);
    box-shadow: 0 12px 36px rgba(201,169,89,0.18), 0 4px 16px rgba(0,0,0,0.14);
    outline: none;
    svg {
      color: #fff;
      filter: drop-shadow(0 2px 6px rgba(201,169,89,0.22));
    }
  }

  &:active {
    background: rgba(201, 169, 89, 0.32);
    color: #fff;
    border: 2.5px solid var(--accent, #c9a959);
    transform: scale(0.97);
    svg {
      color: #fff;
      filter: drop-shadow(0 1px 2px rgba(201,169,89,0.18));
    }
  }

  &.prev {
    left: 16px;
  }

  &.next {
    right: 16px;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const ThumbnailContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 12px;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 10;
  transition: transform 0.3s ease, opacity 0.3s ease;
  opacity: 0;

  &:hover {
    opacity: 1;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Thumbnail = styled(motion.div)`
  width: 60px;
  height: 40px;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  opacity: ${props => props.$active ? 1 : 0.6};
  transform: ${props => props.$active ? 'scale(1.1)' : 'scale(1)'};
  transition: all 0.3s ease;
  border: 2px solid ${props => props.$active ? 'var(--accent)' : 'transparent'};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  z-index: 10;

  @media (min-width: 769px) {
    display: none;
  }
`;

const ProgressIndicator = styled(motion.div)`
  height: 100%;
  background: var(--accent);
`;

const Counter = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.6);
  padding: 8px 12px;
  border-radius: 8px;
  color: white;
  font-size: 0.9rem;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 10;
  font-weight: 500;
`;

const CarouselWrapper = styled.div`
  &:hover {
    ${NavigationButton}, ${ThumbnailContainer} {
      opacity: 1;
    }
  }
`;

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.8
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.8
  })
};

const FullscreenModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  cursor: pointer;
`;

const FullscreenImage = styled(motion.img)`
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
`;

const CloseButton = styled.div`
  position: absolute;
      top: 0.7rem;
      left: 0.7rem;
      background: rgba(201, 168, 124, 0.9);
      color: var(--bg-primary);
      padding: 0.5rem 1rem;
      border-radius: 10px;
      font-size: 0.9rem;
      font-weight: 700;
      backdrop-filter: blur(4px);
text-transform: uppercase;

  

  padding: 10px;
  
  border: 2px solid rgba(201, 169, 89, 0.18);
  width: max-content;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  opacity: 1;
  gap: 5px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10);
  backdrop-filter: blur(14px) saturate(1.2);
  -webkit-backdrop-filter: blur(14px) saturate(1.2);
  
 cursor: pointer;
  transition: background 0.25s, box-shadow 0.25s, color 0.25s, transform 0.18s, border 0.25s;

  svg {
    width: 30px;
    height: 30px;
    z-index: 20;
    color: #000;
    filter: drop-shadow(0 1px 2px rgba(201,169,89,0.12));
    transition: color 0.25s, filter 0.25s;
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
    background: rgba(201, 169, 89, 0.32);
    color: #fff;
    border: 2.5px solid var(--accent, #c9a959);
    transform: scale(0.97);
    svg {
      color: #fff;
      filter: drop-shadow(0 1px 2px rgba(201,169,89,0.18));
    }
  }

  @media (max-width: 768px) {
    top: 16px;
    right: 16px;
    width: max-content;
    height: 40px;
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const BlurredImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: blur(20px);
  transform: scale(1.1);
  opacity: ${props => props.$loaded ? 0 : 1};
  transition: opacity 0.3s ease-out;
`;

const MainImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: ${({ $fullscreen }) => $fullscreen ? 'contain' : 'cover'};
  opacity: ${props => props.$loaded ? 1 : 0};
  transition: opacity 0.3s ease-in;

  @media (max-width: 768px) {
    object-fit: ${({ $fullscreen }) => $fullscreen ? 'contain' : 'cover'};
  }
`;

export const ProjectCarousel = ({ images }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const imageCache = useRef(new Map());

  const imageIndex = Math.abs(page % images.length);

  // Preload next and previous images
  useEffect(() => {
    const preloadImage = (src) => {
      if (!imageCache.current.has(src)) {
        const img = new Image();
        img.src = src;
        imageCache.current.set(src, img);
      }
    };

    // Preload current, next, and previous images
    const currentImage = images[imageIndex];
    const nextImage = images[(imageIndex + 1) % images.length];
    const prevImage = images[(imageIndex - 1 + images.length) % images.length];

    preloadImage(currentImage);
    preloadImage(nextImage);
    preloadImage(prevImage);
  }, [imageIndex, images]);

  const handleImageLoad = useCallback((src) => {
    setLoadedImages(prev => ({
      ...prev,
      [src]: true
    }));
  }, []);

  const paginate = useCallback((newDirection) => {
    if (!isAnimating) {
      setPage([page + newDirection, newDirection]);
    }
  }, [page, isAnimating]);

  const handleThumbnailClick = useCallback((index) => {
    if (!isAnimating) {
      const direction = index > imageIndex ? 1 : -1;
      setPage([index, direction]);
    }
  }, [imageIndex, isAnimating]);

  const handleAnimationStart = () => setIsAnimating(true);
  const handleAnimationComplete = () => setIsAnimating(false);

  const handleImageClick = () => {
    setIsFullscreen(true);
  };

  const handleCloseFullscreen = (e) => {
    if (e.target === e.currentTarget) {
      setIsFullscreen(false);
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        // Swipe left
        paginate(1);
      } else {
        // Swipe right
        paginate(-1);
      }
    }

    // Reset values
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const renderImage = (src, alt, fullscreen = false) => {
    const isLoaded = loadedImages[src];
    const lowResSrc = src.replace(/\.[^/.]+$/, '-low$&'); // Assuming you have low-res versions

    return (
      <ImageWrapper>
        <BlurredImage
          src={lowResSrc}
          alt={alt}
          $loaded={isLoaded}
        />
        <MainImage
          src={src}
          alt={alt}
          $loaded={isLoaded}
          $fullscreen={fullscreen}
          onLoad={() => handleImageLoad(src)}
        />
      </ImageWrapper>
    );
  };

  return (
    <CarouselWrapper>
      <CarouselContainer>
        <NavigationButton
          className="prev"
          onClick={() => paginate(-1)}
          aria-label="Previous image"
          role="button"
          tabIndex={0}
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && paginate(-1)}
        >
          <MdKeyboardArrowLeft />
        </NavigationButton>

        <NavigationButton
          className="next"
          onClick={() => paginate(1)}
          aria-label="Next image"
          role="button"
          tabIndex={0}
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && paginate(1)}
        >
          <MdKeyboardArrowRight />
        </NavigationButton>

        <Counter>
          {imageIndex + 1} / {images.length}
        </Counter>

        <AnimatePresence initial={false} custom={direction} mode="wait">
          <SlideContainer
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 }
            }}
            onAnimationStart={handleAnimationStart}
            onAnimationComplete={handleAnimationComplete}
            onClick={handleImageClick}
            style={{ cursor: 'pointer' }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {renderImage(images[imageIndex], `Slide ${imageIndex + 1}`)}
          </SlideContainer>
        </AnimatePresence>

        <ThumbnailContainer>
          {images.map((image, index) => (
            <Thumbnail
              key={index}
              $active={index === imageIndex}
              onClick={() => handleThumbnailClick(index)}
            >
              <img src={image} alt={`Thumbnail ${index + 1}`} />
            </Thumbnail>
          ))}
        </ThumbnailContainer>

        <ProgressBar>
          <ProgressIndicator
            initial={{ width: "0%" }}
            animate={{ width: `${((imageIndex + 1) / images.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </ProgressBar>
      </CarouselContainer>

      <AnimatePresence>
        {isFullscreen && (
          <FullscreenModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseFullscreen}
          >
            <CloseButton
              onClick={() => setIsFullscreen(false)}
              aria-label="Close fullscreen"
            >
              <IoIosArrowRoundBack /> Return

            </CloseButton>
            {renderImage(images[imageIndex], `Fullscreen view of slide ${imageIndex + 1}`, true)}

          </FullscreenModal>
        )}
      </AnimatePresence>
    </CarouselWrapper>
  );
}; 