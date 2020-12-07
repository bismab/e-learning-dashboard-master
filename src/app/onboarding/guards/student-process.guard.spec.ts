import { TestBed } from '@angular/core/testing';

import { StudentProcessGuard } from './student-process.guard';

describe('StudentProcessGuard', () => {
  let guard: StudentProcessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(StudentProcessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
