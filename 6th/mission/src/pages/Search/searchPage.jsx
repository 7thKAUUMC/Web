import { useState, useEffect } from "react";
import styled from "styled-components";
import useFetch from "../hooks/useFetch";
import MovieCard from "../components/MovieCard";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const {
    data: movies,
    loading,
    error,
  } = useFetch(
    `https://api.themoviedb.org/3/search/movie?api_key=4bf9aec2eb03c8635b0a7148f575389c&query=${searchQuery}`,
    { params: { language: "ko" } }
  );

  const handleSearch = () => {
    setSearchQuery(query);
    setIsTyping(false);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setIsTyping(true);
  };

  return (
    <Container>
      <SearchBar>
        <Input
          type="text"
          placeholder="영화 제목을 입력해주세요"
          value={query}
          onChange={handleInputChange}
        />
        <Button onClick={handleSearch}>검색</Button>
      </SearchBar>
      {(loading || isTyping) && <SkeletonGrid />}
      {error && (
        <ErrorMessage>오류가 발생했습니다: {error.message}</ErrorMessage>
      )}
      {movies && movies.length > 0 ? (
        <MovieGrid>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </MovieGrid>
      ) : (
        searchQuery && (
          <NoDataMessage>
            '{searchQuery}'에 해당하는 데이터가 없습니다.
          </NoDataMessage>
        )
      )}
    </Container>
  );
};

export default SearchPage;

// Styled components
const Container = styled.div`
  padding: 20px;
  background-color: #000;
  color: #fff;
`;

const SearchBar = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #e50914;
  color: white;
  border: none;
  cursor: pointer;
`;

const MovieGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const NoDataMessage = styled.p`
  text-align: center;
  font-size: 18px;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const SkeletonGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  & > div {
    width: 120px;
    height: 180px;
    background-color: #444;
  }
`;
