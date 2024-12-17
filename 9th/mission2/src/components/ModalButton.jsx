import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice.js";
import {
  ButtonContainer,
  ConfirmButton,
  CancelButton,
} from "./ModalButton.style.js";
import { closeModal } from "../features/modal/modalSlice.js";

const ModalButton = () => {
  const dispatch = useDispatch();

  return (
    <ButtonContainer>
      <ConfirmButton
        type="button"
        onClick={() => {
          dispatch(clearCart());
          // TODO: 모달도 꺼지는 상태를 연결
          dispatch(closeModal());
        }}
      >
        네
      </ConfirmButton>
      <CancelButton
        type="button"
        onClick={() => {
          dispatch(closeModal());
        }}
      >
        아니요
      </CancelButton>
    </ButtonContainer>
  );
};

export default ModalButton;
