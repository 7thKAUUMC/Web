import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { ChevronDown, ChevronUp } from '../constants/icons';
import { increase, decrease, removeItem } from '../features/cart/cartSlice';

const CartItem = ({ id, title, singer, price, img, amount }) => {
  const dispatch = useDispatch();

  return (
    <Article>
      <img src={img} alt={`${title} 이미지`} />
      <div>
        <h4>
          {title} | {singer}
        </h4>

        <h4 className="item-price">₩ {price}</h4>
      </div>
      <div>
        <button className="amount-btn" onClick={() => dispatch(increase(id))}>
          <ChevronUp size="30px" color="#ffffff" clickable />
        </button>
        <p className="amount">{amount}</p>

        <button
          className="amount-btn"
          onClick={() => {
            if (amount === 1) {
              dispatch(removeItem(id));
              return;
            }
            dispatch(decrease(id));
          }}
        >
          <ChevronDown size="30px" color="#ffffff" clickable/>
        </button>
      </div>
    </Article>
  );
};

export default CartItem;

const Article = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.4rem;
  padding: 1.2rem;
  border: 1px solid #ddd;
  border-radius: 22px;
  background: #e0e0e0;

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 0px;
    margin-right: 20px;
  }

  h4 {
    margin: 0.5rem 0;
    font-weight: 400;
    font-size: 18px;
  }

  .item-price {
    color: #2f16ff;
    font-weight: 300;
  }

  .amount {
    font-size: 1.4rem;
    font-weight: 900;
    color: #ffffff;
    position: relative;
    left: 16px;
  }

  .amount-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
  }

  .div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;