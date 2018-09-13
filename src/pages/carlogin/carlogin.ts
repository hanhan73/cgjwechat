import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController  } from 'ionic-angular';
import { CarloginService } from '../../providers/carlogin-service';
import { TCommonPage } from '../basic-page';
import { Md5 } from 'ts-md5/dist/md5';
/**
 * Generated class for the CarloginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({name: 'CarloginPage'})
@Component({
  selector: 'page-carlogin',
  templateUrl: 'carlogin.html',
})
export class CarloginPage extends TCommonPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl:LoadingController,
    public toastCtrl:ToastController,
    public clservice: CarloginService) {
      super(navCtrl,navParams,loadingCtrl,toastCtrl);
      
      this.headimg = localStorage.getItem('headimgurl');
      this.nickname= localStorage.getItem('nickname')
      console.log(localStorage.getItem('openid'));
      this.ngOnDestroy();
      // this.username = localStorage.getItem('name');
      // this.userpwd = localStorage.getItem('pwd');
      // if(this.username !== null && this.username !== ' ' && this.userpwd !== null && this.userpwd  !== ' ') {
        // console.log(this.username +'dsad'+ this.userpwd);
        // this.clservice.Toz().then(
        //   data => console.log(),
        //   error => console.log(error)
        //   );
        // this.clservice.Toz().then(
        //   data => console.log(data),
        //   error => console.log(error)
        // );
      //   this.Login();
      // }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarloginPage');
  }

  ngOnDestroy() {
    console.log('destory');
    this.username = undefined;
    this.userpwd = undefined;
  }

  Login() {
    if (this.username != null && this.userpwd != null) {
      // this.Loading('登陆中');
      //  let Keypwd= Md5.hashStr(this.userpwd);
      //   Keypwd=Md5.hashStr(Keypwd+'');
      //   //console.log(Keypwd);
      // this.clservice.Login(this.username,Keypwd).then(
      //   data => this.LoginFinish(data),
      //   error => console.log(error)
      // );

      this.Loading('绑定中');
      let Keypwd= Md5.hashStr(this.userpwd);
       Keypwd=Md5.hashStr(Keypwd+'');
     this.clservice.Bindaccount(this.username,Keypwd).then(
       data => this.LoginFinish(data),
       error => console.log(error)
     );
    } else {
      this.ShowToast('请输入正确账号密码',2000,'top');
    }
  }

  LoginFinish(data){
    this.FreeLoading();
    if(data.retCode == 0){
      // if( this.savepwd == true ) {
      //   localStorage.setItem('name',this.username);
      //   localStorage.setItem('pwd',this.userpwd);
      // }
      //成功
      console.log(data.tokenId);
      localStorage.setItem('token',data.tokenId);
      localStorage.setItem('partnerid',data.data.partnerid);
      localStorage.setItem('userid',data.data.id);
      localStorage.setItem('accountname',data.data.username);

      this.navCtrl.push('TabsPage');
    }else{
      this.ShowToast(data.message);
    }
  }

  blurInput() {
    this.inputcolor = '1px solid #c1c1c1';
  }

  focusInput() {
    this.inputcolor = '1px solid rgb(113, 146, 247)';
  }

  blurInput1() {
    this.inputcolor1 = '1px solid #c1c1c1';
  }

  focusInput1() {
    this.inputcolor1 = '1px solid rgb(113, 146, 247)';
  }

  private inputcolor = '1px solid #c1c1c1';
  private inputcolor1 = '1px solid #c1c1c1' ;
  private username = localStorage.getItem('name');
  private userpwd = localStorage.getItem('pwd');
  private savepwd;

  headimg;
  nickname;
}
