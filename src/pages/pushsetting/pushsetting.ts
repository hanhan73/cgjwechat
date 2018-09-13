import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController ,ToastController  } from 'ionic-angular';
import { ContactService } from '../../providers/contact-service';
import { TCommonPage } from '../basic-page';
/**
 * Generated class for the PushsettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({name: 'PushsettingPage'})
@Component({
  selector: 'page-pushsetting',
  templateUrl: 'pushsetting.html',
})
export class PushsettingPage extends TCommonPage{

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public contactservice: ContactService) {
      super(navCtrl,navParams,loadingCtrl,toastCtrl);
      document.title='报警推送';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PushsettingPage');
    this.getaddtype();
    this.getopentype();
  }

  getaddtype() {
    this.contactservice.Getaddtype().then(
      data => {
        if(data.retCode === 0){
          this.getFinish(1,data.data)
        }else {
          this.ShowToast(data.message);
        }
      },
      error => console.log(error)
    );
  }

  getopentype() {
    this.contactservice.Getopentype().then(
      data => {
        if(data.retCode === 0){
          this.getFinish(0,data.data)
        }else {
          this.ShowToast(data.message);
        }
      },
      error => console.log(error)
    );
  }

  deltype(item) {
    this.contactservice.Deltypes(item.id).then(
      data => {
        if(data.retCode === 0){
          this.getFinish(3,data.data)
        }else {
          this.ShowToast(data.message);
        }
      },
      error => console.log(error)
    );
  }

  addtype(item) {
    this.contactservice.Savetype(item.id).then(
      data => {
        if(data.retCode === 0){
          this.getFinish(4,data.data)
        }else {
          this.ShowToast(data.message);
        }
      },
      error => console.log(error)
    );
  }

  getFinish(d:number,data) {
    if(d===1){
      //获取未推送的报警
      this.addlist = data;
    }
    if(d===0){
      //获取已经推送的报警
      this.openlist = data;
    }
    if(d===3 || d===4){
      this.ionViewDidLoad();
      this.ShowToast("设置成功");
    }
  }

  openlist;
  addlist;
}
