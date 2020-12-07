import { MyResourcesComponent } from './components/my-resources/my-resources.component';
import { MyClassLogsComponent } from './components/my-class-logs/my-class-logs.component';
import { MyCalendarComponent } from './components/my-calendar/my-calendar.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MyTeacherReviewsComponent } from './components/my-teacher-reviews/my-teacher-reviews.component';
import { MyPaymentsComponent } from './components/my-payments/my-payments.component';
import { FormComponent } from './components/my-profile/form/form.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: MyProfileComponent },
  { path: 'profile/edit', component: FormComponent },
  { path: 'calendar', component: MyCalendarComponent },
  { path: 'class-logs', component: MyClassLogsComponent },
  { path: 'resources', component: MyResourcesComponent },
  { path: 'reviews', component: MyTeacherReviewsComponent },
  { path: 'payments', component: MyPaymentsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
