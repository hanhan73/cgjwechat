import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarloginPage } from './carlogin';

@NgModule({
  declarations: [
    CarloginPage,
  ],
  imports: [
    IonicPageModule.forChild(CarloginPage),
  ],
})
export class CarloginPageModule {}
