import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,ToastController} from 'ionic-angular';
import { DeviceinfoService } from '../../providers/deviceinfo-service';
import { TCommonPage } from '../basic-page';
import { AboutService } from '../../providers/about-service';
/**
 * Generated class for the AddcarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({name:'AddcarPage'})
@Component({
  selector: 'page-addcar',
  templateUrl: 'addcar.html',
})
export class AddcarPage extends TCommonPage{

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl:LoadingController,
    public toastCtrl:ToastController,
    public deviceservice: DeviceinfoService,
    public aboutservice: AboutService) {
      super(navCtrl,navParams,loadingCtrl,toastCtrl);
      document.title='新增车辆';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddcarPage');
    // this.addcaritem[0].carNamber = 'dsadsa';
  }

  submit() {
    if(this.addcaritem[0].carNamber == undefined || this.addcaritem[0].carNamber === '') {
      this.ShowToast('车牌号不能为空')
      return;
    }
    console.log(this.addcaritem[0].carNamber )
    if(this.parteritem ===undefined) {
      this.ShowToast('请选择账号')
      return;
    }
    this.aboutservice.Addcar(this.addcaritem,this.parteritem).then(
      data => {
        if(data.retCode === 0){
          this.ShowToast('提交成功');
          this.navCtrl.push('AboutPage');
        }else {
          this.ShowToast(data.message);
        }
      },
      error => console.log(error)
    )
  }

  getparter() {
    this.deviceservice.GetParterList().then(
      data => {
        if(data.retCode === 0 ) {
        this.sta = 2;
         console.log(data.data)
         this.parteritem = data.data;
        }else {
          this.ShowToast(data.message);
        }
      },
      error => console.log(error)
    );
  }

  itemSelected(p) {
   this.sta = 1;
   this.parteritem = p;
  }


  private sta = 1;
  private parteritem;
  private addcaritem = [{
    carNamber : '',
    account:'',
    carja:'',
    username:'',
    userphone:'',
    carbrand:'',
    cartype:'',
    gruopname: ''
  }
  ]
}
