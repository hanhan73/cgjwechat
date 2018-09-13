/**
 * Created by Administrator on 2017/11/15/015.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TBasicService } from '../providers/basic-service';
@Injectable()
export class ContactService extends TBasicService {
  constructor(public http: Http) {
    super(http);
  }
  /**获取新增的报警类型 */
  Getaddtype() {
    let data = {};
    data['tokenId'] = localStorage.getItem('token');
    return this.Post(data,'vehicleDanger/queryCanChoose');
  }
  /**获取已推送的报警 */
  Getopentype() {
    let data = {};
    data['tokenId'] = localStorage.getItem('token');
    data['operatorid'] = 2;
    return this.Post(data,'vehicleDanger/queryTypes');
  }
  /**删除报警推送 */
  Deltypes(id) {
    let data = {};
    data['tokenId'] = localStorage.getItem('token');
    data['ids'] = id;
    return this.Post(data,'vehicleDanger/delTypes');
  }
  /**新增推送报警 */
  Savetype(alerttypeid) {
    let data = {};
    data['tokenId'] = localStorage.getItem('token');
    data['alerttypeids'] = alerttypeid;
    return this.Post(data,'vehicleDanger/save');
  }
  /**解绑 */
  UnbindAccount() {
    let data = {};
    data['tokenId'] = localStorage.getItem('token');
    data['openid'] = localStorage.getItem('openid');
    return this.Post(data,'backuser/unBindWechat');
  }
  /**修改地图更新时间 */
  Chagereftime(time) {
    let data = {};
    data['tokenId'] = localStorage.getItem('token');
    data['id'] = localStorage.getItem('userid'); 
    data['mapRefreshTime'] = time;
    return this.Post(data,'backuser/upSecurUser');
  }
}
