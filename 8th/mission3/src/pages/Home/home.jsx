import { useState } from "react";
import Card from "../../components/Card/card.jsx";
import useCustomFetch from "../../hooks/useCustomFetch.js";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as S from "./home.style.js";

export const ITEMS_PER_PAGE = 1;

const CATEGORIES = [
  { id: "recommended", name: "추천", query: "/movie/popular" },
  { id: "discover", name: "발견", query: "/discover/movie" },
  { id: "trending", name: "트렌딩", query: "/trending/movie/week" },
  { id: "topRated", name: "인기작", query: "/movie/top_rated" },
];

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [currentPage, setCurrentPage] = useState(0);

  const {
    data: movies,
    isLoading,
    isError,
  } = useCustomFetch(`${activeCategory.query}?language=ko-KR`);

  if (isLoading) {
    return <S.LoadingScreen>로딩중...</S.LoadingScreen>;
  }

  if (isError) {
    return <S.ErrorScreen>에러가 발생했습니다 😢</S.ErrorScreen>;
  }

  const moviesList = movies?.results || [];
  const totalPages = Math.ceil(moviesList.length / ITEMS_PER_PAGE);
  const currentMovies = moviesList.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <S.Container>
      <S.Categories>
        {CATEGORIES.map((category) => (
          <S.CategoryButton
            key={category.id}
            $active={category.id === activeCategory.id}
            onClick={() => {
              setActiveCategory(category);
              setCurrentPage(0);
            }}
          >
            #{category.name}
          </S.CategoryButton>
        ))}
      </S.Categories>

      <S.CarouselContainer>
        <S.CarouselButton onClick={prevPage} disabled={currentPage === 0}>
          <ChevronLeft size={40} />
        </S.CarouselButton>

        <S.MovieGrid>
          {currentMovies.map((movie) => (
            <S.MovieCard key={movie.id}>
              <S.MoviePoster
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <S.MovieInfo>
                <S.MovieTitle>{movie.title}</S.MovieTitle>
                <S.MovieOverview>
                  {movie.overview.slice(0, 100)}...
                </S.MovieOverview>
              </S.MovieInfo>
            </S.MovieCard>
          ))}
        </S.MovieGrid>

        <S.CarouselButton
          onClick={nextPage}
          disabled={currentPage >= totalPages - 1}
        >
          <ChevronRight size={40} />
        </S.CarouselButton>
      </S.CarouselContainer>

      <S.Pagination>
        {Array.from({ length: totalPages }).map((_, index) => (
          <S.PageDot
            key={index}
            $active={index === currentPage}
            onClick={() => setCurrentPage(index)}
          />
        ))}
      </S.Pagination>
    </S.Container>
  );
};

export default HomePage;
