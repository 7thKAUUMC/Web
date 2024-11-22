import styled from "styled-components";
// import { ITEMS_PER_PAGE } from "./home";

const ITEMS_PER_PAGE = 1;

export const Container = styled.div`
  padding: 20px;
  min-height: 100vh;
`;

export const Categories = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
  padding: 20px 0;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CategoryButton = styled.button`
  background: ${(props) => (props.$active ? "#ff1b6d" : "transparent")};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: #ff1b6d;
  }
`;

export const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
`;

export const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${ITEMS_PER_PAGE}, 1fr);
  gap: 20px;
  flex: 1;
`;

export const MovieCard = styled.div`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);

    img {
      filter: brightness(0.3);
    }

    div {
      opacity: 1;
    }
  }
`;

export const MoviePoster = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: filter 0.3s ease;
`;

export const MovieInfo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const MovieTitle = styled.h3`
  margin: 0 0 10px 0;
  font-size: 1.2rem;
  font-weight: bold;
`;

export const MovieOverview = styled.p`
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.4;
`;

export const CarouselButton = styled.button`
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 27, 109, 0.8);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    &:hover {
      background: rgba(0, 0, 0, 0.5);
    }
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

export const PageDot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: ${(props) =>
    props.$active ? "#ff1b6d" : "rgba(255, 255, 255, 0.3)"};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #ff1b6d;
  }
`;

export const LoadingScreen = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
`;

export const ErrorScreen = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
`;
