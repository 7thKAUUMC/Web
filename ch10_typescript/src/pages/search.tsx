import styled from "styled-components";
import { useState, ChangeEvent, KeyboardEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";
import { SkeletonCard, SkeletonBox, SkeletonInfo, SkeletonTitle, SkeletonDate } from "../components/SkeletonUI";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

const SearchPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const mq = searchParams.get('mq');

  const url = mq ? `/search/movie?query=${mq}` : null;
  const { data, isLoading, isError } = useCustomFetch(url);

  const onChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearchMovie = () => {
    if (mq === searchValue) return;
    setSearchParams({ mq: searchValue });
    navigate(`/search?mq=${searchValue}`);
  };

  const handleSearchMovieWithKeyboard = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchMovie();
    }
  };

  const renderMovies = () => {
    if (isLoading && url) {
      return [...Array(16)].map((_, index) => (
        <SkeletonCard key={index}>
          <SkeletonBox />
          <SkeletonInfo>
            <SkeletonTitle />
            <SkeletonDate />
          </SkeletonInfo>
        </SkeletonCard>
      ));
    }

    if (isError) {
      return <ErrorText>문제가 발생했습니다.</ErrorText>;
    }

    if (data && data.results) {
      return data.results.map((movie: Movie) => (
        <MovieCard key={movie.id}>
          <MoviePoster
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <MovieInfo>
            <p>{movie.title}</p>
            <p>{new Date(movie.release_date).toLocaleDateString()}</p>
          </MovieInfo>
        </MovieCard>
      ));
    }

    return null;
  };

  return (
    <Container>
      <SearchInput
        type="text"
        value={searchValue}
        onChange={onChangeSearchValue}
        onKeyDown={handleSearchMovieWithKeyboard}
        placeholder="영화를 검색하세요..."
      />
      <SearchButton onClick={handleSearchMovie}>검색</SearchButton>
      <MovieGrid>{renderMovies()}</MovieGrid>
    </Container>
  );
};

export default SearchPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
`;

const MovieCard = styled.div`
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
  }
`;

const MoviePoster = styled.img`
  width: 100%;
  border-radius: 10px;
`;

const MovieInfo = styled.div`
  text-align: center;
  color: white;
  margin-top: 10px;
`;

const ErrorText = styled.p`
  text-align: center;
  color: red;
`;