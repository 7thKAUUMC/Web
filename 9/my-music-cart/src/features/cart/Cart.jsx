import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, clearCart, calculateTotals } from './cartSlice';
import { CartIcon, ChevronUp, ChevronDown } from '../../constants/icons';
import styled from 'styled-components';

const CartContainer = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15px 0;
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
`;

const ItemDetails = styled.div`
  flex: 1;
  margin-left: 20px;
  text-align: left;
`;

const ItemTitle = styled.h4`
  margin: 0;
  font-size: 1.2em;
  color: #333;
`;

const ItemSinger = styled.p`
  margin: 5px 0;
  color: #666;
`;

const ItemPrice = styled.p`
  margin: 5px 0;
  font-weight: bold;
  color: #000;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Amount = styled.span`
  margin: 0 10px;
  font-size: 1.1em;
  color: #333;
`;

const ClearButton = styled(Button)`
  background-color: #dc3545;
  margin-top: 20px;

  &:hover {
    background-color: #c82333;
  }
`;

const TotalContainer = styled.div`
  margin-top: 20px;
  text-align: right;
  font-size: 1.2em;
  color: #333;
`;

const Cart = () => {
  const { items, totalAmount, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [items, dispatch]);

  return (
    <CartContainer>
      <CartIcon />
      {items.map((item) => (
        <CartItem key={item.id}>
          <ItemImage src={item.img} alt={item.title} />
          <ItemDetails>
            <ItemTitle>{item.title}</ItemTitle>
            <ItemSinger>{item.singer}</ItemSinger>
            <ItemPrice>{item.price}원</ItemPrice>
            <div>
              <Button onClick={() => dispatch(decrement(item.id))}>
                <ChevronDown />
              </Button>
              <Amount>{item.amount}</Amount>
              <Button onClick={() => dispatch(increment(item.id))}>
                <ChevronUp />
              </Button>
            </div>
          </ItemDetails>
        </CartItem>
      ))}
      {items.length > 0 && (
        <ClearButton onClick={() => dispatch(clearCart())}>
          장바구니 초기화
        </ClearButton>
      )}
      <TotalContainer>
        <p>전체 수량: {totalAmount}개</p>
        <p>전체 금액: {totalPrice.toLocaleString()}원</p>
      </TotalContainer>
    </CartContainer>
  );
};

export default Cart;