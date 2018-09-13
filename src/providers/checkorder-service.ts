/**
 * Created by Administrator on 2017/11/15/015.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TBasicService } from '../providers/basic-service';
@Injectable()
export class CheckorderService extends TBasicService {
  constructor(public http: Http) {
    super(http);
  }
  /**
   * checkorder页面 验证orderid
   * =================================================================================================
   */
  CheckOrderId(orderid) {
    let data = {};
    data['orderid'] = orderid;
    return this.Post(data,'wechatAction/checkorder','https://zhxapps.dtmobi.com');
  }
}
