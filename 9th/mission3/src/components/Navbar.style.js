import styled from "styled-components";

export const Nav = styled.nav`
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 1.25rem 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
`;

export const NavCenter = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    color: #2c3e50;
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;

    &:hover {
      color: #3498db;
      transition: color 0.3s ease;
    }
  }
`;

export const NavContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  svg {
    width: 2rem;
    height: 2rem;
    color: #2c3e50;
    cursor: pointer;

    &:hover {
      color: #3498db;
      transform: scale(1.1);
      transition: all 0.3s ease;
    }
  }
`;

export const AmountContainer = styled.div`
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  background-color: #e74c3c;
  border-radius: 50%;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    color: white;
    font-size: 0.75rem;
    font-weight: bold;
    margin: 0;
  }
`;
