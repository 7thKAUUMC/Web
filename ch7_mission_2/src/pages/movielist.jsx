import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { axiosInstance } from "../apis/axios-instance";
import useCustomFetch from "../hooks/useCustomFetch";

const MovieList = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  let url = "";

  if (category === "now-playing") url = `/movie/now_playing`;
  else if (category === "popular") url = `/movie/popular`;
  else if (category === "top-rated") url = `/movie/top_rated`;
  else if (category === "up-coming") url = `/movie/upcoming`;

  // 커스텀 훅으로 데이터 가져오기 !!
  const { data, isLoading, isError } = useCustomFetch(url);

  if (isLoading) {
    return <LoadingText>로딩중...</LoadingText>;
  }

  if (isError) {
    return <ErrorText>문제가 발생했습니다.</ErrorText>;
  }

  const handleCardClick = (movieId) => {
    console.log("Navigating to movie ID:", movieId); // 에러체크용
    navigate(`/movie/${movieId}`); // 클릭 시 영화 상세 페이지로 이동
  };

  return (
    <MovieGrid>
      {data.results?.map((movie) => (
        <MovieCard key={movie.id} onClick={() => handleCardClick(movie.id)}>
          <MoviePoster
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <MovieInfo>
            <MovieTitle>{movie.title}</MovieTitle>
            <ReleaseDate>{movie.release_date}</ReleaseDate>
          </MovieInfo>
        </MovieCard>
      ))}
    </MovieGrid>
  );
};

export default MovieList;

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

const LoadingText = styled.p`
  font-size: 20px;
  color: #ffffff;
  text-align: center;
  margin-top: 50px;
`;

const ErrorText = styled.p`
  font-size: 20px;
  color: #ffffff;
  text-align: center;
  margin-top: 50px;
`;