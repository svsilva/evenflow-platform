import React from 'react';
import { Typography } from '@mui/material';
import { FeatureCard, IconWrapper } from '../../styles/components/sobreStyle';

const FeatureCardComponent = ({ icon, title, description }) => {
  return (
    <FeatureCard elevation={3}>
      <IconWrapper>
        {icon}
      </IconWrapper>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {description}
      </Typography>
    </FeatureCard>
  );
};

export default FeatureCardComponent;