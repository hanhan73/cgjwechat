import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController  } from 'ionic-angular';
import { TCommonPage } from '../basic-page';
import { SettingService } from '../../providers/setting-service';
/**
 * Generated class for the WakeupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({name:'WakeupPage'})
@Component({
  selector: 'page-wakeup',
  templateUrl: 'wakeup.html',
})
export class WakeupPage extends TCommonPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl:LoadingController,
    public toastCtrl:ToastController,
    public setservice: SettingService) {
      super(navCtrl,navParams,loadingCtrl,toastCtrl);
      document.title = '休眠唤醒'
     this.info = this.navParams.get('item')
  }

  ionViewDidLoad() {
    if(this.info != undefined) {
      this.setservice.QueryDev(this.info,"1").then(
        data => this.GetFinish(data),
        error => console.log(error)
      )
    }
  }

  GetFinish(data) {
    console.log(data);
    if(data.retCode === 0) {
      this.wakeitem = data.data;
      this.returntime = this.wakeitem.time_span;
    }else {
      this.ShowToast(data.message);
    }
  }

  sendset() {
    //work_pattern =1 state:1  
    this.setservice.SendDev(this.info,1,1,this.returntime).then(
      data => this.SendFinish(data),
      error => console.log(error)
    ); 
  }

  SendFinish(data) {
    console.log(data);
    if(data.data === "success") {
      this.ShowToast('发送成功');
    }else {
      console.log(data);
    }
  }

  private info;
  private wakeitem;
  private returntime = '';
}
