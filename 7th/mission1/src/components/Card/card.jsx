// components/Card/card.jsx
import React from "react";
import { Link } from "react-router-dom"; // Link 컴포넌트 임포트
import * as S from "./card.style.js"; // 스타일 컴포넌트를 위한 파일 임포트

const Card = ({ movie }) => {
  return (
    <S.CardContainer>
      <Link to={`/movies/${movie.id}`}>
        {" "}
        {/* 영화 ID에 기반한 링크 추가 */}
        <S.Poster
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // 이미지 URL
          alt={movie.title}
        />
      </Link>
      <S.Info>
        <S.Title>{movie.title}</S.Title>
        <S.ReleaseDate>{movie.release_date}</S.ReleaseDate>
      </S.Info>
    </S.CardContainer>
  );
};

export default Card;
