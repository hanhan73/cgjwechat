/**
 * Created by Administrator on 2017/11/15/015.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TBasicService } from '../providers/basic-service';
@Injectable()
export class PlayBackService extends TBasicService {
  constructor(public http: Http) {
    super(http);
  }
  /**
   * playback页面 获取轨迹
   * =================================================================================================
   */
  Getorbit(info,stime,etime) {
    let data = {};
    data['tokenId'] = localStorage.getItem('token');
    data['sn'] = info.sn;
    data['sTime'] = stime+' 00:00:00';
    data['eTime'] = etime+' 23:59:59';
    console.log(info.carnumber);
    data['carnumber'] = info.carnumber;
    data['coord'] = '1';
    return this.Post(data , 'device/findTrackHis');
  }
}
