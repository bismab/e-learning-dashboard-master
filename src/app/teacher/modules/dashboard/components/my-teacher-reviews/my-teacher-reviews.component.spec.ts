import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTeacherReviewsComponent } from './my-teacher-reviews.component';

describe('MyTeacherReviewsComponent', () => {
  let component: MyTeacherReviewsComponent;
  let fixture: ComponentFixture<MyTeacherReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTeacherReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTeacherReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
