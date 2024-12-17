import ModalButton from "./ModalButton";
import { ModalOverlay, ModalContainer } from "./Modal.style";
import useStore from "../store/store";

const Modal = ({ children }) => {
  const closeModal = useStore((state) => state.closeModal);

  return (
    <ModalOverlay
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeModal();
        }
      }}
    >
      <ModalContainer>
        {children}
        <ModalButton />
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
