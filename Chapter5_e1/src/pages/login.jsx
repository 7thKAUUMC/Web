import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';

const schema = yup.object().shape({
  email: yup.string().email('올바른 이메일 형식이 아닙니다!').required('이메일은 필수 입력 항목입니다.'),
  password: yup
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
    .max(16, '비밀번호는 최대 16자 이하이어야 합니다.')
    .required('비밀번호는 필수 입력 항목입니다.'),
});

const LoginPage = () => {
  const [isTouched, setIsTouched] = useState({ email: false, password: false });
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleFocus = (field) => {
    setIsTouched((prev) => ({ ...prev, [field]: true }));
  };

  return (
    <Container>
      <LoginTitle>로그인</LoginTitle>
      
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <Input
            type="email"
            placeholder="이메일"
            {...register('email')}
            onFocus={() => handleFocus('email')}
            hasError={errors.email && isTouched.email}
          />
          {errors.email && isTouched.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </InputWrapper>

        <InputWrapper>
          <Input
            type="password"
            placeholder="비밀번호"
            {...register('password')}
            onFocus={() => handleFocus('password')}
            hasError={errors.password && isTouched.password}
          />
          {errors.password && isTouched.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </InputWrapper>

        <LoginButton type="submit" disabled={!isValid}>
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
  border: 1px solid ${({ hasError }) => (hasError ? 'red' : '#212121')};
  border-radius: 4px;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: ${({ hasError }) => (hasError ? 'red' : '#212121')};
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const LoginButton = styled.button`
  padding: 10px;
  margin-top: 10px;
  height: 44px;
  font-size: 15px;
  background-color: ${({ disabled }) => (disabled ? 'gray' : '#ff007f')};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.3s;
  &:hover {
    background-color: ${({ disabled }) => (disabled ? 'gray' : '#ff007f')};
  }
`;