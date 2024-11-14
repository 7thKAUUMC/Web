import Card from "../../components/Card/card.jsx";
import * as S from "../../components/Card/card.style.js";
import UseGetInfiniteMovies from "../../hooks/queries/useGetInfiniteMovies.js";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import CardListSkeleton from "../../components/Card/Skeleton/card-list-skeleton.jsx";

const UpcomingMoviesPage = () => {
  const {
    data: movies,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = UseGetInfiniteMovies("upcoming");

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isError) {
    return <h1 style={{ color: "white" }}>에러가 발생했습니다.</h1>;
  }

  return (
    <>
      <S.CardList>
        {movies?.pages
          ?.map((page) => page.results)
          ?.flat()
          ?.map((movie, _) => (
            <Card key={movie.id} movie={movie} />
          ))}
        {isFetching && <CardListSkeleton number={20} />}
      </S.CardList>
      <S.LoadingContainer ref={ref}>
        {isFetching && <ClipLoader color="white" />}
      </S.LoadingContainer>
    </>
  );
};

export default UpcomingMoviesPage;
