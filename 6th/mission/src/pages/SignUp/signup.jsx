import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as S from "./signup.style";
import Input from "../../components/Input/input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("유효한 이메일 형식이 아닙니다.")
      .required("이메일을 반드시 입력해주세요."),
    password: yup
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다.")
      .max(16, "비밀번호는 16자 이하여야 합니다.")
      .required("비밀번호를 반드시 입력해주세요."),
    passwordCheck: yup
      .string()
      .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다.")
      .required("비밀번호 확인을 입력해주세요."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/auth/register", {
        email: data.email,
        password: data.password,
        passwordCheck: data.passwordCheck,
      });
      console.log("회원가입 성공:", response.data);
      // 회원가입 성공 후 로그인 페이지로 이동
      navigate("/login");
    } catch (error) {
      console.error("회원가입 실패:", error.response.data);
      // 회원가입 실패 처리
    }
  };

  return (
    <S.SignupContainer>
      <S.SignupWrapper>
        <S.SignupTitle>회원가입</S.SignupTitle>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="email"
            placeholder="이메일을 입력해주세요!"
            register={register("email")}
            error={errors.email}
          />

          <Input
            type="password"
            placeholder="비밀번호를 입력해주세요!"
            register={register("password")}
            error={errors.password}
          />

          <Input
            type="password"
            placeholder="비밀번호를 다시 입력해주세요!"
            register={register("passwordCheck")}
            error={errors.passwordCheck}
          />

          <S.SubmitButton type="submit" disabled={!isValid} isValid={isValid}>
            가입하기
          </S.SubmitButton>
        </S.Form>
      </S.SignupWrapper>
    </S.SignupContainer>
  );
};

export default SignUp;
