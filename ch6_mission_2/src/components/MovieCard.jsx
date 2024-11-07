import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleMovieClick = () => {
    if (movie.id) {
      navigate(`/movie/${movie.id}`);
    } else {
      console.error("영화 ID가 없습니다.");
    }
  };

  return (
    <StyledMovieCard onClick={handleMovieClick}>
      <MoviePoster
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <MovieInfo>
        <MovieTitle>{movie.title}</MovieTitle>
        <ReleaseDate>{movie.release_date}</ReleaseDate>
      </MovieInfo>
    </StyledMovieCard>
  );
};

export default MovieCard;

const StyledMovieCard = styled.div`
  width: 120px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  cursor: pointer;
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