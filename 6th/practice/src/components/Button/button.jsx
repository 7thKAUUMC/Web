import React from "react";
import { StyledButton } from "./button.style.js";

function Button({ onClick, children }) {
  return <StyledButton>{children}</StyledButton>;
}

export default Button;
