import styled from "styled-components";

export const NavbarWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #222;
  padding: 10px 20px;
  height: 60px;

  .navbar-logo a {
    font-size: 24px;
    color: #ff1b6d;
    font-weight: 1000; /* 두께 설정 */
    text-decoration: none;
    padding: 10px;
  }

  .navbar-buttons {
    display: flex;
  }
`;

export const UserInfo = styled.span`
  color: white;
  font-size: 16px;
  padding: 10px 5px;
`;

export const LoginButton = styled.button`
  background-color: #222;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  margin-right: 15px;
  text-decoration: none;
`;

export const LogoutButton = styled.button`
  background-color: #222;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  margin-right: 15px;
  text-decoration: none;
  font-size: 16px;
`;

export const SignupButton = styled.button`
  background-color: #ff1b6d;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  border-radius: 8px;

  &:hover {
    background-color: #cc1b6d;
  }
`;
