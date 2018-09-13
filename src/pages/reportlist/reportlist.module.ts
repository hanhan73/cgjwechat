import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportlistPage } from './reportlist';

@NgModule({
  declarations: [
    ReportlistPage,
  ],
  imports: [
    IonicPageModule.forChild(ReportlistPage),
  ],
})
export class ReportlistPageModule {}
