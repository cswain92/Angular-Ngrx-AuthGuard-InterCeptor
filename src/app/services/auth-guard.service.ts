import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: DataService,
    public router: Router) { }

    canActivate(): boolean {
      if (!this.auth.getToken()) {
        this.router.navigateByUrl('/log-in');
        return false;
      }
      return true;
    }
}
