import React, { useState, useEffect, useCallback } from "react";
import * as S from "./search.style";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchMovieList from "../../components/Movie/search-movie-list.jsx";
import { debounce } from "lodash";

const Search = () => {
  const [query, setQuery] = useState(""); // search value
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams({ q: "" });
  const q = searchParams.get("q");

  useEffect(() => {
    if (q) {
      setQuery(q);
    }
  }, [q]);

  // debounce search
  const debouncedSearch = useCallback(
    debounce((value) => {
      console.log("debouncedSearch", value);
      setQuery(value);
    }, 300),
    []
  );

  const handleSearch = (e) => {
    setQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleSearchMovie = () => {
    if (query === q || query === "") return;
    navigate(`/search?q=${query}`);
  };

  const handleSearchMovieWithKeyboard = (e) => {
    if (e.key === "Enter") {
      handleSearchMovie();
    }
  };

  return (
    <>
      <S.SearchContainer>
        <input
          type="text"
          placeholder="영화 제목을 입력해주세요."
          value={query}
          onChange={handleSearch}
          onKeyDown={handleSearchMovieWithKeyboard}
        />
        <button onClick={handleSearchMovie}>검색</button>
      </S.SearchContainer>

      <SearchMovieList query={q} />
    </>
  );
};

export default Search;
