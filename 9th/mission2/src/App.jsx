import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import Footer from "./components/Footer";
import "./App.css";
import ModalPortal from "../../mission1/src/components/ModalPortal";
import Modal from "./components/Modal";
import { useSelector } from "react-redux";

function App() {
  const { isOpen } = useSelector((state) => state.modal);
  return (
    <>
      <header className="header-container">
        <Navbar />
      </header>
      <main className="main-container">
        <CartContainer />
        {isOpen && (
          <ModalPortal>
            <Modal>
              <h4>담아두신 모든 음반을 삭제하시겠습니까?</h4>
            </Modal>
          </ModalPortal>
        )}
      </main>
      <footer className="footer-container">
        <Footer />
      </footer>
    </>
  );
}
export default App;
