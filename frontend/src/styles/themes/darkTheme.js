import { createTheme } from '@mui/material/styles';
import { colors } from './colors';
import { typography } from './typography';

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
    typography:{
        ...typography
    },
    shape:{
        borderRadius: 8
    },
    components:{
        MuiButton:{
            styleOverrides:{
                root:{
                    borderRadius: 8,
                    padding: '10px 24px',
                    textTransform: 'none',
                    fontWeight: 600
                },
                contained:{
                    boxShadow: 'none',
                    '&:hover':{
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)'
                    }
                }
            }
        },
        MuiTextField:{
            styleOverrides:{
                root:{
                    '& .MuiOutlinedInput-root':{
                        borderRadius: 8
                    }
                }
            }
        }
    }
});