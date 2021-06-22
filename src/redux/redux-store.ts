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

type StoreType = typeof store;
export type RootStateType = ReturnType<typeof rootReducer>;
export type AppActionTypes =
  | UsersReducerActionTypes
  | AuthReducerActionTypes
  | ProfileReducerActionTypes
  | DialoguesReducerActionTypes
  | FormAction; // type of action objects of all reducers
export type AppThunkType<ReturnType = void> = ThunkAction<
  // ReturnType = void === default parameter
  ReturnType,
  RootStateType,
  unknown,
  AppActionTypes
>; // type of thunk creator function to dispatch another thunk

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialoguesPage: dialoguesReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store;
