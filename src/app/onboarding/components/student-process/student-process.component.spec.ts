import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProcessComponent } from './student-process.component';

describe('StudentProcessComponent', () => {
  let component: StudentProcessComponent;
  let fixture: ComponentFixture<StudentProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
