import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthHelperService {
  jwthelper = new JwtHelperService();
  constructor(private route: Router) { }

  isLoggedin() {
    let token = this.getAuthToken;

    if (!token) return false;

    //let expirationDate=jwthelper.getTokenExpirationDate(token);
    let isExpired = this.jwthelper.isTokenExpired(token);
    if (isExpired) {
      this.removeAuthToken();
    }
    return !isExpired;
    // return tokenNotExpired();
  }

  get currentUser() {
    let token = this.getAuthToken;
    if (!token) return null;
    return this.jwthelper.decodeToken(token);
  }

  logOut() {
    this.removeAuthToken();
    this.route.navigate(['/auth/login']);
  }

  get getAuthToken() {
    return localStorage.getItem('eldat');
  }

  set setAuthToken(token) {
    localStorage.setItem('eldat', token);
  }

  removeAuthToken() {
    localStorage.removeItem('eldat');
  }

}
