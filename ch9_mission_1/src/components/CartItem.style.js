import styled from "styled-components";

export const CartItemContainer = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  margin-bottom: 1rem;
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
    color: #000000;
  }

  p {
    color: #6366f1;
    font-weight: 500;
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
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 0.5rem;
  border-radius: 0.5rem;

  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.25rem;
    color: #FFD700;  // 금색으로 변경
    transition: all 0.2s ease;

    svg {
    width: 20px;
    height: 20px;
    }
    
    &:hover {
      transform: scale(1.1);
      color: #DAA520;  // hover 시 더 진한 금색으로 변경
    }
  }

  p {
    font-size: 1.2rem;
    font-weight: 400;
    margin: 0 0.5rem;
    color: #000000;  // 검은색으로 변경
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