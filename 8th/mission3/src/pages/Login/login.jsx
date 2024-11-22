import React, { useContext } from "react";
import * as S from "./login.style";
import useForm from "../../hooks/useForm";
import { validateLogin } from "../../utils/validate";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useMutation } from "@tanstack/react-query";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const loginForm = useForm(
    {
      email: "",
      password: "",
    },
    validateLogin
  );

  const postLogin = async (data) => {
    const response = await axios.post("http://localhost:3000/auth/login", {
      email: data.email,
      password: data.password,
    });
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      console.log("로그인 성공:", data);

      // AccessToken과 RefreshToken을 로컬 스토리지에 저장
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      // 로그인 상태 업데이트
      login();

      // 로그인 성공 후 메인 페이지로 이동
      navigate("/");
    },
    onError: (error) => {
      console.error("로그인 실패:", error.response.data);
      // 로그인 실패 처리
    },
  });

  const handlePressLogin = (e) => {
    e.preventDefault();
    mutation.mutate(loginForm.values);
  };

  return (
    <S.LoginContainer>
      <S.LoginWrapper>
        <S.LoginTitle>로그인</S.LoginTitle>
        <S.Form onSubmit={handlePressLogin}>
          <S.Input
            error={loginForm.touched.email && loginForm.errors.email}
            type="email"
            placeholder="이메일을 입력해주세요."
            {...loginForm.getTextInputProps("email")}
          />
          {loginForm.touched.email && loginForm.errors.email && (
            <S.ErrorMessage>{loginForm.errors.email}</S.ErrorMessage>
          )}

          <S.Input
            error={loginForm.touched.password && loginForm.errors.password}
            type="password"
            placeholder="비밀번호를 입력해주세요."
            {...loginForm.getTextInputProps("password")}
          />
          {loginForm.touched.password && loginForm.errors.password && (
            <S.ErrorMessage>{loginForm.errors.password}</S.ErrorMessage>
          )}

          <S.SubmitButton
            onClick={handlePressLogin}
            isValid={!loginForm.errors.email && !loginForm.errors.password}
            disabled={mutation.isLoading}
          >
            로그인
          </S.SubmitButton>
        </S.Form>
      </S.LoginWrapper>
    </S.LoginContainer>
  );
};

export default Login;
