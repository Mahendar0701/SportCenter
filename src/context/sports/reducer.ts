interface Sport {
  id: number;
  name: string;
}

// Now, I'll rename the interface in the `ProjectList` component from `State`
// to `ProjectsState`. And I'll also export the interface.

export interface SportState {
  sports: Sport[];
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

export type SportActions =
  | { type: "FETCH_SPORTS_REQUEST" }
  | { type: "FETCH_SPORTS_SUCCESS"; payload: Sport[] }
  | { type: "FETCH_SPORTS_FAILURE"; payload: string };
//   | { type: "ADD_MEMBERS_SUCCESS"; payload: Article }
//   | { type: "DELETE_MEMBER_SUCCESS"; payload: Article[] };

export const initialState: SportState = {
  sports: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

// Then we will pass the `initialState` object to the `state` of reducer function.

export const reducer = (
  state: SportState = initialState,
  action: SportActions
): SportState => {
  switch (action.type) {
    case "FETCH_SPORTS_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_SPORTS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        sports: action.payload,
      };
    case "FETCH_SPORTS_FAILURE":
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
