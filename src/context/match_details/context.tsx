/* eslint-disable react-refresh/only-export-components */
// First, I'll import the createContext, useContext and useReducer from React

import React, { createContext, useContext, useReducer } from "react";
import {
  reducer,
  initialState,
  MatchDetailsState,
  MatchDetailsActions,
} from "./reducer";
const MatchDetailsStateContext = createContext<MatchDetailsState | undefined>(
  undefined
);

type MatchDetailsDispatch = React.Dispatch<MatchDetailsActions>;

// Using createContext function, we will create a context
// called `ProjectsDispatchContext`. Let's say the shape of this new
// context object is ProjectsDispatch (which I'll define now, wait for it).
// I've set the default value to undefined.

const MatchDetailsDispatchContext = createContext<
  MatchDetailsDispatch | undefined
>(undefined);
export const MatchDetailProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Next, I'll pass the `dispatch` object as value of this ProjectsDispatchContext.

  return (
    <MatchDetailsStateContext.Provider value={state}>
      <MatchDetailsDispatchContext.Provider value={dispatch}>
        {children}
      </MatchDetailsDispatchContext.Provider>
    </MatchDetailsStateContext.Provider>
  );
};

// Next, I'll define our ProjectsProvider component, and make this
// ProjectsStateContext available using context Provider.

export const useMatchDetailsState = () => useContext(MatchDetailsStateContext);
export const useMatchDetailsDispatch = () =>
  useContext(MatchDetailsDispatchContext);
