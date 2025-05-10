import React from 'react';
import { Typography, CardContent, CardMedia, Button } from '@mui/material';
import { StyledSlider, EventCard } from '../../styles/components/homeStyle';
import  { eventos } from '../../data/eventos';

const EventSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <StyledSlider {...settings}>
      {eventos.map((evento) => (
        <EventCard key={evento.id}>
          <CardMedia
            component="img"
            height="200"
            image={evento.imagem}
            alt={evento.titulo}
          />
          <CardContent>
            <Typography variant="h6" component="h3" gutterBottom>
              {evento.titulo}
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              {evento.data} • {evento.local}
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
              {evento.preco}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
            >
              Comprar Ingresso
            </Button>
          </CardContent>
        </EventCard>
      ))}
    </StyledSlider>
  );
};

export default EventSlider;