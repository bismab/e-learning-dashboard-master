import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  profile = {} as any;
  constructor(
    private dashboardS: DashboardService,
    private toastS: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadProfile();
  }
  loadProfile() {
    this.dashboardS.getProfileInfo().subscribe(res => {
      if (res.status) {
        if (res.data) {
          this.profile['name'] = res.data.name;
          this.profile['age'] = res.data.age;
          this.profile['gender'] = res.data.gender;
          this.profile['bio'] = res.data.bio;
        }
      }
    })
  }

  saveProfile() {
    this.dashboardS.updateProfileInfo(this.profile).subscribe(res => {
      if (res.status) {
        this.toastS.success(res.message);
      }
    })
  }

}
