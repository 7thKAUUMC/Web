import { useQuery } from "@tanstack/react-query"; // 데이터 가져오기
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useGetMovies from "../hooks/queries/useGetMovies"; // 데이터 가져오는 훅
import { SkeletonCard, SkeletonBox, SkeletonInfo, SkeletonTitle, SkeletonDate } from "../components/SkeletonUI";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

const Popular: React.FC = () => {
  const navigate = useNavigate();
  const category = "popular";
  const [page, setPage] = useState(1); // 페이지 상태 관리

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", category, page], // 쿼리 키에 페이지 포함
    queryFn: () => useGetMovies({ category, pageParam: page }), // 데이터 가져오기
  });

  const handleCardClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  const goToNextPage = () => setPage((prev) => prev + 1); // 페이지 증가
  const goToPreviousPage = () => setPage((prev) => (prev > 1 ? prev - 1 : 1)); // 페이지 감소

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

  return (
    <div>
      <MovieGrid>
        {data.results?.map((movie: Movie) => (
          <MovieCard key={movie.id} onClick={() => handleCardClick(movie.id)}>
            <MoviePoster
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <MovieInfo>
              <p>{movie.title}</p>
              <p>{new Date(movie.release_date).toLocaleDateString()}</p>
            </MovieInfo>
          </MovieCard>
        ))}
      </MovieGrid>
      <Pagination>
        <button onClick={goToPreviousPage}>이전</button>
        <button onClick={goToNextPage}>다음</button>
      </Pagination>
    </div>
  );
};

export default Popular;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const MovieCard = styled.div`
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
  }
`;

const MoviePoster = styled.img`
  width: 100%;
  border-radius: 10px;
`;

const MovieInfo = styled.div`
  text-align: center;
  color: white;
  margin-top: 10px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const ErrorText = styled.p`
  text-align: center;
  color: red;
`;