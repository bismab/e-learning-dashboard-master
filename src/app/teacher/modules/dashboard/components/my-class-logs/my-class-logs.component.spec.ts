import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyClassLogsComponent } from './my-class-logs.component';

describe('MyClassLogsComponent', () => {
  let component: MyClassLogsComponent;
  let fixture: ComponentFixture<MyClassLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyClassLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyClassLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
