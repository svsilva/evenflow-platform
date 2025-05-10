import React from 'react';
import { Typography, Box, Chip } from '@mui/material';
import { CalendarToday, LocationOn } from '@mui/icons-material';
import { HeroImage } from '../../styles/components/enventoDetalhesStyle';

const HeroHeader = ({ evento }) => {
  return (
    <HeroImage image={evento.imagem}>
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '2rem',
          zIndex: 1,
        }}
      >
        <Typography variant="h1" color="white" gutterBottom>
          {evento.titulo}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Chip
            icon={<CalendarToday />}
            label={evento.data}
            sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
          />
          <Chip
            icon={<LocationOn />}
            label={`${evento.cidade} - ${evento.estado}`}
            sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
          />
        </Box>
      </Box>
    </HeroImage>
  );
};

export default HeroHeader;