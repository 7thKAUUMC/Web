import styled from "styled-components";

export const FooterNav = styled.nav`
  background-color: #2c3e50;
  padding: 3rem 0 2rem;
  margin-top: 3rem;
  color: #ecf0f1;
`;

export const FooterContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

export const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FooterTitle = styled.h3`
  color: #3498db;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const FooterLink = styled.a`
  color: #ecf0f1;
  text-decoration: none;
  font-size: 0.9rem;

  &:hover {
    color: #3498db;
    transition: color 0.2s ease;
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const Copyright = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #34495e;
  color: #bdc3c7;
  font-size: 0.9rem;
`;
