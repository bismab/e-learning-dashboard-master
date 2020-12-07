import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth/services/auth.service';
import { AuthHelperService } from 'core/services/auth-helper.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus;
  focus1;
  auth = {} as any;
  constructor(private rout: Router,
    private authSer: AuthService,
    private authHelper: AuthHelperService,
    private toastSer: ToastrService) { }

  ngOnInit(): void {
  }

  login(credentials) {
    this.authSer.login(credentials).subscribe(res => {
      if (res.status) {
        this.authHelper.setAuthToken = res.data.t;
        // let user = this.authHelper.currentUser;
        window.location.reload()
        // if (user && (user.t === 's')) {
        //   this.rout.navigate(['/student']);
        // } else if (user && (user.t === 't')) {
        //   this.rout.navigate(['/teacher']);
        // }
        this.toastSer.success(res.message);
      } else {
        this.toastSer.error(res.message);
      }
    })
  }

}
