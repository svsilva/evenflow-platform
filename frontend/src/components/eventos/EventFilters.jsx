import React from 'react';
import {
  Grid,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import { Search, FilterList } from '@mui/icons-material';

const EventFilters = ({ filtros, handleFiltroChange, categorias, cidades }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Buscar eventos"
          name="busca"
          value={filtros.busca}
          onChange={handleFiltroChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} md={2}>
        <FormControl fullWidth>
          <InputLabel>Categoria</InputLabel>
          <Select
            name="categoria"
            value={filtros.categoria}
            onChange={handleFiltroChange}
            label="Categoria"
          >
            <MenuItem value="">Todas</MenuItem>
            {categorias.map((categoria) => (
              <MenuItem key={categoria} value={categoria}>
                {categoria}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={2}>
        <FormControl fullWidth>
          <InputLabel>Cidade</InputLabel>
          <Select
            name="cidade"
            value={filtros.cidade}
            onChange={handleFiltroChange}
            label="Cidade"
          >
            <MenuItem value="">Todas</MenuItem>
            {cidades.map((cidade) => (
              <MenuItem key={cidade} value={cidade}>
                {cidade}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={2}>
        <TextField
          fullWidth
          label="Data"
          name="data"
          type="date"
          value={filtros.data}
          onChange={handleFiltroChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={12} md={2}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<FilterList />}
          sx={{ height: '100%' }}
        >
          Mais Filtros
        </Button>
      </Grid>
    </Grid>
  );
};

export default EventFilters;