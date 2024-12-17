import styled from "styled-components";

export const CartSection = styled.section`
  padding: 2rem 1.5rem;
  margin: 0 auto;
  max-width: 800px;
  background-color: #262626;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
`;

export const CartHeader = styled.header`
  h2 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #ffffff;
  }

  .empty-cart {
    color: #9ca3af;
    font-size: 1.2rem;
  }
`;

export const CartItemsContainer = styled.div`
  margin: 2rem 0;
  background-color: #333333;
  border-radius: 0.5rem;
  padding: 1rem;
`;

export const CartFooter = styled.footer`
  hr {
    border: none;
    border-top: 1px solid #4b5563;
    margin: 2rem 0;
  }

  .cart-total {
    color: #ffffff;
  }
`;

export const ClearButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #4B0082;  // 진한 인디고 색상
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #6A5ACD;  // 슬레이트 블루로 변경
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(75, 0, 130, 0.3);
  }
`;