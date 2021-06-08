import React, { ComponentType } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { RootStateType } from "../redux/redux-store";

type MapStatePropsType = {
  isAuth: boolean;
};

// "ConnectedRedirectComponent" --> RedirectComponent --> Component
export function withAuthRedirect<T>(Component: ComponentType<T>) {
  const RedirectComponent = (props: MapStatePropsType) => {
    const { isAuth, ...restProps } = props;

    if (!isAuth) return <Redirect to={"/login"} />;

    return <Component {...(restProps as T)} />;
  };

  const mapStateToProps = (state: RootStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
  });

  // "ConnectedRedirectComponent"
  return connect(mapStateToProps)(RedirectComponent);
}
