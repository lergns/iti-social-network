import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header/Header";
import { Navbar } from "./components/Navbar/Navbar";
import { Profile } from "./components/Profile/Profile";
import { DialoguesContainer } from "./components/Dialogues/DialoguesContainer";
import { UsersContainer } from "./components/Users/UsersContainer";

export function App() {
  return (
    <div className={"app-wrapper"}>
      <Header />
      <Navbar />
      <div className={"app-wrapper-content"}>
        <Route path={"/profile"} render={() => <Profile />} />
        <Route path={"/dialogues"} render={() => <DialoguesContainer />} />
        <Route path={"/users"} render={() => <UsersContainer />} />
      </div>
    </div>
  );
}
