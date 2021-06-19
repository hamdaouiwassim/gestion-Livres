import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsClientComponent } from './posts-client.component';

describe('PostsClientComponent', () => {
  let component: PostsClientComponent;
  let fixture: ComponentFixture<PostsClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
