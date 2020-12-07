import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DashboardService } from '../../services/dashboard.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionDetailComponent } from 'app/shared/session-detail/session-detail.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  days = [];
  classes = [];
  events = [];
  classListing = [];
  selectedDate = '';
  constructor(private dashSer: DashboardService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadDays();
    this.loadClasses();
  }

  openSessionDetails(id) {
    const modalRef = this.modalService.open(SessionDetailComponent);
    this.dashSer.getStFudentSessionEnrollmentDetail(id).subscribe(res => {
      if (res.status) {
        modalRef.componentInstance.data = res.data;
      }
    })
  }
  loadDays() {
    let date = moment(new Date());
    for (let i = 0; i < 5; i++) {
      if (i == 0) {
        this.days.push({
          active: true,
          day: date.format('dddd'),
          date: date.get('date'),
          fulldate: date.format('YYYY-MM-DD')
        })
      } else {
        this.days.push({
          day: date.format('dddd'),
          date: date.get('date'),
          fulldate: date.format('YYYY-MM-DD')
        })
      }
      date.add(1, 'days');
    }
  }


  loadClasses() {
    this.dashSer.getEnrollments({ type: 'current' }).subscribe(res => {
      if (res.status) {
        this.classes = res.data;
        this.generateClassChunks();
      }
    })
  }

  generateClassChunks(date?) {
    this.selectedDate = '';
    this.selectedDate = (date) ? date : moment(new Date).format('YYYY-MM-DD');
    for (let i = 0; i < this.classes.length; i++) {
      this.eventsGenerate(this.classes[i].session.startDate, this.classes[i].session.endDate,
        {
          _id: this.classes[i]._id,
          teacher: this.classes[i].teacher.name,
          days: this.classes[i].session.days,
          sessionId: this.classes[i].session._id,
          sessionTitle: this.classes[i].session.title,
          startTime: this.classes[i].session.startTime,
          endTime: this.classes[i].session.endTime,
          date: this.selectedDate,
          classAddress: this.classes[i].session.classAddress
        });
    }
    this.classListing = this.events.slice(0, 5);
  }

  eventsGenerate(startDate, endDate, data?) {
    this.events = [];
    let selectedDate = moment(data.date);
    let sDate = moment(endDate);
    for (let d = moment(startDate); d.isSameOrBefore(sDate); d.add(1, 'days')) {
      if (d.format('YYYY-MM-DD') == selectedDate.format('YYYY-MM-DD')) {
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
            startTime: data.startTime,
            teacher: data.teacher,
            endTime: data.endTime,
            join: (d.isBefore(selectedDate)) ? false : true,
            backgroundColor: (d.isBefore(selectedDate)) ? '#C0C0C0' : ''
          })
        }
      }
    }
  }


}
