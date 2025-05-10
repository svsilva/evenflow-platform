import React from 'react';
import { Typography, Box, Grid, Container } from '@mui/material';
import {
  Event,
  Security,
  Support,
  TrendingUp,
  People,
  EmojiEvents,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { FeaturesContainer } from '../styles/components/sobreStyle';
import FeatureCard from '../components/sobre/FeatureCard';
import StatsSection from '../components/sobre/StatsSection';
import CallToAction from '../components/sobre/CallToAction';

const Sobre = () => {
  const features = [
    {
      icon: <Event sx={{ fontSize: 40 }} />,
      title: 'Eventos Exclusivos',
      description: 'Acesso a eventos únicos e exclusivos em todo o Brasil.',
    },
    {
      icon: <Security sx={{ fontSize: 40 }} />,
      title: 'Segurança Garantida',
      description: 'Sistema seguro para compra e entrega de ingressos.',
    },
    {
      icon: <Support sx={{ fontSize: 40 }} />,
      title: 'Suporte 24/7',
      description: 'Atendimento personalizado disponível a qualquer momento.',
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      title: 'Crescimento Constante',
      description: 'Nova plataforma com foco em inovação e qualidade.',
    },
    {
      icon: <People sx={{ fontSize: 40 }} />,
      title: 'Comunidade Ativa',
      description: 'Conectamos pessoas através da cultura e arte.',
    },
    {
      icon: <EmojiEvents sx={{ fontSize: 40 }} />,
      title: 'Experiência Premium',
      description: 'Oferecemos a melhor experiência em eventos culturais.',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="lg">
        <Box sx={{ my: 8, textAlign: 'center' }}>
          <Typography variant="h1" component="h1" gutterBottom>
            Sobre o EvenFlow
          </Typography>
          <Typography variant="h5" color="textSecondary" paragraph>
            Transformando a experiência de eventos culturais no Brasil
          </Typography>
        </Box>

        <Box sx={{ my: 8 }}>
          <Typography variant="h4" gutterBottom>
            Nossa Missão
          </Typography>
          <Typography variant="body1" paragraph>
            O EvenFlow nasceu com o objetivo de revolucionar a forma como as pessoas
            descobrem, compram e vivenciam eventos culturais.
          </Typography>
          {/* ... outros parágrafos */}
        </Box>

        <FeaturesContainer>
          <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
            Por que escolher o EvenFlow?
          </Typography>
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              </Grid>
            ))}
          </Grid>
        </FeaturesContainer>

        <Box sx={{ my: 8 }}>
          <CallToAction />
        </Box>

        <Box sx={{ my: 8 }}>
          <StatsSection />
        </Box>
      </Container>
    </motion.div>
  );
};

export default Sobre;