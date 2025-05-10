import React from 'react';
import { Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { HeroSection } from '../styles/components/homeStyleComponents';
import EventSlider from '../components/home/EventSlider';
import BenefitsSection from '../components/home/BenefitsSection';

const Home = () => {

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
        <EventSlider eventos={eventos} />
      </section>

      <BenefitsSection />
    </motion.div>
  );
};

export default Home; 