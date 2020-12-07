import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherProcessComponent } from './teacher-process.component';

describe('TeacherProcessComponent', () => {
  let component: TeacherProcessComponent;
  let fixture: ComponentFixture<TeacherProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
