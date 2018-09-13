import { Component } from '@angular/core';
import { NavController ,NavParams,IonicPage ,LoadingController,ToastController} from 'ionic-angular';
import { TCommonPage } from '../basic-page';
import { AboutService } from '../../providers/about-service';
import { DeviceinfoService } from '../../providers/deviceinfo-service';

@IonicPage({name: 'AboutPage'})
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage extends TCommonPage{

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,public loadingCtrl:LoadingController,
    public toastCtrl:ToastController,
    public aboutservice: AboutService,
    public deviceservice: DeviceinfoService) {
      
      super(navCtrl,navParams,loadingCtrl,toastCtrl);
      document.title='车辆绑定';
      this.getlist();
  }

  getlist() {
    this.aboutservice.Getcarlist(this.bindlist).then(
      data => this.getFinish(data),
      error => console.log(error)
    );

  }

  Toaddpage() {
    this.navCtrl.push('AddcarPage');
  }

  getFinish(data) {
    if(data.retCode === 0) {
        this.caritem = data.data;
        this.page = data.page;
    } else {
      this.ShowToast(data.message);
    }
  }

  Tobind(vitem){
    this.navCtrl.push('ChangeparterPage',{item:vitem});
  }

  
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    setTimeout(() => {
      if(this.page.curPage < this.page.totalPage) {
        this.page.curPage++;
        this.aboutservice.Getcarlist( this.bindlist,this.page.curPage).then(
          data => this.caritem = this.caritem.concat(data.data),
          error => console.log(error)
        );
      }else {
        this.ShowToast('已加载全部')
      }
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  private bindlist = '4'
  private caritem;
  private page;


}
