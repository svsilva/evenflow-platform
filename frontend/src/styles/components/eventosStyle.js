import styled from 'styled-components';
import { Card, CardContent } from '@mui/material';

export const EventCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const CardContentWrapper = styled(CardContent)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;