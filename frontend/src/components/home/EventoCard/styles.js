import styled from 'styled-components';
import { Card } from '@mui/material';

export const EventCard = styled(Card)`
    margin: 1rem;
    background-color: ${({ theme }) => theme.palette.background.paper};
    transition: transform 0.3s ease;

    &hover{
        transform: translateY(-5px);
    }
`;