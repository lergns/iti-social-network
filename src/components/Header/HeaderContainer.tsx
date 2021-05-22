import React from "react";
import { Header } from "./Header";
import { connect } from "react-redux";
import { getAuthUserData } from "../../redux/authReducer";
import { RootStateType } from "../../redux/redux-store";
// IMPORTS

type MapStatePropsType = {
  isAuth: boolean;
  login: string | null;
};
type MapDispatchPropsType = {
  getAuthUserData: () => void;
};
type HeaderClassContainerPropsType = MapStatePropsType & MapDispatchPropsType;
// TYPES

// HeaderContainer --> HeaderClassContainer --> Header
export class HeaderClassContainer extends React.Component<HeaderClassContainerPropsType> {
  componentDidMount() {
    this.props.getAuthUserData();
  }

  render = () => {
    return <Header {...this.props} />;
  };
}

const mapStateToProps = (state: RootStateType): MapStatePropsType => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});

export const HeaderContainer = connect(mapStateToProps, { getAuthUserData })(
  HeaderClassContainer
);
