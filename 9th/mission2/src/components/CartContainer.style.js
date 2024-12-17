import styled from "styled-components";

export const CartSection = styled.section`
  padding: 2rem 1.5rem;
  margin: 0 auto;
  max-width: 800px;
`;

export const CartHeader = styled.header`
  text-align: center;
  margin-bottom: 2rem;

  h2 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .empty-cart {
    color: #666;
    font-size: 1.2rem;
  }
`;

export const CartItemsContainer = styled.div`
  margin: 2rem 0;
`;

export const CartFooter = styled.footer`
  hr {
    border: none;
    border-top: 1px solid #ddd;
    margin: 2rem 0;
  }

  .cart-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1rem 0;

    h4 {
      font-size: 1.2rem;
      font-weight: bold;
    }

    span {
      color: #333;
      font-weight: bold;
    }
  }
`;

export const ClearButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 0.25rem;
  background-color: #e74c3c;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #c0392b;
  }
`;
