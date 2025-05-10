import React from 'react';
import { Typography, Box } from '@mui/material';

const BenefitsSection = () => {
  return (
    <Box sx={{ mt: 6, textAlign: 'center' }}>
      <Typography variant="h2" component="h2" gutterBottom>
        Por que escolher o EvenFlow?
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 4 }}>
        <Box>
          <Typography variant="h5" gutterBottom>
            Eventos Exclusivos
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Acesso aos melhores eventos culturais e artísticos
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5" gutterBottom>
            Ingressos Garantidos
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Sistema seguro de compra e entrega de ingressos
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5" gutterBottom>
            Experiência Premium
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Atendimento personalizado e suporte 24/7
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default BenefitsSection;