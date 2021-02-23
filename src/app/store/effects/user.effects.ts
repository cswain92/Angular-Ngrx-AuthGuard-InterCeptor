import { DataService } from "../../services/data.service";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as userActions from "../actions/user.actions";
import { mergeMap, map, catchError } from "rxjs/operators";

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: DataService) {}

  @Effect()
  loadUsers$: Observable<Action> = this.actions$.pipe(
    ofType(userActions.UserActionTypes.LoadUsers),
    mergeMap((action) =>
      this.userService.getUsers().pipe(
        map((users) => new userActions.LoadUsersSuccess({ data: users })),
        catchError((err) =>
          of(new userActions.LoadUsersFailure({ error: err }))
        )
      )
    )
  );
}
