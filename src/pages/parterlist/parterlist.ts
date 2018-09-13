import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ParterlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({name:'ParterlistPage'})
@Component({
  selector: 'page-parterlist',
  templateUrl: 'parterlist.html',
})
export class ParterlistPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    document.title = '选择合作伙伴';
    this.parteritem = this.navParams.get('item');
    this.id = this.navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParterlistPage');
  }

  itemSelected(it) {
    
    this.navCtrl.push('DeviceinfoPage',{parter:it,item:this.id});
  }

  private parteritem;
  private id;
}
