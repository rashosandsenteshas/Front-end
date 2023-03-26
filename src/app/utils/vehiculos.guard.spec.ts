import { TestBed } from '@angular/core/testing';

import { VehiculosGuard } from './vehiculos.guard';

describe('VehiculosGuard', () => {
  let guard: VehiculosGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VehiculosGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
