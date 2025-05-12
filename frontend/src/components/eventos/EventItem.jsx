import React from 'react';
import {
  Typography,
  Chip,
  Box,
  Button,
  CardMedia,
} from '@mui/material';
import { CalendarToday, LocationOn } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { EventCard, CardContentWrapper } from '../../styles/components/eventosStyle';

const EventItem = ({ evento }) => {
  return (
    <EventCard>
      <CardMedia
        component="img"
        height="200"
        image={evento.imagem}
        alt={evento.titulo}
      />
      <CardContentWrapper>
        <Chip
          label={evento.categoria}
          color="primary"
          size="small"
          sx={{ alignSelf: 'flex-start', mb: 1 }}
        />
        <Typography variant="h5" component="h2" gutterBottom>
          {evento.titulo}
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          {evento.descricao}
        </Typography>
        <Box sx={{ mt: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <CalendarToday sx={{ mr: 1, fontSize: 20 }} />
            <Typography variant="body2">
              {evento.data}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <LocationOn sx={{ mr: 1, fontSize: 20 }} />
            <Typography variant="body2">
              {evento.local}, {evento.cidade}
            </Typography>
          </Box>
          <Typography variant="h6" color="primary" gutterBottom>
            {evento.preco}
          </Typography>
          <Button
            component={RouterLink}
            to={`/evento/${evento.id}`}
            variant="contained"
            color="primary"
            fullWidth
          >
            Ver Detalhes
          </Button>
        </Box>
      </CardContentWrapper>
    </EventCard>
  );
};

export default EventItem;