export type AuthType = {
  id: number | null;
  login: string | null;
  email: string | null;
  isAuth: boolean;
};
type AuthInitialStateType = typeof authInitialState;
type AuthReducerActionTypes = ReturnType<typeof setAuthUserData>;
// TYPES

const SET_AUTH_USER_DATA = "SET-AUTH-USER-DATA";

export const setAuthUserData = (data: AuthType) =>
  ({
    type: SET_AUTH_USER_DATA,
    data,
  } as const);

const authInitialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
} as AuthType;

export const authReducer = (
  authState: AuthInitialStateType = authInitialState,
  action: AuthReducerActionTypes
): AuthInitialStateType => {
  switch (action.type) {
    case SET_AUTH_USER_DATA:
      return { ...authState, ...action.data, isAuth: true };

    default:
      return authState;
  }
};
