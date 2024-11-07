import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookPreviewPage } from './book-preview.page';

describe('BookPreviewPage', () => {
  let component: BookPreviewPage;
  let fixture: ComponentFixture<BookPreviewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BookPreviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
