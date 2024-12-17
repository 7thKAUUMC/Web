import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <>
      <header className="header-container">
        <Navbar />
      </header>
      <main className="main-container">
        <CartContainer />
      </main>
      <footer className="footer-container">
        <Footer />
      </footer>
    </>
  );
}
export default App;
