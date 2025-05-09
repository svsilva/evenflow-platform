import { createTheme } from '@mui/material/styles';
import { colors } from './colors';

export const darkTheme = createTheme({
    palette:{
        mode: 'dark',
        primary: { ...colors.primary },
        secondary: { ...colors.secondary },
        background: { ...colors.background },
        text: { ...colors.text },
        error: { main: colors.error },
        success: { main: colors.success},
        warning: { main: colors.warning }
    },
});