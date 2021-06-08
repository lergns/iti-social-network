import { combineReducers, createStore, applyMiddleware } from "redux";
import { profileReducer } from "./profileReducer";
import { dialoguesReducer } from "./dialoguesReducer";
import { usersReducer } from "./usersReducer";
import { authReducer } from "./authReducer";
import thunk from "redux-thunk";
import { reducer as formReducer } from "redux-form";

export type RootStateType = ReturnType<typeof rootReducer>;
type StoreType = typeof store;

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
