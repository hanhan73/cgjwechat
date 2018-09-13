import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the StatisicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({name: "StatisicPage"})
@Component({
  selector: 'page-statisic',
  templateUrl: 'statisic.html',
})
export class StatisicPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    document.title='统计';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatisicPage');
  }

  Toreport(i:string,name) {
    console.log(i+name);
    this.navCtrl.push('ReportlistPage',{types:i,name:name});
  }

}
