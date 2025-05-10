import React from 'react';
import { Box } from '@mui/material';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';

const Main = styled.main`
  min-height: calc(100vh - 64px);
  padding: 2rem;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Main>
        <div className="container">
          {children}
        </div>
      </Main>
      <Footer />
    </Box>
  );
};

export default Layout; 