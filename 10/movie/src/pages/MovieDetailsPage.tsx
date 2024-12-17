// MovieDetailPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import useMovieDetails from '../hooks/useMovieDetails';

const MovieDetailContainer = styled.div<{ backdropUrl: string }>`
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
    background: rgba(0, 0, 0, 0.7);
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
  max-width: 300px;
  height: auto;
  border-radius: 10px;
  margin-bottom: 20px;
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
  flex-wrap: wrap;
  gap: 10px;
`;

const CreditCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  padding: 15px;
  width: calc(50% - 10px);
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

  if (error) {
    return <p>{error}</p>;
  }

  const skeletonStyle = {
    backgroundColor: '#444',
    borderRadius: '10px',
  };

  return (
    <MovieDetailContainer backdropUrl={movie?.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : ''}>
      <MovieContent>
        {loading ? (
          <Skeleton height={300} width={200} style={skeletonStyle} />
        ) : (
          <MoviePoster src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
        )}
        <MovieTitle>{loading ? <Skeleton width={300} style={skeletonStyle} /> : movie.title}</MovieTitle>
        <MovieRating>{loading ? <Skeleton width={150} style={skeletonStyle} /> : `평점: ${movie.vote_average} / 10`}</MovieRating>
        <MovieRuntime>{loading ? <Skeleton width={100} style={skeletonStyle} /> : `러닝타임: ${movie.runtime}분`}</MovieRuntime>
        <MovieReleaseDate>{loading ? <Skeleton width={180} style={skeletonStyle} /> : `개봉일: ${new Date(movie.release_date).toLocaleDateString('ko-KR')}`}</MovieReleaseDate>
        <MovieDescription>{loading ? <Skeleton count={3} style={skeletonStyle} /> : movie.overview}</MovieDescription>

        <CreditsSection>
          <CreditsTitle>크레딧</CreditsTitle>
          {loading ? (
            <Skeleton count={6} height={50} style={{ ...skeletonStyle, margin: '10px 0' }} />
          ) : Array.isArray(movie.credits.cast) && movie.credits.cast.length > 0 ? (
            <CreditsList>
              {movie.credits.cast.map((credit) => (
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
