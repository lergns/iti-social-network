import { authAPI, ResultCode } from "../../api/API";
import { RootThunkType } from "../redux-store";
import { stopSubmit } from "redux-form";

type AuthInitialStateType = typeof authInitialState;
export type AuthReducerActionTypes = ReturnType<typeof setAuthUserData>;
// TYPES

const authInitialState = {
  id: null as number | null,
  login: null as string | null,
  email: null as string | null,
  isAuth: false as boolean,
};

export const authReducer = (
  authState = authInitialState,
  action: AuthReducerActionTypes
): AuthInitialStateType => {
  switch (action.type) {
    case "auth/SET_AUTH_USER_DATA":
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
// ACs

export const getAuthUserData = (): RootThunkType => async (dispatch) => {
  try {
    const res = await authAPI.me();
    if (res.resultCode === ResultCode.Success) {
      const { id, email, login } = res.data;
      dispatch(setAuthUserData(id, email, login, true));
    }
  } catch (e) {
    console.log(e);
    alert("An error has occurred. Please try again later.");
  }
};
export const login = (
  email: string,
  password: string,
  rememberMe?: boolean
): RootThunkType => async (dispatch) => {
  try {
    const res = await authAPI.login(email, password, rememberMe);
    if (res.resultCode === ResultCode.Success) {
      dispatch(getAuthUserData()); // dispatching thunk from another thunk
    } else {
      alert("Incorrect email or password.");
      const errMessage = res.messages.length
        ? res.messages[0]
        : "Incorrect log in data";
      dispatch(stopSubmit("loginForm", { _error: errMessage }));
    }
  } catch (e) {
    console.log(e);
    alert("An error has occurred. Please try again later.");
  }
};
export const logout = (): RootThunkType => async (dispatch) => {
  try {
    const res = await authAPI.logout();
    if (res.resultCode === ResultCode.Success) {
      dispatch(setAuthUserData(null, null, null, false));
    }
  } catch (e) {
    console.log(e);
    alert("An error has occurred. Please try again later.");
  }
};
// TCs
