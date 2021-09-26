import { RootStateType } from "../store";

export const selectIsInitialized = (state: RootStateType): boolean =>
  state.app.isInitialized;
