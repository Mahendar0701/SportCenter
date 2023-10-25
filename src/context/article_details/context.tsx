// First, I'll import the createContext, useContext and useReducer from React

import React, { createContext, useContext, useReducer } from "react";
import {
  reducer,
  initialState,
  ArticleDetailsState,
  ArticleDetailsActions,
} from "./reducer";
const ArticleDetailsStateContext = createContext<
  ArticleDetailsState | undefined
>(undefined);

type ArticleDetailsDispatch = React.Dispatch<ArticleDetailsActions>;

// Using createContext function, we will create a context
// called `ProjectsDispatchContext`. Let's say the shape of this new
// context object is ProjectsDispatch (which I'll define now, wait for it).
// I've set the default value to undefined.

const ArticleDetailsDispatchContext = createContext<
  ArticleDetailsDispatch | undefined
>(undefined);
export const ArticleDetailProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Next, I'll pass the `dispatch` object as value of this ProjectsDispatchContext.

  return (
    <ArticleDetailsStateContext.Provider value={state}>
      <ArticleDetailsDispatchContext.Provider value={dispatch}>
        {children}
      </ArticleDetailsDispatchContext.Provider>
    </ArticleDetailsStateContext.Provider>
  );
};

// Next, I'll define our ProjectsProvider component, and make this
// ProjectsStateContext available using context Provider.

export const useArticleDetailsState = () =>
  useContext(ArticleDetailsStateContext);
export const useArticleDetailsDispatch = () =>
  useContext(ArticleDetailsDispatchContext);
