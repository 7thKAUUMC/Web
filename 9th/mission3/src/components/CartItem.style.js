import styled from "styled-components";

export const CartItemContainer = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  margin-bottom: 1rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex: 1;
`;

export const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 0.25rem;
`;

export const ItemDetails = styled.div`
  h4 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  p {
    color: #666;
    font-size: 1rem;
  }
`;

// 새로운 컨트롤 그룹 컴포넌트
export const ControlGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const AmountControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-right: 1px solid #eee;
  padding-right: 1rem;

  button {
    background: none;
    border: none;
    color: #3498db;
    cursor: pointer;
    padding: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 20px;
      height: 20px;
    }

    &:hover {
      color: #2980b9;
    }
  }

  p {
    font-size: 1.2rem;
    font-weight: 500;
    margin: 0 0.5rem;
  }
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.5rem;
  transition: color 0.2s;

  &:hover {
    color: #c0392b;
  }
`;
