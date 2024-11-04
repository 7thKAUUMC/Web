import React from 'react';

function Button({ onClick, children }) {
  return (
    <button className="todo-button" onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
