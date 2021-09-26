import React, { ComponentType } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { RootStateType } from "../redux/store";
import { selectIsAuth } from "../redux/auth/authSelectors";

type MapStatePropsType = {
  isAuth: ReturnType<typeof selectIsAuth>;
};

// "ConnectedRedirectComponent" --> RedirectComponent --> Component
export function withAuthRedirect<WCP>(WrappedComponent: ComponentType<WCP>) {
  const RedirectComponent = (props: MapStatePropsType) => {
    const { isAuth, ...restProps } = props;

    if (!isAuth) return <Redirect to={"/login"} />;

    return <WrappedComponent {...(restProps as WCP)} />;
  };

  const mapStateToProps = (state: RootStateType): MapStatePropsType => ({
    isAuth: selectIsAuth(state),
  });

  // "ConnectedRedirectComponent"
  return connect<MapStatePropsType, unknown, WCP, RootStateType>(
    mapStateToProps
  )(RedirectComponent);
}
