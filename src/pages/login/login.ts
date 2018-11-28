import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController, NavParams, Loading } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: '', password: '' };
  creatingAccount: boolean = false;

  constructor(public nav: NavController, public navParams: NavParams, private auth: AuthServiceProvider,  private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
  }

  public createAccount() {
    this.creatingAccount = true;
    // this.nav.push('RegisterPage');
  }

  public login() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(allowed => {
        if (allowed) {
          this.nav.setRoot('TabsPage');
        } else if (this.creatingAccount) {
          this.nav.push('RegisterPage');
        } else {
          this.showError("Access Denied");
        }
      },
      error => {
        this.showError(error);
      });
    this.creatingAccount = false;
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true,
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

}
