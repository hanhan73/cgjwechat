/**
 * Created by Administrator on 2017/11/15/015.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TBasicService } from '../providers/basic-service';
@Injectable()
export class AboutService extends TBasicService {
  constructor(public http: Http) {
    super(http);
  }
  /**
   * about页面
   * =================================================================================================
   */
  Getcarlist(num,curPage?) {
    let data = {};
    data['tokenId'] = localStorage.getItem('token');
    data['partnerId'] = localStorage.getItem('partnerid');
    data['isOnlinevIds'] = num; //未绑定4 已绑定3
    if(curPage != undefined) {
      data['curPage'] = curPage;
    }
    return this.Post(data,'vehicle/getVehicles');
  }

  /**
   * 绑定chageparter详情页 获取设备列表
   */
  GetBindUserDevice(id) {
    let data = {};
    data['tokenId'] = localStorage.getItem('token');
    data['vehicleid'] = id;

    return this.Post(data,'userDevice/getVehicleDevice');
  }

  /**解除绑定 */
  Unbinddevice(info,binditem) {
    let data = {};
    data['tokenId'] = localStorage.getItem('token');
    data['userId'] = binditem.userId;
    data['vehicleid'] =binditem.id;
    data['sns'] =info.sn;
    return this.Post(data,'userDevice/newUnbindUserVehicleDevice');
  }
  /**Addcarpage页面 新增车辆 */
  Addcar(info,partneritem) {
    let data = {};
    data['tokenId'] = localStorage.getItem('token');
    console.log(info[0].carNamber+'sssss')
    data['carNumber'] = info[0].carNamber;
    data['carType'] = info[0].cartype;
    data['brand'] = info[0].carbrand;
    data['partnerId'] = partneritem.id;
    data['userPhone'] = info[0].userphone;
    data['userName'] = info[0].username;
    data['vinNumber'] = info[0].carja;
    return this.Post(data,'vehicle/addOrUpdateVehicle');
  }


  /**bindcar 判断设备号是否存在 */
  Checkdevicenum(sn) {
    let data = {};
    data['tokenId'] = localStorage.getItem('token');
    data['sn'] = sn;
    data['status'] = 1;
    return this.Post(data,'device/getDeviceList');
  }

  /**bincar 绑定设备 */
  Binddevice(sn,positions,vehicleid) {
    let data = {};
    data['tokenId'] = localStorage.getItem('token');
    data['devicepositions'] = positions;
    data['sns'] = sn;
    data['vehicleid'] = vehicleid;
    data['deviceremarks'] = '-';
    return this.Post(data,'userDevice/newBindUserVehicleDevice');
  }
}
