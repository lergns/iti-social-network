import React from "react";
import "./index.css";
import store from "./redux/store";
import ReactDOM from "react-dom";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";

const renderApp = () => {
  ReactDOM.render(
    <BrowserRouter>
      <App
        state={store.getState()} // getState() - with () --> returns value of method ("getter"), NOT callback !
        dispatch={store.dispatch.bind(store)} // passing callbacks - not CALLED () on store directly --> this keyword will be set to an object, calling the function; .bind() has to be set WHEN passing method as CALLBACK !
      />
    </BrowserRouter>,
    document.getElementById("root")
  );
};

store.subscribe(renderApp);

renderApp();
