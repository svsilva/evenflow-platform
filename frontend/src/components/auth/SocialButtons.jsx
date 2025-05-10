import React from 'react';
import { Google, Facebook } from '@mui/icons-material';
import { SocialButton } from '../../styles/components/authStyleComponents';

const SocialAuthButtons = ({ onSocialLogin }) => {
  return (
    <>
      <SocialButton
        variant="outlined"
        startIcon={<Google />}
        onClick={() => onSocialLogin('google')}
      >
        Continuar com Google
      </SocialButton>

      <SocialButton
        variant="outlined"
        startIcon={<Facebook />}
        onClick={() => onSocialLogin('facebook')}
      >
        Continuar com Facebook
      </SocialButton>
    </>
  );
};

export default SocialAuthButtons;