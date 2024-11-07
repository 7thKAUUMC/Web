import React from "react";
import Card from "../Card/card";
import useCustomFetch from "../../hooks/useCustomFetch";
import * as S from "./search-movie-list.style";
import CardSkeleton from "../Card/Skeleton/card-skeleton";

const SearchMovieList = ({ query }) => {
  const url = `/search/movie?query=${query}&include_adult=false&language=ko-KR&page=1`;

  const { data: movies, isLoading, isError } = useCustomFetch(url);

  if (isLoading) {
    return (
      <S.SearchResults>
        {Array(14)
          .fill()
          .map((_, i) => (
            <CardSkeleton key={i} />
          ))}
      </S.SearchResults>
    );
  }

  if (isError) {
    return <div>Error occurred</div>;
  }

  if (movies?.results?.length === 0 && query) {
    return (
      <>
        <S.NoResultsMessage>해당하는 검색어 "{query}"에</S.NoResultsMessage>
        <S.NoResultsMessage>해당하는 데이터가 없습니다.</S.NoResultsMessage>
      </>
    );
  }

  return (
    <S.SearchResults>
      {movies?.results?.map((movie) => (
        <Card key={movie.id} movie={movie} />
      ))}
    </S.SearchResults>
  );
};

export default SearchMovieList;
