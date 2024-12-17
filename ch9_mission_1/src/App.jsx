import React from 'react';
import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { calculateTotal } from "./features/cart/cartSlice";

function App() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((store) => store.cart);

  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems, dispatch]);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <CartContainer />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;