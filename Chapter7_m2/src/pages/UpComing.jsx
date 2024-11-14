import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UseGetInfiniteMovies from "../hooks/queries/useGetInfiniteMovies";
import { SkeletonCard, SkeletonBox, SkeletonInfo, SkeletonTitle, SkeletonDate } from "../components/SkeletonUI";
import { useRef, useCallback } from "react";

const UpComing = () => {
  const navigate = useNavigate();
  const category = "upcoming";

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = UseGetInfiniteMovies(category);

  const observerRef = useRef();
  const lastMovieRef = useCallback((node) => {
    if (isFetchingNextPage) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage(); 
      }
    });
    if (node) observerRef.current.observe(node);
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <MovieGrid>
        {[...Array(16)].map((_, index) => (
          <SkeletonCard key={index}>
            <SkeletonBox />
            <SkeletonInfo>
              <SkeletonTitle />
              <SkeletonDate />
            </SkeletonInfo>
          </SkeletonCard>
        ))}
      </MovieGrid>
    );
  }

  if (isError) {
    return <ErrorText>문제가 발생했습니다.</ErrorText>;
  }

  const handleCardClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <MovieGrid>
      {data.pages.map((page, pageIndex) =>
        page.results.map((movie, movieIndex) => {
          const isLastMovie = pageIndex === data.pages.length - 1 && movieIndex === page.results.length - 1;
          return (
            <MovieCard
              key={movie.id}
              ref={isLastMovie ? lastMovieRef : null} 
              onClick={() => handleCardClick(movie.id)}
            >
              <MoviePoster src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              <MovieInfo>
                <MovieTitle>{movie.title}</MovieTitle>
                <ReleaseDate>{movie.release_date}</ReleaseDate>
              </MovieInfo>
            </MovieCard>
          );
        })
      )}
      {isFetchingNextPage && <LoadingSpinner>로딩중~</LoadingSpinner>}
    </MovieGrid>
  );
};

export default UpComing;

const MovieGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0 60px;
  gap: 20px;
  min-width: 1200px;
`;

const MovieCard = styled.div`
  width: 120px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const MoviePoster = styled.img`
  width: 120px;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 0px;
`;

const MovieInfo = styled.div`
  text-align: left;
`;

const MovieTitle = styled.p`
  font-size: 15px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 0px;
`;

const ReleaseDate = styled.p`
  font-size: 10px;
  color: #aaaaaa;
`;

const ErrorText = styled.p`
  font-size: 20px;
  color: #ffffff;
  text-align: center;
  margin-top: 50px;
`;

const LoadingSpinner = styled.div`
  text-align: center;
  font-size: 14px;
  color: #2f16ff;
  margin: 20px 0;
`;
