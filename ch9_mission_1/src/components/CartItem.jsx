import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../features/cart/cartSlice.jsx';
import CartItem from './CartItem';

const CartContainer = () => {
  const { cartItems, total, amount } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  if (amount < 1) {
    return (
      <section className='cart'>
        <header>
          <h2>당신이 선택한 음원</h2>
          <h4 className='empty-cart'>장바구니가 비었습니다</h4>
        </header>
      </section>
    );
  }

  return (
    <section className='cart'>
      <header>
        <h2>당신이 선택한 음원</h2>
      </header>
      <div>
        {cartItems.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </div>
      <footer>
        <hr />
        <div className='cart-total'>
          <h4>
            총 가격 <span>\ {total}원</span>
          </h4>
        </div>
        <button
          className='btn clear-btn'
          onClick={() => {
            dispatch(clearCart());
          }}
        >
          장바구니 초기화
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;