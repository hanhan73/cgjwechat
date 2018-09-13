import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import { TCommonPage } from '../basic-page';
import { PoliceService } from '../../providers/police-service';
/**
 * Generated class for the ReportlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({name: "ReportlistPage"})
@Component({
  selector: 'page-reportlist',
  templateUrl: 'reportlist.html',
})
export class ReportlistPage extends TCommonPage{

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl:LoadingController,
    public toastCtrl:ToastController,
    public policservice: PoliceService) {
      super(navCtrl,navParams,loadingCtrl,toastCtrl);
      this.typeids = this.navParams.get('types');
      document.title=this.navParams.get('name');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportlistPage');
    if( this.typeids != '' && this.typeids != null) {
      this.getsta();
    }
  }

  Todetaile(item) {
    this.navCtrl.push('ReportdetailePage',{item:item});
  }

  getsta() {
    this.policservice.Getstatisic(this.typeids).then(
      data => {
        console.log(data),
        this.policlist = data.data;
      },
      error => console.log(error)
    );
  }

  getItems() {
    if(this.myInput != undefined) {
      this.policservice.Getstatisic(this.typeids,this.myInput).then(
        data => {
          console.log(data),
          this.policlist = data.data;
        },
        error => console.log(error)
      );
    }
  }

  typeids;
  policlist;
  myInput;
}
