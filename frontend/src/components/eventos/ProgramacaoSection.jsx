import React from 'react';
import { Typography, Box, Divider, Chip } from '@mui/material';
import { AccessTime } from '@mui/icons-material';

const ProgramacaoSection = ({ evento }) => {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Sobre o Evento
      </Typography>
      <Typography variant="body1" paragraph>
        {evento.descricao}
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        {evento.categorias.map((categoria) => (
          <Chip
            key={categoria}
            label={categoria}
            color="primary"
            variant="outlined"
          />
        ))}
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        Programação
      </Typography>
      {evento.programacao.map((item, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2,
            p: 2,
            backgroundColor: 'background.elevated',
            borderRadius: 1,
          }}
        >
          <AccessTime sx={{ mr: 2 }} />
          <Typography variant="body1" sx={{ mr: 2 }}>
            {item.horario}
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {item.artista}
          </Typography>
        </Box>
      ))}
    </>
  );
};

export default ProgramacaoSection;