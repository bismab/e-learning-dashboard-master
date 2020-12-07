import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  constructor(private http: HttpClient) { }

  createEnrollment(body): Observable<any> {
    return this.http.post('/enrollment/create', body);
  }

  getEnrollmentsOfMine(body): Observable<any> {
    return this.http.post('/enrollment/get/all/mine', body);
  }
  getAllActiveTypes(): Observable<any> {
    return this.http.get('/class/type/all/a');
  }
  getAllActiveLevels(): Observable<any> {
    return this.http.get('/level/all/a');
  }
  cancelEnrollment(enrollmentId): Observable<any> {
    return this.http.put('/enrollment/cancel/' + enrollmentId, {});
  }
}
