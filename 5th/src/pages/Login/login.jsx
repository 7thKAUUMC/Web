import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as S from "./login.style";

const Login = () => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("올바른 이메일 형식이 아닙니다. 다시 입력해주세요!")
      .required("이메일을 입력해주세요."),
    password: yup
      .string()
      .min(8, "비밀번호는 8-16자 사이로 입력해주세요!")
      .max(16, "비밀번호는 8-16자 사이로 입력해주세요!")
      .required("비밀번호를 입력해주세요."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log("폼 데이터 제출");
    console.log(data);
  };

  return (
    <S.LoginContainer>
      <h1>로그인</h1>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.Input
          type={"email"}
          placeholder="이메일을 입력해주세요!"
          {...register("email")}
        />
        {errors.email && (
          <S.ErrorMessage>{errors.email.message}</S.ErrorMessage>
        )}

        <S.Input
          type={"password"}
          placeholder="비밀번호를 입력해주세요!"
          {...register("password")}
        />
        {errors.password && (
          <S.ErrorMessage>{errors.password?.message}</S.ErrorMessage>
        )}

        <S.SubmitButton type="submit" disabled={!isValid} isValid={isValid}>
          로그인
        </S.SubmitButton>
      </S.Form>
    </S.LoginContainer>
  );
};

export default Login;
