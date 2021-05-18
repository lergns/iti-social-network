import { combineReducers, createStore } from "redux";
import { profileReducer } from "./profileReducer";
import { dialoguesReducer } from "./dialoguesReducer";
import { usersReducer } from "./usersReducer";
import { authReducer } from "./authReducer";

export type RootStateType = ReturnType<typeof rootReducer>;
type StoreType = typeof store;

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialoguesPage: dialoguesReducer,
  usersPage: usersReducer,
  auth: authReducer,
});

export const store = createStore(rootReducer);

// @ts-ignore
window.store = store;
