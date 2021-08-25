import React from "react";
import { Route, withRouter } from "react-router-dom";
import "./AppContainer.css";
import { HeaderContainer } from "./components/Header/HeaderContainer";
import { Navbar } from "./components/Navbar/Navbar";
import { DialoguesContainer } from "./components/Dialogues/DialoguesContainer";
import { UsersContainer } from "./components/Users/UsersContainer";
import { ProfileContainer } from "./components/Profile/ProfileContainer";
import { LoginContainer } from "./components/Login/LoginContainer";
import { connect } from "react-redux";
import { RootStateType } from "./redux/redux-store";
import { compose } from "redux";
import { initializeApp } from "./redux/app/appReducer";
import { Preloader } from "./components/common/Preloader/Preloader";
import { selectIsInitialized } from "./redux/app/appSelectors";

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
            <Route
              path={"/profile/:userID?"}
              render={() => <ProfileContainer />}
            />
            <Route path={"/dialogues"} render={() => <DialoguesContainer />} />
            <Route path={"/users"} render={() => <UsersContainer />} />
            <Route path={"/login"} render={() => <LoginContainer />} />
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
