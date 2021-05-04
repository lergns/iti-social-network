import { combineReducers, createStore } from "redux";
import { profileReducer } from "./profileReducer";
import { dialoguesReducer } from "./dialoguesReducer";
import { usersReducer } from "./usersReducer";

export type RootStateType = ReturnType<typeof rootReducer>;
type StoreType = typeof store;

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialoguesPage: dialoguesReducer,
  usersPage: usersReducer,
});

export const store = createStore(rootReducer);
