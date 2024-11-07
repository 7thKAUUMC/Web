import Card from "../../components/Card/card.jsx";
import * as S from "../../components/Card/card.style.js";
import useCustomFetch from "../../hooks/useCustomFetch.js";

const PopularMoviesPage = () => {
  const {
    data: movies,
    isLoading,
    isError,
  } = useCustomFetch(`/movie/popular?language=ko-KR`);

  if (isLoading) {
    return <h1 style={{ color: "white" }}>로딩중...</h1>;
  }

  if (isError) {
    return <h1 style={{ color: "white" }}>에러중 ㅜㅜ</h1>;
  }

  // movies가 undefined일 때 빈 배열을 사용하여 오류 방지
  return (
    <S.CardList>
      {(movies.results || []).map(
        (
          movie // 데이터 구조에 맞게 수정
        ) => (
          <Card key={movie.id} movie={movie} />
        )
      )}
    </S.CardList>
  );
};

export default PopularMoviesPage;
