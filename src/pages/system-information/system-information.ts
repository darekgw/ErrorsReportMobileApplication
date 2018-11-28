import { Component } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { Rest } from '../../providers/rest';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
import {Subscription} from 'rxjs/Subscription';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'system-information',
  templateUrl: 'system-information.html'
})
export class SystemInformation{

  memoryUsageUrl = 'dashboard/get-memory-usage';
  cpuUsageUrl = 'dashboard/get-cpu-usage';

  latitudeOfDevice;
  longitudeOfDevice;
  currentLatitudeOfDevice;
  currentLongitudeOfDevice;

  response
  data
  memoryUsage;
  memoryUsageUnit = 'MB';
  cpuUsage;
  cpuUsageUnit = '%';
  period: number = 1000 * 10;
  private subscription: Subscription;

  constructor(public navCtrl: NavController, public rest: Rest, private auth: AuthServiceProvider, private app: App, private geolocation: Geolocation) {
  }

  ionViewWillEnter() {
    this.getMemoryUsage();
    this.checkPosition();
    this.watchDevice();
  }

  getMemoryUsage() {
    const timer = TimerObservable.create(0, this.period);
    this.subscription = timer.subscribe(t => {
    this.rest.getAll(`${this.memoryUsageUrl}`).then(
      (response) => {
        this.memoryUsage = response.data + ' ' + this.memoryUsageUnit;
        this.rest.getAll(`${this.cpuUsageUrl}`).then(
          (resp) => {
            this.cpuUsage = resp.data + ' ' + this.cpuUsageUnit;
          })
      }
    ).catch(error => error);
    });
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
      this.app.getRootNav().setRoot('LoginPage')
    });
  }

  checkPosition() {
    this.geolocation.getCurrentPosition().then((resp) => {
      if(resp.coords) {
        this.latitudeOfDevice = resp.coords.latitude
        this.longitudeOfDevice = resp.coords.longitude
      }
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  watchDevice() {
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      if(data.coords) {
        this.currentLatitudeOfDevice = data.coords.latitude
        this.currentLongitudeOfDevice = data.coords.longitude
      }
    });
  }

}
