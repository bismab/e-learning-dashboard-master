import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthHelperService } from 'core/services/auth-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRoutesAppearanceGuard implements CanActivate {
  constructor(private auth: AuthHelperService, private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.auth.isLoggedin()) return true;
      this.router.navigate(['/onboarding']);
      return false;
  }
  
}
