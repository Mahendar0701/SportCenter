/* eslint-disable @typescript-eslint/no-unused-vars */
// import { Reducer } from "react";
// import { TaskListAvailableAction, TaskActions } from "./types";
import { Reducer } from "react";

// import projectData from "./initialData";
// import { Articles } from "./types";
import {
  ArticleListState,
  ArticleListAvailableAction,
  ArticleActions,
} from "./types";
// import Articles from "../../pages/articles";

export const initialState: ArticleListState = {
  articles: {
    id: 0,
    sport: {
      id: 0,
      name: "",
    },
    title: "",
    summary: "",
    content: "",
    date: "",
    thumbnail: "",
    teams: [],
  },
  isLoading: false,
  isError: false,
  errorMessage: "",
};
export const articleReducer: Reducer<ArticleListState, ArticleActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ArticleListAvailableAction.FETCH_ARTICLES_REQUEST:
      return { ...state, isLoading: true };
    case ArticleListAvailableAction.FETCH_ARTICLES_SUCCESS:
      return { ...state, isLoading: false, projectData: action.payload };
    case ArticleListAvailableAction.FETCH_ARTICLES_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
  }
};
