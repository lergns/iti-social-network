import React from "react";
import "./index.css";
import { reduxStore } from "./redux/redux-store";
import ReactDOM from "react-dom";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "./redux/StoreContext";

const renderApp = () => {
  ReactDOM.render(
    <BrowserRouter>
      <Provider store={reduxStore}>
        <App />
      </Provider>
    </BrowserRouter>,
    document.getElementById("root")
  );
};

reduxStore.subscribe(renderApp); // Redux's reduxStore doesn't pass state to _callSubscriber() function on its call

renderApp();
