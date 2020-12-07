import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingRoutingModule } from './training-routing.module';
import { AllComponent } from './components/all/all.component';


@NgModule({
  declarations: [AllComponent],
  imports: [
    CommonModule,
    TrainingRoutingModule
  ]
})
export class TrainingModule { }
