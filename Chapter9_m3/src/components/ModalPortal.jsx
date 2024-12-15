import reactDom from "react-dom";
import styled from "styled-components";

const ModalPortal = ({ children }) => {
  if (typeof window === "undefined") {
    return null;
  }

  const node = document.getElementById("portal");
  if (!node) {
    return null;
  }

  return reactDom.createPortal(children, node);
};

export default ModalPortal;
