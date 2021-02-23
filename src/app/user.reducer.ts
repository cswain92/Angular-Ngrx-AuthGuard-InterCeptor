import { IUser } from "./models/user";
import { Action } from "@ngrx/store";
import { UserActions, UserActionTypes } from "./store/actions/user.actions";

export const userFeatureKey = "usersState";

export interface State {
  // Data-types
  users: IUser[];
  error: string;
}

export const initialState: State = {
  // Initial Values
  users: [ ],
  error: "",
};

export function reducer(state = initialState, action: UserActions): State {
  switch (action.type) {
    case UserActionTypes.LoadUsers:
      return {
        ...state,
      };
    case UserActionTypes.LoadUsersSuccess:
      return {
        ...state,
        users: action.payload.data,
        error: "",
      };
    case UserActionTypes.LoadUsersFailure:
      return {
        ...state,
        users: [],
        error: action.payload.error,
      };

    default:
      return state;
  }
}
