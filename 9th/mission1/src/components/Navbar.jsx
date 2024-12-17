import React from "react";
import { useSelector } from "react-redux";
import { CartIcon } from "../constants/icons.jsx";
import { Nav, NavCenter, NavContainer, AmountContainer } from "./Navbar.style";

const Navbar = () => {
  const { amount } = useSelector((state) => state.cart);

  return (
    <Nav>
      <NavCenter>
        <h3>REAL DATA UMC Playlist</h3>
        <NavContainer>
          <CartIcon />
          <AmountContainer>
            <p>{amount}</p>
          </AmountContainer>
        </NavContainer>
      </NavCenter>
    </Nav>
  );
};

export default Navbar;
