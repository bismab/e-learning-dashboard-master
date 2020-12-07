import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthHelperService } from 'core/services/auth-helper.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherProcessGuard implements CanActivate {
  constructor(private auth: AuthHelperService, private router: Router) {
  }
  // canLoad(
  //   route: Route,
  //   segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
  //   let user = this.auth.currentUser;
  //   if (user && (user.t == 't')) return true;

  //   this.router.navigate(['/dashboard']);
  //   return false;
  // }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let user = this.auth.currentUser;
    if (user && (user.t == 't')) {
      return true
    } else if (user && (user.t == 's')) {
      this.router.navigate(['/onboarding/student-process']);
      return false;
    } else {
      this.router.navigate(['/']);
      return false;
    };
  }
}
