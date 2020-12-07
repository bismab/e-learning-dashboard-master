import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthHelperService } from 'core/services/auth-helper.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherGuard implements CanLoad {
  constructor(private auth: AuthHelperService, private router: Router) {
  }
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    let user = this.auth.currentUser;
    if (user && (user.t == 't')) return true;

    this.router.navigate(['/']);
    return false;
  }
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   let user = this.auth.currentUser;
  //   if (user && (user.t == 't')) return true;

  //   this.router.navigate(['/dashboard']);
  //   return false;
  // }

}
