import { TestBed } from '@angular/core/testing';

import { UserApprovalInfoLevelCheckGuard } from './user-approval-info-level-check.guard';

describe('UserApprovalInfoLevelCheckGuard', () => {
  let guard: UserApprovalInfoLevelCheckGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserApprovalInfoLevelCheckGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
