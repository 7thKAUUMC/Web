import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "styled-components";
import { login } from '../api/auth';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 추가

const Container = styled.div`
  width: 100%;
  max-width: 336px;
  margin: 0 auto;
  padding: 0 19px;
  background-color: #000;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: white;
  text-align: center;
  margin-bottom: 29px;
  font-size: 32px;
  font-weight: bold;
`;

const FormWrapper = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  padding: 0 14px;
  border-radius: 5px;
  border: 1px solid ${props => props.$error ? '#E34935' : '#ddd'};
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

const SubmitButton = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 5px;
  border: none;
  background-color: ${props => props.disabled ? '#cccccc' : '#E75757'};
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: background-color 0.2s;

  &:not(:disabled):hover {
    background-color: #D64242;
  }
`;

const SignupLink = styled(Link)`
  margin-top: 20px;
  color: #ffffff;
  text-decoration: none;
  font-size: 14px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const schema = yup.object().shape({
  email: yup
    .string()
    .email("올바른 이메일 형식이 아닙니다")
    .required("이메일을 입력해주세요"),
  password: yup
    .string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다")
    .max(16, "비밀번호는 최대 16자 이하여야 합니다")
    .required("비밀번호를 입력해주세요"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const { login: contextLogin } = useAuth(); // 추가
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange"
  });

  const onSubmit = async (data) => {
    try {
      const response = await login(data);
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      localStorage.setItem('email', data.email); //이메일 저장
      contextLogin(); // 추가: Context 상태 업데이트
      alert('로그인이 완료되었습니다!');
      navigate('/');
    } catch (error) {
      alert(error.message || '로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <Container>
      <Title>로그인</Title>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <StyledInput
          type="email"
          placeholder="이메일을 입력해주세요"
          $error={!!errors.email}
          {...register("email")}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

        <StyledInput
          type="password"
          placeholder="비밀번호를 입력해주세요"
          $error={!!errors.password}
          {...register("password")}
        />
        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

        <SubmitButton type="submit" disabled={!isValid}>
          로그인
        </SubmitButton>
      </FormWrapper>
      <SignupLink to="/signup">계정이 없으신가요? 회원가입</SignupLink>
    </Container>
  );
};

export default LoginPage;