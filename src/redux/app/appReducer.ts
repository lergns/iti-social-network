import { RootThunkType } from "../redux-store";
import { getAuthUserData } from "../auth/authReducer";

type AppInitialStateType = typeof appInitialState;
export type AppReducerActionTypes = ReturnType<typeof setInitialized>;
// TYPES

const appInitialState = { isInitialized: false };

export const appReducer = (
  appState = appInitialState,
  action: AppReducerActionTypes
): AppInitialStateType => {
  switch (action.type) {
    case "app/SET_INITIALIZED":
      return { ...appState, isInitialized: true };

    default:
      return appState;
  }
};
// REDUCER

export const setInitialized = () => ({ type: "app/SET_INITIALIZED" } as const);
// ACs

export const initializeApp = (): RootThunkType => async (dispatch) => {
  try {
    // dispatch(getAuthUserData()) - returns promise
    await dispatch(getAuthUserData());
    dispatch(setInitialized());
  } catch (e) {
    console.log(e);
    alert("An error has occurred. Please try again later.");
  }
};
// TCs
