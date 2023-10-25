interface Match {
  id: number;
  //   sport_name: string;
  name: string;
  location: string;
  sportName: string;
  endsAt: string;
  //   teams: string;
  isRunning: boolean;
}

// Now, I'll rename the interface in the `ProjectList` component from `State`
// to `ProjectsState`. And I'll also export the interface.

export interface MatchState {
  matches: Match[];
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

export type MatchActions =
  | { type: "FETCH_MATCHES_REQUEST" }
  | { type: "FETCH_MATCHES_SUCCESS"; payload: Match[] }
  | { type: "FETCH_MATCHES_FAILURE"; payload: string };
//   | { type: "ADD_MEMBERS_SUCCESS"; payload: Article }
//   | { type: "DELETE_MEMBER_SUCCESS"; payload: Article[] };

export const initialState: MatchState = {
  matches: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

// Then we will pass the `initialState` object to the `state` of reducer function.

export const reducer = (
  state: MatchState = initialState,
  action: MatchActions
): MatchState => {
  switch (action.type) {
    case "FETCH_MATCHES_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_MATCHES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        matches: action.payload,
      };
    case "FETCH_MATCHES_FAILURE":
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
