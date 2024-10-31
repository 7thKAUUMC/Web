import styled from "styled-components";

// 카드 리스트 스타일 수정: 1행에 9개 카드가 보이도록 설정
export const CardList = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr); // 1행에 9개 카드
  gap: 20px;
  padding: 10px;
  background-color: transparent; // 배경색을 투명으로 설정
`;

// 카드 컨테이너 스타일 수정: 배경색 제거
export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%; // 카드의 너비를 100%로 설정하여 그리드에 맞게 조정
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.05); /* 살짝 확대 */
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.4); /* 더 깊은 그림자 */
  }
`;

// 포스터 스타일 수정
export const Poster = styled.img`
  width: 100%; // 카드 너비에 맞게 조정
  height: 150px; // 높이를 150px로 줄임
  object-fit: cover;
`;

export const Info = styled.div`
  padding: 5px 10px; // 여백을 줄임
  color: #fff;
  text-align: left;
`;

// 제목 스타일
export const Title = styled.h3`
  font-size: 1rem; // 크기를 줄임
  font-weight: bold;
  margin: 5px 0; // 여백을 줄임
  color: #e0e0e0;
`;

export const ReleaseDate = styled.p`
  font-size: 0.8rem; // 크기를 줄임
  color: #bbb;
  margin: 2px 0; // 여백을 줄임
`;

export const Vote = styled.p`
  font-size: 1rem;
  color: #ffdd33;
  font-weight: bold;
  margin: 5px 0;
`;
