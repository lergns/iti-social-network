import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header/Header";
import { Navbar } from "./components/Navbar/Navbar";
import { Dialogues } from "./components/Dialogues/Dialogues";
import { Profile } from "./components/Profile/Profile";
import { ActionTypes, RootStateType } from "./redux/store";

type AppPropsType = {
  state: RootStateType;
  dispatch: (action: ActionTypes) => void;
};

export function App(props: AppPropsType) {
  return (
    <div className={"app-wrapper"}>
      <Header />
      <Navbar />
      <div className={"app-wrapper-content"}>
        <Route
          path={"/profile"}
          render={() => (
            <Profile
              profilePageState={props.state.profilePage}
              dispatch={props.dispatch}
            />
          )}
        />
        <Route
          path={"/dialogues"}
          render={() => (
            <Dialogues
              dialoguesPageState={props.state.dialoguesPage}
              dispatch={props.dispatch}
            />
          )}
        />
      </div>
    </div>
  );
}
