import styled from 'styled-components';
import useStore from '../features/store';
import CartItem from './CartItem';

const CartContainer = () => {
  const { cartItems, total } = useStore((state) => state.cart);
  const openModal = useStore((state) => state.modal.openModal);

  return (
    <Section>
      <Header>
        <h2>당신이 선택한 음반</h2>
      </Header>
      <div>
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
      <Footer>
        <hr />
        <div className="cart-total">
          <h4>
            총 가격 <span>₩ {total}원</span>
          </h4>
        </div>
        <button className="btn clear-btn" onClick={openModal}>
          장바구니 초기화
        </button>
      </Footer>
    </Section>
  );
};

export default CartContainer;

const Section = styled.section`
  padding: 3rem;
  background: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 2rem auto;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;

  h2 {
    font-size: 2.4rem;
    font-weight: 700;
    color: #000000;
  }
`;

const Footer = styled.footer`
  margin-top: 2rem;

  hr {
    margin-bottom: 1rem;
  }

  .cart-total {
    display: flex;
    justify-content: space-between;
    font-size: 1.2rem;
    font-weight: 300;
    color: #000000;
  }

  .btn {
    margin-top: 1rem;
    background: #000000;
    border: none;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 14px;
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: 600;

    &:hover {
      background: #c4c4c4;
    }
  }
`;
