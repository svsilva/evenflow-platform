import React, { useState } from 'react';
import { Typography, Grid, Box } from '@mui/material';
import { motion } from 'framer-motion';
import EventFilters from '../components/eventos/EventFilters';
import EventItem from '../components/eventos/EventItem';

const Eventos = () => {
  const [filtros, setFiltros] = useState({
    busca: '',
    categoria: '',
    data: '',
    cidade: '',
  });

  // Dados mockados para exemplo
  const eventos = [
    {
      id: 1,
      titulo: 'Festival de Música',
      descricao: 'Um festival incrível com as melhores bandas nacionais e internacionais.',
      imagem: 'https://source.unsplash.com/random/800x600/?concert',
      data: '15/06/2024',
      local: 'Parque da Cidade',
      cidade: 'São Paulo',
      categoria: 'Música',
      preco: 'R$ 150,00',
    },
    // ... outros eventos
  ];

  const categorias = ['Música', 'Arte', 'Teatro', 'Gastronomia', 'Dança', 'Cinema'];
  const cidades = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Salvador', 'Recife'];

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Typography variant="h1" component="h1" gutterBottom>
        Eventos
      </Typography>

      <Box sx={{ mb: 4 }}>
        <EventFilters
          filtros={filtros}
          handleFiltroChange={handleFiltroChange}
          categorias={categorias}
          cidades={cidades}
        />
      </Box>

      <Grid container spacing={3}>
        {eventos.map((evento) => (
          <Grid item xs={12} sm={6} md={4} key={evento.id}>
            <EventItem evento={evento} />
          </Grid>
        ))}
      </Grid>
    </motion.div>
  );
};

export default Eventos;