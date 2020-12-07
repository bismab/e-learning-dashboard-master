import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassLogComponent } from './class-log.component';

describe('ClassLogComponent', () => {
  let component: ClassLogComponent;
  let fixture: ComponentFixture<ClassLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
