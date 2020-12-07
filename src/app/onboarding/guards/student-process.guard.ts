import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthHelperService } from 'core/services/auth-helper.service';

@Injectable({
  providedIn: 'root'
})
export class StudentProcessGuard implements CanActivate {
  constructor(private auth: AuthHelperService, private router: Router) {
  }
  // canLoad(
  //   route: Route,
  //   segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
  //   let user = this.auth.currentUser;
  //   if (user && (user.t == 's')) {
  //     return true
  //   } else if (user && (user.t == 's')) {
  //     this.router.navigate(['/dashboard/onboarding/teacher-info-process']);
  //     return false;
  //   } else {
  //     this.router.navigate(['/dashboard']);
  //     return false;
  //   };

  // }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let user = this.auth.currentUser;
    if (user && (user.t == 's')) {
      return true
    } else if (user && (user.t == 't')) {
      this.router.navigate(['/onboarding/teacher-process']);
      return false;
    } else {
      this.router.navigate(['/']);
      return false;
    };
  }
}
