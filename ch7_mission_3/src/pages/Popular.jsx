import { useQuery } from "@tanstack/react-query"; // 데이터 가져오기
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useGetMovies from "../hooks/queries/useGetMovies"; // 데이터 가져오는 훅
import { SkeletonCard, SkeletonBox, SkeletonInfo, SkeletonTitle, SkeletonDate } from "../components/SkeletonUI";

const Popular = () => {
  const navigate = useNavigate();
  const category = "popular";
  const [page, setPage] = useState(1); // 페이지 상태 관리

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", category, page], // 쿼리 키에 페이지 포함
    queryFn: () => useGetMovies({ category, pageParam: page }), // 데이터 가져오기
  });

  const handleCardClick = (movieId) => {
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
        {data.results?.slice(0, 32).map((movie) => ( // 최대 32개 영화 표시
          <MovieCard key={movie.id} onClick={() => handleCardClick(movie.id)}>
            <MoviePoster src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <MovieInfo>
              <MovieTitle>{movie.title}</MovieTitle>
              <ReleaseDate>{movie.release_date}</ReleaseDate>
            </MovieInfo>
          </MovieCard>
        ))}
      </MovieGrid>
      <PaginationContainer>
        <PaginationButton onClick={goToPreviousPage} disabled={page <= 1}> {/* 페이지 1 이하일 때 비활성화 */}
          이전
        </PaginationButton>
        <PageNumber>{page} 페이지</PageNumber>
        <PaginationButton onClick={goToNextPage}> {/* 다음 페이지로 이동 */}
          다음
        </PaginationButton>
      </PaginationContainer>
    </div>
  );
};

export default Popular;

// 스타일링
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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin: 20px 0;
`;

const PaginationButton = styled.button`
  background-color: #003366; // 버튼 색상
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:disabled {
    background-color: #212121; // 비활성화 상태 색상
    cursor: not-allowed;
  }
`;

const PageNumber = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
`;