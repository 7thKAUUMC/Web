import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 영화 세부정보 및 출연진 정보 가져오기
  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        // 영화 정보 가져오기
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            params: { language: "ko" },
            headers: {
              accept: "application/json",
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YmY5YWVjMmViMDNjODYzNWIwYTcxNDhmNTc1Mzg5YyIsIm5iZiI6MTcyOTczMjQ4Ni42ODc1OTIsInN1YiI6IjY3MTY4YzgxYmQ5MWM4MzgyOWQ3ODcwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8pp4e1yMJwB0VDgMbUFU_gmr2mhSfjguE8_H1wjwPYY`,
            },
          }
        );
        setMovie(movieResponse.data);

        // 출연진 정보 가져오기
        const creditsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YmY5YWVjMmViMDNjODYzNWIwYTcxNDhmNTc1Mzg5YyIsIm5iZiI6MTcyOTczMjQ4Ni42ODc1OTIsInN1YiI6IjY3MTY4YzgxYmQ5MWM4MzgyOWQ3ODcwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8pp4e1yMJwB0VDgMbUFU_gmr2mhSfjguE8_H1wjwPYY`,
            },
          }
        );
        setCredits(creditsResponse.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) return <LoadingMessage>로딩 중...</LoadingMessage>;
  if (error) return <ErrorMessage>오류가 발생했습니다: {error}</ErrorMessage>;

  const director = credits?.crew?.find((person) => person?.job === "Director") || { name: "정보 없음" };
  const cast = credits?.cast?.slice(0, 5) || [];

  return (
    <DetailContainer>
      {movie ? (
        <>
          <Poster
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/path/to/default/image.jpg'}
            alt={movie.title || "영화 포스터"}
          />
          <Info>
            <Title>{movie.title}</Title>
            <Overview>{movie.overview || "개요 정보 없음"}</Overview>
            <Director>감독: {director?.name}</Director>
            <CastContainer>
              <CastTitle>출연진:</CastTitle>
              <CastList>
                {cast.length > 0 ? (
                  cast.map((actor) => (
                    <CastItem key={actor.id}>{actor.name}</CastItem>
                  ))
                ) : (
                  <CastItem>출연진 정보 없음</CastItem>
                )}
              </CastList>
            </CastContainer>
          </Info>
        </>
      ) : (
        <ErrorMessage>영화 정보를 불러올 수 없습니다.</ErrorMessage>
      )}
    </DetailContainer>
  );
};

export default MovieDetail;

// 스타일 정의
const DetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  background-color: #1e1e1e;
  color: #fff;
`;

const Poster = styled.img`
  width: 300px;
  border-radius: 10px;
`;

const Info = styled.div`
  margin-left: 30px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Overview = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

const Director = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
`;

const CastContainer = styled.div`
  margin-top: 20px;
`;

const CastTitle = styled.h2`
  font-size: 22px;
  margin-bottom: 10px;
`;

const CastList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CastItem = styled.li`
  font-size: 18px;
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: #fff;
`;

const ErrorMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: red;
`;
