import React from "react";
import { StyledButton } from "./button.style.js";

function Button({ onClick, children, disabled }) {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
}

export default Button;
