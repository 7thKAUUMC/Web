import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as S from './search.style.js';
import useCustomFetch from '../hooks/use-custom-fetch.js';
import Card from '../components/Card/card.jsx';
import SkeletonCard from '../components/SkeletonCard/SkeletonCard.jsx';
import useDebounce from '../hooks/useDebounce.js'; // useDebounce 훅 임포트

const SearchPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();
    const onChangeSearchValue = (event) => {
        setSearchValue(event.target.value);
    };
    const [searchParams] = useSearchParams({
        mq: ''
    });
    const mq = searchParams.get('mq');

    // 디바운스된 검색 값 (500ms 지연)
    const debouncedSearchValue = useDebounce(searchValue, 500);

    useEffect(() => {
        if (debouncedSearchValue) {
            // 검색어가 변경되고 디바운스 시간이 지난 후에 검색 수행
            if (mq !== debouncedSearchValue) {
                navigate(`/search?mq=${debouncedSearchValue}`);
            }
        }
    }, [debouncedSearchValue, mq, navigate]);

    const handleSearchMovie = () => {
        if (mq === searchValue) return;
        navigate(`/search?mq=${searchValue}`);
    };

    const handleSearchMovieKeyboard = (e) => {
        if (e.key === 'Enter') {
            handleSearchMovie();
        }
    };

    const url = `/search/movie?query=${debouncedSearchValue}&include_adult=false&language=ko-KR&page=1`;
    const { data: movies, isLoading, isError } = useCustomFetch(url);
    
    console.log(movies);
    return (
        <>
            <S.SearchContainer>
                <input
                    placeholder="영화 제목을 입력해주세요..."
                    value={searchValue}
                    onChange={onChangeSearchValue}
                    onKeyDown={handleSearchMovieKeyboard}
                />
                <button onClick={handleSearchMovie}>검색</button>
            </S.SearchContainer>
            {isLoading && (
                <S.CardsContainer>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <SkeletonCard key={index} />
                    ))}
                </S.CardsContainer>
            )}
            {isError && <p>오류가 발생했습니다.</p>}
            {!isLoading && (
                <S.CardsContainer>
                    {movies && movies.results && movies.results.map((movie) => (
                        <Card key={movie.id} movie={movie} />
                    ))}
                </S.CardsContainer>
            )}
        </>
    );
};

export default SearchPage;