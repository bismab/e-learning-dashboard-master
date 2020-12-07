import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnboardingRoutingModule } from './onboarding-routing.module';
import { TeacherProcessComponent } from './components/teacher-process/teacher-process.component';
import { StudentProcessComponent } from './components/student-process/student-process.component';
import { OnboardingService } from './services/onboarding.service';
import { MultiSelectModule } from 'primeng/multiselect';


@NgModule({
  declarations: [TeacherProcessComponent, StudentProcessComponent],
  imports: [
    CommonModule,
    OnboardingRoutingModule,
    SharedModule,
    MultiSelectModule
  ],
  providers: [
    OnboardingService
  ]
})
export class OnboardingModule { }
