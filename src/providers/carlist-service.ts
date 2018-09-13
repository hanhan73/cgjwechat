/**
 * Created by Administrator on 2017/11/15/015.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TBasicService } from '../providers/basic-service';
@Injectable()
export class CarlistService extends TBasicService {
  constructor(public http: Http) {
    super(http);
  }
  /**
   * carlist页面 获取全部设备列表
   * =================================================================================================
   */
    GetCarlist(number,devicename:string="",devicetype:string="",curPage?) {
      let data = {};
      data['tokenId'] = localStorage.getItem('token');
      data['isOnlinevIds'] = number;
      data['partnerid'] = localStorage.getItem('partnerid');
      data['userid'] = localStorage.getItem('userid');
      if(devicename != undefined) {
        data['devicename'] = devicename+"";
      }
      if(devicetype != undefined) {
        data['devicetype'] =devicetype;
      }
      if(curPage != undefined) {
        data['curPage'] = curPage;
      }
      
      return this.Post(data,'device/qryDeviceData');
    }

  /**
   * 0关注、1取消关注设备 
   * =================================================================================================
   */
    FolowDevice(number ,deviceId ,sn) {
      let data = {};
      data['tokenId'] = localStorage.getItem('token');
      data['id'] = deviceId;
      data['type'] = number;
      data['sn'] = sn;
      return this.Post(data,'device/fllowDevice');
    }

}
