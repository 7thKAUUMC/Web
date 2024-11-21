import React from "react";
import { StyledInput } from "./input.style";

function Input({ value, onChange, placeholder }) {
  return (
    <StyledInput
      className="input"
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

export default Input;
