import styled, { keyframes } from "styled-components"; // 애니메이션을 위해 keyframes 추가

export const skeleton = keyframes`
  0% {
    opacity: 1;
  }
  30% {
    opacity: 0.7;
  }
  50% {
      opacity: 0.4;
   }
  80% {
    opacity: 0.8;
  }
  100% {
    opacity: 1;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const CardMain = styled.div`
  width: 140px;
  height: 200px;
  background-color: #555;
  border-radius: 10px;
  overflow: hidden;
  animation: ${skeleton} 3s 1s infinite linear alternate;
`;

export const TextWrapper = styled.div`
  width: 140px;
  height: 80px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 10px;
`;

export const TitleBox = styled.div`
  width: 120px;
  height: 40px;
  background-color: #555;
  border-radius: 5px;
  animation: ${skeleton} 3s 1s infinite linear alternate;
`;

export const DescriptionBox = styled.div`
  width: 120px;
  height: 15px;
  background-color: #555;
  border-radius: 5px;
  animation: ${skeleton} 3s 1s infinite linear alternate;
`;
