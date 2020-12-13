import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoopBackAuth } from './api/services/core';
import { info } from './helpers/notification';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: LoopBackAuth,
              private  router: Router) {

  }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const user = this.auth.getCurrentUserData();
    if (user.roles === 'admin') {
      return true;
    }
    info('Please login to access');
    this.router.navigate(['/login']);
    return false;
  }
}
