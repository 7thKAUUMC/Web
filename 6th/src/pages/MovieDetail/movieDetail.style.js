import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const DetailContainer = styled.div`
  flex: 1;
  position: relative;
  min-height: 100vh;
  animation: ${fadeIn} 0.5s ease-in;
  overflow-x: hidden;
  overflow-y: auto; // 스크롤 가능하게 설정
`;

export const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60vh;
  object-fit: cover;
  filter: brightness(0.3) blur(2px);
  z-index: 0;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      180deg,
      rgba(26, 26, 26, 0) 0%,
      rgba(26, 26, 26, 1) 100%
    );
  }
`;

export const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  padding: 40px 20px;
  margin: 0 auto;
  max-width: calc(100% - 40px); // 좌우 여백 고려
  width: 100%;

  @media (min-width: 1200px) {
    max-width: 1160px; // 1200px - 40px(좌우 패딩)
  }
`;

export const Overlay = styled.div`
  width: 100%;
  min-height: 100%;
  background: rgba(26, 26, 26, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  padding: 40px;
  margin-top: 200px; // 배경 이미지와 겹치도록 조정

  @media (max-width: 768px) {
    padding: 20px;
    margin-top: 150px;
  }
`;

export const Title = styled.h1`
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 20px;
  background: linear-gradient(to right, #fff, #a8a8a8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

export const Rating = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #ffd700;
  display: flex;
  align-items: center;
  gap: 5px;

  &::before {
    content: "★";
  }
`;

export const ReleaseYear = styled.div`
  font-size: 16px;
  color: #a8a8a8;
  font-weight: 500;
`;

export const Runtime = styled.div`
  font-size: 16px;
  color: #a8a8a8;
  font-weight: 500;
`;

export const Overview = styled.p`
  font-size: 18px;
  line-height: 1.8;
  color: #e0e0e0;
  margin-bottom: 40px;
  max-width: 800px;
`;

export const Director = styled.div`
  font-size: 18px;
  margin-bottom: 30px;
  color: #fff;
  font-weight: 600;

  span {
    color: #a8a8a8;
    font-weight: 400;
  }
`;

export const CastContainer = styled.div`
  margin-top: 40px;
`;

export const CastTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
  color: #fff;
  font-weight: 700;
`;

export const CastList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 20px;
  }
`;

export const CastItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 15px;
  margin-bottom: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

export const CastName = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 5px;
`;

export const CharacterName = styled.span`
  font-size: 14px;
  color: #a8a8a8;
`;

export const LoadingMessage = styled.div`
  text-align: center;
  font-size: 20px;
  color: #fff;
  padding: 40px;
  background: rgba(26, 26, 26, 0.8);
  border-radius: 10px;
  backdrop-filter: blur(10px);
`;

export const ErrorMessage = styled.div`
  text-align: center;
  font-size: 20px;
  color: #ff4d4d;
  padding: 40px;
  background: rgba(26, 26, 26, 0.8);
  border-radius: 10px;
  backdrop-filter: blur(10px);
`;

export const Tagline = styled.p`
  font-size: 20px;
  font-weight: 600;
  font-style: italic;
  color: #d8d8d8;
  margin-bottom: 20px;
  max-width: 800px;
`;
