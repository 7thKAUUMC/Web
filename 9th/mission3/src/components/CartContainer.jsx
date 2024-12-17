import React, { useEffect } from "react";
import useStore from "../store/store";
import CartItem from "./CartItem";
import {
  CartSection,
  CartHeader,
  CartItemsContainer,
  CartFooter,
  ClearButton,
} from "./CartContainer.style";

const CartContainer = () => {
  const { cartItems, total, amount, calculateTotals, openModal } = useStore();

  useEffect(() => {
    calculateTotals();
  }, [cartItems, calculateTotals]);

  if (amount < 1) {
    return (
      <CartSection>
        <CartHeader>
          <h2>당신이 선택한 음원</h2>
          <h4 className="empty-cart">장바구니가 비었습니다</h4>
        </CartHeader>
      </CartSection>
    );
  }

  return (
    <CartSection>
      <CartHeader>
        <h2>당신이 선택한 음원</h2>
      </CartHeader>
      <CartItemsContainer>
        {cartItems.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </CartItemsContainer>
      <CartFooter>
        <hr />
        <div className="cart-total">
          <h4>
            총 가격 <span>\ {total}원</span>
          </h4>
        </div>
        <ClearButton onClick={openModal}>장바구니 초기화</ClearButton>
      </CartFooter>
    </CartSection>
  );
};

export default CartContainer;
