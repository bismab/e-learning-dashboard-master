import { TeacherReviewsComponent } from './components/teacher-reviews/teacher-reviews.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ClassLogComponent } from './components/class-log/class-log.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportCardComponent } from './components/report-card/report-card.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'resources', component: ResourcesComponent },
  { path: 'class-logs', component: ClassLogComponent },
  { path: 'report-card', component: ReportCardComponent },
  { path: 'accounts', component: PaymentComponent },
  { path: 'teacher-reviews', component: TeacherReviewsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
