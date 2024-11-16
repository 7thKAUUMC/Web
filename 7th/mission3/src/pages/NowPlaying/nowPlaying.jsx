import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Card from "../../components/Card/card.jsx";
import useGetMovies from "../../hooks/queries/useGetMovies.js";
import CardListSkeleton from "../../components/Card/Skeleton/card-list-skeleton.jsx";
import * as S from "../../components/Card/card.style.js";

const NowPlayingMoviesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: movies,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movies", "now_playing", currentPage],
    queryFn: () =>
      useGetMovies({ category: "now_playing", pageParam: currentPage }),
  });

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < movies?.total_pages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (isError) {
    return <h1 style={{ color: "white" }}>에러가 발생했습니다.</h1>;
  }

  return (
    <>
      <S.CardList>
        {movies?.results?.map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
        {isLoading && <CardListSkeleton number={20} />}
      </S.CardList>

      <S.PaginationContainer>
        <S.PageButton onClick={handlePrevPage} disabled={currentPage === 1}>
          이전
        </S.PageButton>
        <S.CurrentPage>{currentPage}</S.CurrentPage>
        <S.PageButton
          onClick={handleNextPage}
          disabled={currentPage === movies?.total_pages}
        >
          다음
        </S.PageButton>
      </S.PaginationContainer>
    </>
  );
};

export default NowPlayingMoviesPage;
