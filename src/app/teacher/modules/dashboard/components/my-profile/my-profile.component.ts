import { DashboardService } from './../../services/dashboard.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  profile = {} as any;
  constructor(private dashboardS: DashboardService) { }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    this.dashboardS.getProfileInfo().subscribe(res => {
      if (res.status) {
        this.profile = res.data;
      }
    })
  }
}
