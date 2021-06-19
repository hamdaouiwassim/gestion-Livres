import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationsAdminComponent } from './publications-admin.component';

describe('PublicationsAdminComponent', () => {
  let component: PublicationsAdminComponent;
  let fixture: ComponentFixture<PublicationsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
