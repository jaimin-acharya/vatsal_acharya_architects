import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    /* Dark mode colors */
    --bg-primary: #0A0A0A;
    --bg-secondary:rgb(7, 7, 7);
    --bg-tertiary: #1A1A1A;
    --text-primary: #FFFFFF;
    --text-secondary: rgba(255, 255, 255, 0.85);
    --text-tertiary: rgba(255, 255, 255, 0.65);
    --accent: #c9a87c;
    --accent-dark: #FFC107;
    --accent-light: #FFE082;
    --border: rgba(255, 255, 255, 0.08);
    --header-height: 80px;
    --shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    --shadow-hover: 0 8px 30px rgba(0, 0, 0, 0.4);
    
    /* Spacing */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    
    /* Border radius */
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
    --radius-full: 9999px;
    
    /* Transitions */
    --transition-fast: 0.2s ease;
    --transition-normal: 0.3s ease;
    --transition-slow: 0.5s ease;
    
    /* Performance optimizations */
    --gpu: translate3d(0, 0, 0);
    --smooth-shadow: 0 10px 30px -10px;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
    height: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    scroll-padding-top: var(--header-height);
    
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }

  html, body {
    height: 100%;
    overflow-x: hidden;
    text-rendering: optimizeLegibility;
    -webkit-tap-highlight-color: transparent;
  }

  body {
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: var(--bg-primary);
    color: var(--text-primary);
    line-height: 1.5;
    min-height: 100vh;
    position: relative;
    transition: background-color 0.3s ease;
    
    &.no-scroll {
      overflow: hidden;
      touch-action: none;
    }
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
    isolation: isolate;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.2;
    color: var(--text-primary);
    margin: 0;
  }

  h1 {
    font-size: clamp(2rem, 5vw, 3rem);
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
  }

  h2 {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    margin-bottom: 0.875rem;
    letter-spacing: -0.02em;
  }

  h3 {
    font-size: clamp(1.25rem, 3vw, 2rem);
    margin-bottom: 0.75rem;
    letter-spacing: -0.01em;
  }

  p {
    margin-bottom: 1rem;
    color: var(--text-secondary);
  }

  a {
    color: var(--accent);
    text-decoration: none;
    transition: all 0.2s ease;
    outline: none;

    &:hover {
      color: var(--accent-dark);
    }

    &:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 2px;
    }
  }

  button {
    font-family: inherit;
    cursor: pointer;
    background: none;
    border: none;
    color: inherit;
    outline: none;

    &:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 2px;
    }
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
    user-select: none;
  }

  ::selection {
    background: var(--accent);
    color: var(--bg-primary);
  }

  /* Smooth scrolling for anchor links */
  a[href^="#"] {
    scroll-behavior: smooth;
  }

  /* Custom scrollbar */
  
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--bg-secondary);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--accent);
    border-radius: 4px;
    
    &:hover {
      background: var(--accent-dark);
    }
  }

  /* Firefox scrollbar */
  * {
    scrollbar-width: thin;
    scrollbar-color: var(--accent) var(--bg-secondary);
  }

  /* Prevent text selection during animations */
  .animating {
    user-select: none;
    pointer-events: none;
  }

  /* Ensure proper stacking context for animations */
  .page-transition {
    position: relative;
    z-index: 1;
    will-change: transform, opacity;
  }

  /* Container styles */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;

    @media (max-width: 768px) {
      padding: 0 1rem;
    }
  }

  /* Section styles */
  section {
    position: relative;
    background-color: var(--bg-primary);
    padding: 4rem 0;
    
    &:nth-child(even) {
      background-color: var(--bg-secondary);
    }

    @media (max-width: 768px) {
      padding: 3rem 0;
    }
  }

  /* Card styles */
  .card {
    background-color: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 8px;
    transition: all 0.3s ease;
    transform: translateZ(0);
    backface-visibility: hidden;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: var(--smooth-shadow);
      border-color: var(--accent);
    }
  }

  /* Fixed element styles */
  .fixed-element {
    position: fixed;
    z-index: 1000;
    transform: var(--gpu);
  }

  /* Responsive images */
  img {
    object-fit: cover;
    font-family: 'object-fit: cover'; /* IE polyfill */
  }

  /* Reduced motion preferences */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`; 