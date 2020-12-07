import { TestBed } from '@angular/core/testing';

import { AntiApprovalInfoLevelGuard } from './anti-approval-info-level.guard';

describe('AntiApprovalInfoLevelGuard', () => {
  let guard: AntiApprovalInfoLevelGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AntiApprovalInfoLevelGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
