import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,ToastController } from 'ionic-angular';
import { TCommonPage } from '../basic-page';
import { DeviceinfoService } from '../../providers/deviceinfo-service';
/**
 * Generated class for the DeviceinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({name:"DeviceinfoPage"})
@Component({
  selector: 'page-deviceinfo',
  templateUrl: 'deviceinfo.html',
})
export class DeviceinfoPage extends TCommonPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl:LoadingController,
    public toastCtrl:ToastController,
    public deviceservice: DeviceinfoService) {
      super(navCtrl,navParams,loadingCtrl,toastCtrl);
      document.title = '设备信息'
      this.id =  this.navParams.get('item');
      console.log(this.navParams.get('parter'))
      if( this.navParams.get('parter') == undefined || this.navParams.get('parter') == '') {
        
      }else {
        this.parteritem = this.navParams.get('parter');
      }
  }

  ionViewDidLoad() {
    if( this.id != undefined && this.id != "" ) {
      this.deviceservice.Getdevicebyid(this.id).then(
        data => this.getFinsh(data),
        error => console.log(error)
      );
    }else {
      this.GoBack();
    }
  }

  getFinsh(data) {
    if(data.retCode === 0) {
      this.deviceinfo = data.data;
      this.devicename = this.deviceinfo.devicename;
      this.deviceaccount = this.deviceinfo.partnername;
      if(this.parteritem !== undefined) {
        this.deviceaccount = this.parteritem.partnername;
      }
    }else {
      this.changecode(data);
    }
  }

  submit() {
    if( this.devicename == undefined || this.devicename == '') {
      this.ShowToast('请输入设备名称');
      return;
    }
    if( this.deviceaccount == undefined || this.deviceaccount == '') {
      this.ShowToast('请选择账号')
      return;
    }
    this.deviceservice.SaveOrupdate(this.deviceinfo,this.devicename,this.parteritem).then(
      data => this.submitFinish(data),
      error => console.log(error)
    );
  }

  submitFinish(data) {
    if (data.data === 1){
      this.ShowToast('提交成功');
      this.navCtrl.push('CarlistPage');
    }else {
      this.ShowToast(data.message);
    }
  }

  getparter() {
    this.deviceservice.GetParterList().then(
      data => {
        if(data.retCode === 0 ) {
          this.navCtrl.push('ParterlistPage',{item:data.data,id:this.id});  
        }else {
          this.ShowToast(data.message);
        }
      },
      error => console.log(error)
    );
  }

  private id;
  private deviceinfo;
  private devicename;
  private deviceaccount = '请选择账号';

  private parteritem;
}
