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
  updateProfileInfo(body): Observable<any> {
    return this.http.put('/user/profile/mine', body);
  }

  getEnrollments(body): Observable<any> {
    return this.http.post('/session/enrollment/get/teacher/all', body);
  }
  getTeacherSessionEnrollmentDetail(id): Observable<any> {
    return this.http.get('/session/enrollment/teacher/detail/' + id);
  }
}
