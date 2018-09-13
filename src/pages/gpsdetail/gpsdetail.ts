import { Component ,ViewChild , ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,ToastController } from 'ionic-angular';
import { TCommonPage } from '../basic-page';
import { PoliceService } from '../../providers/police-service';

/**
 * Generated class for the GpsdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var BMap;
@IonicPage({name:'GpsdetailPage'})
@Component({
  selector: 'page-gpsdetail',
  templateUrl: 'gpsdetail.html',
})
export class GpsdetailPage extends TCommonPage{
  @ViewChild('map') map_container: ElementRef;
    map: any;//地图对象
    marker: any;//标记
    startIcon: any;
    endIcon: any;
    constructor(public navCtrl: NavController,
      public navParams: NavParams,
      public loadingCtrl:LoadingController,
      public toastCtrl:ToastController,
      public policservice: PoliceService) {
        super(navCtrl,navParams,loadingCtrl,toastCtrl);
        document.title="报警详情";
        this.devicename = decodeURI(localStorage.getItem('devicename'));
        this.sn = localStorage.getItem('sn');
        this.carnumber =  decodeURI(localStorage.getItem('carnumber'));
        this.mobileno = localStorage.getItem('phone');
        this.createtime = decodeURI(localStorage.getItem('alerttime'));
        this.address = decodeURI(localStorage.getItem('address'));
        this.typename = decodeURI(localStorage.getItem('typename'));
        this.groupname = decodeURI(localStorage.getItem('groupname'));
        this.partnername = decodeURI(localStorage.getItem('partnername'));
        this.carlat =  localStorage.getItem('alertLat');
        this.carlng = localStorage.getItem('alertLng');
        
        this.myIcon = new BMap.Icon("../../assets/carinfo/定位.svg", new BMap.Size(30, 30));
       
      }
  ionViewDidLoad() {
    console.log('ionViewDidLoad GpsdetailPage');
  }
  ionViewDidEnter() {
    let map =
    this.map =
    new BMap.Map(
      this.map_container.nativeElement,
      {
        enableMapClick: true,//点击拖拽
        enableScrollWheelZoom: true,//启动滚轮放大缩小，默认禁用
        enableContinuousZoom: true //连续缩放效果，默认禁用
      }
    );//创建地图实例
    this.BMapConvertor = new BMap.Convertor();
    // let point = new BMap.Point(this.carlng, this.carlat);//坐标可以通过百度地图坐标拾取器获取
    this.convertor(this.carlng, this.carlat).then(point => {
      let marker = new BMap.Marker(point,{ icon: this.myIcon });
      this.map.addOverlay(marker);
      map.centerAndZoom(point, 16);//设置中心和地图显示级别
    })
  }
  

 //坐标转换
 convertor (lng, lat) {
    return new Promise(resolve => {
      var convertor = this.BMapConvertor;
        var pointArr = [];
        pointArr.push(new BMap.Point(lng, lat));
        convertor.translate(pointArr, 3, 5, data => {
          if (data.status === 0) {
            resolve(data.points[0]);
          }
        })
    })
    
  }

  
  myIcon;
  carlng='';
  carlat='';
  BMapConvertor;

  devicename;
  sn;
  carnumber;
  mobileno;
  createtime;
  address;
  typename;
  groupname;
  partnername;
}
