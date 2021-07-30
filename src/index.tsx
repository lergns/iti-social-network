import React from "react";
import "./index.css";
import { store } from "./redux/redux-store";
import ReactDOM from "react-dom";
import { AppContainer } from "./AppContainer";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
