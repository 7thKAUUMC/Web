import ModalButton from "./ModalButton";
import { ModalOverlay, ModalContainer } from "./Modal.style";

const Modal = ({ children }) => {
  return (
    <ModalOverlay
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          // 모달 닫기 로직
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
