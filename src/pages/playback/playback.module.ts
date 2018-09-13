import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaybackPage } from './playback';

@NgModule({
  declarations: [
    PlaybackPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaybackPage),
  ],
})
export class PlaybackPageModule {}
