import React from 'react';
import { Container } from '@chakra-ui/core';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';

import ErrorBoundary from './components/error-boundary';
import Navbar from './components/navbar';
import Bookmarks from './pages/bookmarks';
import AppBar from './components/app-bar';

const queryCache = new QueryCache();

function AuthenticatedApp() {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <ErrorBoundary>
        <Router>
          <Navbar>
            <AppBar />
          </Navbar>

          <Container px={0} py={8} maxW={{ sm: '95%', md: '85%' }}>
            <Routes>
              <Route path="/" element={<Bookmarks />} />
              <Route path="*" element={<div>not found</div>} />
            </Routes>
          </Container>
        </Router>
      </ErrorBoundary>
      <ReactQueryDevtools position="bottom-right" initialIsOpen={false} />
    </ReactQueryCacheProvider>
  );
}

export default AuthenticatedApp;
