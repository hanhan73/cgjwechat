import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarlistPage } from './carlist';

@NgModule({
  declarations: [
    CarlistPage,
  ],
  imports: [
    IonicPageModule.forChild(CarlistPage),
  ],
})
export class CarlistPageModule {}
