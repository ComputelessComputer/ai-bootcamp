import React from 'react';

// Example Button component
export interface ButtonProps {
  text: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary';
}

export const Button: React.FC<ButtonProps> = ({ 
  text, 
  onClick, 
  variant = 'primary' 
}) => {
  return React.createElement(
    'button',
    { 
      onClick,
      className: `ai-bootcamp-button ai-bootcamp-button-${variant}`
    },
    text
  );
};

// Export components
export * from './components/Button';
