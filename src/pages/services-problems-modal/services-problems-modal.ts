import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-soap-services-problems-modal',
  templateUrl: 'services-problems-modal.html',
})
export class ServicesProblemsModalPage {

  isSoapSelected: boolean;
  data;
  serviceName;
  url;
  operationName;
  createDate;
  methodTime;
  log;
  errorLog;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,) {}

  ionViewDidLoad() {
    this.data = this.navParams.get('selected');
    this.isSoapSelected = this.navParams.get('isSoapSelected')
      this.serviceName = this.data[0].serviceName;
      this.url = this.data[0].url;
      this.operationName = this.data[0].operationName;
      this.createDate = this.data[0].createDate;
      this.methodTime = this.data[0].methodTime;
      this.log = this.data[0].log;
      this.errorLog = this.data[0].errorLog;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
