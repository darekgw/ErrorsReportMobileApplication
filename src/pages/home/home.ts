import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Rest } from '../../providers/rest';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { RestServicesProblemsPage } from '../rest-services-problems/rest-services-problems';
import { SoapServicesProblemsPage } from '../soap-services-problems/soap-services-problems';
import { App } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  soapServiceProblemsUrl = "dashboard/soap-service-problems-count-by-day";
  restServiceProblemsUrl = "dashboard/rest-service-problems-count-by-day";
  soapScenarioProblemsUrl = "dashboard/soap-scenario-problems-by-day";
  restScenarioProblemsUrl = "dashboard/rest-scenario-problems-by-day";
  restServiceProblemsPerHoursUrl = "dashboard/rest-service-problems-count-by-hour";
  soapServiceProblemsPerHoursUrl = "dashboard/soap-service-problems-count-by-hour";
  restServiceProblemsPer5MinutesUrl = "dashboard/rest-service-problems-count-by-five-minutes";
  soapServiceProblemsPer5MinutesUrl = "dashboard/soap-service-problems-count-by-five-minutes";

  username = '';
  email = '';

  isSoapSelected: boolean = true;
  chosenChart = 'perHour';

  amountOfDays = 6;
  amountOfHours = 24; //max 24h
  soapResponsed;
  restResponsed;
  soapScenarioResponsed;
  restScenarioResponsed;
  restServiceProblemsByHourResponded;
  soapServiceProblemsByHourResponded
  restServiceProblemsPer5MinutesResponded;
  soapServiceProblemsPer5MinutesResponded;

  public soapChartColors = [{
    backgroundColor: 'rgba(102,187,106, 1)',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: 'rgba(102,187,106, 1)',
    pointHoverBorderColor: 'rgba(148,159,177, 1)'
  }];
  public restChartColors = [{
    backgroundColor: 'rgba(236,64,122, 1)',
    borderColor: 'rgba(77,83,96,1)',
    pointBackgroundColor: 'rgba(77,83,96,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: 'rgba(236,64,122, 1)',
    pointHoverBorderColor: 'rgba(77,83,96,1)'
  }];

  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';
  lineChartServicesData: Array<any>;
  lineChartServicesLabels: Array<any>;
  lineChartScenarioData: any[];

  public barChartOptions: any = {
    responsive: true
  }
  public barChartLegend: boolean = true;
  public barChartType: string = 'bar';

  barChartProblemsPerHoursData: Array<any>;
  barChartProblemsPerHoursLabels: Array<any>;

  barChartProblemsPer5MinutesData: Array<any>;
  barChartProblemsPer5MinutesLabels = ['60', '55', '50', '45', '40', '35', '30', '25', '20', '15', '10', '05'];

  constructor(public nav: NavController, private rest: Rest, private screenOrientation: ScreenOrientation, private statusBar: StatusBar, splashScreen: SplashScreen, private auth: AuthServiceProvider, private app: App) {

    // let info = this.auth.getUserInfo();
    // this.username = info['name'];
    // this.email = info['email'];

    splashScreen.hide();

    this.screenOrientation.ORIENTATIONS.ANY;

    setInterval(() => {
      this.refreshData();
    }, 36000)
  }

  ionViewWillEnter() {
    this.statusBar.backgroundColorByName('black');
    this.loadCharts();
  }

  changeService() {
    if (this.isSoapSelected) {
      this.isSoapSelected = false;
    } else {
      this.isSoapSelected = true;
    }
    this.refreshData();
  }

  showChosenChart() {
    this.loadCharts();
  }

  public refreshData(): void {
    this.loadCharts();
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
      this.app.getRootNav().setRoot('LoginPage')
    });
  }

  private loadCharts() {
    if (this.isSoapSelected) {
      if (this.chosenChart == 'perDay') {
        this.rest.getAll(`${this.soapServiceProblemsUrl}/${this.amountOfDays}`)
        .then((soapResponse) => {
          this.soapResponsed = soapResponse['data'];
          this.initSoapServicesProblemsChart(this.soapResponsed);
        }).catch(error => error);
      } else if (this.chosenChart == 'perHour') {
        if(this.amountOfHours > 24) {
          this.amountOfHours = 24;
        }
        this.rest.getAll(`${this.soapServiceProblemsPerHoursUrl}/${this.amountOfHours}`)
        .then((soapProblemsPerHour) => {
          this.soapServiceProblemsByHourResponded = soapProblemsPerHour['data'];
          this.initSoapServicesProblemsPerHoursChart(this.soapServiceProblemsByHourResponded);
        }).catch(error => error);
      } else if (this.chosenChart == 'scenario') {
        this.rest.getAll(`${this.soapScenarioProblemsUrl}/${this.amountOfDays}`)
        .then((soapScenarioResponse) => {
          this.soapScenarioResponsed = soapScenarioResponse['data'];
          this.initSoapScenarioProblemsChart(this.soapScenarioResponsed);
        }).catch(error => error);
      } else if (this.chosenChart == 'perMinute') {
        this.rest.getAll(`${this.soapServiceProblemsPer5MinutesUrl}`)
        .then((soapProblemsPer5Minutes) => {
          this.soapServiceProblemsPer5MinutesResponded = soapProblemsPer5Minutes['data'];
          this.initSoapServiceProblemsPer5MinutesChart(this.soapServiceProblemsPer5MinutesResponded);
        }).catch(error => error);
      }
    } else {
      if (this.chosenChart == 'perDay') {
        this.rest.getAll(`${this.restServiceProblemsUrl}/${this.amountOfDays}`)
        .then((restResponse) => {
          this.restResponsed = restResponse['data'];
          this.initRestServicesProblemsChart(this.restResponsed);
        }).catch(error => error);
      } else if (this.chosenChart == 'scenario') {
        this.rest.getAll(`${this.restScenarioProblemsUrl}/${this.amountOfDays}`)
        .then((restScenarioResponse) => {
          this.restScenarioResponsed = restScenarioResponse['data'];
          this.initRestScenarioProblemsChart(this.restScenarioResponsed);
        }).catch(error => error);
      } else if (this.chosenChart == 'perHour') {
        this.rest.getAll(`${this.restServiceProblemsPerHoursUrl}/${this.amountOfHours}`)
        .then((restProblemsPerHour) => {
          this.restServiceProblemsByHourResponded = restProblemsPerHour['data'];
          this.initRestServicesProblemsPerHoursChart(this.restServiceProblemsByHourResponded);
        }).catch(error => error);
      } else if (this.chosenChart == 'perMinute') {
        this.rest.getAll(`${this.restServiceProblemsPer5MinutesUrl}`)
        .then((restProblemsPer5Minutes) => {
          this.restServiceProblemsPer5MinutesResponded = restProblemsPer5Minutes['data'];
          this.initRestServiceProblemsPer5MinutesChart(this.restServiceProblemsPer5MinutesResponded);
        }).catch(error => error);
      }
    }
  }

  initSoapServicesProblemsChart(soapProblemsResponded) {
    this.lineChartServicesLabels = soapProblemsResponded.labels;
    this.lineChartServicesData = [
      { data: soapProblemsResponded.series[0], label: 'Soap' }
    ];
  }

  initRestServicesProblemsChart(restProblemsResponded) {
    this.lineChartServicesLabels = restProblemsResponded.labels;
    this.lineChartServicesData = [
      { data: restProblemsResponded.series[0], label: 'Rest' }
    ];
  }

  initSoapScenarioProblemsChart(soapScenarioResponsed) {
    this.lineChartScenarioData = [
      { data: soapScenarioResponsed.series[0], label: 'Soap' }
    ];
  }

  initRestScenarioProblemsChart(restScenarioResponsed) {
    this.lineChartScenarioData = [
      { data: restScenarioResponsed.series[0], label: 'Rest' }
    ];
  }

  initRestServicesProblemsPerHoursChart(restProblemsPerHoursResponsed) {
    this.barChartProblemsPerHoursLabels = restProblemsPerHoursResponsed.labels;
    this.barChartProblemsPerHoursData = [
      { data: restProblemsPerHoursResponsed.series[0], label: 'Rest' }
    ]
  }

  initSoapServicesProblemsPerHoursChart(soapProblemsPerHoursResponsed) {
    this.barChartProblemsPerHoursLabels = soapProblemsPerHoursResponsed.labels;
    this.barChartProblemsPerHoursData = [
      { data: soapProblemsPerHoursResponsed.series[0], label: 'Soap' }
    ]
  }

  initRestServiceProblemsPer5MinutesChart(restProblemsPer5MinutesResponded) {
    this.barChartProblemsPer5MinutesData = [
      { data: restProblemsPer5MinutesResponded.series[0], label: 'Rest' }
    ]
  }

  initSoapServiceProblemsPer5MinutesChart(soapProblemsPer5MinutesResponded) {
    this.barChartProblemsPer5MinutesData = [
      { data: soapProblemsPer5MinutesResponded.series[0], label: 'Soap' }
    ]
  }

// events
  public showSoapProblemsByDate(event) {
    if (event.active[0]) {
      const dataIndex = event.active[0]._index;
      const date = this.lineChartServicesLabels[dataIndex]
      // console.log(date);
      this.nav.push(SoapServicesProblemsPage, {
        date: date
      });
    }
  }

  public showRestProblemsByDate(event) {
    if (event.active[0]) {
      const dataIndex = event.active[0]._index;
      const date = this.lineChartServicesLabels[dataIndex]
      // console.log(date);
      this.nav.push(RestServicesProblemsPage, {
        date: date
      });
    }
  }

  public showSoapProblemsBy5MinutesInterval(event) {
    if (event.active[0]) {
      const dataIndex = event.active[0]._index;
      const date = this.barChartProblemsPer5MinutesLabels[dataIndex]
      // console.log(date);
      this.nav.push(SoapServicesProblemsPage, {
        chosenInterval: date
      });
    }
  }

  public showRestProblemsBy5MinutesInterval(event) {
    if (event.active[0]) {
      const dataIndex = event.active[0]._index;
      const date = this.barChartProblemsPer5MinutesLabels[dataIndex]
      // console.log(date);
      this.nav.push(RestServicesProblemsPage, {
        chosenInterval: date
      });
    }
  }

  public showSoapServicesProblemsByHour(event) {
    if (event.active[0]) {
      const dataIndex = event.active[0]._index;
      const date = this.barChartProblemsPerHoursLabels[dataIndex]
      // console.log(date);
      this.nav.push(SoapServicesProblemsPage, {
        chosenHour: date
      });
    }
  }

  public showRestServicesProblemsByHour(event) {
    if (event.active[0]) {
      const dataIndex = event.active[0]._index;
      const date = this.barChartProblemsPerHoursLabels[dataIndex]
      // console.log(date);
      this.nav.push(RestServicesProblemsPage, {
        chosenHour: date
      });
    }
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}

