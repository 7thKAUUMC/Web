// MovieDetailPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import useMovieDetails from '../hooks/useMovieDetails';

const MovieDetailContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-image: ${({ backdropUrl }) => `url(${backdropUrl})`};
  background-size: cover;
  background-position: center;
  color: white;
  text-align: center;
  padding: 20px;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7); /* 어두운 오버레이 */
    z-index: 0;
  }
`;

const MovieContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 800px;
  padding: 20px;
`;

const MovieTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
`;

const MovieRating = styled.p`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const MovieRuntime = styled.p`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const MovieReleaseDate = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

const MovieDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.5;
`;

const MoviePoster = styled.img`
  max-width: 300px; /* 포스터 최대 너비 설정 */
  height: auto; /* 비율을 유지하며 자동 높이 조정 */
  border-radius: 10px; /* 모서리 둥글게 */
  margin-bottom: 20px; /* 포스터와 다른 요소 사이의 여백 */
`;

const CreditsSection = styled.div`
  margin-top: 30px;
  width: 100%;
`;

const CreditsTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 15px;
  text-align: left;
`;

const CreditsList = styled.div`
  display: flex;
  flex-wrap: wrap; /* 줄 바꿈 허용 */
  gap: 10px; /* 항목 간의 간격 */
`;

const CreditCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  padding: 15px;
  width: calc(50% - 10px); /* 두 개의 카드가 한 줄에 들어가도록 너비 조정 */
`;

const CreditName = styled.span`
  font-size: 1rem;
  font-weight: bold;
`;

const CreditCharacter = styled.span`
  font-size: 0.9rem;
  color: #ddd;
`;

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const { movie, loading, error } = useMovieDetails(movieId);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const { title, vote_average, runtime, release_date, overview, credits } = movie;

  return (
    <MovieDetailContainer backdropUrl={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}>
      <MovieContent>
        <MoviePoster src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={title} />
        <MovieTitle>{title}</MovieTitle>
        <MovieRating>평점: {vote_average} / 10</MovieRating>
        <MovieRuntime>러닝타임: {runtime}분</MovieRuntime>
        <MovieReleaseDate>개봉일: {new Date(release_date).toLocaleDateString('ko-KR')}</MovieReleaseDate>
        <MovieDescription>{overview}</MovieDescription>
        
        <CreditsSection>
          <CreditsTitle>크레딧</CreditsTitle>
          {Array.isArray(credits.cast) && credits.cast.length > 0 ? (
            <CreditsList>
              {credits.cast.map((credit) => (
                <CreditCard key={credit.id}>
                  <CreditName>{credit.name}</CreditName>
                  <CreditCharacter>as {credit.character}</CreditCharacter>
                </CreditCard>
              ))}
            </CreditsList>
          ) : (
            <p>크레딧 정보가 없습니다.</p>
          )}
        </CreditsSection>
      </MovieContent>
    </MovieDetailContainer>
  );
};

export default MovieDetailPage;
