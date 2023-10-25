/* eslint-disable react-refresh/only-export-components */
// First, I'll import the createContext, useContext and useReducer from React

import React, { createContext, useContext, useReducer } from "react";
import { reducer, initialState, MatchState, MatchActions } from "./reducer";
const MatchStateContext = createContext<MatchState | undefined>(undefined);

type MatchDispatch = React.Dispatch<MatchActions>;

// Using createContext function, we will create a context
// called `ProjectsDispatchContext`. Let's say the shape of this new
// context object is ProjectsDispatch (which I'll define now, wait for it).
// I've set the default value to undefined.

const MatchDispatchContext = createContext<MatchDispatch | undefined>(
  undefined
);
export const MatchProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Next, I'll pass the `dispatch` object as value of this ProjectsDispatchContext.

  return (
    <MatchStateContext.Provider value={state}>
      <MatchDispatchContext.Provider value={dispatch}>
        {children}
      </MatchDispatchContext.Provider>
    </MatchStateContext.Provider>
  );
};

// Next, I'll define our ProjectsProvider component, and make this
// ProjectsStateContext available using context Provider.

export const useMatchState = () => useContext(MatchStateContext);
export const useMatchDispatch = () => useContext(MatchDispatchContext);
