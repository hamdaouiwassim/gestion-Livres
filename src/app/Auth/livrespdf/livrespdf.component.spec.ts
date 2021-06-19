import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivrespdfComponent } from './livrespdf.component';

describe('LivrespdfComponent', () => {
  let component: LivrespdfComponent;
  let fixture: ComponentFixture<LivrespdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivrespdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivrespdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
