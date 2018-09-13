import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,ToastController } from 'ionic-angular';
import { TCommonPage } from '../basic-page';
import { SettingService } from '../../providers/setting-service';
/**
 * Generated class for the WorkqueryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({name:'WorkqueryPage'})
@Component({
  selector: 'page-workquery',
  templateUrl: 'workquery.html',
})
export class WorkqueryPage extends TCommonPage{

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl:LoadingController,
    public toastCtrl:ToastController,
    public setservice: SettingService) {
    super(navCtrl,navParams,loadingCtrl,toastCtrl);
    document.title = '模式查询';
      this.info = this.navParams.get('item');
  }

  ionViewDidLoad() {
    if( this.info != undefined) {
      this.setservice.QueryDev(this.info,'7').then(
        data => this.GetFinish(data),
        error => console.log(error)
      )
    }
  }

  GetFinish(data) {
    console.log(data);
    if(data.retCode === 0) {
      this.result = data.data.result;
    }else {
      this.ShowToast(data.message);
    }
  }

  private result;
  private info;
}
