import {
    FooterNav,
    FooterContainer,
    FooterColumn,
    FooterTitle,
    FooterLink,
    SocialLinks,
    Copyright,
  } from "./Footer.style";
  
  const Footer = () => {
    const currentYear = new Date().getFullYear();
  
    return (
      <FooterNav>
        <FooterContainer>
          <FooterColumn>
            <FooterTitle>About the UMC</FooterTitle>
            <FooterLink href="#">연혁</FooterLink>
            <FooterLink href="#">소속 대학</FooterLink>
            <FooterLink href="#">동아리 소개</FooterLink>
          </FooterColumn>
  
          <FooterColumn>
            <FooterTitle>the Services</FooterTitle>
            <FooterLink href="#">플레이리스트</FooterLink>
            <FooterLink href="#">앨범</FooterLink>
            <FooterLink href="#">아티스트</FooterLink>
          </FooterColumn>
  
          <FooterColumn>
            <FooterTitle>Contact</FooterTitle>
            <FooterLink href="mailto:contact@umc.com">contact@umc.com</FooterLink>
            <FooterLink href="tel:+82-02-123-4567">02-123-4567</FooterLink>
            <SocialLinks>
              <FooterLink href="#">
                <i className="fab fa-github"></i>
              </FooterLink>
              <FooterLink href="#">
                <i className="fab fa-instagram"></i>
              </FooterLink>
              <FooterLink href="#">
                <i className="fab fa-youtube"></i>
              </FooterLink>
            </SocialLinks>
          </FooterColumn>
        </FooterContainer>
  
        <Copyright>© {currentYear} UMC. All rights reserved.</Copyright>
      </FooterNav>
    );
  };
  
  export default Footer;