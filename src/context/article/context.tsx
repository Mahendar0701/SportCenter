/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useReducer } from "react";
import { articleReducer, initialState } from "./reducer";
import { ArticleListState, ArticlesDispatch } from "./types";
const ArticlesStateContext = createContext<ArticleListState>(initialState);
const ArticlesDispatchContext = createContext<ArticlesDispatch>(() => {});
export const ArticlesProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  // Create a state and dispatch with `useReducer` passing in the `taskReducer` and an initial state. Pass these as values to our contexts.
  const [state, dispatch] = useReducer(articleReducer, initialState);
  return (
    <ArticlesStateContext.Provider value={state}>
      <ArticlesDispatchContext.Provider value={dispatch}>
        {children}
      </ArticlesDispatchContext.Provider>
    </ArticlesStateContext.Provider>
  );
};

// Create helper hooks to extract the `state` and `dispacth` out of the context.
export const useArticlesState = () => useContext(ArticlesStateContext);
export const useArticlesDispatch = () => useContext(ArticlesDispatchContext);
