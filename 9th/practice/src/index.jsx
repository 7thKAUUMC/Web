import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
console.log("index.js is rendering");
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
