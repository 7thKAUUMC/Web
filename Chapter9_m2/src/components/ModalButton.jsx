import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { closeModal } from "../features/modal/modalSlice"; // closeModal 가져오기
import styled from "styled-components";

const ModalButton = () => {
  const dispatch = useDispatch();

  return (
    <ButtonContainer>
      <button
        type="button"
        className="btn confirm-btn"
        onClick={() => {
          dispatch(clearCart());
          dispatch(closeModal()); // 모달 닫기
        }}
      >
        네
      </button>
      <button
        type="button"
        className="btn clear-btn"
        onClick={() => {
          dispatch(closeModal()); // 모달 닫기
        }}
      >
        아니요
      </button>
    </ButtonContainer>
  );
};

export default ModalButton;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;

  .btn {
    background: #000000;
    border: none;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 14px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;

    &:hover {
      background: #c4c4c4;
    }
  }

  .confirm-btn {
    margin-right: 1rem;
  }
`;
