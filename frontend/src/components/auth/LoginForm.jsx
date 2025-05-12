import React, { useState } from 'react';
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const LoginForm = ({ onSubmit, onForgotPassword }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="E-mail"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        margin="normal"
        required
      />

      <TextField
        fullWidth
        label="Senha"
        name="senha"
        type={showPassword ? 'text' : 'password'}
        value={formData.senha}
        onChange={handleInputChange}
        margin="normal"
        required
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        sx={{ mt: 3, mb: 2 }}
      >
        Entrar
      </Button>

      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="textSecondary">
          Esqueceu sua senha?{' '}
          <Button color="primary" onClick={onForgotPassword}>
            Recuperar
          </Button>
        </Typography>
      </Box>
    </form>
  );
};

export default LoginForm;