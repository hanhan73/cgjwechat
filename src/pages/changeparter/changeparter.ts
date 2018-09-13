import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams  ,LoadingController,ToastController} from 'ionic-angular';
import { TCommonPage } from '../basic-page';
import { AboutService } from '../../providers/about-service';
/**
 * Generated class for the ChangeparterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({name:'ChangeparterPage'})
@Component({
  selector: 'page-changeparter',
  templateUrl: 'changeparter.html',
})
export class ChangeparterPage extends TCommonPage{

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl:LoadingController,
    public toastCtrl:ToastController,
    public aboutservice: AboutService) {
      super(navCtrl,navParams,loadingCtrl,toastCtrl);
      document.title='绑定详情';
     this.bindinfo =this.navParams.get('item')
     this.vid = this.bindinfo.id;
     console.log(this.bindinfo)
  }

  ionViewDidLoad() {
    this.getvlist();
  }

  UnBind(item) {
    this.aboutservice.Unbinddevice(item,this.bindinfo).then(
      data => this.Finish(data),
      error => console.log(error)
    );
    
  }

  getvlist() {
    this.aboutservice.GetBindUserDevice(this.vid).then(
      data => {
        if(data.retCode === 0) {
          this.devicelist = data.data;
        }else {
          this.ShowToast(data.message);
        }
      },
      error => console.log(error)
    );
  }

  Finish(data) {
    if(data.retCode === 0){
      console.log(data);
      this.ShowToast('解绑成功');
     this.navCtrl.push('ChangeparterPage',{item: this.bindinfo})
    }else {
      this.ShowToast(data.message);
    }
  }


  GetBind() {
    this.navCtrl.push('BindcarPage',{item:this.bindinfo,dlist:this.devicelist})
  }

  private vid;
  private bindinfo;
  private devicelist;
}
