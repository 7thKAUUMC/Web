// src/components/Input.jsx
import React from 'react';

const Input = ({ value, onChange, placeholder = '', defaultValue = '' }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      defaultValue={defaultValue}
    />
  );
};

export default Input;
