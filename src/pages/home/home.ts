import { Component ,ViewChild } from '@angular/core';
import { NavController , IonicPage,AlertController,ModalController} from 'ionic-angular';
// import { Geolocation } from '@ionic-native/geolocation';
// import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

@IonicPage({name: 'HomePage'})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController ,
    // private barcodeScanner: BarcodeScanner ,
    public alertCtrl: AlertController,
    protected modalController:ModalController) {
   
  }
  ionViewDidEnter() {
  }

  scan() {
    // let options: BarcodeScannerOptions = {
    //   preferFrontCamera: false,//前置摄像头
    //   showFlipCameraButton: true,//翻转摄像头按钮
    //   showTorchButton: true,//闪关灯按钮
    //   prompt: '扫描中……',//提示文本
    //   formats: 'QR_CODE',//格式
    //   orientation: 'portrait',//方向
    //   torchOn: false,//启动闪光灯
    //   resultDisplayDuration: 500,//显示扫描文本
    //   disableSuccessBeep: true // iOS and Android
    // }
    // this.barcodeScanner
    //   .scan(options)
    //   .then((data) => {
    //     this.barcodeData = data;
    //     const alert = this.alertCtrl.create({
    //       title: 'Scan Results',
    //       subTitle: data.text,
    //       buttons: ['OK']
    //     });
    //     alert.present();
    //   })
    //   .catch((err) => {
    //     const alert = this.alertCtrl.create({
    //       title: 'Attention!',
    //       subTitle: err,
    //       buttons: ['Close']
    //     });
    //     alert.present();
      // });
    }
      // public barcodeData;

}
