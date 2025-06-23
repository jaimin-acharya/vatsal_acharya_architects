import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { Services } from './pages/Services';
import { Contact } from './pages/Contact';
import { ProjectDetail } from './pages/ProjectDetail';
import { ScrollToTopOnMount, ScrollToTopButton } from './components/ScrollToTop';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import VatsalLoader from './components/VatsalLoader';

const theme = {
  colors: {
    primary: 'var(--bg-primary)',
    secondary: 'var(--bg-secondary)',
    tertiary: 'var(--bg-tertiary)',
    text: {
      primary: 'var(--text-primary)',
      secondary: 'var(--text-secondary)',
      tertiary: 'var(--text-tertiary)',
    },
    accent: {
      main: 'var(--accent)',
      dark: 'var(--accent-dark)',
      light: 'var(--accent-light)',
    },
  },
  spacing: {
    xs: 'var(--spacing-xs)',
    sm: 'var(--spacing-sm)',
    md: 'var(--spacing-md)',
    lg: 'var(--spacing-lg)',
    xl: 'var(--spacing-xl)',
  },
  borderRadius: {
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    full: 'var(--radius-full)',
  },
  transitions: {
    fast: 'var(--transition-fast)',
    normal: 'var(--transition-normal)',
    slow: 'var(--transition-slow)',
  },
};

const MainContent = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-top: var(--header-height);
  background: var(--bg-primary);
  overflow-x: hidden;
`;

const PageTransition = styled.div`
  position: relative;
  width: 100%;
  min-height: calc(100vh - var(--header-height));
  display: flex;
  flex-direction: column;
`;

const AppContainer = styled.div`
  // ... existing styles ...
`;

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AnimatePresence mode="wait">
          {loading ? (
            <VatsalLoader />
          ) : (
            <AppContainer>
              <GlobalStyle />
              <ScrollToTopOnMount />
              <Header />
              <MainContent>
                <AnimatePresence mode="wait">
                  <PageTransition>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/projects" element={<Projects />} />
                      <Route path="/projects/:projectUrl" element={<ProjectDetail />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/contact" element={<Contact />} />
                    </Routes>
                  </PageTransition>
                </AnimatePresence>
              </MainContent>
              <Footer />
              <ScrollToTopButton />
            </AppContainer>
          )}
        </AnimatePresence>
      </Router>
    </ThemeProvider>
  );
}

export default App;