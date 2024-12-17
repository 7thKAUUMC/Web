import React, { useEffect } from "react"; // useEffect 추가
import { useSelector, useDispatch } from "react-redux";
import { clearCart, calculateTotals } from "../features/cart/cartSlice.js"; // calculateTotals 추가
import CartItem from "./CartItem";
import {
  CartSection,
  CartHeader,
  CartItemsContainer,
  CartFooter,
  ClearButton,
} from "./CartContainer.style.js";

const CartContainer = () => {
  const { cartItems, total, amount } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]); // cartItems가 변경될 때마다 total과 amount 재계산

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
        <ClearButton onClick={() => dispatch(clearCart())}>
          장바구니 초기화
        </ClearButton>
      </CartFooter>
    </CartSection>
  );
};

export default CartContainer;
