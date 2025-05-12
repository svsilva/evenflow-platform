import React from 'react';
import { Typography, Button, Box } from '@mui/material';

const CallToAction = () => {
  return (
    <>
      <Typography variant="h4" gutterBottom align="center">
        Junte-se a nós
      </Typography>
      <Typography variant="body1" paragraph align="center">
        Seja você um organizador de eventos, artista ou amante da cultura,
        o EvenFlow é o lugar ideal para você.
      </Typography>
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ mr: 2 }}
        >
          Criar Conta
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
        >
          Saiba Mais
        </Button>
      </Box>
    </>
  );
};

export default CallToAction;