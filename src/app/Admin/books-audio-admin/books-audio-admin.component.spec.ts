import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksAudioAdminComponent } from './books-audio-admin.component';

describe('BooksAudioAdminComponent', () => {
  let component: BooksAudioAdminComponent;
  let fixture: ComponentFixture<BooksAudioAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksAudioAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksAudioAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
