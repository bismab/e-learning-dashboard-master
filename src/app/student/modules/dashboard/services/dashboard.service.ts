import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) { }
  getProfileInfo(): Observable<any> {
    return this.http.get('/user/profile/mine');
  }
  getEnrollments(body): Observable<any> {
    return this.http.post('/session/enrollment/get/student/all', body);
  }
  getStFudentSessionEnrollmentDetail(id): Observable<any> {
    return this.http.get('/session/enrollment/student/detail/' + id);
  }
}
