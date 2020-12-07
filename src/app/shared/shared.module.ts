import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UrlSafePipe } from 'core/pipes/url-safe.pipe';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SessionDetailComponent } from './session-detail/session-detail.component';



@NgModule({
  declarations: [
    //pipes//
    UrlSafePipe,
    SessionDetailComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbModule
  ],
  exports: [
    RouterModule,
    NgbModule,
    FormsModule,
    SessionDetailComponent,
    UrlSafePipe
  ]
})
export class SharedModule { }
