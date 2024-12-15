import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { validateLogin } from "../utils/validate";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const login = useForm<LoginFormValues>({
    initialValue: {
      email: "",
      password: "",
    },
    validate: validateLogin,
  });

  const handlePressLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login button clicked");

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(login.values),
      });
      console.log("API request sent");

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          "로그인에 실패했습니다. 이메일 또는 비밀번호를 확인하세요."
        );
      }

      const data = await response.json();
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      navigate("/"); // 로그인 성공 시 메인 페이지로 이동
    } catch (error: any) {
      console.error("로그인 에러:", error);
      alert(error.message); // 에러 메시지를 알림으로 표시
    }
  };

  return (
    <Container>
      <LoginTitle>로그인</LoginTitle>

      <Form onSubmit={handlePressLogin}>
        <InputWrapper>
          <Input
            error={!!(login.touched.email && login.errors.email)} // undefined를 boolean으로 변환
            type="email"
            placeholder="이메일을 입력해주세요"
            {...login.getTextInputProps("email")}
          />
          {login.touched.email && login.errors.email && (
            <ErrorText>{login.errors.email}</ErrorText>
          )}
        </InputWrapper>

        <InputWrapper>
          <Input
            error={!!(login.touched.password && login.errors.password)} // undefined를 boolean으로 변환
            type="password"
            placeholder="비밀번호를 입력해주세요"
            {...login.getTextInputProps("password")}
          />
          {login.touched.password && login.errors.password && (
            <ErrorText>{login.errors.password}</ErrorText>
          )}
        </InputWrapper>

        <LoginButton type="submit">로그인</LoginButton>
      </Form>
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
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

const Input = styled.input<{ error: boolean }>`
  width: 100%;
  padding: 10px;
  height: 44px;
  border: ${(props) => (props.error ? "2px solid red" : "1px solid #212121")};
  border-radius: 4px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.error ? "red" : "#007bff")};
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
  background-color: #ff007f;
`;
