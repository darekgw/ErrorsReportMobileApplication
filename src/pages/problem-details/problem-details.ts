import { Component } from '@angular/core';
import { App, IonicPage, NavController } from 'ionic-angular';
import { SoapServicesProblemsPage } from '../soap-services-problems/soap-services-problems';
import { Rest } from '../../providers/rest';
import { RestServicesProblemsPage } from '../rest-services-problems/rest-services-problems';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'problem-details',
  templateUrl: 'problem-details.html'
})
export class ProblemDetails {

  amountOfDays = 6;

  countSoapServicesProblemsUrl = 'dashboard/soap-service-problems-count';
  countRestServicesProblemsUrl = 'dashboard/rest-service-problems-count';
  countSoapScenarioProblemsUrl = 'dashboard/soap-scenario-problems-count';
  countRestScenarioProblemsUrl = 'dashboard/rest-scenario-problems-count';

  numberOfSoapServicesProblems = 0;
  numberOfRestServicesProblems = 0;
  numberOfSoapScenarioProblems = 0;
  numberOfRestScenarioProblems = 0;

  constructor(public navCtrl: NavController, public rest: Rest, private auth: AuthServiceProvider, private app: App) {
  }

  ionViewWillEnter() {
    this.getAmountOfProblems();
  }

  soapServicesProblems(event, item, number) {
    number = this.numberOfSoapServicesProblems;
    if (this.numberOfSoapServicesProblems > 0)
      this.navCtrl.push(SoapServicesProblemsPage, {
        item: item,
        number: number
      });
  }

  restServicesProblems(event, item) {
    if (this.numberOfRestServicesProblems > 0) {
      this.navCtrl.push(RestServicesProblemsPage, {
        item: item
      });
    }
  }

  getAmountOfProblems() {
    this.rest.getAll(`${this.countSoapServicesProblemsUrl}/${this.amountOfDays}`)
    .then((response) => {
      if (response) {
        this.numberOfSoapServicesProblems = response['data'];
      }
      this.rest.getAll(`${this.countRestServicesProblemsUrl}/${this.amountOfDays}`)
      .then((response) => {
        if (response) {
          this.numberOfRestServicesProblems = response['data'];
        }
        this.rest.getAll(`${this.countSoapScenarioProblemsUrl}/${this.amountOfDays}`)
        .then((response) => {
          if (response) {
            this.numberOfSoapScenarioProblems = response['data'];
          }
          this.rest.getAll(`${this.countRestScenarioProblemsUrl}/${this.amountOfDays}`)
          .then((response) => {
            if (response) {
              this.numberOfRestScenarioProblems = response['data'];
            }
          })
        })
      })
      .catch(error => error);
    })
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
      this.app.getRootNav().setRoot('LoginPage')
    });
  }

}
