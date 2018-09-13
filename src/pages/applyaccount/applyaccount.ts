import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import { TCommonPage } from '../basic-page';
import { ApplyaccountService } from '../../providers/applyaccount-service';
import { CarloginService } from '../../providers/carlogin-service';
/**
 * Generated class for the ApplyaccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({name: 'ApplyaccountPage'})
@Component({
  selector: 'page-applyaccount',
  templateUrl: 'applyaccount.html',
})
export class ApplyaccountPage extends TCommonPage{

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public applyservice: ApplyaccountService,
              public clservice: CarloginService) {
    super(navCtrl, navParams,loadingCtrl,toastCtrl);
    document.title = '掌云车管家';
    this.info = this.navParams.get('item');
    if( this.info == undefined || this.info == "" ){
      //this.navCtrl.push('CheckorderPage')
    }else{
      this.id = this.info.order_id;
      this.name = this.info.receiver_name;
      this.phone = this.info.receiver_phone;
      // this.company = this.info.receiver_name;
      this.address = this.info.receiver_province+this.info.receiver_city;
    }
  }

  ionViewDidLoad() {
    // this.clservice.Login(this.username,this.userpwd).then(
    //   data => this.LoginFinish(data),
    //   error => console.log(error)
    // );
  }

  checkphone(str) {
    var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;  
    if (!myreg.test(str)) {  
        return false;  
    } else {  
        return true;  
    }  
  }

  submit() {
    if( this.name == undefined || this.name == "" ) {
      this.ShowToast("姓名不能为空")
      return;
    }
    if( this.phone == undefined || this.phone == "" ) {
      this.ShowToast("手机号不能为空")
      return;
    }
    if(this.checkphone(this.phone) === false) {
      this.ShowToast("请输入有效的手机号!")
      return;
    }
    // if( this.accountname == undefined || this.accountname == "" ) {
    //   this.ShowToast("账号名称不能为空")
    //   return;
    // }
    // if( this.loginaccount == undefined || this.loginaccount == "" ) {
    //   this.ShowToast("登录账号不能为空")
    //   return;
    // }
    
    // if( this.pwd == undefined || this.pwd == "" ) {
    //   this.ShowToast("登录密码不能为空")
    //   return;
    // }
    
   // this.applyservice.SubmitInfo(this.name,this.phone,this.loginaccount,this.accountname,this.pwd,this.id).then(
    this.applyservice.SubmitInfo(this.name,this.phone).then(   
      data => this.Finish(data),
      error => console.log(error)
    )
    //this.ShowToast("已经提交！")
    //this.GoBack();
  }

  Finish(data) {
    console.log(data);
    if(data.retCode === 0) {
      this.ShowToast('已进入人工审核阶段，请等待！');
      // this.ShowToast('申请账号成功');
      // this.navCtrl.push('CarloginPage',{account:this.loginaccount,pwd:this.pwd});
      this.navCtrl.push('ApplyaccountPage');
    }else {
      this.ShowToast(data.message);
    }
  }

  LoginFinish(data){
    if(data.retCode == 0){
      //成功
      console.log(data.tokenId);
      localStorage.setItem('token',data.tokenId);
    }else{
      this.ShowToast(data.message);
    }
  }


  private info;
  private name;
  private phone;
  // private company;
  private address;
  private id = "";
  // private loginaccount;
  // private pwd;
  // private accountname;

  //获取token
  // private username = 'admin';
  // private userpwd = '6514a90281a556c9056da0586854da93';
}
