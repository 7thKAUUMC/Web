import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query'; // 🔄 useMutation import 추가

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

const SignUpPage = () => {
  const [isTouched, setIsTouched] = useState({ email: false, password: false, passwordCheck: false });
  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const navigate = useNavigate();

  // 🔄 useMutation으로 POST 요청 관리
  const { mutate, isLoading } = useMutation({
    mutationFn: async (data) => {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '회원가입 중 오류가 발생했습니다.');
      }
    },
    onSuccess: () => {
      alert('회원가입이 완료되었습니다!');
      navigate("/login");
    },
    onError: (error) => {
      if (error.message.includes('이미 사용 중인 이메일')) {
        setError('email', {
          type: 'manual',
          message: '이미 사용 중인 이메일입니다.',
        });
      } else {
        alert(error.message);
      }
    },
  });

  // 🔄 useMutation을 활용한 submit 함수
  const onSubmit = (data) => {
    mutate(data); // 데이터를 mutate로 전달
  };

  const handleFocus = (field) => {
    setIsTouched((prev) => ({ ...prev, [field]: true }));
  };

  return (
    <Container>
      <SignUpTitle>회원가입</SignUpTitle>
      
      <Form onSubmit={handleSubmit(onSubmit)}> {/* 🔄 기존 onSubmit에서 수정 */}
        <InputWrapper>
          <StyledInput
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
          <StyledInput
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
          <StyledInput
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

        <SubmitButton type="submit" value={isLoading ? '처리 중...' : '제출'} disabled={!isValid || isLoading} />
        {/* 🔄 isLoading 상태에 따라 버튼 텍스트 변경 */}
      </Form>
      <LoginLink to="/login">이미 계정이 있으신가요? 로그인</LoginLink>
    </Container>
  );
};

export default SignUpPage;

// 스타일링
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  width: 100%;
  max-width: 336px;
  margin: 0 auto;
  padding: 0 19px;
  background-color: #000;
  min-height: 100vh;
`;

const SignUpTitle = styled.h1`
  color: white;
  text-align: center;
  margin-bottom: 29px;
  font-size: 32px;
  font-weight: bold;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputWrapper = styled.div`
  margin-bottom: 20px;
`;

const StyledInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  padding: 0 14px;
  border-radius: 5px;
  border: 1px solid ${({ hasError }) => (hasError ? '#E34935' : '#ddd')};
  background-color: white;
  font-size: 16px;

  &::placeholder {
    color: #666;
  }

  &:focus {
    outline: none;
    border-color: #003366;
  }
`;

const ErrorMessage = styled.span`
  color: #E34935;
  font-size: 13px;
  padding-left: 5px;
  margin-top: -15px;
`;

const SubmitButton = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 5px;
  border: none;
  background-color: #808080;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:not(:disabled):hover {
    background-color: #D64242;
  }
`;

const LoginLink = styled(Link)`
  margin-top: 20px;
  color: #ffffff;
  text-decoration: none;
  font-size: 14px;
  
  &:hover {
    text-decoration: underline;
  }
`;
