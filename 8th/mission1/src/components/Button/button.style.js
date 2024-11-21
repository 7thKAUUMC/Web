import styled from "styled-components";

export const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#111")};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#ccc" : "#e01961")};
  }
`;
