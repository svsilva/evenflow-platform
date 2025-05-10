import styled from 'styled-components';
import { Paper, Button } from '@mui/material';

export const AuthContainer = styled(Paper)`
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: ${({ theme }) => theme.palette.background.paper};
`;

export const SocialButton = styled(Button)`
  width: 100%;
  margin-bottom: 1rem;
  text-transform: none;
  font-size: 1rem;
`;