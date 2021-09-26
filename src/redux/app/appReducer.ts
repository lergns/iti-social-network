import { InferActionsType, RootThunkType } from "../store";
import { getAuthUserData } from "../auth/authReducer";

type AppInitialStateType = typeof appInitialState;
type AppReducerActionsType = InferActionsType<typeof appActions>;
// TYPES

const appInitialState = { isInitialized: false };

export const appReducer = (
  appState = appInitialState,
  action: AppReducerActionsType
): AppInitialStateType => {
  switch (action.type) {
    case "app/SET_INITIALIZED":
      return { ...appState, ...action.payload };

    default:
      return appState;
  }
};
// REDUCER

export const appActions = {
  setInitialized: (isInitialized: boolean) =>
    ({
      type: "app/SET_INITIALIZED",
      payload: {
        isInitialized,
      },
    } as const),
};
// ACs

export const initializeApp = (): RootThunkType<AppReducerActionsType> => async (
  dispatch
) => {
  try {
    // dispatch(getAuthUserData()) - returns promise
    await dispatch(getAuthUserData());
    dispatch(appActions.setInitialized(true));
  } catch (e) {
    console.warn(e);
  }
};
// TCs
