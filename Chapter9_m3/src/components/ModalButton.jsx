import styled from 'styled-components';
import useStore from '../features/store';

const ModalButton = () => {
  const clearCart = useStore((state) => state.cart.clearCart);
  const closeModal = useStore((state) => state.modal.closeModal);

  return (
    <ButtonContainer>
      <button
        type="button"
        className="btn confirm-btn"
        onClick={() => {
          console.log('네 버튼 클릭');
          clearCart(); 
          closeModal(); 
        }}
      >
        네
      </button>
      <button
        type="button"
        className="btn clear-btn"
        onClick={() => {
          console.log('아니요 버튼 클릭');
          closeModal(); 
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
