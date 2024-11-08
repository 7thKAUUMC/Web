// components/CategoryCard.jsx
import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background-color: #333;
  color: white;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Title = styled.h3`
  padding: 10px;
`;

const CategoryCard = ({ category, onClick }) => {
  return (
    <Card onClick={onClick}>
      <Image src={category.imageUrl} alt={category.title} />
      <Title>{category.title}</Title>
    </Card>
  );
};

export default CategoryCard;
