import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import * as S from "./movieDetail.style";

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            params: { language: "ko" },
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
          }
        );
        setMovie(movieResponse.data);

        const creditsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
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

  if (loading) return <S.LoadingMessage>로딩 중...</S.LoadingMessage>;
  if (error)
    return <S.ErrorMessage>오류가 발생했습니다: {error}</S.ErrorMessage>;

  const director = credits?.crew?.find(
    (person) => person?.job === "Director"
  ) || { name: "정보 없음" };
  const cast = credits?.cast?.slice(0, 18) || [];

  return (
    <S.DetailContainer>
      {console.log("Movie:", movie)} {/* movie 객체 로그 */}
      <S.BackgroundImage
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title || "Movie backdrop"}
      />
      <S.Overlay>
        {movie ? (
          <>
            <S.Title>{movie.title}</S.Title>
            <S.Rating>{`${movie.vote_average}`}</S.Rating>
            <S.ReleaseYear>{`${
              movie.release_date.split("-")[0]
            }`}</S.ReleaseYear>
            <S.Runtime>{`${Math.floor(movie.runtime / 60)}시간 ${
              movie.runtime % 60
            }분`}</S.Runtime>
            <S.Tagline>{movie.tagline || "태그라인 정보 없음"}</S.Tagline>
            <S.Overview>{movie.overview || "개요 정보 없음"}</S.Overview>
            <S.Director>감독: {director?.name}</S.Director>
            <S.CastContainer>
              <S.CastTitle>출연진</S.CastTitle>
              <S.CastList>
                {cast.length > 0 ? (
                  cast.map((actor) => (
                    <S.CastItem key={actor.id}>
                      <S.ProfileImage
                        src={
                          actor.profile_path
                            ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                            : "path/to/default-image.jpg"
                        }
                        alt={actor.name}
                      />
                      {actor.name}
                    </S.CastItem>
                  ))
                ) : (
                  <S.CastItem>출연진 정보 없음</S.CastItem>
                )}
              </S.CastList>
            </S.CastContainer>
          </>
        ) : (
          <S.ErrorMessage>영화 정보를 불러올 수 없습니다.</S.ErrorMessage>
        )}
      </S.Overlay>
    </S.DetailContainer>
  );
};

export default MovieDetail;
