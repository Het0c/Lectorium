import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibrosCienciaPage } from './libros-ciencia.page';

describe('LibrosCienciaPage', () => {
  let component: LibrosCienciaPage;
  let fixture: ComponentFixture<LibrosCienciaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrosCienciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
