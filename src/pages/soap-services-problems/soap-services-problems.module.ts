import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SoapServicesProblemsPage } from './soap-services-problems';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ServicesProblemsModalPage } from '../services-problems-modal/services-problems-modal';

@NgModule({
  declarations: [
    SoapServicesProblemsPage,
    ServicesProblemsModalPage
  ],
  imports: [
    IonicPageModule.forChild(SoapServicesProblemsPage),
    NgxDatatableModule
  ],
  entryComponents: [
    ServicesProblemsModalPage
  ]
})
export class SoapServicesProblemsPageModule {}
