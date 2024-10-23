import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
  return (
    <nav>
      <NavContainer>
        <NavLogo to={'/'}>YOONCHA</NavLogo>
        <ButtonContainer>
          <NavButton to='/login'>로그인</NavButton>
          <NavButtonPink to='/signup'>회원가입</NavButtonPink>
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
  color: #ff007f;
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

const NavButtonPink = styled(Link)`
  display: inline-block;
  width: 60px;
  background-color: #ff007f;
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