import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class OnboardingService {
  constructor(private http: HttpClient) { }

  startQuiz(): Observable<any> {
    return this.http.get('/quiz/user/start');
  }

  answererTheQuestion(body): Observable<any> {
    return this.http.put('/quiz/user/answer/the/question', body);
  }

  updateStudentPersonalAndEduInfo(body): Observable<any> {
    return this.http.post('/user/student/update/onboarding/personal/edu/info', body);
  }

  updateTeacherPersonalAndAcademicInfo(body): Observable<any> {
    return this.http.post('/user/teacher/update/onboarding/personal/academic/info', body);
  }

  getTeacherDemoClassInfo(): Observable<any> {
    return this.http.get('/demo_class/teacher/me');
  }

  getTeacherPersonalOrAcademicInfo(): Observable<any> {
    return this.http.get('/user/teacher/personal/academic/info');
  }

  getTeacherContract(): Observable<any> {
    return this.http.get('/contract/teacher');
  }

  uploadTeacherContract(body): Observable<any> {
    return this.http.post('/contract/teacher/signed/upload', body);
  }

  uploadDemoClassVideo(body): Observable<any> {
    return this.http.post('/demo_class/teacher/save', body);
  }

  updateDemoClassRecordingAttempts(): Observable<any> {
    return this.http.put('/demo_class/teacher/recording/attempts', {});
  }

}
