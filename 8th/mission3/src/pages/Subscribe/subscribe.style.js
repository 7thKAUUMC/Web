import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 20px;
  color: white;
  min-height: 100vh;
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
`;

export const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #b3b3b3;
`;

export const PlansContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

export const PlanCard = styled.div`
  background: #222;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

export const PlanTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

export const PlanPrice = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

export const PlanFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 20px;

  li {
    margin-bottom: 10px;
  }
`;

export const SubscribeButton = styled.button`
  background: #ff1b6d;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #e10255;
  }
`;
