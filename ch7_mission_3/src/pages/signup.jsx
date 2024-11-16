import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  email: yup.string().email('올바른 이메일 형식이 아닙니다!').required('이메일은 필수 입력 항목입니다.'),
  password: yup
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
    .max(16, '비밀번호는 최대 16자 이하이어야 합니다.')
    .required('비밀번호는 필수 입력 항목입니다.'),
  passwordCheck: yup
    .string()
    .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호 확인은 필수 입력 항목입니다.'),
});

const SignUpPage = () => {
  const [isTouched, setIsTouched] = useState({ email: false, password: false, passwordCheck: false });
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        navigate("/login"); 
      }
    } catch (error) {
      console.error("회원가입 에러:", error);
    }
  };

  const handleFocus = (field) => {
    setIsTouched((prev) => ({ ...prev, [field]: true }));
  };

  return (
    <Container>
      <SignUpTitle>회원가입</SignUpTitle>
      
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <Input
            type="email"
            placeholder="이메일을 입력해주세요"
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
            placeholder="비밀번호를 입력해주세요"
            {...register('password')}
            onFocus={() => handleFocus('password')}
            hasError={errors.password && isTouched.password}
          />
          {errors.password && isTouched.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </InputWrapper>

        <InputWrapper>
          <Input
            type="password"
            placeholder="비밀번호를 다시 입력해주세요"
            {...register('passwordCheck')}
            onFocus={() => handleFocus('passwordCheck')}
            hasError={errors.passwordCheck && isTouched.passwordCheck}
          />
          {errors.passwordCheck && isTouched.passwordCheck && (
            <ErrorMessage>{errors.passwordCheck.message}</ErrorMessage>
          )}
        </InputWrapper>

        <SubmitButton type="submit" value="제출" />
      </Form>
    </Container>
  );
};

export default SignUpPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const SignUpTitle = styled.h1`
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

const SubmitButton = styled.input`
  padding: 10px;
  margin-top: 10px;
  height: 44px;
  font-size: 15px;
  width: 100%;
  color: white;
  border: none;
  border-radius: 4px;
  background-color: #808080;
`;