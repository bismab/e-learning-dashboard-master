import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
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
