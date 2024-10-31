import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh; /* 화면 전체 높이 채우기 */
  color: white; /* 글자색 */
  padding-top: 150px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px; /* 너비 조정 */
  padding: 20px;
  border-radius: 8px; /* 둥근 모서리 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
`;

export const Input = styled.input`
  margin-bottom: 15px; /* 입력 필드 간격 */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;

  &:focus {
    border-color: #007bff; /* 포커스 시 테두리 색상 */
  }
`;

export const ErrorMessage = styled.p`
  color: red; /* 에러 메시지 색상 */
  margin: 0 0 15px; /* 에러 메시지 간격 */
  font-size: 15px;
`;

export const SubmitButton = styled.button`
  padding: 10px;
  background-color: ${(props) =>
    props.isValid ? "red" : "gray"}; /* 유효성 여부에 따라 배경색 */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: ${(props) =>
    props.isValid
      ? "pointer"
      : "not-allowed"}; /* 유효성 여부에 따라 커서 모양 */

  &:hover {
    background-color: ${(props) =>
      props.isValid ? "darkred" : "gray"}; /* 유효성 여부에 따라 호버 색상 */
  }
`;
