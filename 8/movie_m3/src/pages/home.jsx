// HomePage.jsx
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import axios from 'axios';

// API 호출 함수
const fetchMovies = async (page) => {
  const response = await axios.get(`https://api.themoviedb.org/3/movie/popular`, {
    params: {
      api_key: import.meta.env.VITE_API_KEY, // 본인의 TMDB API 키를 입력하세요.
      language: 'ko-KR',
      page: page,
    },
  });
  return response.data.results;
};

const Container = styled.div`
  background-color: #000;
  color: white;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));  // 반응형 그리드 설정
  gap: 20px;
  margin-bottom: 20px;
  flex-grow: 1;  // 페이지 내용이 충분히 채워지도록 설정
`;

const MovieCard = styled.div`
  background-color: #222;
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.7);
  }
`;

const MoviePoster = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const MovieTitle = styled.h3`
  font-size: 14px;
  color: #fff;
  padding: 10px;
`;

const PaginationButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;  // 버튼과 텍스트 정렬
  margin-top: 20px;
`;

const PageButton = styled.button`
  background-color: #e50914;  // 버튼 색상 변경
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  &:disabled {
    background-color: #555;
    color: #777;
    cursor: not-allowed;
  }
`;

const PageNumber = styled.span`
  font-size: 18px;
  color: #fff;
`;

const HomePage = () => {
  const [page, setPage] = useState(1);

  const { data: movies, isLoading, isError } = useQuery({
    queryKey: ['movies', page],
    queryFn: () => fetchMovies(page),
    keepPreviousData: true,  // 이전 데이터를 유지하여 부드러운 페이지 전환
  });

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load movies.</p>;

  return (
    <Container>
      <MoviesGrid>
        {movies?.map((movie) => (
          <MovieCard key={movie.id}>
            <MoviePoster 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title} 
            />
            <MovieTitle>{movie.title}</MovieTitle>
          </MovieCard>
        ))}
      </MoviesGrid>
      
      <PaginationButtons>
        <PageButton onClick={handlePreviousPage} disabled={page === 1}>
          이전
        </PageButton>
        
        <PageNumber>{page}</PageNumber> {/* 현재 페이지 번호 표시 */}
        
        <PageButton onClick={handleNextPage}>
          다음
        </PageButton>
      </PaginationButtons>
    </Container>
  );
};

export default HomePage;
