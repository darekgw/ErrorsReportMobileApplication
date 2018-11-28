import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RestServicesProblemsPage } from './rest-services-problems';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
    RestServicesProblemsPage,
  ],
  imports: [
    IonicPageModule.forChild(RestServicesProblemsPage),
    NgxDatatableModule
  ],
})
export class RestServicesProblemsPageModule {}
