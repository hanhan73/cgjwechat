import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,ToastController} from 'ionic-angular';
import { TCommonPage } from '../basic-page';
import { PoliceService } from '../../providers/police-service';
/**
 * Generated class for the PolicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({name:'PolicePage'})
@Component({
  selector: 'page-police',
  templateUrl: 'police.html',
})
export class PolicePage extends TCommonPage{

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl:LoadingController,
    public toastCtrl:ToastController,
    public policeservice:PoliceService) {
      super(navCtrl,navParams,loadingCtrl,toastCtrl);
      document.title = '报警信息'
      this.info = this.navParams.get('item');
  }

  ionViewDidLoad() {
    if( this.info != undefined ){
      this.policeservice.GetPoliceinfo(this.info).then(
        data => this.GetFinish(data),
        error => console.log(error)
      );
    }
  }

  GetFinish(data) {
    console.log(data)
    if( data.retCode === 0 ) {
      this.policeitem = data.data;
      if( this.policeitem.length  === 0) {
        this.ShowToast('没有报警信息')
        this.GoBack();
      }
    }else {
      this.ShowToast(data.message);
    }
  }

  private info;
  private policeitem;
}
