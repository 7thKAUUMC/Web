import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  width: 100%;
  max-width: 336px;
  margin: 0 auto;
  padding: 0 19px;
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

const fetchPopularMovies = async () => {
  try {
    const response = await axios.get(
      'https://api.themoviedb.org/3/movie/popular',
      {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    setPopularMovies(response.data.results);
  } catch (error) {
    console.error("Error fetching popular movies:", error);
  }
};

const HomePage = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=4bf9aec2eb03c8635b0a7148f575389c`
        );
        setPopularMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    fetchPopularMovies();
  }, []);

  useEffect(() => {
    if (popularMovies.length > 0) {
      const fetchTrailer = async (movieId) => {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
          );
          const trailerData = response.data.results.find(
            (video) => video.type === "Trailer"
          );
          console.log("Trailer Data:", trailerData);  // 추가된 로그
          if (trailerData) {
            setTrailer(`https://www.youtube.com/embed/${trailerData.key}`);
          } else {
            console.log("No trailer found for this movie");
          }
        } catch (error) {
          console.error("Error fetching trailer:", error);
        }
      };

      // 첫 번째 인기 영화에 대한 트레일러 가져오기
      fetchTrailer(popularMovies[0].id);
    }
  }, [popularMovies]);

  return (
    <Container>
    <Title>홈 페이지 입니다</Title>
    {trailer ? (
      <VideoContainer>
        <Video
          url={trailer}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </VideoContainer>
    ) : (
      <p style={{ color: 'white' }}>트레일러를 찾을 수 없습니다.</p>
    )}
  </Container>
  );
};

export default HomePage;
