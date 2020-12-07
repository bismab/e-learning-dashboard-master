import { TestBed } from '@angular/core/testing';

import { TeacherProcessGuard } from './teacher-process.guard';

describe('TeacherProcessGuard', () => {
  let guard: TeacherProcessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TeacherProcessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
