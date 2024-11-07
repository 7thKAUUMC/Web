import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getUserInfo } from '../api/auth';
import { useAuth } from '../context/AuthContext'; // 추가

const Navbar = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const { isLoggedIn, logout: contextLogout } = useAuth(); // 추가

  useEffect(() => {
    const fetchUserInfo = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        try {
          const data = await getUserInfo(accessToken);
          const nickname = data.email.split('@')[0];
          setUserInfo({ ...data, nickname });
        } catch (error) {
          console.error('유저 정보 조회 실패:', error);
        }
      }
    };
    
    if (isLoggedIn) { // 수정
      fetchUserInfo();
    }
  }, [isLoggedIn]); // 의존성 배열 수정

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUserInfo(null);
    contextLogout(); // 추가
    navigate('/');
  };

  return (
    <nav>
      <NavContainer>
        <NavLogo to={'/'}>HYUNCHA</NavLogo>
        <ButtonContainer>
          {isLoggedIn && userInfo ? ( // 수정
            <>
              <UserInfo>{userInfo.nickname}님 반갑습니다</UserInfo>
              <NavButton_Red as="button" onClick={handleLogout}>로그아웃</NavButton_Red>
            </>
          ) : (
            <>
              <NavButton to='/login'>로그인</NavButton>
              <NavButton_Blue to='/signup'>회원가입</NavButton_Blue>
            </>
          )}
        </ButtonContainer>
      </NavContainer>
    </nav>
  );
};

export default Navbar;

// 기존 스타일 유지
const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding: 0 0px;
`

const NavLogo = styled(Link)`
  color: #FFD700;
  font-size: 30px;
  font-weight: 900;
  text-decoration: none;
  padding: 20px;
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  position: absolute;
  right: 40px;
`

// NavButton 스타일 수정 (버튼 태그도 지원하도록)
const NavButton = styled(Link)`
  display: inline-block;
  width: 60px;
  color: #ffffff;
  font-size: 15px;
  text-align: center;
  text-decoration: none;
  padding: 10px;
  border-radius: 10px;
  transition: background-color 0.3s, color 0.3s;
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    color: #000000 !important;
    background-color: #ffffff !important;
  }
`

const NavButton_Blue = styled(Link)`
  display: inline-block;
  width: 60px;
  background-color: #003366;
  color: #ffffff;
  font-size: 15px;
  text-align: center;
  text-decoration: none;
  padding: 10px;
  border: none;
  border-radius: 10px;
  transition: background-color 0.3s, color 0.3s;
  &:hover {
    color: #000000 !important;
    background-color: #ffffff !important;
  }
`
const NavButton_Red = styled(Link)`
  display: inline-block;
  width: auto; // 60px에서 auto로 변경
  background-color: #E57373;
  color: #ffffff;
  font-size: 15px;
  text-align: center;
  text-decoration: none;
  padding: 8px 16px; // 패딩 값 수정
  border: none;
  border-radius: 10px;
  white-space: nowrap; // 텍스트가 한 줄로 유지되도록 추가
  transition: background-color 0.3s, color 0.3s;
  &:hover {
    color: #000000 !important;
    background-color: #ffffff !important;
  }
`

const UserInfo = styled.span`
  color: #ffffff;
  font-size: 15px;
`