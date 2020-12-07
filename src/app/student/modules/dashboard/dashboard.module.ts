import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { ClassLogComponent } from './components/class-log/class-log.component';
import { ReportCardComponent } from './components/report-card/report-card.component';
import { PaymentComponent } from './components/payment/payment.component';
import { TeacherReviewsComponent } from './components/teacher-reviews/teacher-reviews.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from 'app/shared/shared.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  timeGrigPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [ProfileComponent, CalendarComponent, ResourcesComponent, ClassLogComponent, ReportCardComponent, PaymentComponent, TeacherReviewsComponent, HomeComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FullCalendarModule
  ]
})
export class DashboardModule { }
