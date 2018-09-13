import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PolicePage } from './police';

@NgModule({
  declarations: [
    PolicePage,
  ],
  imports: [
    IonicPageModule.forChild(PolicePage),
  ],
})
export class PolicePageModule {}
