import Card from "../../components/Card/card.jsx";
import * as S from "../../components/Card/card.style.js";
import UseGetInfiniteMovies from "../../hooks/queries/useGetInfiniteMovies.js";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import CardListSkeleton from "../../components/Card/Skeleton/card-list-skeleton.jsx";

const NowPlayingMoviesPage = () => {
  // const {
  //   data: movies,
  //   isPending,
  //   isError,
  // } = useQuery({
  //   queryFn: () => useGetMovies({ category: "now_playing", pageParam: 1 }),
  //   queryKey: ["movies", "now_playing"],
  //   cacheTime: 10000,
  //   staleTime: 10000,
  // });

  const {
    data: movies,
    isFetching,
    isError,
    hasNextPage,
    fetchNextPage,
  } = UseGetInfiniteMovies("now_playing");

  const { ref, inView } = useInView({
    threshold: 0,
    //delay:
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  // if (isPending) {
  //   return (
  //     //<h1 style={{ color: "white" }}>로딩중...</h1>
  //     <S.CardList>
  //       {Array(14)
  //         .fill()
  //         .map((_, i) => (
  //           <CardSkeleton key={i} />
  //         ))}
  //     </S.CardList>
  //   );
  // }

  if (isError) {
    return <h1 style={{ color: "white" }}>에러가 발생했습니다.</h1>;
  }

  //console.log(movies);

  return (
    <>
      <S.CardList>
        {movies?.pages
          ?.map((page) => page.results)
          ?.flat() // 2차원 배열을 1차원 배열로 변환
          ?.map((movie, _) => (
            <Card key={movie.id} movie={movie} />
          ))}

        {/* {movies?.pages.map((page) => {
          return page.results.map((movie, _) => {
            return <Card key={movie.id} movie={movie} />;
          });
        })} */}
        {isFetching && <CardListSkeleton number={20} />}
      </S.CardList>
      <S.LoadingContainer ref={ref}>
        {isFetching && <ClipLoader color="white" />}
      </S.LoadingContainer>
    </>
  );
};

export default NowPlayingMoviesPage;
