import { Component } from '@angular/core';
import { NavController ,NavParams,IonicPage ,LoadingController,ToastController} from 'ionic-angular';
import { TCommonPage } from '../basic-page';
import { SettingService } from '../../providers/setting-service';

/**
 * Generated class for the VsettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({name:'VsettingPage'})
@Component({
  selector: 'page-vsetting',
  templateUrl: 'vsetting.html',
})
export class VsettingPage  extends TCommonPage{

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl:LoadingController,
    public toastCtrl:ToastController,
    public setservice: SettingService) {
      super(navCtrl,navParams,loadingCtrl,toastCtrl);
      this.info = this.navParams.get('item');
      this.vitem = this.navParams.get('vitem');
  }

  
  ionViewDidLoad() {
    if(this.vitem != undefined) {
      this.title = this.vitem.name;
      this.tishi = this.vitem.tishi;
      this.changenum = this.vitem.num;
      document.title = this.title;
    }
    if(this.info != undefined) {
      //加载指令方法
      switch (this.changenum) {
        case '1':
            //一键设防
            this.searchFence();
          break;
        case '3':
          //回传间隔
          this.searchinterval();
        break;
        default:
          break;
      }
    }
  }
  /**
   * 一键设防模块=============================================================================
   */
  searchFence() {
    this.setservice.SearchFence(this.info).then(
      data => this.Finish(data),
      error => console.log(error)
    );
  }

  deleteFence() {
    console.log(this.setinfo);
    if(this.setinfo[0].fenceId == undefined) {
      this.ShowToast('请先设防')
      return;
    }
    this.setservice.DeleteFence(this.setinfo).then(
      data => this.SendFinish(data),
      error => console.log(error)
    );
  }

  addFence() {
    this.setservice.AddFence(this.info,this.radius).then(
      data => this.SendFinish(data),
      error => console.log(error)
    );
  }
  /**
   * 单次点名模块=============================================================================
  */
  firstcall() {
    this.setservice.SendDev(this.info,'3','1').then(
      data => this.SendFinish(data),
      error => console.log(error+'error')
    );
  }
  /**
   * 重启设备模块=============================================================================
  */
  restart() {
    this.setservice.SendDev(this.info,'4','1').then(
      data => this.SendFinish(data),
      error => console.log(error)
    );
  }
 /**
   * 回传间隔模块=============================================================================
  */
  setinterval() {
    //设置 
    if( this.returntime != undefined && this.returntime != "") {
      this.setservice.SendDev(this.info,'1','1',this.returntime).then(
        data => this.SendFinish(data),
        error => console.log(error)
      );
    }else {
      this.ShowToast('请选择回传间隔');
    }
  }

  searchinterval() {
    //查询
    this.setservice.QueryDev(this.info,'1').then(
      data => {
        if(data.data.time_span != undefined) {
          this.returntime = data.data.time_span;
        }else {
          this.ShowToast(data.data.result);
        }
      },
      error => console.log(error)
    );
  }

  Finish(data) {
    if(data.retCode === 0) {
      this.setinfo = data.data;
      if(this.setinfo != undefined && this.setinfo != "") {
        this.radius = this.setinfo[0].radius;
      }else {
        this.radius = "";
      }
    }
  }

  SendFinish(data) {
    if(data.data == 'success') {
      this.ShowToast('发送成功');
    }
  }

  sendset() {
    if(this.info != undefined) {
      //加载指令方法
      switch (this.changenum) {
        case '1':
            //一键设防
            if( this.onekey == '1') {
              //添加
              if( this.radius != undefined && this.radius != "") {
                this.addFence();
              }else {
                this.ShowToast('请选择半径距离');
              }
            }else if( this.onekey == '0'){
              //撤防
                this.searchFence();
                this.deleteFence();
            }
          break;
        case '2':
          this.firstcall();
          break;
        case '3':
          this.setinterval();
          break;
        case '4':
          this.restart();
          break;
        default:
          break;
      }
    }
  }

  private vitem;//选择指令页面信息
  private tishi;
  private title;
  private info;//设备信息
  private changenum;

  //一键设防模块的参数
  private onekey = "1";
  private radius = ''; 
  //回传间隔模块
  private returntime = "";
  private setinfo;
}
