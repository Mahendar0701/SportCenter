interface Sport {
  id: number;
  name: string;
}
interface Team {
  id: number;
  name: string;
}

export type ArticleDetails = {
  id: number;
  sport: Sport;
  title: string;
  summary: string;
  content: string;
  date: string;
  thumbnail: string;
  teams: Team[];
};

export type ArticleDetailsPayload = Omit<ArticleDetails, "id" | "state">;

export type Articles = {
  [k: string]: ArticleDetails;
};

export interface ArticleListState {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export type ProjectData = {
  articles: Articles;
};

export interface ArticleListState {
  articles: ArticleDetails;
  //   projectData: ProjectData;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export enum ArticleListAvailableAction {
  FETCH_ARTICLES_REQUEST = "FETCH_ARTICLES_REQUEST",
  FETCH_ARTICLES_SUCCESS = "FETCH_ARTICLES_SUCCESS",
  FETCH_ARTICLES_FAILURE = "FETCH_ARTICLES_FAILURE",
}

export type ArticleActions =
  | { type: ArticleListAvailableAction.FETCH_ARTICLES_REQUEST }
  | {
      type: ArticleListAvailableAction.FETCH_ARTICLES_SUCCESS;
      payload: ProjectData;
    }
  | {
      type: ArticleListAvailableAction.FETCH_ARTICLES_FAILURE;
      payload: string;
    };

// A type to hold dispatch actions in a context.
export type ArticlesDispatch = React.Dispatch<ArticleActions>;
