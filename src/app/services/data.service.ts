import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';
import {  catchError, tap, map } from 'rxjs/operators';
import { IUser, User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private userUrl = 'assets/user.json'; 
  private BASE_URL = 'http://localhost:1337';

  constructor(private http: HttpClient) { }

  getData():Observable<any>{
      return this.http.get('http://jsonplaceholder.typicode.com/posts');
  }

  getUsers(): Observable<IUser[]>{
    return this.http.get<IUser[]>(this.userUrl).pipe(
      tap(data => console.log('All: '+ JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if(err.error instanceof ErrorEvent) {
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
       // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;

    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  logIn(email: string, password: string): Observable<any> {
    const url = `${this.BASE_URL}/login`;
    return this.http.post<User>(url, {email, password});
  }

  signUp(email: string, password: string): Observable<User> {
    const url = `${this.BASE_URL}/register`;
    return this.http.post<User>(url, {email, password});
  }
  getStatus(): Observable<User> {
    const url = `${this.BASE_URL}/status`;
    return this.http.get<User>(url);
  }
}
