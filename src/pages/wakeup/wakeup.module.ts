import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WakeupPage } from './wakeup';

@NgModule({
  declarations: [
    WakeupPage,
  ],
  imports: [
    IonicPageModule.forChild(WakeupPage),
  ],
})
export class WakeupPageModule {}
