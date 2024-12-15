import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import useCustomMovieInfo from '../hooks/useCustomMovieInfo';

interface Credit {
  id: number;
  profile_path: string;
  name: string;
}

interface Movie {
  title: string;
  vote_average: number;
  runtime: number;
  release_date: string;
  overview: string;
  poster_path: string;
  credits: {
    cast: Credit[];
  };
}

const MovieInfo: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const { movie, loading, error } = useCustomMovieInfo(movieId);

  const { title, vote_average, runtime, release_date, overview, poster_path, credits } = movie || {} as Movie;

  if (loading) {
    return <p>로딩중...</p>;
  }

  if (error) {
    return <p>문제가 발생했습니다.</p>;
  }

  return (
    <Container>
      <MovieInformation>
        <Title>{title}</Title>
        <Details>
          <p>평균 {vote_average}</p>
          <p>{new Date(release_date).getFullYear()}</p>
          <p>{runtime}분</p>
        </Details>
        <Overview>{overview}</Overview>
        <Credits>
          <h2>Cast</h2>
          {credits?.cast?.map((credit) => (
            <Credit key={credit.id}>
              <ProfileImage
                src={`https://image.tmdb.org/t/p/w200${credit.profile_path}`}
                alt={credit.name}
              />
              <p>{credit.name}</p>
            </Credit>
          ))}
        </Credits>
      </MovieInformation>
    </Container>
  );
};

export default MovieInfo;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #000;
  color: #fff;
`;

const MovieInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 20px;
`;

const Details = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 1.2em;
  margin-bottom: 20px;
`;

const Credits = styled.div`
  width: 100%;
`;

const Credit = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 75px;
  margin-right: 10px;
  border-radius: 5px;
`;