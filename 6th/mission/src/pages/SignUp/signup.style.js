import styled from "styled-components";

export const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding: 100px;
`;

export const SignupWrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.125);
  padding: 40px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

export const SignupTitle = styled.h1`
  color: white;
  text-align: center;
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: 600;
`;

export const Form = styled.form`
  width: 100%;
  border-radius: 8px;
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
  }
`;
