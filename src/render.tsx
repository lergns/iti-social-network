import ReactDOM from "react-dom";
import { addPost, RootStateType } from "./redux/state";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
// NO state import ! state is received in index.tsx in order to avoid circular dependency

export const reRenderApp = (state: RootStateType) => {
  ReactDOM.render(
    <BrowserRouter>
      <App state={state} addPost={addPost} />
    </BrowserRouter>,
    document.getElementById("root")
  );
};
