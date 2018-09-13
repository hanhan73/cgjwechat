/**
 * Created by Administrator on 2017/11/15/015.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TBasicService } from '../providers/basic-service';
@Injectable()
export class DeviceinfoService extends TBasicService {
  constructor(public http: Http) {
    super(http);
  }
  /**
   * // 获取当个设备信息 getDeviceById
#define KGetDeviceById  @"http://120.78.207.237:8080/new-gps-web/device/getDeviceById"
// 更新设备资料
#define KSaveOrUpdateDevice  @"http://120.78.207.237:8080/new-gps-web/device/saveOrUpdateDevice"
   * =================================================================================================
   */
  Getdevicebyid(id) {
    let data = {};
    data['tokenId'] = localStorage.getItem('token');
    data['id'] = id;
    return this.Post(data , 'device/getDeviceById');
  }

  SaveOrupdate(info,devicename,partneritem) {
    let data = {};
    data['tokenId'] = localStorage.getItem('token');
    data['devicename'] = devicename;
    data['partnerid'] = partneritem.id;
    data['id'] = info.id;
    data['vehicleid'] = info.vehicleid;
    return this.Post(data,'device/saveOrUpdateDevice');
  }
  /**
   * 获取合作伙伴列表
   */
  GetParterList() {
    let data = {};
    data['tokenId'] = localStorage.getItem('token');
    data['pageSize'] = 10000;
    return this.Post(data , 'partner/qryPartners');
  }
}
