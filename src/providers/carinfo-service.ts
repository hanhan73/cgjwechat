/**
 * Created by Administrator on 2017/11/15/015.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TBasicService } from '../providers/basic-service';
@Injectable()
export class CarInfoService extends TBasicService {
  constructor(public http: Http) {
    super(http);
  }
  /**
   * carinfo页面 根据deviceID获取信息
   * =================================================================================================
   */
  GetDevicebyid(id) {
    let data = {};
    data['tokenId'] = localStorage.getItem('token');
    data['id'] = id;
    return this.Post(data , 'device/getDeviceById');
  }

  QurDeviceData(sn) {
    let data = {};
    data['tokenId'] = localStorage.getItem('token');
    data['sn'] = sn;
    return this.Post(data , 'device/qryDeviceData');
  }
}
