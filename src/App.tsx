import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header/Header";
import { Navbar } from "./components/Navbar/Navbar";
import { Dialogues } from "./components/Dialogues/Dialogues";
import { Profile } from "./components/Profile/Profile";
import { RootStateType } from "./redux/state";

type AppPropsType = {
  state: RootStateType;
  addPost: (postText: string) => void;
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
            <Profile state={props.state.profilePage} addPost={props.addPost} />
          )}
        />
        <Route
          path={"/dialogues"}
          render={() => <Dialogues state={props.state.dialoguesPage} />}
        />
        {/* render={} and component={} are mutually exclusive <Route /> attributes. render={} receives callback with actual JSX (unlike component={}, which received component (function) name -> it is possible to pass props via render={} ! To pass props via component={}, assign callback with JSX markup to a variable and pass it inside of component={} */}
      </div>
    </div>
  );
}
