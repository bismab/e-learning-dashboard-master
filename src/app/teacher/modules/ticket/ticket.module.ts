import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketRoutingModule } from './ticket-routing.module';
import { AllComponent } from './components/all/all.component';


@NgModule({
  declarations: [AllComponent],
  imports: [
    CommonModule,
    TicketRoutingModule
  ]
})
export class TicketModule { }
