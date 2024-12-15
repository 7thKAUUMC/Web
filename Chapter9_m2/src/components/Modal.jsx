import styled from "styled-components";
import ModalButton from "./ModalButton";

const Modal = ({ children }) => {
  return (
    <ModalContainer onClick={(e) => e.stopPropagation()}>
      <ModalContent>{children}</ModalContent>
      <ModalButton />
    </ModalContainer>
  );
};

export default Modal;

const ModalContainer = styled.div`
  background: #ffffff;
  width: 400px;
  height: 300px;
  border-radius: 0px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1.5rem;
`;

const ModalContent = styled.div`
  margin-bottom: 1rem;

  h4 {
    font-size: 1.5rem;
    font-weight: 300;
    color: #000000;
  }
`;
