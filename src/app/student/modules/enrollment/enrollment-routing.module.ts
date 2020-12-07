import { EnrollmentsComponent } from './components/enrollments/enrollments.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './components/form/form.component';


const routes: Routes = [
  { path: 'all', component: EnrollmentsComponent },
  { path: 'request', component: FormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrollmentRoutingModule { }
