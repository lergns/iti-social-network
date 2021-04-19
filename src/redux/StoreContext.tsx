import React from "react";
import { ReduxStoreType } from "./redux-store";

export type ProviderType = {
  store: ReduxStoreType;
  children: React.ReactNode;
};

export const StoreContext = React.createContext({} as ReduxStoreType);

export const Provider = (props: ProviderType) => {
  return (
    <StoreContext.Provider value={props.store}>
      {props.children}
    </StoreContext.Provider>
  );
};
