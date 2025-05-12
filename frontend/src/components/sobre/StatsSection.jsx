import React from 'react';
import { Typography, Grid } from '@mui/material';

const StatsSection = () => {
  const stats = [
    { value: '1000+', label: 'Eventos Realizados' },
    { value: '50k+', label: 'Usuários Ativos' },
    { value: '98%', label: 'Satisfação dos Usuários' },
  ];

  return (
    <>
      <Typography variant="h4" gutterBottom align="center">
        Números que nos orgulham
      </Typography>
      <Grid container spacing={4} sx={{ mt: 2 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Typography variant="h2" color="primary">
              {stat.value}
            </Typography>
            <Typography variant="h6">
              {stat.label}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default StatsSection;