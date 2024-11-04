import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { IngresadoGuard } from './ingresado.guard'; // Importar correctamente

describe('IngresadoGuard', () => {
  let guard: IngresadoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IngresadoGuard]
    });
    guard = TestBed.inject(IngresadoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
