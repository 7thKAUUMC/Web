import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const HomePage: React.FC = () => {
  const [popularMovies, setPopularMovies] = useState<any[]>([]);
  const [trailer, setTrailer] = useState<string | null>(null);

  useEffect(() => {
    // 영화 데이터를 가져오는 로직을 여기에 추가하세요.
  }, []);

  return (
    <Container>
      <Title>인기 영화</Title>
      <VideoContainer>
        {trailer && <Video src={trailer} />}
      </VideoContainer>
      {popularMovies.map((movie, index) => (
        <MovieThumbnail key={index} src={movie.thumbnail} alt={movie.title} />
      ))}
    </Container>
  );
};

export default HomePage;

const Container = styled.div`
  background-color: #000;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: white;
  text-align: center;
  margin-bottom: 29px;
  font-size: 32px;
  font-weight: bold;
`;

const VideoContainer = styled.div`
  width: 100%;
  max-width: 336px;
  margin-bottom: 20px;
`;

const Video = styled.iframe`
  width: 100%;
  height: 200px;
  border: none;
`;

const MovieThumbnail = styled.img`
  width: 100%;
  max-width: 336px;
  margin-bottom: 20px;
  border-radius: 8px;
`;