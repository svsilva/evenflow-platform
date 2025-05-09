import React from 'react';
import { CardMedia, CardContent, Typography, Button } from '@mui/material';
import { EventCard } from './styles';

const EventoCard = ({ evento }) => (
    <EventCard>
        <CardMedia
            component="img"
            height="200"
            image={evento.imagem}
            alt={evento.titulo}
        />
        <CardContent>
            <Typography variant="h6" component="h3" gutterBottom>{evento.titulo}</Typography>
            <Typography variant="body2" color="textSecondary" paragraph>{evento.data} • {evento.local}</Typography>
            <Typography variant="h6" color="primary" gutterBottom>{evento.preco}</Typography>
            <Button variant="contained" color="primary">Comprar Ingresso</Button>
        </CardContent>
    </EventCard>
);

export default EventoCard;