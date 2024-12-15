import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterWrapper>
      <h3>University MakeUs Challenge KAU</h3>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.nav`
  background: #2f16ff;
  color: white;
  padding: 1rem 0;
  text-align: center;

  h3 {
    font-size: 1.2rem;
    font-weight: 300;
  }
`;
