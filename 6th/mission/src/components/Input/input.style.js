import styled from "styled-components";

export const Input = styled.input`
  width: 90%;
  padding: 12px 15px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid
    ${(props) => (props.error ? "#ff4d4f" : "rgba(255, 255, 255, 0.3)")};
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 16px;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
    border-color: ${(props) => (props.error ? "#ff4d4f" : "#6a7adf")};
    box-shadow: 0 0 0 2px
      ${(props) =>
        props.error ? "rgba(255, 77, 79, 0.2)" : "rgba(106, 122, 223, 0.2)"};
  }
`;

export const ErrorMessage = styled.p`
  color: #ff4d4f;
  margin: -15px 0 15px;
  font-size: 12px;
  text-align: left;
`;
