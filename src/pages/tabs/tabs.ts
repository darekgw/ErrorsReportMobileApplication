import { Component } from '@angular/core';

import { ProblemDetails } from '../problem-details/problem-details';
import { SystemInformation } from '../system-information/system-information';
import { HomePage } from '../home/home';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ProblemDetails;
  tab3Root = SystemInformation;

  constructor() {

  }
}
