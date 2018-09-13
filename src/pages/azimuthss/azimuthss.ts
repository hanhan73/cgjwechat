import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import { TCommonPage } from '../basic-page';
import { SettingService } from '../../providers/setting-service';
/**
 * Generated class for the AzimuthssPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({name:'AzimuthssPage'})
@Component({
  selector: 'page-azimuthss',
  templateUrl: 'azimuthss.html',
})
export class AzimuthssPage extends TCommonPage{

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl:LoadingController,
    public toastCtrl:ToastController,
    public setservice: SettingService) {
      super(navCtrl,navParams,loadingCtrl,toastCtrl);
      document.title = 'GPS定位'
      this.info = this.navParams.get('item');
  }

  ionViewDidLoad() {
    if( this.info != undefined) {
      this.setservice.QueryDev(this.info,'5').then(
        data => this.GetFinish(data),
        error => console.log(error)
      )
    }
  }

  GetFinish(data) {
    if(data.retCode === 0) {
      this.state = data.data.state;
    }else {
      this.ShowToast(data.message);
    }
  }

  Sendset() {
    if(this.state != undefined) {
      this.setservice.SendDev(this.info,'5',this.state).then(
        data => this.SendFinish(data),
        error => console.log(error)
      );
    }
  }

  SendFinish(data) {
    console.log(data)
    if(data.data == 'success') {
      this.ShowToast('发送成功');
    }else {
      this.ShowToast(data.message);
    }
  }

  private state;
  private info;
}
