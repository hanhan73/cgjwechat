import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { IonicPage} from 'ionic-angular';
import { CarlistPage } from '../carlist/carlist';
@IonicPage({name: 'TabsPage'})
@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {

  tab1Root = 'CarlistPage';
  tab2Root = 'StatisicPage';
  // tab2Root = 'AboutPage';
  tab3Root = 'ContactPage';

  constructor() {

  }
}
