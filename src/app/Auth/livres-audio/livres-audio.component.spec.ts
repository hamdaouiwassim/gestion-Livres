import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivresAudioComponent } from './livres-audio.component';

describe('LivresAudioComponent', () => {
  let component: LivresAudioComponent;
  let fixture: ComponentFixture<LivresAudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivresAudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivresAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
