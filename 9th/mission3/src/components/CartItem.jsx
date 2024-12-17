import React from "react";
import { ChevronDown, ChevronUp } from "../constants/icons";
import useStore from "../store/store";
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
  const { increase, decrease, removeItem } = useStore();

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
          <button onClick={() => increase(id)}>
            <ChevronUp />
          </button>
          <p>{amount}</p>
          <button
            onClick={() => {
              if (amount === 1) {
                removeItem(id);
                return;
              }
              decrease(id);
            }}
          >
            <ChevronDown />
          </button>
        </AmountControl>
        <RemoveButton onClick={() => removeItem(id)}>삭제</RemoveButton>
      </ControlGroup>
    </CartItemContainer>
  );
};

export default CartItem;
