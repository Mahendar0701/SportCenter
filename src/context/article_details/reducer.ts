interface Sport {
  id: number;
  name: string;
}
interface Team {
  id: number;
  name: string;
}

interface Article {
  id: number;
  sport: Sport;
  title: string;
  summary: string;
  content: string;
  date: string;
  thumbnail: string;
  teams: Team[];
}

// Now, I'll rename the interface in the `ProjectList` component from `State`
// to `ProjectsState`. And I'll also export the interface.

export interface ArticleDetailsState {
  articles: Article;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}
// Next, I'll comment the `Action` interface

// interface Action {
//   type: string;
//   payload?: any;
// }

// Then I'll define a new type called `ProjectsActions`
// for all possible combimations of action objects.

export type ArticleDetailsActions =
  | { type: "FETCH_ARTICLESDetails_REQUEST" }
  | { type: "FETCH_ARTICLESDetails_SUCCESS"; payload: Article }
  | { type: "FETCH_ARTICLESDetails_FAILURE"; payload: string };
//   | { type: "ADD_MEMBERS_SUCCESS"; payload: Article }
//   | { type: "DELETE_MEMBER_SUCCESS"; payload: Article[] };

export const initialState: ArticleDetailsState = {
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

// Then we will pass the `initialState` object to the `state` of reducer function.

export const reducer = (
  state: ArticleDetailsState = initialState,
  action: ArticleDetailsActions
): ArticleDetailsState => {
  switch (action.type) {
    case "FETCH_ARTICLESDetails_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_ARTICLESDetails_SUCCESS":
      return {
        ...state,
        isLoading: false,
        articles: action.payload,
      };
    case "FETCH_ARTICLESDetails_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};

export type ArticleDetailsDispatch = React.Dispatch<ArticleDetailsActions>;
