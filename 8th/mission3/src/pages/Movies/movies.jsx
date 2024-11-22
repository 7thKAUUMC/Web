import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import nowPlayingImage from "../../assets/now_playing.jpg"; // 현재 상영중인 이미지
import popularImage from "../../assets/popular.jpg"; // 인기있는 이미지
import topRatedImage from "../../assets/top_rated.jpg"; // 높은 평가를 받은 이미지
import upcomingImage from "../../assets/upcoming.jpg"; // 개봉 예정중인 이미지

const Categories = () => {
  return (
    <CategoriesContainer>
      <h1>카테고리</h1>
      <CategoryList>
        <CategoryItem>
          <CategoryLink to="/movies/now-playing">
            <CategoryImage src={nowPlayingImage} alt="현재 상영중인" />
            <Overlay>현재 상영중인</Overlay>
          </CategoryLink>
        </CategoryItem>
        <CategoryItem>
          <CategoryLink to="/movies/popular">
            <CategoryImage src={popularImage} alt="인기있는" />
            <Overlay>인기있는</Overlay>
          </CategoryLink>
        </CategoryItem>
        <CategoryItem>
          <CategoryLink to="/movies/top-rated">
            <CategoryImage src={topRatedImage} alt="높은 평가를 받은" />
            <Overlay>높은 평가를 받은</Overlay>
          </CategoryLink>
        </CategoryItem>
        <CategoryItem>
          <CategoryLink to="/movies/up-coming">
            <CategoryImage src={upcomingImage} alt="개봉 예정중인" />
            <Overlay>개봉 예정중인</Overlay>
          </CategoryLink>
        </CategoryItem>
      </CategoryList>
    </CategoriesContainer>
  );
};

export default Categories;

const CategoriesContainer = styled.div`
  padding: 20px;
  color: #fff;

  h1 {
    margin-bottom: 20px;
    text-decoration: none; /* 제목에 밑줄 제거 */
  }
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4열로 설정 */
  gap: 16px; /* 카테고리 간의 여백 설정 */
`;

const CategoryItem = styled.li`
  position: relative;
`;

const CategoryLink = styled(Link)`
  display: block;
  text-decoration: none;
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 150px; /* 이미지 높이 설정 */
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s; /* 호버 시 이미지 확대 효과 */

  &:hover {
    transform: scale(1.05); /* 호버 시 이미지 확대 */
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* 검정색 배경에 투명도 적용 */
  border-radius: 8px; /* 이미지와 같은 border-radius 적용 */
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff; /* 글자색을 흰색으로 설정 */
  font-size: 20px; /* 글자 크기 설정 */
  opacity: 1; /* 기본 상태에서 항상 보이도록 설정 */
`;
