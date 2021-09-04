import React from "react";
import { Route, withRouter } from "react-router-dom";
import "./AppContainer.css";
import { HeaderContainer } from "./components/Header/HeaderContainer";
import { Navbar } from "./components/Navbar/Navbar";
import { connect } from "react-redux";
import { RootStateType } from "./redux/redux-store";
import { compose } from "redux";
import { initializeApp } from "./redux/app/appReducer";
import { Preloader } from "./components/common/Preloader/Preloader";
import { selectIsInitialized } from "./redux/app/appSelectors";
import { withSuspense } from "./hoc/withSuspense";

const UsersContainer = React.lazy(
  () => import("./components/Users/UsersContainer")
);
const ProfileContainer = React.lazy(
  () => import("./components/Profile/ProfileContainer")
);
const DialoguesContainer = React.lazy(
  () => import("./components/Dialogues/DialoguesContainer")
);
const LoginContainer = React.lazy(
  () => import("./components/Login/LoginContainer")
); // lazy-loaded components

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {
  initializeApp: () => void;
};
type AppClassContainerPropsType = MapStatePropsType & MapDispatchPropsType;

class AppClassContainer extends React.PureComponent<AppClassContainerPropsType> {
  componentDidMount() {
    this.props.initializeApp();
  }

  render = () => {
    if (!this.props.isInitialized) {
      return <Preloader />;
    } else {
      return (
        <div className={"app-wrapper"}>
          <HeaderContainer />
          <Navbar />
          <div className={"app-wrapper-content"}>
            <Route exact path={"/"} render={withSuspense(ProfileContainer)} />
            <Route
              path={"/profile/:userID?"}
              render={withSuspense(ProfileContainer)}
            />
            <Route
              path={"/dialogues"}
              render={withSuspense(DialoguesContainer)}
            />
            <Route path={"/users"} render={withSuspense(UsersContainer)} />
            <Route path={"/login"} render={withSuspense(LoginContainer)} />
          </div>
        </div>
      );
    }
  };
}

const mapStateToProps = (state: RootStateType) => ({
  isInitialized: selectIsInitialized(state),
});

export const AppContainer = compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, unknown, RootStateType>(
    mapStateToProps,
    {
      initializeApp,
    }
  ),
  withRouter
)(AppClassContainer);
