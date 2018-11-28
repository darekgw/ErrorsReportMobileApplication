import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProblemDetails } from './problem-details';

@NgModule({
  declarations: [
    ProblemDetails
  ],
  imports: [
    IonicPageModule.forChild(ProblemDetails),

  ],
  exports: [
    ProblemDetails
  ]
})
export class ProblemDetailsModule {}