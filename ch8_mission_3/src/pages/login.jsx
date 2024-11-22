import styled from "styled-components";
import { useState } from "react";
import useForm from "../hooks/useForm";
import { validateLogin } from "../utils/validate";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query"; // useMutation import

const LoginPage = () => {
  const navigate = useNavigate();

  const login = useForm({
    initialValue: {
      email: '',
      password: '',
    },
    validate: validateLogin,
  });

  // 로그인 요청을 처리하는 useMutation 설정
  const loginMutation = useMutation({
    mutationFn: async (loginData) => {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "로그인에 실패했습니다. 이메일 또는 비밀번호를 확인하세요.");
      }

      return response.json(); // 로그인 성공 시 데이터 반환
    },
    onSuccess: (data) => {
      // 성공 시 토큰 저장 및 페이지 이동
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      navigate("/"); // 메인 페이지로 이동
    },
    onError: (error) => {
      // 에러 처리
      console.error("로그인 에러:", error);
      alert(error.message);
    },
  });

  // 로그인 버튼 클릭 핸들러
  const handlePressLogin = (e) => {
    e.preventDefault();
    console.log("Login button clicked");

    // useMutation 실행
    loginMutation.mutate(login.values); // login.values를 전달
  };

  return (
    <Container>
      <LoginTitle>로그인</LoginTitle>

      <Form onSubmit={handlePressLogin}>
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

        <LoginButton type="submit" disabled={loginMutation.isLoading}>
          {loginMutation.isLoading ? '로딩 중...' : '로그인'}
        </LoginButton>
      </Form>

      {/* 회원가입 링크 추가 */}
      <SignUpLink>
        <Link to="/signup">계정이 없으신가요? 회원가입</Link>
      </SignUpLink>
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  background-image: url('/src/assets/category4.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: rgba(0, 0, 0, 0.5);
  background-blend-mode: darken;
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
  background-color: #000000;
`;

const SignUpLink = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: #ffffff; // 링크 색상
  cursor: pointer;

  a {
    text-decoration: none;
    color: #ffffff;
  }

  a:hover {
    text-decoration: underline;
  }
`;


