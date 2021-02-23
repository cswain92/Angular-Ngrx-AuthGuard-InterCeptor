import { Action } from '@ngrx/store';
import { IUser } from '../../models/user';

export enum UserActionTypes {
  LoadUsers = '[User] Load Users',
  LoadUsersSuccess = '[User] Load Users Success',
  LoadUsersFailure = '[User] Load Users Failure',
  SIGNUP_SUCCESS = '[Auth] Signup Success',
}

export class LoadUsers implements Action {
  readonly type = UserActionTypes.LoadUsers;
}

export class LoadUsersSuccess implements Action {
  readonly type = UserActionTypes.LoadUsersSuccess;
  constructor(public payload: { data: IUser[] }) { }
}

export class LoadUsersFailure implements Action {
  readonly type = UserActionTypes.LoadUsersFailure;
  constructor(public payload: { error: string }) { }
}
export class SignUpSuccess implements Action {
  readonly type = UserActionTypes.SIGNUP_SUCCESS;
  constructor(public payload: any) {}
}

export type UserActions = LoadUsers | LoadUsersSuccess | LoadUsersFailure | SignUpSuccess;

