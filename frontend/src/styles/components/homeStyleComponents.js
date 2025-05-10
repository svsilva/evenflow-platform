import styled from 'styled-components';
import { Card } from '@mui/material';
import Slider from 'react-slick';

export const HeroSection = styled.section`
  margin-bottom: 4rem;
`;

export const EventCard = styled(Card)`
  margin: 1rem;
  background-color: ${({ theme }) => theme.palette.background.paper};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const StyledSlider = styled(Slider)`
  .slick-dots {
    bottom: -40px;
  }

  .slick-dots li button:before {
    color: ${({ theme }) => theme.palette.primary.main};
  }

  .slick-dots li.slick-active button:before {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;