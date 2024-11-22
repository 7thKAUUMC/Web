import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import useCustomMovieInfo from '../hooks/useCustomMovieInfo';

const MovieInfo = () => {
  const { movieId } = useParams();
  const { movie, loading, error } = useCustomMovieInfo(movieId);

  const { title, vote_average, runtime, release_date, overview, poster_path, credits } = movie || {};

  if (loading) {
    return <p>로딩중...</p>;
  }

  if (error) {
    return <p>문제가 발생했습니다.</p>;
  }

  return (
    <Container>
      <MovieInformation>
        <Title>
          {title}
        </Title>
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
                src={
                  credit.profile_path
                    ? `https://image.tmdb.org/t/p/w200${credit.profile_path}`
                    : 'https://via.placeholder.com/50/282828?text='
                }
                alt={credit.name}
              />
              <CreditInfo>
                <NameInfo>{credit.name}</NameInfo>
                <CharInfo>{credit.character}</CharInfo>
              </CreditInfo>
            </Credit>
          ))}
        </Credits>
      </MovieInformation>
      <MoviePoster src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} />
    </Container>
  );
};

export default MovieInfo;

const Container = styled.div`
  color: #ffffff;
  display: flex;
  padding: 20px;
  min-height: 100vh;
`;

const MovieInformation = styled.div`
  flex: 1;
  margin-left: 20px;
`;

const Title = styled.p`
  font-size: 50px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const MoviePoster = styled.img`
  height: 600px;
  width: 400px;
  border-radius: 10px;
  margin-left: 100px;
  margin-right: 50px;
`;

const Details = styled.div`
  margin-bottom: 50px;
  font-size: 20px;
  font-weight: 300;
  p {
    margin: 5px 0;
  }
`;

const Overview = styled.p`
  font-size: 15px;
  margin-bottom: 50px;
  font-weight: 300;
`;

const Credits = styled.div`
  margin-top: 20px;
  h2 {
    margin-bottom: 10px;
  }
`;

const Credit = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 15px;
  background-color: #282828;
  object-fit: cover;
`;

const CreditInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const NameInfo = styled.div`
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 8px;
`;

const CharInfo = styled.div`
  font-size: 15px;
  font-weight: 400;
  color: #aaaaaa;
`;