import React from "react";
import { ChevronDown, ChevronUp } from "../constants/icons";
import { useDispatch } from "react-redux";
import { removeItem, increase, decrease } from "../features/cart/cartSlice";
import {
  CartItemContainer,
  ItemInfo,
  ItemImage,
  ItemDetails,
  ControlGroup,
  AmountControl,
  RemoveButton,
} from "./CartItem.style";

const CartItem = ({ id, img, title, price, amount }) => {
  const dispatch = useDispatch();

  return (
    <CartItemContainer>
      <ItemInfo>
        <ItemImage src={img} alt={title} />
        <ItemDetails>
          <h4>{title}</h4>
          <p>₩ {price}</p>
        </ItemDetails>
      </ItemInfo>

      <ControlGroup>
        <AmountControl>
          <button onClick={() => dispatch(increase(id))}>
            <ChevronUp />
          </button>
          <p>{amount}</p>
          <button
            onClick={() => {
              if (amount === 1) {
                dispatch(removeItem(id));
                return;
              }
              dispatch(decrease(id));
            }}
          >
            <ChevronDown />
          </button>
        </AmountControl>
        <RemoveButton onClick={() => dispatch(removeItem(id))}>
          삭제
        </RemoveButton>
      </ControlGroup>
    </CartItemContainer>
  );
};

export default CartItem;
