import { RootThunkType } from "./redux-store";
import { getAuthUserData } from "./authReducer";

type AppInitialStateType = typeof appInitialState;
export type AppReducerActionTypes = ReturnType<typeof setInitialized>;
// TYPES

export const setInitialized = () => ({ type: "SET_INITIALIZED" } as const);
// ACs

export const initializeApp = (): RootThunkType => (dispatch) => {
  dispatch(getAuthUserData()).then(() => dispatch(setInitialized()));
};
// TCs

const appInitialState = { isInitialized: false };

export const appReducer = (
  appState: AppInitialStateType = appInitialState,
  action: AppReducerActionTypes
): AppInitialStateType => {
  switch (action.type) {
    case "SET_INITIALIZED":
      return { ...appState, isInitialized: true };

    default:
      return appState;
  }
};
