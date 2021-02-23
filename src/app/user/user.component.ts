import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import {Store, select} from '@ngrx/store';
import { IUser } from '../models/user';
import * as UserActions from '../store/actions/user.actions';
import * as fromUser from './../user.selectors';

import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users:IUser[] = [];
  errorMessage= '';

  constructor(private store: Store, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
     this.store.dispatch(new UserActions.LoadUsers()); // action dispatch

     this.store.pipe(map(fromUser.getUser)).subscribe(
       users => {
         this.users = users;
         console.log(this.users);
       }
     )

     this.store.pipe(map(fromUser.getError)).subscribe(
      err => {
        this.errorMessage = err;
        if(err){
          this._snackBar.open(this.errorMessage, "close", {
            duration: 5000,
          });
        }
      }
    )
    
  }
  // openSnackBar(message: string, action: string) {
  //   this._snackBar.open(message, action, {
  //     duration: 2000,
  //   });
  // }

}
