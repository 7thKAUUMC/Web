import React from 'react';

function Input({ value, onChange }) {
  return (
    <input 
      className="todo-input"
      type="text"
      value={value}
      onChange={onChange}
    />
  );
}

export default Input;
