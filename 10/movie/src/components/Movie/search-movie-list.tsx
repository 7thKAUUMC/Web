import Card from '../Card/card.jsx';
import { useCustomFetch } from '../../hooks/useCustomFetch';
import { useSearchParams } from 'react-router-dom';
import * as S from './search-movie-list.style';

const SearchMovieList = () => {
    const [searchParams, setSearchParams] = useSearchParams({mq: ''});
    const mq = searchParams.get('mq');
    const url = `/search/movie?query=${mq}&include_adult=false&language=ko-KR&page=1`;
    const {data: movies, isLoading, isError} = useCustomFetch(url);

    console.log(movies);
    return (
        <S.MovieGridContainer>
            {movies.data?.results.map((movie) => (
                <Card key={movie.id} movie={movie} />
            ))}
        </S.MovieGridContainer>
    );
};

export default SearchMovieList; 