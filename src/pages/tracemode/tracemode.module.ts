import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TracemodePage } from './tracemode';

@NgModule({
  declarations: [
    TracemodePage,
  ],
  imports: [
    IonicPageModule.forChild(TracemodePage),
  ],
})
export class TracemodePageModule {}
