// pages/MoviesPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';
import styled from 'styled-components';

// 영화 카테고리 데이터 (Unsplash 이미지를 사용)
const categories = [
    {
        title: '현재 상영중',
        imageUrl: 'https://images.unsplash.com/photo-1523207911345-32501502db22?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        path: '/movies/now-playing',
    },
    {
        title: '인기있는',
        imageUrl: 'https://images.unsplash.com/photo-1523207911345-32501502db22?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
        path: '/movies/popular',

    },
    {
        title: '높은 평가를 받은',
        imageUrl: 'https://images.unsplash.com/photo-1523207911345-32501502db22?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
        path: '/movies/top-rated',
    },
    {
        title: '개봉 예정중인',
        imageUrl: 'https://images.unsplash.com/photo-1523207911345-32501502db22?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
        path: '/movies/up-coming',
    }
];

// 스타일드 컴포넌트 설정
const Container = styled.div`
  padding: 20px;
`;


const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 20px;
`;

const MoviesPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <h1>카테고리</h1>
      <CategoryGrid>
        {categories.map((category) => (
          <CategoryCard 
            key={category.title} 
            category={category} 
            onClick={() => navigate(category.path)} // 클릭 시 경로로 이동
          />
        ))}
      </CategoryGrid>
    </Container>
  );
};

export default MoviesPage;