import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [nickname, setNickname] = useState(null); 
  const navigate = useNavigate();

  const fetchUserData = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      fetch("http://localhost:3000/user/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then(response => response.json())
        .then(data => {
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
        <NavLogo to={'/'}>HYUNCHA</NavLogo>
        <ButtonContainer>
        {nickname ? (
            <>
              <WelcomeText>{nickname}님 반갑습니다.</WelcomeText>
              <NavButton onClick={handleLogout}>로그아웃</NavButton>
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

const WelcomeText = styled.span`
  color: #ff007f;
  font-size: 15px;
  margin-right: 10px;
  font-weight: 700;
`;