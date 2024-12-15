import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

interface SignUpFormInputs {
  email: string;
  password: string;
  passwordCheck: string;
}

const schema = yup.object().shape({
  email: yup.string().email('올바른 이메일 형식이 아닙니다!').required('이메일은 필수 입력 항목입니다.'),
  password: yup
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
    .max(16, '비밀번호는 최대 16자 이하여야 합니다.')
    .required('비밀번호는 필수 입력 항목입니다.'),
  passwordCheck: yup
    .string()
    .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호 확인은 필수 입력 항목입니다.'),
});

const SignUpPage: React.FC = () => {
  const [isTouched, setIsTouched] = useState({ email: false, password: false, passwordCheck: false });
  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm<SignUpFormInputs>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SignUpFormInputs) => {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "회원가입에 실패했습니다.");
      }

      return response.json();
    },
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error: Error) => {
      setError("email", { type: "manual", message: error.message });
    },
  });

  const onSubmit: SubmitHandler<SignUpFormInputs> = (data) => {
    mutate(data);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          placeholder="이메일"
          {...register('email')}
          onBlur={() => setIsTouched({ ...isTouched, email: true })}
        />
        {isTouched.email && errors.email && <ErrorText>{errors.email.message}</ErrorText>}
        
        <Input
          type="password"
          placeholder="비밀번호"
          {...register('password')}
          onBlur={() => setIsTouched({ ...isTouched, password: true })}
        />
        {isTouched.password && errors.password && <ErrorText>{errors.password.message}</ErrorText>}
        
        <Input
          type="password"
          placeholder="비밀번호 확인"
          {...register('passwordCheck')}
          onBlur={() => setIsTouched({ ...isTouched, passwordCheck: true })}
        />
        {isTouched.passwordCheck && errors.passwordCheck && <ErrorText>{errors.passwordCheck.message}</ErrorText>}
        
        <Button type="submit" disabled={!isValid || isLoading}>
          {isLoading ? "회원가입 중..." : "회원가입"}
        </Button>
      </Form>
      <Link to="/login">이미 계정이 있으신가요? 로그인</Link>
    </Container>
  );
};

export default SignUpPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  margin: 0;
`;