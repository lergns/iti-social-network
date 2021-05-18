import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import { HeaderContainer } from "./components/Header/HeaderContainer";
import { Navbar } from "./components/Navbar/Navbar";
import { DialoguesContainer } from "./components/Dialogues/DialoguesContainer";
import { UsersContainer } from "./components/Users/UsersContainer";
import { ProfileContainer } from "./components/Profile/ProfileContainer";

export function App() {
  return (
    <div className={"app-wrapper"}>
      <HeaderContainer />
      <Navbar />
      <div className={"app-wrapper-content"}>
        <Route path={"/profile/:userID?"} render={() => <ProfileContainer />} />
        <Route path={"/dialogues"} render={() => <DialoguesContainer />} />
        <Route path={"/users"} render={() => <UsersContainer />} />
      </div>
    </div>
  );
}
