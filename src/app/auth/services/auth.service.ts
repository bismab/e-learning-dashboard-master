import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(body): Observable<any> {
    return this.http.post('/user/login', body);
  }

  registerStudent(body): Observable<any> {
    return this.http.post('/user/register/student', body);
  }

  registerTeacher(body): Observable<any> {
    return this.http.post('/user/register/teacher', body);
  }

  verifyUserEmail(body): Observable<any> {
    return this.http.post('/user/verify/email', body);
  }

}
