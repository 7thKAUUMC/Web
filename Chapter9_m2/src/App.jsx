import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import CartContainer from './components/CartContainer';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { useEffect } from 'react';
import { calculateTotals } from './features/cart/cartSlice';
import ModalPortal from './components/ModalPortal';
import Modal from './components/Modal';

function App() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  return (
    <AppWrapper>
      <header>
        <Navbar />
      </header>
      <main>
        <CartContainer />
        {isOpen && (
          <ModalPortal>
            <Backdrop>
              <Modal>
                <h4>담아두신 모든 음반을 삭제하시겠습니까?</h4>
              </Modal>
            </Backdrop>
          </ModalPortal>
        )}
      </main>
      <footer>
        <Footer />
      </footer>
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7); /* 검정 투명 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 가장 위에 표시 */
`;