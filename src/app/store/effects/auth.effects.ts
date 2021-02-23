import { SignUpSuccess } from './../actions/user.actions';
import { SignUp, SignUpFailure } from './../actions/auth.actions';

//import { map } from 'rxjs/operators';
// import { LogIn } from 'src/app/store/actions/auth.actions';
import { LogIn, AuthActionTypes, LogInSuccess, LogInFailure } from './../actions/auth.actions';
import { DataService } from "../../services/data.service";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as userActions from "../actions/user.actions";
import { mergeMap, map, catchError, switchMap, mapTo, tap} from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private userService: DataService , private router: Router) {}

//   @Effect()
//   loadUsers$: Observable<Action> = this.actions$.pipe(
//     ofType(userActions.UserActionTypes.LoadUsers),
//     mergeMap((action) =>
//       this.userService.getUsers().pipe(
//         map((users) => new userActions.LoadUsersSuccess({ data: users })),
//         catchError((err) =>
//           of(new userActions.LoadUsersFailure({ error: err }))
//         )
//       )
//     )
//   );
@Effect()
LogIn: Observable<any> = this.actions$
.pipe(ofType(AuthActionTypes.LOGIN),
map((action: LogIn) => action.payload),
switchMap(payload => {
return this.userService.logIn(payload.email, payload.password)
.pipe(map((user) => {
console.log(user);
return new LogInSuccess({token: user.token, email: payload.email});
}),
catchError((error) => {
console.log(error);
return of(new LogInFailure({ error: error }));
})
);
}));

@Effect({ dispatch: false })
LogInSuccess: Observable<any> = this.actions$.pipe(
  ofType(AuthActionTypes.LOGIN_SUCCESS),
  tap((user) => {
    console.log(user.token);
    localStorage.setItem('token', user.payload.token);
    this.router.navigateByUrl('/');
  })
);

@Effect({ dispatch: false })
LogInFailure: Observable<any> = this.actions$.pipe(
  ofType(AuthActionTypes.LOGIN_FAILURE)
);

// @Effect()
// SignUp: Observable<any> = this.actions$
//   .ofType(AuthActionTypes.SIGNUP)
//   .map((action: SignUp) => action.payload)
//   .switchMap(payload => {
//     return this.authService.signUp(payload.email, payload.password)
//       .map((user) => {
//         console.log(user);
//         return new SignUpSuccess({token: user.token, email: payload.email});
//       })
//       .catch((error) => {
//         console.log(error);
//         return Observable.of(new SignUpFailure({ error: error }));
//       });
//   });
@Effect()
SignUp: Observable<any> = this.actions$
.pipe(ofType(AuthActionTypes.SIGNUP),
map((action: SignUp) => action.payload),
switchMap(payload => {
return this.userService.signUp(payload.email, payload.password)
.pipe(map((user) => {
console.log(user);
return new SignUpSuccess({token: user.token, email: payload.email});
}),
catchError((error) => {
console.log(error);
return of(new SignUpFailure({ error: error }));
})
);
}));

@Effect({ dispatch: false })
SignUpSuccess: Observable<any> = this.actions$.pipe(
  ofType(AuthActionTypes.SIGNUP_SUCCESS),
  tap((user) => {
    localStorage.setItem('token', user.payload.token);
    this.router.navigateByUrl('/');
  })
);

@Effect({ dispatch: false })
SignUpFailure: Observable<any> = this.actions$.pipe(
  ofType(AuthActionTypes.SIGNUP_FAILURE)
);

@Effect({ dispatch: false })
 LogOut: Observable<any> = this.actions$.pipe(
  ofType(AuthActionTypes.LOGOUT),
  tap((user) => {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/log-in');
  })
);

@Effect({ dispatch: false })
GetStatus: Observable<any> = this.actions$.pipe(
  ofType(AuthActionTypes.GET_STATUS),
  switchMap(payload => {
    return this.userService.getStatus();
  }));
}

