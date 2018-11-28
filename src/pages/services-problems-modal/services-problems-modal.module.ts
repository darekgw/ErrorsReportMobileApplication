import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServicesProblemsModalPage } from './services-problems-modal';

@NgModule({
  declarations: [
    ServicesProblemsModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ServicesProblemsModalPage),
  ],
})
export class SoapServicesProblemsModalPageModule {}
