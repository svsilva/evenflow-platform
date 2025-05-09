import React from 'react';
import { Typography, Box } from '@mui/material';
import Slider from 'react-slick';

import { eventos } from '../data/eventos';
import EventoCard from '../components/home/EventoCard';
//import { HeroSection, StyledSlider } from '../components';

const Home = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive:[
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 600, settings: { slidesToShow: 1 } },
        ]
    }
};

