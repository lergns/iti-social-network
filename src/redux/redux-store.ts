import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import {
  profileReducer,
  ProfileReducerActionTypes,
} from "./profile/profileReducer";
import {
  dialoguesReducer,
  DialoguesReducerActionTypes,
} from "./dialogues/dialoguesReducer";
import { usersReducer, UsersReducerActionTypes } from "./users/usersReducer";
import { authReducer, AuthReducerActionTypes } from "./auth/authReducer";
import thunk, { ThunkAction } from "redux-thunk";
import { FormAction, reducer as formReducer } from "redux-form";
import { appReducer, AppReducerActionTypes } from "./app/appReducer";

export type RootStateType = ReturnType<typeof rootReducer>;
export type RootActionTypes =
  | UsersReducerActionTypes
  | AuthReducerActionTypes
  | ProfileReducerActionTypes
  | DialoguesReducerActionTypes
  | AppReducerActionTypes
  | FormAction; // type of action objects of all reducers
// ReturnType = void || Promise<void>
export type RootThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  RootStateType,
  unknown,
  RootActionTypes
>; // type of thunk creator function to be able to dispatch another thunk

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
window.__store__ = store;
