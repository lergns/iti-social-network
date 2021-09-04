import { RootStateType } from "../../redux/redux-store";
import { Login } from "./Login";
import { connect } from "react-redux";
import { login } from "../../redux/auth/authReducer";
import { selectIsAuth } from "../../redux/auth/authSelectors";

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {
  login: (email: string, password: string, rememberMe?: boolean) => void;
};
export type LoginPropsType = MapStatePropsType & MapDispatchPropsType;

const mapStateToProps = (state: RootStateType) => ({
  isAuth: selectIsAuth(state),
});

const LoginContainer = connect<
  MapStatePropsType,
  MapDispatchPropsType,
  unknown,
  RootStateType
>(mapStateToProps, { login })(Login);

export default LoginContainer;
