import { createContext, useReducer } from "react";
import idReducer from "./idReducer";

const initialState = {
  clientId: "",
  error: null,
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(idReducer, initialState);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;
