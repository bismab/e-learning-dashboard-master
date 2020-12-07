import { AuthHelperService } from 'core/services/auth-helper.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApprovalInfoLevelCheckGuard implements CanLoad {
  constructor(private auth: AuthHelperService, private router: Router) {
  }
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    let user = this.auth.currentUser;
    if (user && (user.t === 's') && (user.sail !== 'all')) {
      // if (user && (user.t === 's') && (user.sail && user.sail !== 'one')) {
      this.router.navigate(['/onboarding']);
      return false;
    } else if (user && (user.t === 't') && (user.tail !== 'all')) {
      this.router.navigate(['/onboarding']);
      return false
    } else {
      return true;
    }
  }
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   let user = this.auth.currentUser;
  //   if (user && (user.t === 's') && (user.sail && user.sail !== 'all')) {
  //     this.router.navigate(['/dashboard/onboarding/info-process']);
  //     return false;
  //   } else if (user && (user.t === 't') && (user.tail && user.tail !== 'two')) {
  //     this.router.navigate(['/dashboard/onboarding/teacher-info-process']);
  //     return false
  //   };
  //   return true;
  // }

}
