import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { TAuth } from '../providers/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = undefined;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private Auth: TAuth) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    Auth.GetRequestParam(location.search);
    if(localStorage.getItem('openid') === undefined && localStorage.getItem('openid') == ''){
      console.log(localStorage.getItem('openid'));
      this.rootPage='GpsdetailPage';
    }else {
      if(localStorage.getItem('tokenId') != undefined && localStorage.getItem('tokenId')!= '') {
        console.log(localStorage.getItem('tokenId'));
        Auth.wechatlogin().then(
          data => {
            if(data.retCode===0){
              localStorage.setItem('tokenId',data.tokenId);
              localStorage.setItem('partnerid',data.data.partnerid);
              localStorage.setItem('userid',data.data.id);
              localStorage.setItem('accountname',data.data.username);
              if(data.data.mapRefreshTime == undefined) {
                localStorage.setItem('mapRefreshTime','');
              }else {
                localStorage.setItem('mapRefreshTime',data.data.mapRefreshTime);
              }
              this.rootPage='TabsPage';
            }else {
              console.log(data);  
            }
          },
          error => console.log(error)
        )
      }else{
        this.rootPage='CarloginPage';
      }
    }
  }
  
  // public rpag:any ;
}
