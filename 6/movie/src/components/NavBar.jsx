// components/NavBar.jsx
import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 사용

const NavBarContainer = styled.nav`
  height: 60px;
  background-color: #141414;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;

  a {
    text-decoration: none;
    color: #e50914; /* 넷플릭스 로고의 빨간색 */
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  background-color: ${(props) => (props.isActive ? '#f40612' : '#e50914')};
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.isActive ? '#d90409' : '#b81d24')}; 
    /* hover 시 진한 색상으로 변경 */
  }
`;

const NavBar = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 훅
  const [activeButton, setActiveButton] = useState(null); // 현재 클릭된 버튼 상태

  const handleLoginClick = () => {
    setActiveButton('login'); // 로그인 버튼이 클릭됨을 표시
    navigate('/signin'); // 로그인 클릭 시 '/signin'으로 이동
  };

  const handleSignupClick = () => {
    setActiveButton('signup'); // 회원가입 버튼이 클릭됨을 표시
    navigate('/signout'); // 회원가입 클릭 시 '/signout'으로 이동
  };

  return (
    <NavBarContainer>
      <Logo>
        <a href="/">Netflix</a> {/* 로고 클릭 시 '/'로 이동 */}
      </Logo>
      <ButtonContainer>
        <Button
          isActive={activeButton === 'login'} // 로그인 버튼이 활성화 상태인지 확인
          onClick={handleLoginClick}
        >
          로그인
        </Button>
        <Button
          isActive={activeButton === 'signup'} // 회원가입 버튼이 활성화 상태인지 확인
          onClick={handleSignupClick}
        >
          회원가입
        </Button>
      </ButtonContainer>
    </NavBarContainer>
  );
};

export default NavBar;
