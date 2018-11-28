import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { Rest } from '../../providers/rest';
import { ServicesProblemsModalPage } from '../services-problems-modal/services-problems-modal';

@IonicPage()
@Component({
  selector: 'page-soap-services-problems',
  templateUrl: 'soap-services-problems.html',
})
export class SoapServicesProblemsPage {

  isSoapSelected: boolean = true;
  amountOfDays = 6;
  config;
  response;
  data: any[] = [];
  number;
  selected = [];
  dateOfProblems;
  chosen5MinutesInterval;
  chosenHour;

  public columns: any;
  public rows: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: Rest, public modalCtrl: ModalController) {

    this.config = {
      currentPage: '1',
      itemsPerPage: '100',
      sortFieldName: 'serviceName',
      sSortDir_0: 'asc',
      sSearch: '',
      sEcho: 0
    };

    this.columns = [
      { prop: 'serviceName' },
      { prop: 'operationName' }
    ];
  }

  ionViewDidLoad() {
    this.dateOfProblems = this.navParams.get('date');
    this.chosen5MinutesInterval = this.navParams.get('chosenInterval');
    this.chosenHour = this.navParams.get('chosenHour');
    this.getSoapErrors();
  }

  getSoapErrors() {
    this.rest.findSoapServicesProblems(this.amountOfDays, this.config).subscribe(
      resp => this.prepareData(resp),
      error => console.log(error)
    );
  }

  prepareData(resp) {
    this.response = resp.body['data'];
    if (this.response) {
      this.data = this.response['content'];
      if (this.dateOfProblems) {
        let recordsFromChosenDate = [];
        let that = this;
        this.data.forEach(function (value) {
          let dateToCheck = value.createDate.slice(0, 10);
          if (dateToCheck == that.dateOfProblems) {
            recordsFromChosenDate.push(value);
          }
        })
        this.rows = recordsFromChosenDate;
      } else if (this.chosen5MinutesInterval) {
        let recordsFromChosenInterval = [];
        let currentDate = new Date();
        let currentIntervalStartDate = new Date();
        let currentIntervalStartMinute = Math.floor(currentDate.getMinutes() / 5) * 5;
        let currentIntervalEndMinute = currentIntervalStartMinute + 4;
        currentIntervalStartDate.setMinutes(currentIntervalStartMinute, 0, 0);
        let currentIntervalEndDate = new Date(currentIntervalStartDate)
        currentIntervalEndDate.setMinutes(currentIntervalEndMinute, 59, 59);
        let chosenIntervalStartDate = new Date(currentIntervalStartDate);
        let chosenIntervalEndDate = new Date(currentIntervalEndDate);
        if (this.chosen5MinutesInterval !== '05') {
          let numberOfChosenInterval = Number(this.chosen5MinutesInterval);
          let minutesToSubtract = numberOfChosenInterval - 5;
          chosenIntervalStartDate.setMinutes(currentIntervalStartMinute - minutesToSubtract);
          chosenIntervalEndDate.setMinutes(currentIntervalEndMinute - minutesToSubtract, 59, 59);
        }
        this.data.forEach(function (value) {
          let dateToCheck = new Date(value.createDate);
          if (dateToCheck >= chosenIntervalStartDate && dateToCheck <= chosenIntervalEndDate) {
            recordsFromChosenInterval.push(value);
          }
        })
        this.rows = recordsFromChosenInterval;
      }
      else if (this.chosenHour) {
        let recordsFromChosenHour = [];
        let currentDate = new Date();
        let currentHour = currentDate.getHours();
        let differenceBetweenCurrentAndChosenHour = currentHour - this.chosenHour;
        if (differenceBetweenCurrentAndChosenHour < 0) {
          differenceBetweenCurrentAndChosenHour = differenceBetweenCurrentAndChosenHour + 24;
        }
        let startDate = new Date();
        startDate.setHours(currentHour - differenceBetweenCurrentAndChosenHour, 0, 0);
        let endDate = new Date(startDate);
        endDate.setMinutes(59, 59, 59);
        this.data.forEach(function (value) {
          let dateToCheck = new Date(value.createDate);
          if (dateToCheck >= startDate && dateToCheck <= endDate) {
            recordsFromChosenHour.push(value);
          }
        })
        this.rows = recordsFromChosenHour;
      } else {
        this.rows = this.data;
      }
    }
  }

  openModal(selected) {
    let modal = this.modalCtrl.create(ServicesProblemsModalPage, {
      selected: selected,
      isSoapSelected: this.isSoapSelected
    });
    modal.present();
    // refresh data after modal dismissed
    modal.onDidDismiss(() => this.ionViewDidLoad())
  }

}
