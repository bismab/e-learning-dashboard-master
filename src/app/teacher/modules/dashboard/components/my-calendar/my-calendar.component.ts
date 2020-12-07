import { DashboardService } from './../../services/dashboard.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import * as moment from 'moment';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionDetailComponent } from 'app/shared/session-detail/session-detail.component';

@Component({
  selector: 'app-my-calendar',
  templateUrl: './my-calendar.component.html',
  styleUrls: ['./my-calendar.component.css']
})
export class MyCalendarComponent implements OnInit, AfterViewInit {
  // @ViewChild('calendar', { static: false }) calendarComponent: any;
  // @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    eventClick: this.loadClassDetailFromEvent.bind(this)
  };
  events = [];
  classes = [];
  listingEvents = [];
  selectedDate: NgbDateStruct;
  constructor(private dashSer: DashboardService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadClasses();
  }

  ngAfterViewInit() {
    // const calendar = this.calendarComponent.getApi();
    // calendar.on('eventClick', (info) => {
    //   // console.log(info);

    // })

  }

  loadClassDetailFromEvent(info) {
    this.openSessionDetails(info.event._def.extendedProps.sessionEnrollmentId);
  }

  openSessionDetails(id) {
    const modalRef = this.modalService.open(SessionDetailComponent);
    this.dashSer.getTeacherSessionEnrollmentDetail(id).subscribe(res => {
      if (res.status) {
        modalRef.componentInstance.data = res.data;
      }
    })
  }


  loadClasses() {
    this.dashSer.getEnrollments({ type: 'current' }).subscribe(res => {
      if (res.status) {
        this.classes = res.data;

        for (let i = 0; i < this.classes.length; i++) {
          this.eventsGenerate(this.classes[i].session.startDate, this.classes[i].session.endDate,
            {
              _id: this.classes[i]._id,
              days: this.classes[i].session.days,
              sessionId: this.classes[i].session._id,
              sessionTitle: this.classes[i].session.title,
              startTime: this.classes[i].session.startTime,
              endTime: this.classes[i].session.endTime,
              classAddress: this.classes[i].session.classAddress
            });
        }
        this.calendarOptions.events = this.events;
      }
    })
  }

  eventsGenerate(startDate, endDate, data?) {
    let currDate = moment(new Date());
    let sDate = moment(endDate);
    for (let d = moment(startDate); d.isSameOrBefore(sDate); d.add(1, 'days')) {
      if ((d.day() == 0 && data.days['sun']) ||
        (d.day() == 1 && data.days['mon']) ||
        (d.day() == 2 && data.days['tue']) ||
        (d.day() == 3 && data.days['wed']) ||
        (d.day() == 4 && data.days['thu']) ||
        (d.day() == 5 && data.days['fri'] ||
          (d.day() == 6 && data.days['sat']))) {
        this.events.push({
          id: data.sessionId,
          sessionEnrollmentId: data._id,
          title: data.sessionTitle,
          classAddress: data.classAddress,
          date: d.format('YYYY-MM-DD'),
          day: d.format('dddd'),
          endTime: data.endTime,
          startTime: data.startTime,
          join: (d.isBefore(currDate)) ? false : true,
          backgroundColor: (d.isBefore(currDate)) ? '#C0C0C0' : ''
        })
        this.events.sort(this.sortDate);
        this.listingEvents = [...this.events];
      }
    }
  }

  filterClasses() {
    this.listingEvents = [];
    if (this.selectedDate && (this.selectedDate.year && this.selectedDate.month && this.selectedDate.day)) {
      let date = moment(new Date(this.selectedDate.year, this.selectedDate.month - 1, this.selectedDate.day, 0, 0, 0));
      let endDate = moment(new Date(this.selectedDate.year, this.selectedDate.month - 1, this.selectedDate.day, 23, 59, 59));
      for (let i = 0; i < this.events.length; i++) {
        // if (moment(new Date(this.events[i].date)).isSameOrAfter(endDate)) {
        //   break;
        // }
        if ((moment(new Date(this.events[i].date)).isSameOrAfter(date)) &&
          (moment(new Date(this.events[i].date)).isSameOrBefore(endDate))) {
          this.listingEvents.push(this.events[i])
        }
      }
    } else {
      this.listingEvents = this.events;
    }
  }

  sortDate(a, b) {
    if (Date.parse(a.date) < Date.parse(b.date)) return -1;
    if (Date.parse(a.date) > Date.parse(b.date)) return 1;
    return 0;
  }


}
