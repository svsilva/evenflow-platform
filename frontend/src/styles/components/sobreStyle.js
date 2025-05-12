import styled from 'styled-components';
import { Paper, Box } from '@mui/material';

export const FeatureCard = styled(Paper)`
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: ${({ theme }) => theme.palette.background.paper};
  transition: transform 0.3s ease;
  border-radius: 12px;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const IconWrapper = styled(Box)`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: white;
`;

export const FeaturesContainer = styled(Box)`
  padding: 2rem 0;
`;