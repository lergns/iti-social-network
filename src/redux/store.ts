import {
  Action,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from "redux";
import { profileReducer } from "./profile/profileReducer";
import { dialoguesReducer } from "./dialogues/dialoguesReducer";
import { usersReducer } from "./users/usersReducer";
import { authReducer } from "./auth/authReducer";
import thunk, { ThunkAction } from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import { appReducer } from "./app/appReducer";

export type InferActionsType<T> = T extends {
  [key: string]: (...args: any[]) => infer U;
}
  ? U
  : never; // universal type to auto-infer type of any actions' object

// R = (void | Promise<void>)
export type RootThunkType<A extends Action, R = Promise<void>> = ThunkAction<
  R,
  RootStateType,
  unknown,
  A // A === PARTICULARReducerActionsType
>;

export type RootStateType = ReturnType<typeof rootReducer>;
// TYPES

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialoguesPage: dialoguesReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
  form: formReducer,
});

// configuring Redux DevTools for this app
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

// @ts-ignore
window.store = store;
