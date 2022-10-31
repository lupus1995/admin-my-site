import React from "react";

import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

/**
 * hidrate подхватывает с бека полученную html код и на его основе продолжает строить dom дерево
 */
ReactDOM.hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector("#root")
);
