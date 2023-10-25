/* eslint-disable react-refresh/only-export-components */
// First, I'll import the createContext, useContext and useReducer from React

import React, { createContext, useContext, useReducer } from "react";
import { reducer, initialState, SportState, SportActions } from "./reducer";
const SportStateContext = createContext<SportState | undefined>(undefined);

type SportDispatch = React.Dispatch<SportActions>;

// Using createContext function, we will create a context
// called `ProjectsDispatchContext`. Let's say the shape of this new
// context object is ProjectsDispatch (which I'll define now, wait for it).
// I've set the default value to undefined.

const SportDispatchContext = createContext<SportDispatch | undefined>(
  undefined
);
export const SportProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Next, I'll pass the `dispatch` object as value of this ProjectsDispatchContext.

  return (
    <SportStateContext.Provider value={state}>
      <SportDispatchContext.Provider value={dispatch}>
        {children}
      </SportDispatchContext.Provider>
    </SportStateContext.Provider>
  );
};

// Next, I'll define our ProjectsProvider component, and make this
// ProjectsStateContext available using context Provider.

export const useSportState = () => useContext(SportStateContext);
export const useSportDispatch = () => useContext(SportDispatchContext);
