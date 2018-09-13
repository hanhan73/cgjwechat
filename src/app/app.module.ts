import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpModule } from '@angular/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

// import { TabsPage } from '../pages/tabs/tabs';
// import { AboutPage } from '../pages/about/about';
// import { ContactPage } from '../pages/contact/contact';
// import { CarlistPage } from '../pages/carlist/carlist';
import { TAuth } from '../providers/auth';
import { TBasicService } from '../providers/basic-service';
import { CarloginService } from '../providers/carlogin-service';
import { CarlistService } from '../providers/carlist-service';
import { CarInfoService } from '../providers/carinfo-service';
import { PlayBackService } from '../providers/playback-service';
import { DeviceinfoService } from '../providers/deviceinfo-service'
import { CheckorderService } from '../providers/checkorder-service';
import { ApplyaccountService } from '../providers/applyaccount-service';
import { SettingService } from '../providers/setting-service';
import { PoliceService } from '../providers/police-service';
import { AboutService } from '../providers/about-service';
import { ContactService } from '../providers/contact-service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    BarcodeScanner,
    StatusBar,
    SplashScreen,
    Geolocation,
    TAuth,
    TBasicService,
    CarloginService,
    CarlistService,
    CarInfoService,
    PlayBackService,
    DeviceinfoService,
    CheckorderService,
    ApplyaccountService,
    SettingService,
    PoliceService,
    AboutService,
    ContactService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
