import { RootStateType } from "../../redux/store";
import { Login } from "./Login";
import { connect } from "react-redux";
import { login } from "../../redux/auth/authReducer";
import { selectCaptchaURL, selectIsAuth } from "../../redux/auth/authSelectors";

type MapStatePropsType = {
  isAuth: ReturnType<typeof selectIsAuth>;
  captchaURL: ReturnType<typeof selectCaptchaURL>;
};
type MapDispatchPropsType = {
  login: (
    email: string,
    password: string,
    rememberMe?: boolean,
    captcha?: string
  ) => void;
};
export type LoginPropsType = MapStatePropsType & MapDispatchPropsType;

const mapStateToProps = (state: RootStateType): MapStatePropsType => ({
  isAuth: selectIsAuth(state),
  captchaURL: selectCaptchaURL(state),
});

const LoginContainer = connect<
  MapStatePropsType,
  MapDispatchPropsType,
  unknown,
  RootStateType
>(mapStateToProps, { login })(Login);

export default LoginContainer;
