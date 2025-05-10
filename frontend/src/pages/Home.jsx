import React from 'react';
import { Typography, Card, CardContent, CardMedia, Button, Box } from '@mui/material';
import Slider from 'react-slick';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroSection = styled.section`
  margin-bottom: 4rem;
`;

const EventCard = styled(Card)`
  margin: 1rem;
  background-color: ${({ theme }) => theme.palette.background.paper};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const StyledSlider = styled(Slider)`
  .slick-dots {
    bottom: -40px;
  }

  .slick-dots li button:before {
    color: ${({ theme }) => theme.palette.primary.main};
  }

  .slick-dots li.slick-active button:before {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;

const Home = () => {
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

  // Dados mockados para exemplo
  const eventos = [
    {
      id: 1,
      titulo: 'Festival de Música',
      imagem: 'https://source.unsplash.com/random/800x600/?concert',
      data: '15/06/2024',
      local: 'Parque da Cidade',
      preco: 'R$ 150,00'
    },
    {
      id: 2,
      titulo: 'Exposição de Arte',
      imagem: 'https://source.unsplash.com/random/800x600/?art',
      data: '20/06/2024',
      local: 'Museu de Arte Moderna',
      preco: 'R$ 50,00'
    },
    {
      id: 3,
      titulo: 'Teatro Clássico',
      imagem: 'https://source.unsplash.com/random/800x600/?theater',
      data: '25/06/2024',
      local: 'Teatro Municipal',
      preco: 'R$ 80,00'
    },
    {
      id: 4,
      titulo: 'Festival Gastronômico',
      imagem: 'https://source.unsplash.com/random/800x600/?food',
      data: '30/06/2024',
      local: 'Centro de Eventos',
      preco: 'R$ 120,00'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection>
        <Typography variant="h1" component="h1" gutterBottom>
          Descubra Eventos Incríveis
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph>
          Encontre os melhores eventos culturais e artísticos da sua cidade
        </Typography>
      </HeroSection>

      <section>
        <Typography variant="h2" component="h2" gutterBottom>
          Eventos em Destaque
        </Typography>
        
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
      </section>

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
    </motion.div>
  );
};

export default Home; 