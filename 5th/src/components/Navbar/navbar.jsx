import React from "react";
import { Link } from "react-router-dom";
import { NavbarWrapper, LoginButton, SignupButton } from "./navbar.style";

const Navbar = () => {
  return (
    <NavbarWrapper>
      <div className="navbar-logo">
        <Link to="/">UMCHA</Link>
      </div>
      <div className="navbar-buttons">
        <LoginButton as={Link} to="/login">
          로그인
        </LoginButton>
        <SignupButton as={Link} to="/signup">
          회원가입
        </SignupButton>
      </div>
    </NavbarWrapper>
  );
};

export default Navbar;
