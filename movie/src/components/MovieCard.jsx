import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background-color: #222;
  border-radius: 12px;
  overflow: hidden;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
  }
`;

const MoviePoster = styled.img`
  width: 100%;
  height: auto; /* height를 auto로 설정하여 비율 유지 */
  border-bottom: 2px solid #ff4081; /* 포스터 아래에 강조선을 추가 */
`;

const MovieTitle = styled.h3`
  padding: 10px;
  font-size: 20px;
  font-weight: bold;
  color: #ff4081; /* 제목 색상을 강조 */
`;

const ReleaseDate = styled.p`
  padding: 0 10px 10px;
  font-size: 14px;
  color: #bbb;
`;

const MovieCard = ({ posterPath, title, releaseDate }) => {
  return (
    <CardContainer>
      <MoviePoster src={`https://image.tmdb.org/t/p/w500${posterPath}`} alt={title} />
      <MovieTitle>{title}</MovieTitle>
      <ReleaseDate>{releaseDate}</ReleaseDate>
    </CardContainer>
  );
};

export default MovieCard;
