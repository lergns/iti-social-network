import { RootStateType } from "./redux-store";

export const selectIsInitialized = (state: RootStateType): boolean =>
  state.app.isInitialized;
