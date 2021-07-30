import { combineReducers, createStore, applyMiddleware } from "redux";
import { profileReducer, ProfileReducerActionTypes } from "./profileReducer";
import {
  dialoguesReducer,
  DialoguesReducerActionTypes,
} from "./dialoguesReducer";
import { usersReducer, UsersReducerActionTypes } from "./usersReducer";
import { authReducer, AuthReducerActionTypes } from "./authReducer";
import thunk, { ThunkAction } from "redux-thunk";
import { FormAction, reducer as formReducer } from "redux-form";
import { appReducer, AppReducerActionTypes } from "./appReducer";

type StoreType = typeof store;
export type RootStateType = ReturnType<typeof rootReducer>;
export type RootActionTypes =
  | UsersReducerActionTypes
  | AuthReducerActionTypes
  | ProfileReducerActionTypes
  | DialoguesReducerActionTypes
  | AppReducerActionTypes
  | FormAction; // type of action objects of all reducers
export type RootThunkType<ReturnType = void> = ThunkAction<
  // ReturnType = void === default parameter
  ReturnType,
  RootStateType,
  unknown,
  RootActionTypes
>; // type of thunk creator function to dispatch another thunk

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialoguesPage: dialoguesReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
  form: formReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
