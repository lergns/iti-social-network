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
      return { ...appState, ...action.payload };

    default:
      return appState;
  }
};
// REDUCER

export const setInitialized = (isInitialized: boolean) =>
  ({
    type: "app/SET_INITIALIZED",
    payload: {
      isInitialized,
    },
  } as const);
// ACs

export const initializeApp = (): RootThunkType => async (dispatch) => {
  try {
    // dispatch(getAuthUserData()) - returns promise
    await dispatch(getAuthUserData());
    dispatch(setInitialized(true));
  } catch (e) {
    console.warn(e);
  }
};
// TCs
