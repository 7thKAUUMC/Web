import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "styled-components";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("이메일을 반드시 입력해주세요")
    .required("이메일을 반드시 입력해주세요"),
  password: yup
    .string()
    .min(8, "비밀번호는 8자 이상이어야 합니다")
    .max(16, "비밀번호는 16자 이하여야 합니다")
    .required("비밀번호를 입력해주세요"),
  passwordCheck: yup
    .string()
    .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다")
    .required("비밀번호 검증도 필수 입력요소입니다"),
});

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange"
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container>
      <Title>회원가입</Title>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <StyledInput
          type="email"
          placeholder="이메일을 입력해주세요"
          {...register("email")}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

        <StyledInput
          type="password"
          placeholder="비밀번호를 입력해주세요"
          {...register("password")}
        />
        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

        <StyledInput
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
          {...register("passwordCheck")}
        />
        {errors.passwordCheck && (
          <ErrorMessage>{errors.passwordCheck.message}</ErrorMessage>
        )}

        <SubmitButton type="submit" disabled={!isValid}>
          제출
        </SubmitButton>
      </FormWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 336px; // 280px * 1.2
  margin: 0 auto;
  padding: 0 19px; // 16px * 1.2
  background-color: #000;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const commonStyles = `
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  padding: 0 14px;
  border-radius: 5px;
  border: none;
`;

const Title = styled.h1`
  color: white;
  text-align: center;
  margin-bottom: 29px; // 24px * 1.5
  font-size: 32px; // 20px * 1.5
  font-weight: bold;
`;

const FormWrapper = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px; // 8px * 1.2
`;

const StyledInput = styled.input`
  ${commonStyles}
  background-color: white;
  font-size: 16px;

  &::placeholder {
    color: #666;
  }

  &:focus {
    outline: none;
  }
`;

const ErrorMessage = styled.span`
  color: #E34935;
  font-size: 13px; // 11px * 1.2
  padding-left: 5px; // 4px * 1.2
  margin-top: -5px; // -4px * 1.2
`;

const SubmitButton = styled.button`
  ${commonStyles}
  background-color: #cccccc;
  color: white;
  font-size: 14px;
  font-weight: normal;
  cursor: pointer;
  // margin-top: 5px;

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  &:not(:disabled) {
    background-color: #E75757;
    
    &:hover {
      background-color: #D64242;
    }
  }
`;



export default SignupPage;