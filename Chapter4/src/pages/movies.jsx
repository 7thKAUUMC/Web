import { Link } from "react-router-dom";
import styled from "styled-components";
import catImage1 from "../assets/category1.jpeg"
import catImage2 from "../assets/category2.jpeg"
import catImage3 from "../assets/category3.jpeg"
import catImage4 from "../assets/category4.jpeg"

const MoviesPage = () => {
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
  min-width: 600px;
`

const CategoryCard = styled(Link)`
  display: flex;
  align-items: flex-end;
  width: 280px;
  height: 120px;
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center 180px;
  border-radius: 10px;
  text-decoration: none;
`

const CategoryTitle = styled.div`
  color: #ffffff;
  padding: 3px 8px;
  margin: 8px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 5px;
  font-size: 15px;
  font-weight: 700;
`