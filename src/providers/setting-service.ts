/**
 * Created by Administrator on 2017/11/15/015.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TBasicService } from '../providers/basic-service';
@Injectable()
export class SettingService extends TBasicService {
  constructor(public http: Http) {
    super(http);
  }
  /**
   * 查询指令
   * * =================================================================================================
   */
  QueryDev(info,worknum) {
    let data = {};
    // "localStorage.getItem('token')
    data['tokenId'] = localStorage.getItem('token');
    data['sn'] = info.sn;
    data['work_pattern'] = worknum;
    data['device_type'] = info.connectedtype;
    return this.Post(data,'deviceOrder/getDevOrder','http://zy.dtmobi.com:8501/zy-gps');
  }
   /**
   * 发送指令
   * * =================================================================================================
   */
  SendDev(info,worknum,state,timespan?,tracktime?) {
    let data = {};
    data['tokenId'] = localStorage.getItem('token');
    data['sn'] = info.sn;
    data['work_pattern'] = worknum;
    data['device_type'] = info.connectedtype;
    data['state'] = state;
    if(timespan != undefined ) {
      data['time_span'] = timespan;
    }
    if(tracktime != undefined) {
      data['track_time'] = tracktime;
    }
    return this.Post(data,'deviceOrder/save','http://zy.dtmobi.com:8501/zy-gps');
  }

  //一键设防 查询围栏设置
  SearchFence(info) {
    let data = {};
    data['tokenId'] = localStorage.getItem('token');
    data['sn'] = info.sn;
    data['fenceid'] = info.deFenceid;
    return this.Post(data,'fence/searchFence');
  }

  DeleteFence(fenceinfo) {
    let data = {};
    data['tokenId'] = localStorage.getItem('token');
    data['fenceId'] = fenceinfo[0].fenceId;
    return this.Post(data,'fence/deleteFence');
  }

  AddFence(info,redius) {
    let data = {};
    data['tokenId'] = localStorage.getItem('token');
    data['mindType'] = 2;
    data['fenceType'] = 3;
    data['gsmsn'] = info.sn;
    data['desc'] = '一键设防';
    data['circle.redius'] = redius;
    data['circle.lng'] = info.gpsinfo.lng;
    data['circle.lat'] = info.gpsinfo.lat;
    return this.Post(data,'fence/addUserFence');
  }

}
