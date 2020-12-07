import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnrollmentRoutingModule } from './enrollment-routing.module';
import { EnrollmentsComponent } from './components/enrollments/enrollments.component';
import { FormComponent } from './components/form/form.component';


@NgModule({
  declarations: [EnrollmentsComponent, FormComponent],
  imports: [
    CommonModule,
    EnrollmentRoutingModule,
    SharedModule
  ]
})
export class EnrollmentModule { }
