import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams  ,LoadingController,ToastController} from 'ionic-angular';
import { TCommonPage } from '../basic-page';
import { AboutService } from '../../providers/about-service';

/**
 * Generated class for the BindcarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({name:'BindcarPage'})
@Component({
  selector: 'page-bindcar',
  templateUrl: 'bindcar.html',
})
export class BindcarPage extends TCommonPage{

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl:LoadingController,
    public toastCtrl:ToastController,
    public aboutservice: AboutService) {
      super(navCtrl,navParams,loadingCtrl,toastCtrl);
      document.title='绑定设备';
     this.bindinfo =this.navParams.get('item')
     this.dlist = this.navParams.get('dlist');
     this.binddata();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad BindcarPage');
  }

  getuser(value: string) {
    if( value !== undefined && value !== '' ) {
      this.aboutservice.Checkdevicenum(value).then(
        data => {
          
          if(data.data.length === 0) {
            this.ShowToast('不存在此设备号');
          }else {
            this.sns = value;
            this.parnter = data.data;
            console.log(this.parnter)
            this.pname = this.parnter[0].partnername;
            this.btnstatus = false;
          }
        },
        error => console.log(error)
      )
    } else {
      this.ShowToast('请输入设备号')
    }
  }

  binddata() {
    if(this.dlist.length > 0) {
      console.log(this.dlist);
      for(let i = 0; i<this.dlist.length;i++) {
        // if(i< this.dlist.length){
          console.log(this.dlist[i]);
          this.snsitem = this.snsitem+this.dlist[i].sn+',';
          this.positions = this.positions+this.dlist[i].position+',';
      //   }
      //  if(i=== this.dlist.length) {
        // this.snsitem = this.snsitem+this.dlist[i].sn;
        // this.positions = this.positions+this.dlist[i].position;
      //  }
      }
    }
  }

  submitbind() {
    if ( this.position !== undefined && this.position !== ' ' && this.position !== '0') {
      // this.snsitem = this.snsitem+this.sns;
      // this.positions = this.positions+this.position;
      this.aboutservice.Binddevice(this.sns,this.position,this.bindinfo.id).then(
        data => {
          if(data.retCode === 0) {
            this.ShowToast('绑定成功');
            this.navCtrl.push('ChangeparterPage',{item: this.bindinfo})
          }else {
            this.ShowToast(data.message);
          }
        },
        error => console.log(error)
      );
    }else {
      this.ShowToast('请先选择安装位置')
    }
  }

  private bindinfo;
  private btnstatus = true;
  private parnter;
  private pname= '';
  private position;
  private sns;
  private dlist;
  //三个数组 绑定设备信息
  private snsitem='';
  private remarkitem='';
  private positions='';
}
