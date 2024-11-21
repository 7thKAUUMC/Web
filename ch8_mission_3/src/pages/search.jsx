import styled from "styled-components";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";

const SearchPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const mq = searchParams.get('mq');

  const url = mq ? `/search/movie?query=${mq}` : null;
  const { data, isLoading, isError } = useCustomFetch(url);

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchMovie = () => {
    if (mq === searchValue) return;
    setSearchParams({ mq: searchValue });
    navigate(`/search?mq=${searchValue}`);
  };

  const handleSearchMovieWithKeyboard = (e) => {
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
    if (data?.results?.length === 0 && mq) {
      return null;
    }
    return data.results?.map((movie) => (
      <MovieCard key={movie.id} onClick={() => navigate(`/movie/${movie.id}`)}>
        <MoviePoster src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <MovieInfo>
          <MovieTitle>{movie.title}</MovieTitle>
          <ReleaseDate>{movie.release_date}</ReleaseDate>
        </MovieInfo>
      </MovieCard>
    ));
  };

  return (
    <div>
      <SearchContainer>
        <input
          placeholder="영화 제목을 입력해주세요"
          value={searchValue}
          onChange={onChangeSearchValue}
          onKeyDown={handleSearchMovieWithKeyboard}
        />
        <button onClick={handleSearchMovie}>검색</button>
      </SearchContainer>
      {data?.results?.length === 0 && mq && (
        <NoResultsText>해당하는 검색어 '{mq}'에 해당하는 데이터가 없습니다.</NoResultsText>
      )}
      <MovieContainer>
        {renderMovies()}
      </MovieContainer>
    </div>
  );
};

export default SearchPage;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  input {
    flex: 1;
    padding: 15px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border: 1px solid rgb(220, 220, 220);
  }
  
  button {
    width: 80px;
    background-color: #003366;
    color: #ffffff;
    cursor: pointer;
    border: none;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;

const NoResultsText = styled.p`
  font-size: 20px;
  color: #ffffff;
  text-align: center;
  margin: 40px 0;
  width: 100%;
`;

const MovieContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 20px;
  justify-content: center;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
`;

const MovieCard = styled.div`
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
  margin-bottom: 5px;
`;

const MovieInfo = styled.div`
  text-align: left;
`;

const MovieTitle = styled.p`
  font-size: 15px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 5px;
`;

const ReleaseDate = styled.p`
  font-size: 10px;
  color: #aaaaaa;
`;

const SkeletonCard = styled.div`
  width: 120px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const SkeletonBox = styled.div`
  width: 120px;
  height: 180px;
  background-color: #282828;
  border-radius: 10px;
  margin-bottom: 5px;
  animation: fade 1.5s infinite alternate;

  @keyframes fade {
    from { opacity: 0.5; }
    to { opacity: 1; }
  }
`;

const SkeletonInfo = styled.div`
  text-align: left;
`;

const SkeletonTitle = styled.div`
  width: 80%;
  height: 15px;
  background-color: #282828;
  margin-bottom: 5px;
  border-radius: 5px;
`;

const SkeletonDate = styled.div`
  width: 60%;
  height: 10px;
  background-color: #282828;
  border-radius: 5px;
`;