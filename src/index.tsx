import React from "react";
import "./index.css";
import { store } from "./redux/store";
import ReactDOM from "react-dom";
import { AppContainer } from "./AppContainer";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </HashRouter>,
  document.getElementById("root")
);
