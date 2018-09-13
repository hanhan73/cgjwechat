import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GuanyuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({name: "GuanyuPage"})
@Component({
  selector: 'page-guanyu',
  templateUrl: 'guanyu.html',
})
export class GuanyuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    document.title='关于';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GuanyuPage');
  }

}
