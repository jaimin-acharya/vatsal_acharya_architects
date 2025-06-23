import { motion } from 'framer-motion';
import styled from 'styled-components';

const MotionDiv = motion.div;
const MotionH1 = motion.h1;
const MotionH2 = motion.h2;
const MotionH3 = motion.h3;
const MotionP = motion.p;
const MotionSpan = motion.span;
const MotionImg = motion.img;
const MotionA = motion.a;
const MotionButton = motion.button;
const MotionSection = motion.section;
const MotionArticle = motion.article;
const MotionNav = motion.nav;
const MotionUl = motion.ul;
const MotionLi = motion.li;
const MotionForm = motion.form;
const MotionInput = motion.input;
const MotionTextarea = motion.textarea;
const MotionLabel = motion.label;
const MotionSelect = motion.select;
const MotionOption = motion.option;
const MotionFieldset = motion.fieldset;
const MotionLegend = motion.legend;
const MotionTable = motion.table;
const MotionThead = motion.thead;
const MotionTbody = motion.tbody;
const MotionTr = motion.tr;
const MotionTh = motion.th;
const MotionTd = motion.td;
const MotionCaption = motion.caption;
const MotionColgroup = motion.colgroup;
const MotionCol = motion.col;
const MotionFigure = motion.figure;
const MotionFigcaption = motion.figcaption;
const MotionBlockquote = motion.blockquote;
const MotionCite = motion.cite;
const MotionCode = motion.code;
const MotionPre = motion.pre;
const MotionEm = motion.em;
const MotionStrong = motion.strong;
const MotionSmall = motion.small;
const MotionMark = motion.mark;
const MotionQ = motion.q;
const MotionS = motion.s;
const MotionSub = motion.sub;
const MotionSup = motion.sup;
const MotionTime = motion.time;
const MotionU = motion.u;
const MotionVar = motion.var;
const MotionWbr = motion.wbr;
const MotionBdi = motion.bdi;
const MotionBdo = motion.bdo;
const MotionData = motion.data;
const MotionMeter = motion.meter;
const MotionProgress = motion.progress;
const MotionOutput = motion.output;
const MotionCanvas = motion.canvas;
const MotionMap = motion.map;
const MotionArea = motion.area;
const MotionVideo = motion.video;
const MotionAudio = motion.audio;
const MotionSource = motion.source;
const MotionTrack = motion.track;
const MotionEmbed = motion.embed;
const MotionObject = motion.object;
const MotionParam = motion.param;
const MotionIns = motion.ins;
const MotionDel = motion.del;
const MotionDetails = motion.details;
const MotionSummary = motion.summary;
const MotionDialog = motion.dialog;
const MotionMenu = motion.menu;
const MotionCommand = motion.command;
const MotionKeygen = motion.keygen;

export {
  MotionDiv,
  MotionH1,
  MotionH2,
  MotionH3,
  MotionP,
  MotionSpan,
  MotionImg,
  MotionA,
  MotionButton,
  MotionSection,
  MotionArticle,
  MotionNav,
  MotionUl,
  MotionLi,
  MotionForm,
  MotionInput,
  MotionTextarea,
  MotionLabel,
  MotionSelect,
  MotionOption,
  MotionFieldset,
  MotionLegend,
  MotionTable,
  MotionThead,
  MotionTbody,
  MotionTr,
  MotionTh,
  MotionTd,
  MotionCaption,
  MotionColgroup,
  MotionCol,
  MotionFigure,
  MotionFigcaption,
  MotionBlockquote,
  MotionCite,
  MotionCode,
  MotionPre,
  MotionEm,
  MotionStrong,
  MotionSmall,
  MotionMark,
  MotionQ,
  MotionS,
  MotionSub,
  MotionSup,
  MotionTime,
  MotionU,
  MotionVar,
  MotionWbr,
  MotionBdi,
  MotionBdo,
  MotionData,
  MotionMeter,
  MotionProgress,
  MotionOutput,
  MotionCanvas,
  MotionMap,
  MotionArea,
  MotionVideo,
  MotionAudio,
  MotionSource,
  MotionTrack,
  MotionEmbed,
  MotionObject,
  MotionParam,
  MotionIns,
  MotionDel,
  MotionDetails,
  MotionSummary,
  MotionDialog,
  MotionMenu,
  MotionCommand,
  MotionKeygen
};

// Fade in animation
export const FadeIn = styled(motion.div)`
  width: 100%;
`;

FadeIn.defaultProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }
};

// Slide in from left
export const SlideInLeft = ({ children, delay = 0, duration = 0.5 }) => (
  <motion.div
    initial={{ opacity: 0, x: -100 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration, delay }}
  >
    {children}
  </motion.div>
);

// Slide in from right
export const SlideInRight = ({ children, delay = 0, duration = 0.5 }) => (
  <motion.div
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration, delay }}
  >
    {children}
  </motion.div>
);

// Scale animation
export const ScaleIn = styled(motion.div)`
  width: 100%;
`;

ScaleIn.defaultProps = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }
};

// Slide up animation
export const SlideUp = styled(motion.div)`
  width: 100%;
`;

SlideUp.defaultProps = {
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }
};

// Stagger container for children animations
export const StaggerContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xl);
  width: 100%;
`;

export const StaggerItem = styled(motion.div)`
  flex: 1;
  min-width: 300px;
`;

export const fadeInUp = {
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

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const staggerItem = {
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
};

// Hover scale animation
export const HoverScale = styled(motion.div)`
  width: 100%;
`;

HoverScale.defaultProps = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { duration: 0.2 }
};

// Scroll reveal animation
export const ScrollReveal = styled(motion.div)`
  width: 100%;
`;

// Text reveal animation
export const TextReveal = styled(motion.span)`
  display: inline-block;
  overflow: hidden;
`;

TextReveal.defaultProps = {
  initial: { y: "100%" },
  animate: { y: 0 },
  transition: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }
};

// Page transition wrapper
export const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

// Floating animation
export const FloatingElement = ({ children, duration = 3, y = 15 }) => (
  <motion.div
    animate={{
      y: [-y, y],
    }}
    transition={{
      duration,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }}
  >
    {children}
  </motion.div>
);

// Rotating animation
export const RotatingElement = ({ children, duration = 20 }) => (
  <motion.div
    animate={{
      rotate: 360
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "linear"
    }}
  >
    {children}
  </motion.div>
);

// Bounce animation
export const BounceElement = ({ children }) => (
  <motion.div
    whileHover={{
      scale: [1, 1.1, 1],
      transition: {
        duration: 0.2
      }
    }}
  >
    {children}
  </motion.div>
);

// Shake animation
export const ShakeElement = ({ children }) => (
  <motion.div
    whileHover={{
      x: [-2, 2, -2, 2, 0],
      transition: {
        duration: 0.3
      }
    }}
  >
    {children}
  </motion.div>
);

// Pulse animation
export const PulseElement = ({ children }) => (
  <motion.div
    animate={{
      scale: [1, 1.05, 1],
      opacity: [1, 0.8, 1]
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    {children}
  </motion.div>
); 