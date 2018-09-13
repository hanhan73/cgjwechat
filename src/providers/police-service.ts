/**
 * Created by Administrator on 2017/11/15/015.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TBasicService } from '../providers/basic-service';
@Injectable()
export class PoliceService extends TBasicService {
  constructor(public http: Http) {
    super(http);
  }
  /**
   * police页面 获取报警信息
   * =================================================================================================
   */
  GetPoliceinfo(info,page:number= 1) {
    let data = {};
    data['tokenId'] = localStorage.getItem('token');
    data['sn'] = info.sn;
    data['logtype'] = "1";
    data['curPage'] = page+"";
    data['pageSize'] = "10";
    return this.Post(data,'deviceAlert/queryAlertList');
  } 

  /**报警统计  */
  Getstatisic(typeids,query?) {
    let data = {};
    data['tokenId'] = localStorage.getItem('token');
    data['alertstatus'] = '0';
    data['typeids'] = typeids;
    if( query!= '' && query != null ) {
      data['query'] = query;
    }
    return this.Post(data,'deviceAlert/getDeviceAlertList');
  }
  /**获取报警位置 */
  Getreportposition(id) {
    let data = {};
    data['tokenId'] = localStorage.getItem('token');
    data['id'] = id;
    return this.Post(data,'deviceAlert/getDeviceAlertDetailById');
  }
}
