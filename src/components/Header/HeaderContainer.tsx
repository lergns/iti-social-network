import React from "react";
import { Header } from "./Header";
import { connect } from "react-redux";
import { logout } from "../../redux/auth/authReducer";
import { RootStateType } from "../../redux/store";
import { selectIsAuth, selectLogin } from "../../redux/auth/authSelectors";
// IMPORTS

type MapStatePropsType = {
  isAuth: ReturnType<typeof selectIsAuth>;
  login: ReturnType<typeof selectLogin>;
};
type MapDispatchPropsType = {
  logout: () => void;
};
export type HeaderPropsType = MapStatePropsType & MapDispatchPropsType;
// TYPES

// HeaderContainer --> HeaderClassContainer --> Header
class HeaderClassContainer extends React.PureComponent<HeaderPropsType> {
  render = () => {
    return <Header {...this.props} />;
  };
}

const mapStateToProps = (state: RootStateType): MapStatePropsType => ({
  isAuth: selectIsAuth(state),
  login: selectLogin(state),
});

export const HeaderContainer = connect<
  MapStatePropsType,
  MapDispatchPropsType,
  unknown,
  RootStateType
>(mapStateToProps, {
  logout,
})(HeaderClassContainer);
