import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EnrollmentService } from '../../services/enrollment.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  levels = [];
  classTypes = [];
  enrollmentInfo = { days: {} as any } as any;
  startTime = { hour: 13, minute: 30 };
  endTime = { hour: 13, minute: 30 };
  days = [{ k: 'sun', t: 'Sunday' },
  { k: 'mon', t: 'Monday' },
  { k: 'tue', t: 'Tuesday' },
  { k: 'wed', t: 'Wednesday' },
  { k: 'thu', t: 'Thursday' },
  { k: 'fri', t: 'Friday' },
  { k: 'sat', t: 'Saturday' }]
  constructor(private toastSer: ToastrService,
    private enrollmentSer: EnrollmentService,
    private rout: Router,
    private actRout: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadClassTypes();
  }

  loadClassTypes() {
    this.enrollmentSer.getAllActiveTypes().subscribe(res => {
      if (res.status) {
        this.classTypes = res.data;
      }
    })
  }

  create() {
    let currDate = new Date();
    this.enrollmentInfo.startTime = new Date(currDate.getUTCFullYear(), currDate.getUTCMonth(), currDate.getUTCDate(), this.startTime.hour, this.startTime.minute, 0);
    this.enrollmentInfo.endTime = new Date(currDate.getUTCFullYear(), currDate.getUTCMonth(), currDate.getUTCDate(), this.endTime.hour, this.endTime.minute, 0);
    this.enrollmentSer.createEnrollment(this.enrollmentInfo).subscribe(res => {
      if (res.status) {
        this.rout.navigate(['/student/enrollment/all']);
        this.toastSer.success(res.message);
      }
    })
  }
}
