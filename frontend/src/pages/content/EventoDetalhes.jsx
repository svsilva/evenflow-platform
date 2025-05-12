import React from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { InfoSection } from '../../styles/components/enventoDetalhesStyle';
import HeroHeader from '../../components/eventos/HeroHeader';
import ProgramacaoSection from '../../components/eventos/ProgramacaoSection';
import InfoSidebar from '../../components/eventos/InfoSidebar';

// Mover esses dados para src/data/mockData.js
const mockEvento = {
  id: 1,
  titulo: 'Festival de Música',
  descricao: 'Um festival incrível com as melhores bandas nacionais e internacionais.',
  imagem: 'https://source.unsplash.com/random/1920x1080/?concert',
  data: '15/06/2024',
  horario: '19:00',
  local: 'Parque da Cidade',
  endereco: 'Av. Principal, 1000 - Centro',
  cidade: 'São Paulo',
  estado: 'SP',
  categorias: ['Música', 'Festival', 'Ao Vivo'],
  preco: 'R$ 150,00',
  ingressosDisponiveis: 500,
  organizador: 'Empresa de Eventos',
  programacao: [
    { horario: '19:00', artista: 'Banda A' },
    { horario: '20:30', artista: 'Banda B' },
    { horario: '22:00', artista: 'Banda C' },
  ]
};

const EventoDetalhes = () => {
  const { id } = useParams();
  // Em uma aplicação real, você buscaria os dados do evento pelo id
  const evento = mockEvento;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroHeader evento={evento} />

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <InfoSection>
            <ProgramacaoSection evento={evento} />
          </InfoSection>
        </Grid>

        <Grid item xs={12} md={4}>
          <InfoSection>
            <InfoSidebar evento={evento} />
          </InfoSection>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default EventoDetalhes;