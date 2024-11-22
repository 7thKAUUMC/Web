import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
    color: #e50914;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Button = styled.button`
  background-color: ${(props) => (props.active ? '#f40612' : '#e50914')};
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.active ? '#d90409' : '#b81d24')};
  }
`;

const NavBar = () => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  // Fetch userEmail from localStorage when the component mounts
  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUserEmail(email.split('@')[0]); // Display only the part before '@'
    }
  }, []); // This will run only once when the component mounts

  const handleLoginClick = () => {
    setActiveButton('login');
    navigate('/signin');
  };

  const handleSignupClick = () => {
    setActiveButton('signup');
    navigate('/signout');
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userEmail');
    setUserEmail(null); // Reset the email after logout
    setActiveButton(null);
    navigate('/');
  };

  return (
    <NavBarContainer>
      <Logo>
        <a href="/">Netflix</a>
      </Logo>
      <ButtonContainer>
        {userEmail ? (
          <>
            <div>{userEmail}</div> {/* Display the user's email */}
            <Button onClick={handleLogoutClick}>로그아웃</Button>
          </>
        ) : (
          <>
            <Button
              active={activeButton === 'login'} // Pass the 'active' prop to the styled button
              onClick={handleLoginClick}
            >
              로그인
            </Button>
            <Button
              active={activeButton === 'signup'} // Pass the 'active' prop to the styled button
              onClick={handleSignupClick}
            >
              회원가입
            </Button>
          </>
        )}
      </ButtonContainer>
    </NavBarContainer>
  );
};

export default NavBar;
