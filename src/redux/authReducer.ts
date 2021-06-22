import { authAPI, ResultCode } from "../api/API";
import { AppThunkType } from "./redux-store";
import { stopSubmit } from "redux-form";

type AuthInitialStateType = typeof authInitialState;
export type AuthReducerActionTypes = ReturnType<typeof setAuthUserData>;
// TYPES

export const setAuthUserData = (
  id: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
) =>
  ({
    type: "SET_AUTH_USER_DATA",
    payload: {
      id,
      email,
      login,
      isAuth,
    },
  } as const);
// ACs

export const getAuthUserData = (): AppThunkType => (dispatch) => {
  authAPI.me().then((res) => {
    if (res.resultCode === ResultCode.Success) {
      dispatch(
        setAuthUserData(res.data.id, res.data.email, res.data.login, true)
      );
    }
  });
};
export const login = (
  email: string,
  password: string,
  rememberMe?: boolean
): AppThunkType => (dispatch) => {
  authAPI.login(email, password, rememberMe).then((res) => {
    if (res.resultCode === ResultCode.Success) {
      dispatch(getAuthUserData()); // dispatching thunk from another thunk
    } else {
      const errMessage = res.messages.length
        ? res.messages[0]
        : "Incorrect log in data";
      dispatch(
        stopSubmit("loginForm", { _error: errMessage })
      ); /* stopSubmit(FORM NAME, {ERROR FORM FIELD: "MESSAGE TO BE DISPLAYED ON FORM FIELD ERROR"}) === AC (imported from redux-form) - returns action object to be dispatched on error on form validation ; _error - special property - checks form-level errors (regardless of particular field) */
    }
  });
};
export const logout = (): AppThunkType => (dispatch) => {
  authAPI.logout().then((res) => {
    if (res.resultCode === ResultCode.Success) {
      dispatch(setAuthUserData(null, null, null, false));
    }
  });
};
// TCs

const authInitialState = {
  id: null as number | null,
  login: null as string | null,
  email: null as string | null,
  isAuth: false as boolean,
};

export const authReducer = (
  authState: AuthInitialStateType = authInitialState,
  action: AuthReducerActionTypes
): AuthInitialStateType => {
  switch (action.type) {
    case "SET_AUTH_USER_DATA":
      return { ...authState, ...action.payload };

    default:
      return authState;
  }
};
