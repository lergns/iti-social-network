import { RootStateType } from "../store";

export const selectAuthUserID = (state: RootStateType): number | null =>
  state.auth.id;
export const selectIsAuth = (state: RootStateType): boolean =>
  state.auth.isAuth;
export const selectLogin = (state: RootStateType): string | null =>
  state.auth.login;
export const selectCaptchaURL = (state: RootStateType): null | string =>
  state.auth.captchaURL;
