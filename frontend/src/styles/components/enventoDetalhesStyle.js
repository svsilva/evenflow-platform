import styled from 'styled-components';
import { Paper } from '@mui/material';

export const HeroImage = styled.div`
  width: 100%;
  height: 400px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  position: relative;
  margin-bottom: 2rem;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7));
  }
`;

export const InfoSection = styled(Paper)`
  padding: 2rem;
  background-color: ${({ theme }) => theme.palette.background.paper};
  margin-bottom: 2rem;
`;