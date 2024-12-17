import useStore from "../store/store";
import {
  ButtonContainer,
  ConfirmButton,
  CancelButton,
} from "./ModalButton.style";

const ModalButton = () => {
  const { clearCart, closeModal } = useStore();

  return (
    <ButtonContainer>
      <ConfirmButton
        type="button"
        onClick={() => {
          clearCart();
          closeModal();
        }}
      >
        네
      </ConfirmButton>
      <CancelButton type="button" onClick={closeModal}>
        아니요
      </CancelButton>
    </ButtonContainer>
  );
};

export default ModalButton;
