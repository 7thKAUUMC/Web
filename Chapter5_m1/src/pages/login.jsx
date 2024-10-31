import styled from "styled-components";
import { useState } from "react";
import useForm from "../hooks/useForm";
import { validateLogin } from "../utils/validate";

const LoginPage = () => {
  const login = useForm({
    initialValue: {
      email: '',
      password: '',
    },
    validate: validateLogin,
  });

  const handlePressLogin = () => {
    console.log(login.values.email, login.values.password);
  };

  return (
    <Container>
      <LoginTitle>로그인</LoginTitle>

      <Form>
        <InputWrapper>
          <Input
            error={login.touched.email && login.errors.email}
            type="email"
            placeholder="이메일을 입력해주세요"
            {...login.getTextInputProps('email')}
          />
          {login.touched.email && login.errors.email && (
            <ErrorText>{login.errors.email}</ErrorText>
          )}
        </InputWrapper>

        <InputWrapper>
          <Input
            error={login.touched.password && login.errors.password}
            type="password"
            placeholder="비밀번호를 입력해주세요"
            {...login.getTextInputProps('password')}
          />
          {login.touched.password && login.errors.password && (
            <ErrorText>{login.errors.password}</ErrorText>
          )}
        </InputWrapper>

        <LoginButton onClick={handlePressLogin} disabled={!login.isValid}>
          로그인
        </LoginButton>
      </Form>
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const LoginTitle = styled.h1`
  text-align: center;
  margin-top: 100px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const InputWrapper = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  height: 44px;
  border: ${props => (props.error ? '2px solid red' : '1px solid #212121')};
  border-radius: 4px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${props => (props.error ? 'red' : '#007bff')};
  }
`;

const ErrorText = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const LoginButton = styled.button`
  padding: 10px;
  margin-top: 10px;
  height: 44px;
  font-size: 15px;
  width: 100%;
  color: white;
  border: none;
  border-radius: 4px;
  background-color: #ff007f;
`;