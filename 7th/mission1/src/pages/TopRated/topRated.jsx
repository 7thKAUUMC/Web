import Card from "../../components/Card/card.jsx";
import * as S from "../../components/Card/card.style.js";
import UseGetMovies from "../../hooks/queries/useGetMovies.js";
import ClipLoader from "react-spinners/ClipLoader";
import CardListSkeleton from "../../components/Card/Skeleton/card-list-skeleton.jsx";
import { useQuery } from "@tanstack/react-query";

const TopRatedMoviesPage = () => {
  const {
    data: movies,
    isFetching,
    isError,
  } = useQuery({
    queryFn: () => UseGetMovies({ category: "top_rated", pageParam: 1 }),
    queryKey: ["movies", "top_rated"],
  });

  if (isError) {
    return <h1 style={{ color: "white" }}>에러가 발생했습니다.</h1>;
  }

  console.log(movies);

  return (
    <>
      <S.CardList>
        {movies?.results?.map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
        {isFetching && <CardListSkeleton number={20} />}
      </S.CardList>
      <S.LoadingContainer>
        {isFetching && <ClipLoader color="white" />}
      </S.LoadingContainer>
    </>
  );
};

export default TopRatedMoviesPage;
