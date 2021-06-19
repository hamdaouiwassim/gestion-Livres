import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleBookAdminComponent } from './single-book-admin.component';

describe('SingleBookAdminComponent', () => {
  let component: SingleBookAdminComponent;
  let fixture: ComponentFixture<SingleBookAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleBookAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleBookAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
