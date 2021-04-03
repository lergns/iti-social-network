import React from "react";
import "./index.css";
import state, { addPost, subscribe, updateNewPostText } from "./redux/state";
import ReactDOM from "react-dom";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";

const renderApp = () => {
  ReactDOM.render(
    <BrowserRouter>
      <App
        state={state}
        addPost={addPost}
        updateNewPostText={updateNewPostText}
      />
    </BrowserRouter>,
    document.getElementById("root")
  );
};

subscribe(renderApp); // subscriber/observer callback

renderApp();
