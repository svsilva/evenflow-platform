import styled from 'styled-components';
import { Slider } from 'react-slick';

const HeroSection = styled.section`
    margin-bottom: 4rem;
`;

const StyledSlider = styled(Slider)`
    .slick-dots{
        bottom: -40px;
    }
    .slick-dots li button:before{
        color: ${({ theme }) => theme.palette.primary.main};
    }
    .slick-dots li.slick-active button:before{
        color: ${({ theme }) => theme.palette.primary.main};
    }        
`;
