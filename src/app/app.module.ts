import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SystemInformation } from '../pages/system-information/system-information';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ChartsModule } from 'ng2-charts';
import { Rest } from '../providers/rest';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { SoapServicesProblemsPageModule } from '../pages/soap-services-problems/soap-services-problems.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RestServicesProblemsPageModule } from '../pages/rest-services-problems/rest-services-problems.module';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { LoginPageModule } from '../pages/login/login.module';
import { RegisterPageModule } from '../pages/register/register.module';
import { HomePageModule } from '../pages/home/home.module';
import { TabsPageModule } from '../pages/tabs/tabs.module';
import {Geolocation} from '@ionic-native/geolocation';
import { ProblemDetailsModule } from '../pages/problem-details/problem-details.module';

@NgModule({
  declarations: [
    MyApp,
    SystemInformation
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    LoginPageModule,
    RegisterPageModule,
    ChartsModule,
    HttpModule,
    HttpClientModule,
    SoapServicesProblemsPageModule,
    NgxDatatableModule,
    RestServicesProblemsPageModule,
    HomePageModule,
    TabsPageModule,
    ProblemDetailsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SystemInformation,
    SystemInformation,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Rest,
    ScreenOrientation,
    AuthServiceProvider,
    Geolocation
  ]
})
export class AppModule {}
