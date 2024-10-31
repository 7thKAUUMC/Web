import React from "react";
import useForm from "../../hooks/useForm";
import { validateSignUp } from "../../utils/validate";
import * as S from "./signup.style";

const SignUp = () => {
  const { values, errors, touched, getTextInputProps } = useForm(
    {
      email: "",
      password: "",
      passwordCheck: "",
    },
    validateSignUp
  );

  const handleSubmit = (event) => {
    console.log("가입 성공:", values);
  };

  return (
    <S.SignupContainer>
      <S.SignupWrapper>
        <S.SignupTitle>회원가입</S.SignupTitle>
        <form onSubmit={handleSubmit}>
          <S.Input
            type="text"
            placeholder="이메일"
            {...getTextInputProps("email")}
          />
          {errors.email && touched.email && (
            <S.ErrorMessage>{errors.email}</S.ErrorMessage>
          )}

          <S.Input
            type="password"
            placeholder="비밀번호"
            {...getTextInputProps("password")}
          />
          {errors.password && touched.password && (
            <S.ErrorMessage>{errors.password}</S.ErrorMessage>
          )}

          <S.Input
            type="password"
            placeholder="비밀번호 확인"
            {...getTextInputProps("passwordCheck")}
          />
          {errors.passwordCheck && touched.passwordCheck && (
            <S.ErrorMessage>{errors.passwordCheck}</S.ErrorMessage>
          )}

          <S.SubmitButton
            type="submit"
            isValid={!(errors.email || errors.password || errors.passwordCheck)}
          >
            가입하기
          </S.SubmitButton>
        </form>
      </S.SignupWrapper>
    </S.SignupContainer>
  );
};

export default SignUp;
