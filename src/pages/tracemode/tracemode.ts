import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,ToastController} from 'ionic-angular';
import { TCommonPage } from '../basic-page';
import { SettingService } from '../../providers/setting-service';
/**
 * Generated class for the TracemodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({name:'TracemodePage'})
@Component({
  selector: 'page-tracemode',
  templateUrl: 'tracemode.html',
})
export class TracemodePage extends TCommonPage{

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl:LoadingController,
    public toastCtrl:ToastController,
    public setservice: SettingService) {
      super(navCtrl,navParams,loadingCtrl,toastCtrl);
      document.title = '追踪模式'
    this.info = this.navParams.get('item');
  }

  ionViewDidLoad() {
    if( this.info != undefined) {
      this.setservice.QueryDev(this.info,'2').then(
        data => this.GetFinish(data),
        error => console.log(error)
      )
    }
  }

  GetFinish(data) {
    console.log(data);
    if(data.retCode === 0) {
      this.traceitem = data.data;
      this.tracktime = this.traceitem.track_time;
      this.returntime = this.traceitem.time_span;
    }else {
      this.ShowToast(data.message);
    }
  }

  Sendset() {
    if(this.returntime == undefined || this.returntime == "") {
      this.ShowToast('请选择回传间隔');
      return;
    }
    if(this.tracktime == undefined || this.tracktime == "") {
      this.ShowToast('请选择追踪时间');
      return;
    }
    this.setservice.SendDev(this.info,'2','1',this.returntime,this.tracktime).then(
      data => this.SendFinish(data),
      error => console.log(error)
    );
  }

  SendFinish(data) {
    console.log(data)
    if(data.data == 'success') {
      this.ShowToast('发送成功');
    }else {
      this.ShowToast(data.message);
    }
  }

  private traceitem;
  private info;
  private tracktime;
  private returntime;
}
