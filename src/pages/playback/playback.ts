import { Component,ViewChild , ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
// import { Geolocation } from '@ionic-native/geolocation';
import { TCommonPage } from '../basic-page';
import { PlayBackService } from '../../providers/playback-service';
/**
 * Generated class for the PlaybackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
// baidu map

// declare var BMAP_STATUS_SUCCESS;
// declare var BMap_Symbol_SHAPE_FORWARD_OPEN_ARROW;
declare var BMap;
declare var BMapLib;
@IonicPage({name:'PlaybackPage'})
@Component({
  selector: 'page-playback',
  templateUrl: 'playback.html',
})
export class PlaybackPage extends TCommonPage{
  @ViewChild('map') map_container: ElementRef;
  map: any;//地图对象
  marker: any;//标记
  geolocation1: any;
  startIcon: any;
  endIcon: any;
  constructor(public navCtrl: NavController,
    // private geolocation: Geolocation,
     public navParams: NavParams,
    public loadingCtrl:LoadingController,
    public toastCtrl:ToastController,
    public playbackservice: PlayBackService ) {
      super(navCtrl,navParams,loadingCtrl,toastCtrl);
      document.title = '轨迹回放'
       this.info = this.navParams.get('item');
       console.log(this.info)
       if( this.info === undefined || this.info === "") {
         
       }else {
          this.etime = this.info.gpsinfo.gpstime.slice(0,10);
          this.stime = this.etime;
          this.startIcon = new BMap.Icon("../../assets/playback/point_start.png", new BMap.Size(60, 60));
          this.endIcon = new BMap.Icon("../../assets/playback/point_end.png", new BMap.Size(60, 60));
       }
  }

  ionViewDidLoad() {
    if( this.stime === "" || this.stime === undefined) {
      this.ShowToast("无轨迹回放");
      this.GoBack();
    }else {
      console.log(this.stime,this.etime);
      this.playbackservice.Getorbit(
        this.info,this.stime,this.etime
      ).then(
        data => this.getplayitem(data),
        error => console.log(error)
      )
    }
  }

  getplayitem(data) {
    if( data.retCode === 0 ) {
      this.playitem = data.data;
      this.playmap();
    }else {
      this.ShowToast('无轨迹信息');
    }
  }

  convertor (arrPois) {
   
      var convertor = this.BMapConvertor;
        //pointArr.push(new BMap.Point(lng, lat));
      convertor.translate(arrPois, 3, 5, this.callback);
   
   }

  playmap() {
    console.log('mapvoid');
    var arrPois =[];
    for( var j= 0; j< this.playitem.length; j++ ){
      //let point = new BMap.Point(this.playitem[j].gpsinfo.lng,this.playitem[j].gpsinfo.lat);//坐标可以通过百度地图坐标拾取器获取
      //添加到数组中
      arrPois= arrPois.concat(new BMap.Point(this.playitem[j].gpsinfo.lng,this.playitem[j].gpsinfo.lat));
    }
    console.log(arrPois);
    this.callback(arrPois);
  }

  callback(point) {
      //根据baidu API画出轨迹
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
      let marker = new BMap.Marker(point[0],{ icon: this.startIcon });
    let marker1 = new BMap.Marker(point[this.playitem.length-1],{ icon: this.endIcon });
    this.map.addOverlay(marker);
    this.map.addOverlay(marker1);
    //创建矢量图标类
    var Symbol = new BMap.Symbol('../../assets/carinfo/baseStation.svg', //百度地图预设向上的箭头
     {
        // fillColor: '#F00', //图标填充颜色
        // fillOpacity: 1, //图标填充透明度
        scale: 1.5, //图标缩放大小
        // rotation : '90deg', //图标旋转角度
        // strokeColor : '#008DD5', //线填充颜色
        // strokeWeight : 2, //线的透明度
        // strokeOpacity : 2, //线宽
    });
    //设置折线样式符号显示
    var iconSequence = new BMap.IconSequence(Symbol, '5px', '5px', true);
    map.addOverlay(new BMap.Polyline(point,{iconSequence : iconSequence}));
    map.setViewport(point);
    map.centerAndZoom(point,2);//设置中心和地图显示级别
    this.lushu = new BMapLib.LuShu(map,point,{
      defaultContent:"",
      autoView:true,//是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
      icon  : new BMap.Icon('../../assets/playback/car.png', new BMap.Size(52,26),{anchor : new BMap.Size(27, 13)}),
      speed: this.speed,
      enableRotation:true,//是否设置marker随着道路的走向进行旋转
      landmarkPois: [
        //  {lng:116.314782,lat:39.913508,html:'加油站',pauseTime:2},
        //  {lng:116.315391,lat:39.964429,html:'高速公路收费<div><img src="http://map.baidu.com/img/logo-map.gif"/></div>',pauseTime:3},
        //  {lng:116.381476,lat:39.974073,html:'肯德基早餐<div><img src="http://ishouji.baidu.com/resource/images/map/show_pic04.gif"/></div>',pauseTime:2}
      ]}); 
    
  }

  go() { 
    this.lushu.start();
  }

  shiftdown() {
    if ( this.speed >120) {
      this.speed = this.speed-this.speed*0.2;
      this.ShowToast('修改成功,请开始播放');
      // this.lushu.start();
    }else {
      this.ShowToast('已经是最小速度播放');
    }
  }
  
  addspeed() {
    if ( this.speed < 9000) {
      this.speed = this.speed+this.speed*0.2;
      console.log(this.speed);
      this.ShowToast('修改成功,请开始播放');
      this.go();
    }else {
      this.ShowToast('已经是最高速度播放');
    }
  }

  private lushu;
  private BMapConvertor;
  private stime;
  private etime;
  private info;
  private playitem;//获取到轨迹数组
  private speed = 1500;
}
