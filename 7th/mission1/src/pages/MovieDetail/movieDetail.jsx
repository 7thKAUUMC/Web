import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import * as S from "./movieDetail.style";
import ClipLoader from "react-spinners/ClipLoader";

const fetchMovieDetails = async (movieId) => {
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
  const creditsResponse = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    }
  );
  return { movie: movieResponse.data, credits: creditsResponse.data };
};

const MovieDetail = () => {
  const { movieId } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movieDetail", movieId],
    queryFn: () => fetchMovieDetails(movieId),
  });

  if (isLoading) return <ClipLoader color="white" />;
  if (isError) return <S.ErrorMessage>오류가 발생했습니다</S.ErrorMessage>;

  const { movie, credits } = data;

  const director = credits?.crew?.find(
    (person) => person?.job === "Director"
  ) || { name: "정보 없음" };
  const cast = credits?.cast?.slice(0, 18) || [];

  return (
    <S.DetailContainer>
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
