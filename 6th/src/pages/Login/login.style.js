import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding: 200px;
`;

export const LoginWrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.125);
  padding: 40px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

export const LoginTitle = styled.h1`
  color: white;
  text-align: center;
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: 600;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem; /* 필드 간격 */
`;

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

export const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: ${(props) => (props.isValid ? "#ff1b6d" : "gray")};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: ${(props) => (props.isValid ? "pointer" : "not-allowed")};

  &:hover {
    background-color: ${(props) => (props.isValid ? "#ff2c7f" : "#cccccc")};
    ${(props) =>
      props.isValid &&
      `
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    `}
  }
`;
