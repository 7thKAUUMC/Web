import { useState } from "react";
import styled from "styled-components";
import useFetch from "../hooks/useFetch";
import MovieCard from "../components/MovieCard";
import { debounce } from "lodash"; // lodash에서 debounce 함수 가져오기
import Skeleton from "react-loading-skeleton"; // Skeleton UI 라이브러리
import "react-loading-skeleton/dist/skeleton.css"; // Skeleton CSS

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const {
    data: movies,
    isLoading,
    isError,
    error,
  } = useFetch(
    ["searchMovies", searchQuery], // queryKey 설정
    `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_APP_API_KEY}&query=${searchQuery}`,
    { params: { language: "ko" } }
  );

  const debouncedSearch = debounce((query) => {
    setSearchQuery(query);
    setIsTyping(false);
  }, 300); // 300ms 후에 검색 쿼리 업데이트

  const handleSearch = () => {
    setSearchQuery(query);
    setIsTyping(false);
  };

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setIsTyping(true);
    debouncedSearch(newQuery); // 디바운스된 검색 호출
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
      {isLoading && (
        <SkeletonGrid>
          {Array.from({ length: 20 }).map((_, index) => (
            <Skeleton key={index} height={180} width={120} />
          ))}
        </SkeletonGrid>
      )}
      {isError && (
        <ErrorMessage>오류가 발생했습니다: {error.message}</ErrorMessage>
      )}
      {movies && movies.length > 0 ? (
        <MovieGrid>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </MovieGrid>
      ) : (
        searchQuery && !isLoading && (
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
`;