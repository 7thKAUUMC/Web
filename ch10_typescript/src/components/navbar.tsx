import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";

interface UserResponse {
  email: string;
}

const Navbar: React.FC = () => {
  const [nickname, setNickname] = useState<string | null>(null); 
  const navigate = useNavigate();

  const fetchUserData = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      fetch("http://localhost:3000/user/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((response) => response.json())
        .then((data: UserResponse) => {
          const nickname = data.email.split("@")[0];
          setNickname(nickname);
        })
        .catch(() => {
          setNickname(null);
        });
    } else {
      setNickname(null);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [localStorage.getItem("accessToken")]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); 
    localStorage.removeItem("refreshToken");
    setNickname(null); 
    navigate("/"); 
  };

  return (
    <nav>
      <NavContainer>
        <NavLogo to="/">HYUNCHA</NavLogo>
        <ButtonContainer>
          {nickname ? (
            <>
              <WelcomeText>{nickname}님 반갑습니다.</WelcomeText>
              <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
            </>
          ) : (
            <>
              <NavButton to="/login">로그인</NavButton>
              <NavButton_Blue to="/signup">회원가입</NavButton_Blue>
            </>
          )}
        </ButtonContainer>
      </NavContainer>
    </nav>
  );
};

export default Navbar;

// Styled Components
const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding: 0 0px;
`;

const NavLogo = styled(Link)`
  color: #ffd700;
  font-size: 30px;
  font-weight: 900;
  text-decoration: none;
  padding: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  position: absolute;
  right: 40px;
`;

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
  &:hover {
    color: #000000 !important;
    background-color: #ffffff !important;
  }
`;

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
`;

const LogoutButton = styled.button`
  display: inline-block;
  width: 60px;
  color: #ffffff;
  font-size: 15px;
  text-align: center;
  background-color: transparent;
  border: 1px solid #ffffff;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  &:hover {
    color: #000000 !important;
    background-color: #ffffff !important;
  }
`;

const WelcomeText = styled.span`
  color: #ffd700;
  font-size: 15px;
  margin-right: 10px;
  font-weight: 700;
`;
