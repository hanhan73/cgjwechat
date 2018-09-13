import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController ,AlertController  ,ActionSheetController} from 'ionic-angular';
import { TCommonPage } from '../basic-page';
import { CarlistService } from '../../providers/carlist-service';
/**
 * Generated class for the CarlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({name:'CarlistPage'})
@Component({
  selector: 'page-carlist',
  templateUrl: 'carlist.html',
})
export class CarlistPage extends TCommonPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl:LoadingController,
    public toastCtrl:ToastController,
    public carlistService: CarlistService,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController) {
    super(navCtrl,navParams,loadingCtrl,toastCtrl);
    document.title = '设备'
  }

  ionViewDidLoad() {
    this.GetList();
  }

  doRefresh() {
    console.log('11111');
  }
  
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    setTimeout(() => {
      if(this.page.curPage < this.page.totalPage) {
        this.page.curPage++;
        this.carlistService.GetCarlist( this.num ,this.myInput,this.page.curPage).then(
          data => this.caritem = this.caritem.concat(data.data),
          error => console.log(error)
        );
      }else {
        this.ShowToast('已加载全部',2000,'bottom')
      }
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  getItems() {
    console.log(this.myInput+this.num);
    if(this.myInput != undefined) {
      this.carlistService.GetCarlist( this.num ,this.myInput).then(
        data => this.GetListFinish(data),
        error => console.log(error)
      );
    }
    
  }

  GetList() {
    this.Loading();
    if( this.car == "all" ) {
      this.num = 5;
      this.Getvoid();
    } else if( this.car == "online" ) {
      this.num = 0;
      this.Getvoid();
    } else if( this.car == "offline" ) {
      this.num = 1;
      this.Getvoid();
    } else if( this.car == "follow" ) {
      this.num = 3;
      this.Getvoid();
    }else if( this.car == "report" ) {
      this.num = 2;
      this.Getvoid();
    }
  }

  GetListFinish(data) {
    if(data.data !=null && data.data != undefined) {
      if(data.data == '') {
        this.ShowToast('没有相关设备')
      }
      this.caritem = data.data;
      this.page = data.page;
      this.sum = this.page.counts;
      this.FreeLoading();
      // this.ShowToast('共'+this.sum+'个设备');
    }else {
      this.ShowToast(data.message);
    }
  }

  Getvoid() {
    this.carlistService.GetCarlist( this.num ,this.myInput,this.devicetype).then(
      data => this.GetListFinish(data),
      error => console.log(error)
    ) ;
  }

  Geturl(status) {
    if(status === "1") {
      //绿色
      this.spancolor = '#24D18B';
      return '../../assets/carlist/绿色.svg';
    }else if(status === "2") {
      //蓝色
      this.spancolor = '#17ABE3';
      return '../../assets/carlist/蓝色.svg';
    }else if(status === "3") {
      //黑色
      this.spancolor = ' #000000';
      return '../../assets/carlist/圆点小.svg';
    }else if(status === "4") {
      //灰
      this.spancolor = ' #90908E';
      return '../../assets/carlist/圆点小黑.svg';
    }else {
      //灰色
      this.spancolor = ' #90908E';
      return '../../assets/carlist/圆点小黑.svg';
    }
  }

  btnstyle(isfollow) {
    if ( isfollow === "0" ) {
      //已关注
      this.btnfollow = '已关注';
    }else {
      //未关注
      this.btnfollow = '未关注';
      return {
        "background-color": "white",
        "color": "#6893F5",
        "border": "1px solid rgb(113, 146, 247)"
       }
    }
  }

  Btnfollow(item) {
    if ( item.isFllow === "0" ) {
      //取消关注
      this.carlistService.FolowDevice( 1,item.id,item.sn ).then(
        data => this.FollowFinish(data),
        error => console.log(error)
      );
    }else {
      //加关注
      this.carlistService.FolowDevice( 0,item.id,item.sn ).then(
        data => this.FollowFinish(data),
        error => console.log(error)
      );
    }
    event.stopPropagation();
  }

  FollowFinish(data) {
    if (data.retCode === 0 ) {
      this.ShowToast('操作成功');
      this.GetList();
    }else {
      this.ShowToast(data.message);
      
    }
  }

  Tocarinfo(info) {
    if(info.vehicleState == '设备未激活') {
      this.presentActionSheet(info);
      return;
    }
    this.navCtrl.push('CarinfoPage',{item:info});
  }

  presentActionSheet(info) {
    let actionSheet = this.actionSheetCtrl.create({
      title: '设备未激活，请选择要跳转的页面',
      buttons: [
        {
          text: '设备资料',
          role: 'destructive',
          handler: () => {
            this.navCtrl.push('DeviceinfoPage',{item: info.id})
          }
        },{
          text: '设备设置',
          handler: () => {
             //设置
            this.navCtrl.push('SettingPage',{item: info});
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  showCheckbox() {
    let alert = this.alertCtrl.create();
    alert.setTitle('设备筛选');
    alert.setSubTitle('请选择查询的设备类型');
    alert.addInput({
      type: 'radio',
      label: '所有类型',
      value: '',
      checked:this.radioall
    });
    alert.addInput({
      type: 'radio',
      label: 'ZY-T',
      value: 'ZY-T',
      checked:this.radiot
    });

    alert.addInput({
      type: 'radio',
      label: 'ZY-V',
      value: 'ZY-V',
      checked:this.radiov
    });

    alert.addInput({
      type: 'radio',
      label: 'ZY-M',
      value: 'ZY-M',
      checked:this.radiom
    });

    alert.addButton('取消');
    alert.addButton({
      text: '确定',
      handler: data => {
        console.log('rabio data:', data);
        this.devicetype = data;
        if(data === 'ZY-M') {
          this.radiom = true;
          this.radiot = false;
          this.radiov = false;
          this.radioall = false;
        }
        if(data === 'ZY-V') {
          this.radiom = false;
          this.radiot = false;
          this.radiov = true;
          this.radioall = false;
        }
        if(data === 'ZY-T') {
          this.radiom = false;
          this.radiot = true;
          this.radiov = false;
          this.radioall = false;
        }
        if(data === '') {
          this.radiom = false;
          this.radiot = false;
          this.radiov = false;
          this.radioall = true;
        }
        this.Getvoid();
      }
    });
      alert.present();
    }
  
  choosedevice(){
    // this.showCheckbox();
  }
  car: string ="online";
  private num ;
  private caritem = [];
  private spancolor ='#21252B';
  private btnfollow = "";
  private myInput;
  private page;

  private sum;//控制
  private devicetype;

  //控制设备筛选radio变量
  private radiot;
  private radiov;
  private radiom;
  private radioall = true;
}
