import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import { CheckorderService } from '../../providers/checkorder-service';
import { TCommonPage } from '../basic-page';

/**
 * Generated class for the CheckorderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({name: 'CheckorderPage'})
@Component({
  selector: 'page-checkorder',
  templateUrl: 'checkorder.html',
})
export class CheckorderPage extends TCommonPage{

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public checkorderservice: CheckorderService) {
    super(navCtrl, navParams,loadingCtrl,toastCtrl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckorderPage');
  }

  Nextbtn() {
    if( this.orderid == undefined || this.orderid == "") {
      this.ShowToast('请输入订单号')
    }else {
      this.checkorderservice.CheckOrderId(this.orderid).then(
        data => this.Finish(data),
        error => console.log(error)
      )
    }
  }

  Finish(data) {
    console.log(data)
    if(data.errcode == "0") {
      this.navCtrl.push('ApplyaccountPage',{item:data})
    }else {
      this.ShowToast('抱歉订单号不对，不能申请')
    }

  }

  private orderid;
}
