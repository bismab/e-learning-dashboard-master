import { TestBed } from '@angular/core/testing';

import { AuthRoutesAppearanceGuard } from './auth-routes-appearance.guard';

describe('AuthRoutesAppearanceGuard', () => {
  let guard: AuthRoutesAppearanceGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthRoutesAppearanceGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
