import React from 'react';
import {
  Typography,
  Box,
  Divider,
  Button,
  IconButton,
} from '@mui/material';
import { Share, Favorite } from '@mui/icons-material';

const InfoSidebar = ({ evento }) => {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Informações
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" color="textSecondary">
          Data e Horário
        </Typography>
        <Typography variant="body1">
          {evento.data} às {evento.horario}
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" color="textSecondary">
          Local
        </Typography>
        <Typography variant="body1">
          {evento.local}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {evento.endereco}
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" color="textSecondary">
          Organizador
        </Typography>
        <Typography variant="body1">
          {evento.organizador}
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          {evento.preco}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {evento.ingressosDisponiveis} ingressos disponíveis
        </Typography>
      </Box>

      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        sx={{ mb: 2 }}
      >
        Comprar Ingresso
      </Button>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <IconButton color="primary">
          <Share />
        </IconButton>
        <IconButton color="primary">
          <Favorite />
        </IconButton>
      </Box>
    </>
  );
};

export default InfoSidebar;