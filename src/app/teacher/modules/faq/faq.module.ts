import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FAQRoutingModule } from './faq-routing.module';
import { AllComponent } from './components/all/all.component';


@NgModule({
  declarations: [AllComponent],
  imports: [
    CommonModule,
    FAQRoutingModule
  ]
})
export class FAQModule { }
