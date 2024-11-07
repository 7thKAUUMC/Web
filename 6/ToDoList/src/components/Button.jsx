// src/components/Button.jsx
import React from 'react';

const Button = ({ onClick, label, type = 'button', className = '' }) => {
  return (
    <button onClick={onClick} type={type} className={className}>
      {label}
    </button>
  );
};

export default Button;
