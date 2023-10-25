interface Team {
  id: number;
  name: string;
}

// Now, I'll rename the interface in the `ProjectList` component from `State`
// to `ProjectsState`. And I'll also export the interface.

export interface TeamState {
  teams: Team[];
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

export type TeamActions =
  | { type: "FETCH_TEAMS_REQUEST" }
  | { type: "FETCH_TEAMS_SUCCESS"; payload: Team[] }
  | { type: "FETCH_TEAMS_FAILURE"; payload: string };
//   | { type: "ADD_MEMBERS_SUCCESS"; payload: Article }
//   | { type: "DELETE_MEMBER_SUCCESS"; payload: Article[] };

export const initialState: TeamState = {
  teams: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

// Then we will pass the `initialState` object to the `state` of reducer function.

export const reducer = (
  state: TeamState = initialState,
  action: TeamActions
): TeamState => {
  switch (action.type) {
    case "FETCH_TEAMS_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_TEAMS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        teams: action.payload,
      };
    case "FETCH_TEAMS_FAILURE":
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
