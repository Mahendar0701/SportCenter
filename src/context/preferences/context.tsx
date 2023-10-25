/* eslint-disable react-refresh/only-export-components */
// First, I'll import the createContext, useContext and useReducer from React

import React, { createContext, useContext, useReducer } from "react";
import {
  reducer,
  initialState,
  PreferencesState,
  PreferencesActions,
} from "./reducer";
const PreferencesStateContext = createContext<PreferencesState | undefined>(
  undefined
);
type PreferencesDispatch = React.Dispatch<PreferencesActions>;

// Using createContext function, we will create a context
// called `ProjectsDispatchContext`. Let's say the shape of this new
// context object is ProjectsDispatch (which I'll define now, wait for it).
// I've set the default value to undefined.

const PreferencesDispatchContext = createContext<
  PreferencesDispatch | undefined
>(undefined);
export const PreferencesProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Next, I'll pass the `dispatch` object as value of this ProjectsDispatchContext.

  return (
    <PreferencesStateContext.Provider value={state}>
      <PreferencesDispatchContext.Provider value={dispatch}>
        {children}
      </PreferencesDispatchContext.Provider>
    </PreferencesStateContext.Provider>
  );
};

// Next, I'll define our ProjectsProvider component, and make this
// ProjectsStateContext available using context Provider.

export const usePreferencesState = () => useContext(PreferencesStateContext);
export const usePreferencesDispatch = () =>
  useContext(PreferencesDispatchContext);
