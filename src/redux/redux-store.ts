import { combineReducers, createStore } from "redux";
import { profileReducer } from "./profileReducer";
import { dialoguesReducer } from "./dialoguesReducer";
import { usersReducer } from "./usersReducer";

export type RootStateType = ReturnType<typeof rootReducer>; // TS automatically sets type for return value of a function !
type StoreType = typeof store; // TS automatically sets type for typeof OBJECT/FUNCTION/etc.

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialoguesPage: dialoguesReducer,
  usersPage: usersReducer,
}); // rootReducer() returns state of the whole app !

export const store = createStore(rootReducer);
