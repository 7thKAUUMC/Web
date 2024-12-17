import React from "react";
import { CartIcon } from "../constants/icons.jsx";
import useStore from "../store/store";
import {
  Nav,
  NavCenter,
  NavContainer,
  AmountContainer,
} from "./Navbar.style.js";

const Navbar = () => {
  const { amount } = useStore();

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
