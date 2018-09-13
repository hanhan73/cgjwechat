import { Component ,ViewChild , ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
// import { Geolocation } from '@ionic-native/geolocation';
import { TCommonPage } from '../basic-page';
import { CarInfoService } from '../../providers/carinfo-service';
/**
 * Generated class for the CarinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
// baidu map
declare var BMap;
declare var BMAP_STATUS_SUCCESS;
@IonicPage({name:'CarinfoPage'})
@Component({
  selector: 'page-carinfo',
  templateUrl: 'carinfo.html',
})
export class CarinfoPage extends TCommonPage{
  @ViewChild('map') map_container: ElementRef;
  map: any;//地图对象
  marker: any;//标记
  geolocation1: any;
  myIcon: any;
  constructor(public navCtrl: NavController,
     public navParams: NavParams, 
     public carinfoservice: CarInfoService,
    //  private geolocation: Geolocation,
     public loadingCtrl:LoadingController,
     public toastCtrl:ToastController) {
      super(navCtrl,navParams,loadingCtrl,toastCtrl);
      document.title = '位置服务'
     this.myIcon = new BMap.Icon("../../assets/carinfo/定位.svg", new BMap.Size(30, 30));
     this.carinfo = this.navParams.get('item');
     this.a = setInterval(() => {
      this.timedown =this.timedown-1;
      if(this.timedown === 0) {
        this.realtime();
        // this.timedown = 10;
        if(localStorage.getItem('mapRefreshTime') == undefined) {
          this.timedown = 10;
        }else{
          this.timedown =parseInt(localStorage.getItem('mapRefreshTime'));
        }
      }
    },1000);
  }
  
  ngOnDestroy() {
    console.log('dsaDSADAS');
    clearInterval(this.a);
  }

  ionViewDidLoad() {
    if(this.carinfo == undefined){
      this.navCtrl.push('CarlistPage');
      // this.GoBack();
    }else {
      this.carlat = this.carinfo.gpsinfo.lat;
      this.carlng = this.carinfo.gpsinfo.lng;
      this.deviceid = this.carinfo.id;
      localStorage.setItem('sn',this.carinfo.sn);
    }
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
      var opts = {offset: new BMap.Size(20, 80)}
      map.addControl(new BMap.NavigationControl(opts));     
      var opt = {offset: new BMap.Size(15, 125)}
      map.addControl(new BMap.MapTypeControl(opt));    
      var gop = {offset: new BMap.Size(20, 120)}
      map.addControl(new BMap.GeolocationControl(gop));  
      this.BMapConvertor = new BMap.Convertor();
    // map.centerAndZoom("广州",17); //设置城市设置中心和地图显示级别
    // map.addControl(new BMap.MapTypeControl());//地图类型切换
    // map.setCurrentCity("广州"); //设置当前城市
    // let point = new BMap.Point(this.carlng, this.carlat);//坐标可以通过百度地图坐标拾取器获取
    this.convertor(this.carlng, this.carlat).then(point => {
      let marker = new BMap.Marker(point,{ icon: this.myIcon });
      this.map.addOverlay(marker);
      map.centerAndZoom(point, 16);//设置中心和地图显示级别
    })
    this.getAddress(this.carlng,this.carlat);
    // let sizeMap = new BMap.Size(10, 80);//显示位置
    // map.addControl(new BMap.NavigationControl());
    // let myIcon = new BMap.Icon("assets/icon/favicon.ico", new BMap.Size(300, 157));
    // let marker = this.marker = new BMap.Marker(point, { icon: myIcon });
    // map.addOverlay(marker);

    //获取起点
    // this.getLocationByBrowser();
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

   //解析地址
   getAddress(lng, lat) {
    var geoc = new BMap.Geocoder(); 
      geoc.getLocation(new BMap.Point(lng, lat), (rs) => {
        var addComp = rs.addressComponents;
       // console.log(addComp.province  + addComp.city +  addComp.district +  addComp.street + addComp.streetNumber);
        this.localaddress = ""+addComp.province  + addComp.city +  addComp.district +  addComp.street + addComp.streetNumber;
      });        
   }

   //UI 圆点颜色
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

  //logo 电源图标
  Getbatterurl(carinfo) {
    let bar=  parseInt(carinfo.voltage);
    if( carinfo.connectedtype == '1'){
        //无源
      if( 0 === bar) {
        return '../../assets/carinfo/battery0.svg';
      }
      if( 0 < bar && bar <=25) {
        return '../../assets/carinfo/red.svg';
      }
      if( 25 < bar && bar <=50) {
        return '../../assets/carinfo/yellow.svg';
      }
      if( 50 < bar && bar <=75) {
        return '../../assets/carinfo/green.png';
      }
      if( 75 < bar && bar <=100) {
        return '../../assets/carinfo/blue.svg';
      }
    }else if( carinfo.connectedtype == '0'){
      //有源
      if( 0 === bar) {
        return '../../assets/carinfo/storageBattery.png';
      }
      if( 5 === bar) {
        return '../../assets/carinfo/storageBattery5.png';
      }
      if( 30 === bar) {
        return '../../assets/carinfo/storageBattery30.png';
      }
      if( 50 === bar) {
        return '../../assets/carinfo/storageBattery50.png';
      }
      if( 80 === bar) {
        return '../../assets/carinfo/storageBattery80.png';
      }
      if( 100 === bar) {
        return '../../assets/carinfo/storageBattery100.png';
      }
    }
  }

  //logo wifi图标
  GetWifiurl(carinfo) {
    // console.log(carinfo.gpsinfo.locationType);
    if(carinfo.gpsinfo.locationType === '0') {
      //基站定位
      return '../../assets/carinfo/baseStation.svg';
    }
    if(carinfo.gpsinfo.locationType === '1') {
      return '../../assets/carinfo/satellite.svg';
    }
    if(carinfo.gpsinfo.locationType ==='2') {
      return '../../assets/carinfo/wifi.svg';
    }
  }

  Getignalurl(carinfo) {
    if(carinfo.signalgsm === '0') {
      return '../../assets/carinfo/signal0.svg';
    }
    if(carinfo.signalgsm === '1') {
      return '../../assets/carinfo/signal1.svg';
    }
    if(carinfo.signalgsm === '2') {
      return '../../assets/carinfo/signal2.svg';
    }
    if(carinfo.signalgsm === '3') {
      return '../../assets/carinfo/signal3.svg';
    }
    if(carinfo.signalgsm === '4') {
      return '../../assets/carinfo/signal4.svg';
    }
  }
  realtime() {
    this.sn = localStorage.getItem('sn');
    //实时 刷新当前页面
    this.carinfoservice.QurDeviceData(
      this.sn
    ).then(
      data => this.GetDeviceFinish(data),
      error => console.log(error)
    );
    this.ionViewDidEnter();
  }
 
  GetDeviceFinish(data) {
    if( data.retCode === 0 ) {
      this.carinfo == data.data;
    }else {
      this.ShowToast(data.message);
    }
  }

  playback() {
    this.ngOnDestroy();
    //回放
    this.navCtrl.push('PlaybackPage',{item: this.carinfo});
  }

  police() {
    this.ngOnDestroy();
    //报警
    this.navCtrl.push('PolicePage',{item: this.carinfo});
  }  

  navigation() {
    if( this.startlng != undefined && this.startlng != "" ) {
      //http://api.map.baidu.com/direction?origin=latlng:34.264642646862,108.95108518068|name:我家&destination=大雁塔&mode=driving&region=西安&output=html&src=yourCompanyName|yourAppName
      //导航
      this.ngOnDestroy();
      window.location.href = "http://api.map.baidu.com/direction?origin=latlng:"+this.startlat+","+this.startlng+"|name:我的位置&destination=latlng:"+this.carlat+","+this.carlng+"&mode=driving&output=html&src=yourCompanyName|yourAppName";
    }
  }  

  setting() {
    this.ngOnDestroy();
    //设置
    this.navCtrl.push('SettingPage',{item: this.carinfo});
  }

  queryinfo() {
    this.ngOnDestroy();
    this.navCtrl.push('DeviceinfoPage',{item: this.deviceid})
  }
  
  // getLocationByBrowser() {
  //   let geolocation1 = this.geolocation1 = new BMap.Geolocation();
  //   geolocation1.getCurrentPosition((r) => {
  //     let mk = this.marker = new BMap.Marker(r.point, { icon: this.myIcon });
  //     if (geolocation1.getStatus() == BMAP_STATUS_SUCCESS) {
  //       //this.map.addOverlay(mk);
  //       //this.map.panTo(r.point, 16);
  //       // console.log('浏览器定位：您的位置是 ' + r.point.lng + ',' + r.point.lat);
  //       this.startlng =  r.point.lng;
  //       this.startlat =  r.point.lat;
  //     }
  //     else {
  //       alert('failed' + this.geolocation1.getStatus());
  //     }
  //   }, { enableHighAccuracy: false })
  // }

  private carinfo;
  private BMapConvertor;
  private carlat ;
  private carlng ;
  private localaddress = " ";
  private spancolor ='#21252B';
  private sn = localStorage.getItem('sn');
  private deviceid;
  private startlng;//导航的起点
  private startlat;
  private timedown = 10;//倒计时变量
  private a;
}
