import { Component  } from '@angular/core';
import { NavController ,IonicPage, NavParams,LoadingController,ToastController,AlertController  } from 'ionic-angular';
import { TCommonPage } from '../basic-page';
import { ContactService } from '../../providers/contact-service';

@IonicPage({name: 'ContactPage'})
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage extends TCommonPage{

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl:LoadingController,
    public toastCtrl:ToastController,
    public contactservice: ContactService,
    private alertCtrl: AlertController) {
      super(navCtrl,navParams,loadingCtrl,toastCtrl);
      document.title='设置';
      this.headimg = localStorage.getItem('headimgurl');
      this.nickname= localStorage.getItem('nickname');
      this.accountname = localStorage.getItem('accountname');
  }

  Topush() {
    this.navCtrl.push('PushsettingPage');
  };

  Toguanyu() {
    this.navCtrl.push('GuanyuPage');
  };

  //改变更新时间
  timeref() {
    console.log(this.reftime);
    this.contactservice.Chagereftime(this.reftime).then(
      data => {
        if(data.retCode === 0) {
          this.ShowToast('设置成功')
          localStorage.setItem('mapRefreshTime',this.reftime);
        }else{
          this.ShowToast(data.message)
        }
      },
      error => console.log(error)
    );
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: '解绑提示',
      message: '确定解除绑定吗?',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: () => {
            this.Unbind();
          }
        }
      ]
    });
    alert.present();
  }


  Unbind() {
    this.contactservice.UnbindAccount().then(
      data => {
        console.log(data);
        if(data.retCode === 0){
          this.ShowToast('解绑成功');
          localStorage.removeItem('tokenId');
          this.navCtrl.push('CarloginPage');
        }else{
          this.ShowToast(data.message);  
        }
      },
      error => console.log(error)
    );
  }

  headimg;
  nickname;
  accountname;
  reftime=localStorage.getItem('mapRefreshTime');
}
