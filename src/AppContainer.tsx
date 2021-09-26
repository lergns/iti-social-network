import React from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import "./AppContainer.css";
import { HeaderContainer } from "./components/Header/HeaderContainer";
import { Navbar } from "./components/Navbar/Navbar";
import { connect } from "react-redux";
import { RootStateType } from "./redux/store";
import { compose } from "redux";
import { initializeApp } from "./redux/app/appReducer";
import { Preloader } from "./components/common/Preloader/Preloader";
import { selectIsInitialized } from "./redux/app/appSelectors";
import { withSuspense } from "./hoc/withSuspense";

const UsersLazyContainer = React.lazy(
  () => import("./components/Users/UsersContainer")
);
const SuspendedUsersContainer = withSuspense(UsersLazyContainer);
const ProfileLazyContainer = React.lazy(
  () => import("./components/Profile/ProfileContainer")
);
const SuspendedProfileContainer = withSuspense(ProfileLazyContainer);
const DialoguesLazyContainer = React.lazy(
  () => import("./components/Dialogues/DialoguesContainer")
);
const SuspendedDialoguesContainer = withSuspense(DialoguesLazyContainer);
const LoginLazyContainer = React.lazy(
  () => import("./components/Login/LoginContainer")
);
const SuspendedLoginContainer = withSuspense(LoginLazyContainer);
// lazy-loaded components

type MapStatePropsType = {
  isInitialized: ReturnType<typeof selectIsInitialized>;
};
type MapDispatchPropsType = {
  initializeApp: () => void;
};
type AppClassContainerPropsType = MapStatePropsType & MapDispatchPropsType;

class AppClassContainer extends React.PureComponent<AppClassContainerPropsType> {
  componentDidMount() {
    this.props.initializeApp();

    window.addEventListener(
      "unhandledrejection",
      this.catchUnhandledRejections
    );
  }

  // clearing subscription on component unmount
  componentWillUnmount() {
    window.removeEventListener(
      "unhandledrejection",
      this.catchUnhandledRejections
    );
  }

  // subscribing to all unhandled promise rejections
  catchUnhandledRejections = (event: PromiseRejectionEvent) => {
    console.warn(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
  };

  render = () => {
    if (!this.props.isInitialized) {
      return <Preloader />;
    } else {
      return (
        <div className={"app-wrapper"}>
          <HeaderContainer />
          <Navbar />
          <div className={"app-wrapper-content"}>
            <Switch>
              <Route
                path={"/profile/:userID?"}
                render={() => <SuspendedProfileContainer />}
              />
              <Route
                path={"/dialogues"}
                render={() => <SuspendedDialoguesContainer />}
              />
              <Route
                path={"/users"}
                render={() => <SuspendedUsersContainer />}
              />
              <Route
                path={"/login"}
                render={() => <SuspendedLoginContainer />}
              />
              <Route path={"/news"} render={() => <h1>News</h1>} />
              <Route path={"/settings"} render={() => <h1>Settings</h1>} />
              <Redirect from={"/"} to={"/profile"} />
              <Redirect from={"*"} to={"/profile"} />
            </Switch>
          </div>
        </div>
      );
    }
  };
}

const mapStateToProps = (state: RootStateType): MapStatePropsType => ({
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
