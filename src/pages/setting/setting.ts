import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,ToastController } from 'ionic-angular';
import { TCommonPage } from '../basic-page';
/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({name:'SettingPage'})
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage extends TCommonPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl:LoadingController,
    public toastCtrl:ToastController) {
      super(navCtrl,navParams,loadingCtrl,toastCtrl);
      document.title = '指令下发'
     this.info = this.navParams.get('item');
  }

  ionViewDidLoad() {
    if(this.info.connectedtype === "1") {
      this.setpage = this.T;
    }else if(this.info.connectedtype === "0"){
      this.setpage = this.M;
    }else {
      this.GoBack();
    }
  }

  itemSelected(item) {
    this.navCtrl.push(item.page,{item:this.info,vitem:item});
  }

  private T = [
    {
      name: "唤醒睡眠",
      page: "WakeupPage"
    },
    {
      name: "追踪模式",
      page: "TracemodePage"
    },
    {
      name: "GPS定位开关",
      page: "AzimuthssPage"
    },
    {
      name: "WIFI定位开关",
      page: "WifiazimuthssPage"
    },
    {
      name: "工作模式查询",
      page: "WorkqueryPage"
    }
  ];
  private M = [
    {
      name: "一键设防",
      page: "VsettingPage",
      tishi:"请确认该设备支持该项指令设置",
      num: '1'
    },
    {
      name: "单次点名",
      page: "VsettingPage",
      tishi:"单次点名直接点击发送即可",
      num: '2'
    },
    {
      name: "回传间隔",
      page: "VsettingPage",
      tishi:"请确认该设备支持该项指令设置",
      num: '3'
    },
    {
      name: "重启设备",
      page: "VsettingPage",
      tishi:"重启设备直接点击发送即可",
      num: '4'
    }
  ];
  private info;
  private setpage;
}
