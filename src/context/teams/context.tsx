/* eslint-disable react-refresh/only-export-components */
// First, I'll import the createContext, useContext and useReducer from React

import React, { createContext, useContext, useReducer } from "react";
import { reducer, initialState, TeamState, TeamActions } from "./reducer";
const TeamStateContext = createContext<TeamState | undefined>(undefined);

type TeamDispatch = React.Dispatch<TeamActions>;

// Using createContext function, we will create a context
// called `ProjectsDispatchContext`. Let's say the shape of this new
// context object is ProjectsDispatch (which I'll define now, wait for it).
// I've set the default value to undefined.

const TeamDispatchContext = createContext<TeamDispatch | undefined>(undefined);
export const TeamProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Next, I'll pass the `dispatch` object as value of this ProjectsDispatchContext.

  return (
    <TeamStateContext.Provider value={state}>
      <TeamDispatchContext.Provider value={dispatch}>
        {children}
      </TeamDispatchContext.Provider>
    </TeamStateContext.Provider>
  );
};

// Next, I'll define our ProjectsProvider component, and make this
// ProjectsStateContext available using context Provider.

export const useTeamState = () => useContext(TeamStateContext);
export const useTeamDispatch = () => useContext(TeamDispatchContext);
