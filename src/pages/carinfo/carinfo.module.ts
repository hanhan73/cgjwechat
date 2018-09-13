import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarinfoPage } from './carinfo';

@NgModule({
  declarations: [
    CarinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(CarinfoPage),
  ],
})
export class CarinfoPageModule {}
