import { authAPI, ResultCode, securityAPI } from "../../api/API";
import { RootThunkType } from "../redux-store";
import { stopSubmit } from "redux-form";
import { setCurrentPage } from "../users/usersReducer";

type AuthInitialStateType = typeof authInitialState;
export type AuthReducerActionTypes =
  | ReturnType<typeof setAuthUserData>
  | ReturnType<typeof setCaptchaURL>;
// TYPES

const authInitialState = {
  id: null as number | null,
  login: null as string | null,
  email: null as string | null,
  isAuth: false as boolean,
  captchaURL: null as null | string,
};

export const authReducer = (
  authState = authInitialState,
  action: AuthReducerActionTypes
): AuthInitialStateType => {
  switch (action.type) {
    case "auth/SET_AUTH_USER_DATA":
    case "auth/SET_CAPTCHA_URL":
      return { ...authState, ...action.payload };

    default:
      return authState;
  }
};
// REDUCER

export const setAuthUserData = (
  id: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
) =>
  ({
    type: "auth/SET_AUTH_USER_DATA",
    payload: {
      id,
      email,
      login,
      isAuth,
    },
  } as const);
export const setCaptchaURL = (captchaURL: string | null) =>
  ({
    type: "auth/SET_CAPTCHA_URL",
    payload: {
      captchaURL,
    },
  } as const);
// ACs

export const getAuthUserData = (): RootThunkType => async (dispatch) => {
  try {
    const res = await authAPI.me();
    if (res.resultCode === ResultCode.Success) {
      const { id, email, login } = res.data;
      dispatch(setAuthUserData(id, email, login, true));
    }
  } catch (e) {
    console.warn(e);
    alert("An error has occurred. Please try again later.");
  }
};
export const login = (
  email: string,
  password: string,
  rememberMe?: boolean,
  captcha?: string
): RootThunkType => async (dispatch) => {
  try {
    const res = await authAPI.login(email, password, rememberMe, captcha);
    if (res.resultCode === ResultCode.Success) {
      dispatch(getAuthUserData()); // dispatching thunk from another thunk
      dispatch(setCurrentPage(1));
    } else {
      if (res.resultCode === ResultCode.Captcha) {
        dispatch(getCaptchaURL()); // dispatching thunk from another thunk
      }
      const errMessage = res.messages.length
        ? res.messages[0]
        : "Incorrect log in data";
      alert(errMessage);
      dispatch(stopSubmit("loginForm", { _error: errMessage }));
    }
  } catch (e) {
    console.warn(e);
    alert("An error has occurred. Please try again later.");
  }
};
export const logout = (): RootThunkType => async (dispatch) => {
  try {
    const res = await authAPI.logout();
    if (res.resultCode === ResultCode.Success) {
      dispatch(setAuthUserData(null, null, null, false));
      dispatch(setCaptchaURL(null));
      dispatch(setCurrentPage(1));
    } else {
      const errMessage = res.messages[0];
      alert(errMessage);
      console.warn(errMessage); // handling errors by resultCode
    }
  } catch (e) {
    console.warn(e);
    alert("An error has occurred. Please try again later."); // handling errors by status code
  }
};
export const getCaptchaURL = (): RootThunkType => async (dispatch) => {
  try {
    const res = await securityAPI.getCaptcha();
    const captchaURL = res.url;
    dispatch(setCaptchaURL(captchaURL));
  } catch (e) {
    console.warn(e);
    alert("An error has occurred. Please try again later.");
  }
};
// TCs
