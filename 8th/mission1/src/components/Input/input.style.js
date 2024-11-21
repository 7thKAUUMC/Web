import styled from "styled-components";

export const StyledInput = styled.input`
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border-color: #22a6b3;
    outline: none;
  }
`;
