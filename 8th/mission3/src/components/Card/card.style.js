import styled from "styled-components";

// 카드 리스트 스타일
export const CardList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 15px;
`;

// 카드 컨테이너 스타일
export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 140px;
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

export const LoadingContainer = styled.div`
  margin-top: 50px;
  justify-content: center;
  width: 100%;
  display: flex;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 40px 0;
`;

export const PageButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: ${(props) => (props.disabled ? "#444" : "#ff1b6d")};
  color: white;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

export const CurrentPage = styled.span`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;
