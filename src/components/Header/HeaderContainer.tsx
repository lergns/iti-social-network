import React from "react";
import { Header } from "./Header";
import { connect } from "react-redux";
import { logout } from "../../redux/auth/authReducer";
import { RootStateType } from "../../redux/redux-store";
import { selectIsAuth, selectLogin } from "../../redux/auth/authSelectors";
// IMPORTS

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {
  logout: () => void;
};
type HeaderClassContainerPropsType = MapStatePropsType & MapDispatchPropsType;
// TYPES

// HeaderContainer --> HeaderClassContainer --> Header
class HeaderClassContainer extends React.PureComponent<HeaderClassContainerPropsType> {
  render = () => {
    return <Header {...this.props} />;
  };
}

const mapStateToProps = (state: RootStateType) => ({
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
