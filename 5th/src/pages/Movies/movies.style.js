import styled from "styled-components";

export const CardList = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(200px, 1fr)
  ); /* 카드가 자동으로 열에 맞게 조정됨 */
  gap: 20px; /* 카드 간 간격 */
  padding: 20px; /* 전체 여백 */
  background-color: #1c1c1c; /* 배경색 */
  min-height: 100vh; /* 전체 화면 높이 채우기 */
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #333; /* 카드 배경색 */
  border-radius: 8px;
  overflow: hidden;
  color: #fff;
`;

export const CardImage = styled.img`
  width: 100%;
  height: 300px; /* 이미지 높이 설정 */
  object-fit: cover; /* 이미지 크기 맞추기 */
`;

export const MovieTitle = styled.h3`
  margin: 10px 0 5px; /* 제목 간격 */
  font-size: 18px; /* 제목 폰트 크기 */
  text-align: center;
`;

export const ReleaseDate = styled.p`
  margin: 0 0 10px; /* 개봉일 간격 */
  font-size: 14px; /* 개봉일 폰트 크기 */
  color: #aaa; /* 개봉일 색상 */
  text-align: center;
`;
