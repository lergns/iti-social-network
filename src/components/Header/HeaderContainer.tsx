import React from "react";
import { Header } from "./Header";
import axios from "axios";
import { connect } from "react-redux";
import { AuthType, setAuthUserData } from "../../redux/authReducer";
import { RootStateType } from "../../redux/redux-store";
// IMPORTS

type MapStatePropsType = {
  isAuth: boolean;
  login: string | null;
};
type MapDispatchPropsType = {
  setAuthUserData: (data: AuthType) => void;
};
type HeaderClassContainerPropsType = MapStatePropsType & MapDispatchPropsType;
// TYPES

// container component --> container component --> presentational component
export class HeaderClassContainer extends React.Component<HeaderClassContainerPropsType> {
  componentDidMount() {
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
        withCredentials: true,
      }) // {withCredentials: true} - explicitly indicates that cookie should be attached to the request
      .then((promise) => {
        if (promise.data.resultCode === 0) {
          this.props.setAuthUserData(promise.data.data);
        }
      });
  }

  render = () => {
    // passing all props from <HeaderClassContainer /> into <Header />
    return <Header {...this.props} />;
  };
}

const mapStateToProps = (state: RootStateType): MapStatePropsType => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});

export const HeaderContainer = connect(mapStateToProps, { setAuthUserData })(
  HeaderClassContainer
);
