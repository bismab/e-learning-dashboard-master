import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-email-verify-redirect-page',
  templateUrl: './email-verify-redirect-page.component.html',
  styleUrls: ['./email-verify-redirect-page.component.scss']
})
export class EmailVerifyRedirectPageComponent implements OnInit {
  token;
  constructor(
    private route: Router,
    private actRoute: ActivatedRoute,
    private authSer: AuthService,
    private toastSer: ToastrService) { }

  ngOnInit(): void {
    this.token = this.actRoute.snapshot.paramMap.get('token');
    if (this.token) {
      this.verifyUser();
    }
  }

  verifyUser() {
    this.authSer.verifyUserEmail({ token: this.token }).subscribe(res => {
      if (res.status) {
        this.toastSer.success(res.message);
        this.route.navigate(['/']);
      } else {
        this.toastSer.error(res.message);
        this.route.navigate(['/']);
      }
    })
  }

}
