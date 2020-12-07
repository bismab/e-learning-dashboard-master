import { SharedModule } from 'app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from "@fullcalendar/angular";

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './components/home/home.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { MyCalendarComponent } from './components/my-calendar/my-calendar.component';
import { MyResourcesComponent } from './components/my-resources/my-resources.component';
import { MyClassLogsComponent } from './components/my-class-logs/my-class-logs.component';
import { MyPaymentsComponent } from './components/my-payments/my-payments.component';
import { MyTeacherReviewsComponent } from './components/my-teacher-reviews/my-teacher-reviews.component';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FormComponent } from './components/my-profile/form/form.component';
FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  timeGrigPlugin,
  interactionPlugin
]);
@NgModule({
  declarations: [HomeComponent, MyProfileComponent, MyCalendarComponent, MyResourcesComponent, MyClassLogsComponent, MyPaymentsComponent, MyTeacherReviewsComponent, FormComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FullCalendarModule
  ]
})
export class DashboardModule { }
