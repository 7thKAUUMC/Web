import { Link } from "react-router-dom";
import styled from "styled-components";
import catImage1 from "../assets/category1.jpeg";
import catImage2 from "../assets/category2.jpeg";
import catImage3 from "../assets/category3.jpeg";
import catImage4 from "../assets/category4.jpeg";

const MoviesPage: React.FC = () => {
  return (
    <>
      <h1>카테고리</h1>
      <CategoryContainer>
        <CategoryCard to='/movies/now-playing' bgImage={catImage1}>
          <CategoryTitle>현재 상영중인</CategoryTitle>
        </CategoryCard>
        <CategoryCard to='/movies/popular' bgImage={catImage2}>
          <CategoryTitle>인기있는</CategoryTitle>
        </CategoryCard>
        <CategoryCard to='/movies/top-rated' bgImage={catImage3}>
          <CategoryTitle>높은 평가를 받은</CategoryTitle>
        </CategoryCard>
        <CategoryCard to='/movies/up-coming' bgImage={catImage4}>
          <CategoryTitle>개봉 예정중인</CategoryTitle>
        </CategoryCard>
      </CategoryContainer>
    </>
  );
};

export default MoviesPage;

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
  padding: 0 20px;
`;

interface CategoryCardProps {
  bgImage: string;
}

const CategoryCard = styled(Link)<CategoryCardProps>`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 200px;
  height: 300px;
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  text-decoration: none;
  color: white;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
  }
`;

const CategoryTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  text-align: center;
`;