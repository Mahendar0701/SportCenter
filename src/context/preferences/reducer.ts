export type Preferences = {
  id: number;
  sports: string[];
  teams: string[];
};

// Now, I'll rename the interface in the `ProjectList` component from `State`
// to `ProjectsState`. And I'll also export the interface.

export interface PreferencesState {
  preferences: Preferences[];
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

export type PreferencesActions =
  | { type: "FETCH_PREFERENCES_REQUEST" }
  | { type: "FETCH_PREFERENCES_SUCCESS"; payload: Preferences[] }
  | { type: "FETCH_PREFERENCES_FAILURE"; payload: string }
  | { type: "UPDATE_PREFERENCES_REQUEST" }
  | { type: "UPDATE_PREFERENCES_SUCCESS" }
  | { type: "UPDATE_PREFERENCES_FAILURE"; payload: string };
//   | { type: "ADD_MEMBERS_SUCCESS"; payload: Article }
//   | { type: "DELETE_MEMBER_SUCCESS"; payload: Article[] };

export const initialState: PreferencesState = {
  preferences: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

// Then we will pass the `initialState` object to the `state` of reducer function.

export const reducer = (
  state: PreferencesState = initialState,
  action: PreferencesActions
): PreferencesState => {
  switch (action.type) {
    case "FETCH_PREFERENCES_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_PREFERENCES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        preferences: action.payload,
      };
    case "FETCH_PREFERENCES_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case "UPDATE_PREFERENCES_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "UPDATE_PREFERENCES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        // preferences: action.payload,
      };
    case "UPDATE_PREFERENCES_FAILURE":
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

export type PreferencesDispatch = React.Dispatch<PreferencesActions>;
