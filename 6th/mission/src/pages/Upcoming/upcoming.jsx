import Card from "../../components/Card/card.jsx";
import * as S from "../../components/Card/card.style.js";
import useCustomFetch from "../../hooks/useCustomFetch.js";

const UpcomingMoviesPage = () => {
  const {
    data: movies,
    isLoading,
    isError,
  } = useCustomFetch(`/movie/upcoming?language=ko-KR`);

  if (isLoading) {
    return <h1 style={{ color: "white" }}>로딩중...</h1>;
  }

  if (isError) {
    return <h1 style={{ color: "white" }}>에러중 ㅜㅜ</h1>;
  }

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

export default UpcomingMoviesPage;
