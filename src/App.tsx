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
  addPost: () => void;
  updateNewPostText: (newPostText: string) => void;
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
              addPost={props.addPost}
              updateNewPostText={props.updateNewPostText}
            />
          )}
        />
        <Route
          path={"/dialogues"}
          render={() => (
            <Dialogues dialoguesPageState={props.state.dialoguesPage} />
          )}
        />
      </div>
    </div>
  );
}
