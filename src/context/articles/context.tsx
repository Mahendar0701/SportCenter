// First, I'll import the createContext, useContext and useReducer from React

import React, { createContext, useContext, useReducer } from "react";
import { reducer, initialState, ArticleState, ArticleActions } from "./reducer";
const ArticleStateContext = createContext<ArticleState | undefined>(undefined);

type ArticleDispatch = React.Dispatch<ArticleActions>;

// Using createContext function, we will create a context
// called `ProjectsDispatchContext`. Let's say the shape of this new
// context object is ProjectsDispatch (which I'll define now, wait for it).
// I've set the default value to undefined.

const ArticleDispatchContext = createContext<ArticleDispatch | undefined>(
  undefined
);
export const ArticleProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Next, I'll pass the `dispatch` object as value of this ProjectsDispatchContext.

  return (
    <ArticleStateContext.Provider value={state}>
      <ArticleDispatchContext.Provider value={dispatch}>
        {children}
      </ArticleDispatchContext.Provider>
    </ArticleStateContext.Provider>
  );
};

// Next, I'll define our ProjectsProvider component, and make this
// ProjectsStateContext available using context Provider.

export const useArticleState = () => useContext(ArticleStateContext);
export const useArticleDispatch = () => useContext(ArticleDispatchContext);
